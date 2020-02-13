import React from "react";

export default function Leaf({ attributes, leaf, children }) {
  return (
    <span
      {...attributes}
      style={{
        fontWeight: leaf.bold ? "bold" : "normal",
        fontStyle: leaf.italic ? "italic" : "normal"
      }}
    >
      {children}
    </span>
  );
}
