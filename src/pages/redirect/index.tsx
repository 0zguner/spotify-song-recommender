import * as React from "react";
import { inject, observer } from "mobx-react";
import AuthStore from "store/auth.store";
import SpotifyStore from "store/spotify.store";
import { Loader } from "components/loader";

export interface IRedirectPageProps {
  AuthStore: AuthStore;
  SpotifyStore: SpotifyStore;
  routing: any;
}

/**
 * Handles redirection process
 * after Spotify redirects to page
 * @export
 * @class RedirectPage
 * @extends {React.Component<IRedirectPageProps>}
 */
@inject("routing")
@inject("AuthStore")
@inject("SpotifyStore")
@observer
export default class RedirectPage extends React.Component<IRedirectPageProps> {
  componentDidMount() {
    const { push } = this.props.routing;
    this.props.AuthStore.setToken();
    this.props.SpotifyStore.setToken(this.props.AuthStore.token);
    setTimeout(() => {
      push("/top");
    }, 2000);
  }
  public render() {
    return (
      <div>
        <Loader />
        redirecting...
      </div>
    );
  }
}
