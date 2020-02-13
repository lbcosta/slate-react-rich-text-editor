import React, { useMemo, useState, useCallback } from "react";
import { createEditor, Transforms, Editor, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";

const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>;
};

// Define a React component to render leaves with bold text.
const Leaf = props => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  );
};

function App() {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }]
    }
  ]);

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Editable
        renderElement={renderElement}
        // Pass in the `renderLeaf` function.
        renderLeaf={renderLeaf}
        onKeyDown={event => {
          if (!event.ctrlKey) {
            return;
          }

          switch (event.key) {
            case ";": {
              event.preventDefault();
              const [match] = Editor.nodes(editor, {
                match: n => n.type === "code"
              });
              Transforms.setNodes(
                editor,
                { type: match ? null : "code" },
                { match: n => Editor.isBlock(editor, n) }
              );
              break;
            }

            case "b": {
              event.preventDefault();
              const [match] = Editor.nodes(editor, {
                match: n => n.bold
              });
              Transforms.setNodes(
                editor,
                { bold: !match },
                { match: n => Text.isText(n), split: true }
              );
              break;
            }

            default: {
              return;
            }
          }
        }}
      />
    </Slate>
  );
}

export default App;
