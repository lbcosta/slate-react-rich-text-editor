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

const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.bold === true,
      universal: true
    });

    return !!match;
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === "code"
    });

    return !!match;
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    );
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "code" },
      { match: n => Editor.isBlock(editor, n) }
    );
  }
};

function App() {
  const editor = useMemo(() => withReact(createEditor()), []);
  // Update the initial content to be pulled from Local Storage if it exists.
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem("content")) || [
      {
        type: "paragraph",
        children: [{ text: "A line of text in a paragraph." }]
      }
    ]
  );

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />;
  }, []);

  const onKeyDown = event => {
    if (!event.ctrlKey) {
      return;
    }

    switch (event.key) {
      case ";": {
        event.preventDefault();
        CustomEditor.toggleCodeBlock(editor);
        break;
      }

      case "b": {
        event.preventDefault();
        CustomEditor.toggleBoldMark(editor);
        break;
      }

      default: {
        return;
      }
    }
  };

  const onChange = value => {
    setValue(value);

    // Save the value to Local Storage.
    const content = JSON.stringify(value);
    localStorage.setItem("content", content);
  };

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={onKeyDown}
      />
    </Slate>
  );
}

export default App;
