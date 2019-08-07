import styled from "styled-components";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > div {
    display: flex;
    justify-content: space-between;
    & > button:nth-child(2) {
      margin-left: 10px;
    }
  }
  @media (max-width: 650px) {
    position: relative;
    & > div {
      position: fixed;
      display: flex;
      width: 100%;
      top: 2%;
      right: 2%;
      justify-content: flex-end;
      & > button:nth-child(2) {
        margin-left: 10px;
      }
    }
  }
`;

export default Header;
