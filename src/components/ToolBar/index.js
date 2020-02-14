import React from "react";

import { FaBold, FaItalic, FaCode } from "react-icons/fa";

import { Container } from "./styles";

export default function ToolBar({ toggleBold, toggleItalic, toggleCode }) {
  return (
    <Container>
      <button type="button" onClick={toggleBold}>
        <FaBold />
      </button>

      <button type="button" onClick={toggleItalic}>
        <FaItalic />
      </button>

      <button type="button" onClick={toggleCode}>
        <FaCode />
      </button>
    </Container>
  );
}
