import styled from "styled-components";
import { darken } from "polished";

const TOOLBAR_COLOR = "#424549";

export const Container = styled.div`
  margin: 10px auto;
  background-color: ${TOOLBAR_COLOR};
  border-radius: 3px;
  border: 1px solid ${darken(0.2, "#dfe6e9")};
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  button {
    font-size: 14px;
    padding: 8px;

    color: #fff;
    background-color: ${TOOLBAR_COLOR};
    border: none;
    border-radius: 3px;

    :hover {
      background-color: ${darken(0.1, TOOLBAR_COLOR)};
    }
  }
`;
