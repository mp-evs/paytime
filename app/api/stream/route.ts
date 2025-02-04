// app/api/stream/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const sendEvent = (data: object) => {
        // Serialize JSON data and send it as a single event
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      // Simulating sending JSON data every 2 seconds
      const interval = setInterval(() => {
        sendEvent({
          message: "Hello from SSE",
          timestamp: new Date().toISOString(),
          additionalData: { status: "active" },
        });
      }, 2000);

      // Cleanup when the client disconnects
      (controller as any)?.signal?.addEventListener("abort", () => clearInterval(interval));
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
