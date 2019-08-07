import * as React from "react";
import { inject, observer } from "mobx-react";
import SpotifyStore from "store/spotify.store";
import SpotifyPlayer from "react-spotify-web-playback";
import AuthStore from "store/auth.store";
import { TrackComponent } from "components/track";
import { Loader } from "components/loader";
import Button from "components/button";
import Footer from "components/footer";
import Content from "components/content";
import Header from "components/header";
import Title from "components/title";

interface IRecommendationsPageProps {
  SpotifyStore: SpotifyStore;
  AuthStore: AuthStore;
  routing: any;
}

/**
 * Lists Recommendation Result
 *
 * @export
 * @class RecommendationsPage
 * @extends {React.Component<IRecommendationsPageProps>}
 */
@inject("routing")
@inject("SpotifyStore")
@inject("AuthStore")
@observer
export default class RecommendationsPage extends React.Component<
  IRecommendationsPageProps
> {
  async componentDidMount() {
    try {
      await this.props.SpotifyStore.getRecommendations();
    } catch {
      const { push } = this.props.routing;
      push("/");
    }
  }

  handleClick = (track: any) => {
    // this.props.SpotifyStore.setTrack(track);
  };

  public render() {
    const { SpotifyStore, AuthStore } = this.props;

    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Content>
          {SpotifyStore.isLoading && <Loader />}
          <Header>
            <Title>Result</Title>
            <div>
              <Button onClick={() => SpotifyStore.togglePlay()}>
                {SpotifyStore.isPlaying ? "Pause" : "Play"}
              </Button>
            </div>
          </Header>
          {SpotifyStore.recommendations.map(t => (
            <TrackComponent
              selected={false}
              onClick={uri => this.handleClick(uri)}
              track={t}
              key={t.id}
            />
          ))}
        </Content>
        <Footer>
          {SpotifyStore.recommendationsUris.length > 0 && AuthStore.token && (
            <SpotifyPlayer
              autoPlay={false}
              name="Player"
              play={SpotifyStore.isPlaying}
              uris={SpotifyStore.recommendationsUris}
              token={AuthStore.token}
            />
          )}
        </Footer>
      </div>
    );
  }
}
