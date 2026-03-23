import { useState } from "react";
import { askAI } from "../services/api";

const SendButton = ({ inputValue, onResult }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!inputValue || inputValue.trim() === "") {
      alert("Please enter a prompt");
      return;
    }
    setLoading(true);
    try {
      const res = await askAI(inputValue);
      onResult(res.data.answer);
    } catch (err) {
      console.error("API error:", err);
      onResult("Error: Could not get a response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      style={{
        position: "fixed",
        bottom: "32px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        padding: "14px 40px",
        fontSize: "15px",
        fontWeight: "700",
        fontFamily: "'Courier New', monospace",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: loading ? "#555" : "#0ff",
        background: "transparent",
        border: `2px solid ${loading ? "#333" : "#0ff"}`,
        borderRadius: "2px",
        cursor: loading ? "not-allowed" : "pointer",
        boxShadow: loading ? "none" : "0 0 18px #0ff5, 0 0 40px #0ff2",
        transition: "all 0.2s ease",
        backdropFilter: "blur(4px)",
      }}
      onMouseEnter={(e) => {
        if (!loading) {
          e.currentTarget.style.background = "#0ff18";
          e.currentTarget.style.boxShadow = "0 0 28px #0ff8, 0 0 60px #0ff4";
        }
      }}
      onMouseLeave={(e) => {
        if (!loading) {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.boxShadow = "0 0 18px #0ff5, 0 0 40px #0ff2";
        }
      }}
    >
      {loading ? (
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              display: "inline-block",
              width: "12px",
              height: "12px",
              border: "2px solid #0ff",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 0.7s linear infinite",
            }}
          />
          Running...
        </span>
      ) : (
        "▶ Run Flow"
      )}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
};

export default SendButton;