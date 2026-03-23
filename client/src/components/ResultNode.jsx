import { Handle, Position } from "reactflow";

export default function ResultNode({ data }) {
  return (
    <div style={nodeStyle}>
      <div style={label}>AI</div>

      <div style={text}>{data.value || "..."}</div>

      <Handle type="target" position={Position.Left} />
    </div>
  );
}

const nodeStyle = {
  padding: 10,
  borderRadius: 12,
  background: "#2a2a2a",
  border: "1px solid #333",
  width: 300,
};

const label = {
  color: "#aaa",
  fontSize: 12,
  marginBottom: 5,
};

const text = {
  color: "#fff",
  whiteSpace: "pre-wrap",
};