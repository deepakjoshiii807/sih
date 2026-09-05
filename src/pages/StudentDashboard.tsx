import { useEffect } from "react";

export default function StudentDashboard() {
  useEffect(() => {
    window.location.href = "/student-dashboard.html";
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#F7F6F0",
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", color: "#6B6F68" }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "#244B35",
            color: "#DCE6D0",
            display: "grid",
            placeItems: "center",
            fontWeight: 700,
            fontSize: 14,
            margin: "0 auto 16px",
          }}
        >
          L2L
        </div>
        <p style={{ fontSize: 14 }}>Loading dashboard…</p>
      </div>
    </div>
  );
}
