import styled from "styled-components";

const Content = styled.div`
  flex: 1 0 auto;
  overflow: auto;
  padding: 2%;
  height: calc(100vh + 52px);
  @media (max-width: 650px) {
    height: calc(100vh + 150px);
  }
`;

export default Content;
