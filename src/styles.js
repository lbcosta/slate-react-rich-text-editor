import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;

  background-color: #1e2124;
`;

export const EditorWrapper = styled.div`
  width: 1000px;
  height: 250px;

  margin: 0 auto 0;
  padding: 8px;

  color: white;
  background-color: #424549;
  border: 1px solid #dfe6e9;
  border-radius: 8px;
`;

export const LogoWrapper = styled.div`
  padding: 15px;
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 135px;
    margin: 15px;
  }

  h1 {
    color: #fff;
    font: 56px "Orbitron", sans-serif;
  }
`;
