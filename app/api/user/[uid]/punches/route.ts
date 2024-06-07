import mysql, { Connection } from "mysql2";
import { Client } from "ssh2";
import { NextRequest, NextResponse } from "next/server";

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

const getUserPunchesQuery = (id: number, date: Date) => {
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

export async function GET(request: NextRequest, params: { params: { uid: string } }) {
  const {
    params: { uid },
  } = params;
  try {
    if (!uid?.trim()) {
      return NextResponse.json({ message: "uid is required" }, { status: 400 });
    }
    console.log("Establishing Connection ...");
    const conn = await SSHConnection();

    const q = getUserPunchesQuery(+uid, new Date());
    const [raw_punches, fields] = await conn.promise().query(q);
    return NextResponse.json({ data: raw_punches }, { status: 200 });
  } catch (err) {
    const { message, response } = err as any;
    return NextResponse.json({ message }, { status: 500 });
  }
}
