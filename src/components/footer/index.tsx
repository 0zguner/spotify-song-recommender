import styled from "styled-components";

const Footer = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 52px;
  color: whitesmoke;
  @media (max-width: 650px) {
    height: 100px;
    ._ActionsRSWP {
      display: none;
    }
  }
  button {
    outline: none;
  }
`;

export default Footer;
