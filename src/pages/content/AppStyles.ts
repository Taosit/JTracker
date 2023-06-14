import styled from "@emotion/styled";

export const ContentView = styled.div`
  position: fixed;
  width: 300px;
  height: calc(300px + var(--drag-area-height));
  background-color: #fff;
  z-index: 99999;
  isolation: isolate;
  flex-direction: column;
  border: 2px solid var(--primary-dark);
  border-radius: 4px;
  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }

  *::selection {
    background: #accef7;
    color: currentColor;
  }

  h1,
  h2,
  p,
  button,
  label,
  input,
  textarea {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    border: none;
  }

  button {
    border: none;
    cursor: pointer;
  }
`;

export const DragArea = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: var(--drag-area-height);
  background-color: var(--primary-dark);
  cursor: move;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
`;
