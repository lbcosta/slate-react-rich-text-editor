import React from "react";

export default function Code({ attributes, children }) {
  return (
    <pre {...attributes}>
      <code>{children}</code>
    </pre>
  );
}
