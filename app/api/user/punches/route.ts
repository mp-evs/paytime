import mysql, { Connection } from "mysql2";
import { Client } from "ssh2";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto-js";
import { redirect } from "next/navigation";

const sshClient = new Client();
const dbServer = {
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};
const tunnelConfig = {
  host: process.env.DB_SSH_HOST,
  port: 22,
  username: process.env.DB_SSH_USER,
  privateKey: Buffer.from(process.env.SSH_KEY as string),
};
const forwardConfig = {
  srcHost: "127.0.0.1",
  srcPort: 3306,
  dstHost: dbServer.host,
  dstPort: dbServer.port,
};

const getUserPunchesQuery = (id: number | string, date: Date) => {
  const dateString = date.toISOString().split("T")?.[0];
  console.log(dateString);
  return `SELECT * FROM \`attendance\` a
  WHERE a.employee_id = ${id} AND a.\`date\` = '${dateString}' 
  ORDER BY a.\`time\` ASC`;
};

const connectSSH = () => {
  return new Promise((resolve, reject) => {
    sshClient.on("ready", () => {
      sshClient.forwardOut(
        forwardConfig.srcHost,
        forwardConfig.srcPort,
        forwardConfig.dstHost!,
        forwardConfig.dstPort,
        (err, stream) => {
          if (err) {
            console.error("Failed to establish SSH connection.");
            reject(err);
          }
          resolve(stream);
        }
      );
    });
    sshClient.connect(tunnelConfig);
  });
};

const SSHConnection = () => {
  return new Promise<Connection>(async (resolve, reject) => {
    try {
      const stream = await connectSSH();
      const updatedDbServer = { ...dbServer, stream };
      const connection = mysql.createConnection(updatedDbServer);
      connection.connect((error) => {
        if (error) {
          console.error("Failed to establish SSH connection.");
          reject(error);
        } else {
          console.info("SSH Connection Established.");
          resolve(connection);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

export async function GET(request: NextRequest) {
  const userEncoded = request.cookies.get("user")?.value;
  if (!userEncoded) return redirect("/login");

  const bytes = crypto.AES.decrypt(userEncoded, process.env.BCRYPT_SALT as string);
  const [username] = bytes.toString(crypto.enc.Utf8)?.split("::");

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = (data: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };
      try {
        sendEvent({
          message: "Connecting to DB ...",
          kind: "loading",
        });
        const conn = await SSHConnection();

        const uid = username.replace("IN", "");
        const q = getUserPunchesQuery(uid, new Date());

        sendEvent({
          message: "Getting your records ...",
          kind: "loading",
        });
        const [raw_punches] = await conn.promise().query(q);
        sendEvent({
          message: `${(raw_punches as any)?.length} Records found`,
          kind: "success",
          data: raw_punches,
        });
      } catch (err) {
        console.log(err);
        sendEvent({
          reason: (err as any).message,
          message: "Something went wrong",
          kind: "error",
        });
      }
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
