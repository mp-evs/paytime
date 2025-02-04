"use client";

import { useEffect, useState } from "react";

export default function ConsumeEventSource() {
  const [events, setEvents] = useState<Object>({
    message: "Sending request ...",
  });

  useEffect(() => {
    const eventSource = new EventSource("/api/user/punches");

    eventSource.onmessage = (event) => {
      setEvents(JSON.parse(event.data));
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>Server-Sent Events with JSON Data</h1>
      <hr />
      {JSON.stringify(events, null, 2)}
    </div>
  );
}
