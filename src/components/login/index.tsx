import * as React from "react";
import styled from "styled-components";
import Button from "components/button";

export interface ILoginProps {
  onClickLogin: () => void;
}

const LoginContainer = styled.div`
  display: flex;
`;

export default class Login extends React.Component<ILoginProps> {
  public render() {
    return (
      <LoginContainer>
        <Button onClick={this.props.onClickLogin}>Login with Spotify</Button>
      </LoginContainer>
    );
  }
}
