"use client";

import { useState } from "react";

export default function EnableButton() {
  const [enabled, setEnabled] = useState(false);
  const [status, setStatus] = useState("");

  const handleToggle = async () => {
    const newValue = !enabled;
    setEnabled(newValue);

    // 👉 hanya kirim email saat ENABLED = true
    if (newValue) {
      setStatus("Sending email...");

      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feature: "Auto Email",
          enabled: true,
        }),
      });

      const data = await res.json();
      setStatus(data.success ? "Email sent!" : "Failed to send email");
    }
  };

  return (
    <div>
      <button
        onClick={handleToggle}
        className={`px-4 py-2 rounded ${
          enabled ? "bg-green-600" : "bg-gray-400"
        }`}
      >
        {enabled ? "Enabled" : "Enable"}
      </button>

      <p className="mt-2">{status}</p>
    </div>
  );
}
