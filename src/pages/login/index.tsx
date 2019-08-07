import * as React from "react";
import Login from "components/login";
import AuthStore from "store/auth.store";
import { inject, observer } from "mobx-react";
import styled from "styled-components";

export interface ILoginPageProps {
  AuthStore: AuthStore;
}

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

/**
 * Login Page
 *
 * @export
 * @class LoginPage
 * @extends {React.Component<ILoginPageProps>}
 */
@inject("AuthStore")
@observer
export default class LoginPage extends React.Component<ILoginPageProps> {
  public render() {
    return (
      <LoginContainer>
        <Login onClickLogin={() => this.props.AuthStore.login()} />
      </LoginContainer>
    );
  }
}
