import * as React from "react";
import { inject, observer } from "mobx-react";
import AuthStore from "store/auth.store";
import SpotifyStore from "store/spotify.store";

export interface IHomePageProps {
  AuthStore: AuthStore;
  routing: any;
  SpotifyStore: SpotifyStore;
}

/**
 * Handles main routing after logging in
 *
 * @export
 * @class HomePage
 * @extends {React.Component<IHomePageProps>}
 */
@inject("routing")
@inject("AuthStore")
@inject("SpotifyStore")
@observer
export default class HomePage extends React.Component<IHomePageProps> {
  componentDidMount() {
    const { AuthStore, SpotifyStore } = this.props;
    const { push } = this.props.routing;
    if (AuthStore.isLoggedIn) {
      SpotifyStore.setToken(AuthStore.token);
      push("/top");
    } else {
      push("/login");
    }
  }

  public render() {
    return <div />;
  }
}
