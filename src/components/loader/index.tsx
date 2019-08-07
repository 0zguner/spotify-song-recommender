import styled from "styled-components";

export const Loader = styled.div`
  text-decoration: none;
  color: #fff;
  width: 2px;
  height: 2px;
  background-color: #1ed76094;
  margin: 0 auto;
  border-radius: 100px;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  animation: ripple 0.7s linear infinite;
  @keyframes ripple {
    0% {
      box-shadow: 0 0 0 0 #1ed76094, 0 0 0 10px #1ed76094, 0 0 0 30px #1ed76094,
        0 0 0 60px #1ed76094;
    }
    100% {
      box-shadow: 0 0 0 10px #1ed76094, 0 0 0 30px #1ed76094,
        0 0 0 60px #1ed76094, 0 0 0 90px rgba(0, 231, 255, 0);
    }
  }
`;
