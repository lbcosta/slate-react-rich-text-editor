import React, { useMemo, useState, useCallback } from "react";
import { createEditor, Transforms, Editor, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";

import Code from "./components/Code";
import Leaf from "./components/Leaf";
import DefaultElement from "./components/DefaultElement";
import QuarkLogo from "./assets/img/quark.png";

import GlobalStyle from "./styles/global";

import { Container, EditorWrapper, Logo, LogoWrapper } from "./styles";

const CustomEditor = {
  isBoldActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.bold === true,
      universal: true
    });

    return !!match;
  },

  isItalicActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.italic === true,
      universal: true
    });

    return !!match;
  },

  isCodeActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === "code"
    });

    return !!match;
  },

  toggleBold(editor) {
    const isActive = CustomEditor.isBoldActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    );
  },

  toggleItalic(editor) {
    const isActive = CustomEditor.isItalicActive(editor);
    Transforms.setNodes(
      editor,
      { italic: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    );
  },

  toggleCode(editor) {
    const isActive = CustomEditor.isCodeActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "code" },
      { match: n => Editor.isBlock(editor, n) }
    );
  }
};

function App() {
  const editor = useMemo(() => withReact(createEditor()), []);
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
        return <Code {...props} />;
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
        CustomEditor.toggleCode(editor);
        break;
      }

      case "b": {
        event.preventDefault();
        CustomEditor.toggleBold(editor);
        break;
      }

      case "i": {
        event.preventDefault();
        CustomEditor.toggleItalic(editor);
        break;
      }

      default: {
        return;
      }
    }
  };

  const onChange = value => {
    setValue(value);

    const content = JSON.stringify(value);
    localStorage.setItem("content", content);
  };

  return (
    <>
      <Container>
        <LogoWrapper>
          <Logo>
            <img src={QuarkLogo} alt="Logo" />
            <h1>Quark</h1>
          </Logo>
        </LogoWrapper>
        <EditorWrapper>
          <Slate editor={editor} value={value} onChange={onChange}>
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              onKeyDown={onKeyDown}
            />
          </Slate>
        </EditorWrapper>
      </Container>
      <GlobalStyle />
    </>
  );
}

export default App;
