import React, { useState } from "react";
import { Editor } from "slate-react";
import { Value } from "slate";

const INITIAL_VALUE = Value.fromJSON({
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                text: "My first paragraph!"
              }
            ]
          }
        ]
      }
    ]
  }
});

export default function TextEditor() {
  const [value, setValue] = useState(INITIAL_VALUE);

  function onChange({ value }) {
    setValue(value);
  }

  return <Editor value={value} onChange={onChange} />;
}
