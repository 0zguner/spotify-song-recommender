import { observable, action, computed } from "mobx";

/**
 * Manages Authantication Store
 *
 * @export
 * @class AuthStore
 */
export default class AuthStore {
  @observable user = null;
  @observable token: string = "";

  constructor() {
    this.token = localStorage.getItem("spotify_token") || "";
  }

  @action
  login() {
    const url = "https://accounts.spotify.com/authorize/";
    const clientId = "?client_id=a0f95c7d678747998a81763330ebfc4e";
    const responseType = "&response_type=token";
    const redirectURIdev = "&redirect_uri=http://localhost:3000/redirect";
    const redirectURIProd =
      "&redirect_uri=https://spotify-song-recommender.onrender.com/redirect";
    const redirectURI =
      process.env.NODE_ENV === "production" ? redirectURIProd : redirectURIdev;
    const scopes =
      "user-top-read streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state ";
    const scope = "&scope=" + encodeURIComponent(scopes);

    const loginURL = `${url}${clientId}${responseType}${scope}${redirectURI}`;

    window.location.href = loginURL;
  }

  /**
   * grabs token from url
   *
   * @returns
   * @memberof AuthStore
   */
  getTokenFromUrl() {
    return (
      window.location.hash &&
      window.location.hash.split("=")[1].split("&token")[0]
    );
  }

  /**
   * sets token, and auth time to store & localstorage
   *
   * @memberof AuthStore
   */
  @action
  setToken() {
    this.token = this.getTokenFromUrl();
    const now = new Date();
    localStorage.setItem("tokenSetDate", "" + now.getTime());
    localStorage.setItem("spotify_token", this.token);
  }

  /**
   * compares token set Date to Now to check if more than 1 hour
   * Because Spotify tokens expires in 1 hour
   * @readonly
   * @memberof AuthStore
   */
  @computed
  get isLoggedIn() {
    const ONE_HOUR = 60 * 60 * 1000;
    const token = localStorage.getItem("spotify_token");
    const tokenSetDateString = localStorage.getItem("tokenSetDate");

    if (token !== "" && tokenSetDateString) {
      const now = new Date();
      const tokenSetDate = parseInt(tokenSetDateString);
      return now.getTime() - tokenSetDate < ONE_HOUR;
    } else {
      return false;
    }
  }
}
