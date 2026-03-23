import { Handle, Position } from "reactflow";

export default function InputNode({ data }) {
  return (
    <div style={nodeStyle}>
      <div style={label}>You</div>

      <textarea
        value={data.value}
        onChange={(e) => data.onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            data.onSend(data.value);
          }
        }}
        placeholder="Type a message..."
        style={textarea}
      />

      <Handle type="source" position={Position.Right} />
    </div>
  );
}

const nodeStyle = {
  padding: 10,
  borderRadius: 12,
  background: "#1e1e1e",
  border: "1px solid #333",
  width: 250,
};

const label = {
  color: "#aaa",
  fontSize: 12,
  marginBottom: 5,
};

const textarea = {
  width: "100%",
  minHeight: 60,
  borderRadius: 8,
  border: "none",
  padding: 8,
  background: "#2a2a2a",
  color: "#fff",
  resize: "none",
};