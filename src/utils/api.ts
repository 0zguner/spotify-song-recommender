import axios from "axios";

export const BaseUrl = {
  root: "https://api.spotify.com/v1/",
  recommendations: "https://api.spotify.com/v1/recommendations"
};

export const Api = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
