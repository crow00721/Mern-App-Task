// import { useState } from "react";
// import ReactFlow, { addEdge, Background, Controls } from "reactflow";
// import "reactflow/dist/style.css";

// import InputNode from "./components/InputNode.jsx";
// import ResultNode from "./components/ResultNode.jsx";
// import { askAI, saveChat } from "./services/api";

// const nodeTypes = {
//   inputNode: InputNode,
//   resultNode: ResultNode,
// };

// export default function FlowCanvas() {
//   const [nodes, setNodes] = useState([
//     {
//       id: "1",
//       type: "inputNode",
//       position: { x: 100, y: 150 },
//       data: {
//         value: "",
//         onChange: () => {},
//         onSend: () => {},
//       },
//     },
//     {
//       id: "2",
//       type: "resultNode",
//       position: { x: 450, y: 150 },
//       data: { value: "" },
//     },
//   ]);

//   const [edges, setEdges] = useState([
//     { id: "e1-2", source: "1", target: "2" },
//   ]);

//   const updateInput = (val) => {
//     setNodes((nds) =>
//       nds.map((node) =>
//         node.id === "1"
//           ? { ...node, data: { ...node.data, value: val } }
//           : node
//       )
//     );
//   };

//   const runFlow = async (value) => {
//     if (!value || value.trim() === "") {
//       alert("Please enter a prompt");
//       return;
//     }

//     const res = await askAI(value);

//     setNodes((nds) =>
//       nds.map((node) =>
//         node.id === "2"
//           ? { ...node, data: { ...node.data, value: res.data.answer } }
//           : node
//       )
//     );
//   };

//   // inject functions
//   const nodesWithFunctions = nodes.map((node) => {
//     if (node.id === "1") {
//       return {
//         ...node,
//         data: {
//           ...node.data,
//           onChange: updateInput,
//           onSend: runFlow,
//         },
//       };
//     }
//     return node;
//   });

//   return (
//     <div style={{ height: "100vh", background: "#0f0f0f" }}>
//       <ReactFlow
//         nodes={nodesWithFunctions}
//         edges={edges}
//         nodeTypes={nodeTypes}
//         onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
//         fitView
//       >
//         <Background />
//         <Controls />
//       </ReactFlow>
//     </div>
//   );
// }

import { useState } from "react";
import ReactFlow, { addEdge, Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import InputNode from "./components/InputNode.jsx";
import ResultNode from "./components/ResultNode.jsx";
import SendButton from "./components/SendButton.jsx";
import SaveButton from "./components/SaveButton.jsx";
import { askAI, saveChat } from "./services/api";

const nodeTypes = {
  inputNode: InputNode,
  resultNode: ResultNode,
};

export default function FlowCanvas() {
  const [nodes, setNodes] = useState([
    {
      id: "1",
      type: "inputNode",
      position: { x: 100, y: 150 },
      data: {
        value: "",
        onChange: () => {},
        onSend: () => {},
      },
    },
    {
      id: "2",
      type: "resultNode",
      position: { x: 450, y: 150 },
      data: { value: "" },
    },
  ]);

  const [edges, setEdges] = useState([
    { id: "e1-2", source: "1", target: "2" },
  ]);

  // Read current values from nodes
  const inputValue  = nodes.find((n) => n.id === "1")?.data.value ?? "";
  const resultValue = nodes.find((n) => n.id === "2")?.data.value ?? "";

  const updateInput = (val) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === "1"
          ? { ...node, data: { ...node.data, value: val } }
          : node
      )
    );
  };

  // Called by SendButton when API returns a result
  const handleResult = (answer) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === "2"
          ? { ...node, data: { ...node.data, value: answer } }
          : node
      )
    );
  };

  // inject functions into nodes
  const nodesWithFunctions = nodes.map((node) => {
    if (node.id === "1") {
      return {
        ...node,
        data: {
          ...node.data,
          onChange: updateInput,
          onSend: () => {}, // SendButton handles submission now
        },
      };
    }
    return node;
  });

  return (
    <div style={{ height: "100vh", background: "#0f0f0f" }}>
      <ReactFlow
        nodes={nodesWithFunctions}
        edges={edges}
        nodeTypes={nodeTypes}
        onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>

      {/* Floating Run Button */}
      <SendButton inputValue={inputValue} onResult={handleResult} />

      {/* Floating Save Button */}
      <SaveButton prompt={inputValue} answer={resultValue} />
    </div>
  );
}