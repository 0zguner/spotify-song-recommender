import React from "react";
import { createBrowserHistory } from "history";
import { Route, Switch, Router } from "react-router-dom";

// Mobx Imports
import { RouterStore, syncHistoryWithStore } from "mobx-react-router";
import { Provider } from "mobx-react";

// Store Imports
import AuthStore from "store/auth.store";
import SpotifyStore from "store/spotify.store";

// Page imports
import LoginPage from "pages/login";
import RedirectPage from "pages/redirect";
import RecommendationsPage from "pages/recommendations";
import HomePage from "pages/home";
import TopTracksPage from "pages/top";

// Store Configuration
const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const stores = {
  routing: routingStore,
  AuthStore: new AuthStore(),
  SpotifyStore: new SpotifyStore()
};

const history = syncHistoryWithStore(browserHistory, routingStore);

const Routes = () => (
  <Provider {...stores}>
    <Router history={history}>
      <Switch>
        <Route history={history} path="/" component={HomePage} exact />
        <Route history={history} path="/login" component={LoginPage} />
        <Route history={history} path="/redirect" component={RedirectPage} />
        <Route history={history} path="/top" component={TopTracksPage} />
        <Route
          history={history}
          path="/recommendations"
          component={RecommendationsPage}
        />
      </Switch>
    </Router>
  </Provider>
);

export default Routes;
