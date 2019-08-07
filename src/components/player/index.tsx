import * as React from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import SpotifyStore from "store/spotify.store";
import { inject, observer } from "mobx-react";
import AuthStore from "store/auth.store";

export interface IPlayerProps {
  selectedTracks: string[];
  token: string;
}

@inject("SpotifyStore")
@inject("AuthStore")
@observer
export default class Player extends React.Component<IPlayerProps> {
  public render() {
    return <div />;
  }
}
