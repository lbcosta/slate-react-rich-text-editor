import React from "react";

export default function DefaultElement({ attributes, children }) {
  return <strong {...attributes}>{children}</strong>;
}
