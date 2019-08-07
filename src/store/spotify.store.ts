import { observable, action, computed } from "mobx";
import SpotifyWebApi from "spotify-web-api-js";
import TrackModel from "types/track.types";

const spotify = new SpotifyWebApi();

/**
 * Manages States of pages that consume Spotify API
 *
 * @export
 * @class SpotifyStore
 */
export default class SpotifyStore {
  @observable topTracks: TrackModel[] = [];
  @observable recommendations: TrackModel[] = [];
  @observable selectedTracks: string[] = [];
  @observable recommendationsUris: string[] = [];
  @observable isLoading: boolean = false;
  @observable isPlaying: boolean = true;

  constructor() {
    spotify.setAccessToken(localStorage.getItem("spotify_token") || "");
  }

  /**
   * Sets token to SpotifyWebApi instance
   *
   * @param {string} token
   * @memberof SpotifyStore
   */
  @action
  setToken(token: string) {
    spotify.setAccessToken(token);
  }

  /**
   * Handles Spotify Player's playing status
   *
   * @memberof SpotifyStore
   */
  @action
  togglePlay() {
    this.isPlaying = !this.isPlaying;
  }

  /**
   * Adds or rmeoves trackId to/from @param this.selectedTracks
   *
   * @param {string} trackId
   * @memberof SpotifyStore
   */
  @action
  setTrack(trackId: string) {
    const index = this.selectedTracks.indexOf(trackId);
    if (index === -1 && this.selectedTracks.length < 5) {
      this.selectedTracks.push(trackId);
    } else {
      this.selectedTracks.splice(index, 1);
    }
  }

  /**
   * Computed property to retrive track urs in spotify:track:uri format
   *
   * @readonly
   * @type {string[]}
   * @memberof SpotifyStore
   */
  @computed
  get topTrackUris(): string[] {
    return this.topTracks.map(t => t.uri);
  }

  /**
   * Fetches Users top tracks and sets it to @param this.topTracks
   *
   * @memberof SpotifyStore
   */
  @action
  async getTopTracks() {
    this.isLoading = true;
    const topTracks = await spotify.getMyTopTracks();
    this.topTracks = topTracks.items;
    this.setLoadingFalse();
  }

  /**
   * An action with timeout to simulate longer api durations
   *
   * @memberof SpotifyStore
   */
  @action
  setLoadingFalse() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  /**
   * Fetchs recommendations from Spotify with @param this.selectedTracks
   *
   * @memberof SpotifyStore
   */
  @action
  async getRecommendations() {
    this.isLoading = true;
    const recommendations = await spotify.getRecommendations({
      seed_tracks: this.selectedTracks
    });
    const tracks: string[] = recommendations.tracks.map(rt => rt.id);
    this.recommendationsUris = recommendations.tracks.map(rt => rt.uri);

    const tracksResult = await spotify.getTracks(tracks);
    this.recommendations = tracksResult.tracks;
    this.setLoadingFalse();
  }
}
