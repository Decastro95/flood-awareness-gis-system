export default function EmergencyContacts() {
  return (
    <div style={{
      background: "white",
      borderRadius: "12px",
      padding: "1.5rem",
      marginBottom: "1.5rem",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      border: "1px solid #e2e8f0"
    }}>
      <h3 style={{ margin: "0 0 1rem 0", color: "#1e293b", fontSize: "1.25rem" }}>🚨 Emergency Contacts</h3>
      <div style={{ fontSize: "0.95rem", color: "#374151" }}>
        <div style={{ marginBottom: "0.75rem" }}>
          <strong style={{ color: "#dc2626" }}>General Emergency:</strong> 112
        </div>
        <div style={{ marginBottom: "0.75rem" }}>
          <strong>Namibian Police:</strong> 10111
        </div>
        <div style={{ marginBottom: "0.75rem" }}>
          <strong>Fire Department:</strong> 10111
        </div>
        <div style={{ marginBottom: "0.75rem" }}>
          <strong>Namibia Red Cross:</strong> +264 61 411 100
        </div>
      </div>
      <p style={{ margin: "1rem 0 0 0", fontSize: "0.85rem", color: "#6b7280", fontStyle: "italic" }}>
        Always call emergency services in case of immediate danger. This information is for public awareness.
      </p>
    </div>
  );
}
