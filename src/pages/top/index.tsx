import * as React from "react";
import { inject, observer } from "mobx-react";
import SpotifyStore from "store/spotify.store";
import AuthStore from "store/auth.store";
import { TrackComponent } from "components/track";
import TrackModel from "types/track.types";
import Button from "components/button";
import { Loader } from "components/loader";
import Content from "components/content";
import Header from "components/header";
import Title from "components/title";

interface IRecommendationsPageProps {
  SpotifyStore: SpotifyStore;
  AuthStore: AuthStore;
  routing: any;
}

/**
 * Lists Users Most Listened Tracks
 *
 * @export
 * @class TopTracksPage
 * @extends {React.Component<IRecommendationsPageProps>}
 */
@inject("routing")
@inject("SpotifyStore")
@inject("AuthStore")
@observer
export default class TopTracksPage extends React.Component<
  IRecommendationsPageProps
> {
  /**
   * Fetch top track on mount
   * for this use case failing means token expired
   *
   * @memberof TopTracksPage
   */
  async componentDidMount() {
    const { push } = this.props.routing;
    try {
      await this.props.SpotifyStore.getTopTracks();
    } catch {
      push("/");
    }
  }

  handleClick = (track: TrackModel) => {
    this.props.SpotifyStore.setTrack(track.id);
  };

  /**
   * pushes route to recommendations page
   *
   * @memberof TopTracksPage
   */
  handleRecommend = async () => {
    const { push } = this.props.routing;
    push("/recommendations");
  };

  public render() {
    const { SpotifyStore } = this.props;

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
            <Title>Top Tracks</Title>
            <div>
              {SpotifyStore.selectedTracks.length > 1 && (
                <Button onClick={this.handleRecommend}>
                  Get Recommendations
                </Button>
              )}
            </div>
          </Header>
          <span>Select two or more tracks to generate recommendation</span>
          <br />
          {SpotifyStore.selectedTracks.length === 5 && (
            <span
              style={{
                color: "red",
                alignSelf: "center"
              }}
            >
              You can't select more than 5.
            </span>
          )}
          {SpotifyStore.topTracks.map(t => (
            <TrackComponent
              selected={
                SpotifyStore.selectedTracks.indexOf(t.id) > -1 ? true : false
              }
              onClick={uri => this.handleClick(uri)}
              track={t}
              key={t.id}
            />
          ))}
        </Content>
      </div>
    );
  }
}
