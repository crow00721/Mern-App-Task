import { useState } from "react";
import { saveChat } from "../services/api";

const SaveButton = ({ prompt, answer }) => {
  const [status, setStatus] = useState("idle"); // idle | saving | saved | error

  const handleSave = async () => {
    if (!prompt || prompt.trim() === "") {
      alert("Nothing to save — please run a prompt first.");
      return;
    }
    if (!answer || answer.trim() === "") {
      alert("No result to save — please run the flow first.");
      return;
    }

    setStatus("saving");
    try {
      await saveChat({ prompt, response: answer });
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2500);
    } catch (err) {
      console.error("Save error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
    }
  };

  const config = {
    idle:   { label: "💾 Save Chat", color: "#a78bfa", shadow: "#a78bfa" },
    saving: { label: "Saving...",    color: "#555",    shadow: "none"     },
    saved:  { label: "✓ Saved!",     color: "#4ade80", shadow: "#4ade80"  },
    error:  { label: "✗ Failed",     color: "#f87171", shadow: "#f87171"  },
  }[status];

  return (
    <button
      onClick={handleSave}
      disabled={status === "saving"}
      style={{
        position: "fixed",
        bottom: "32px",
        left: "calc(50% + 160px)",
        zIndex: 1000,
        padding: "14px 32px",
        fontSize: "15px",
        fontWeight: "700",
        fontFamily: "'Courier New', monospace",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: config.color,
        background: "transparent",
        border: `2px solid ${config.color}`,
        borderRadius: "2px",
        cursor: status === "saving" ? "not-allowed" : "pointer",
        boxShadow:
          status === "saving"
            ? "none"
            : `0 0 18px ${config.shadow}55, 0 0 40px ${config.shadow}22`,
        transition: "all 0.25s ease",
        backdropFilter: "blur(4px)",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        if (status === "idle") {
          e.currentTarget.style.background = `${config.shadow}18`;
          e.currentTarget.style.boxShadow = `0 0 28px ${config.shadow}88, 0 0 60px ${config.shadow}44`;
        }
      }}
      onMouseLeave={(e) => {
        if (status === "idle") {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.boxShadow = `0 0 18px ${config.shadow}55, 0 0 40px ${config.shadow}22`;
        }
      }}
    >
      {status === "saving" ? (
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              display: "inline-block",
              width: "12px",
              height: "12px",
              border: `2px solid ${config.color}`,
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 0.7s linear infinite",
            }}
          />
          Saving...
        </span>
      ) : (
        config.label
      )}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
};

export default SaveButton;