import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { render, shallow } from "enzyme";
import AuthStore from "store/auth.store";
import SpotifyStore from "store/spotify.store";
import TopTracksPage from "pages/top";

Enzyme.configure({
  adapter: new Adapter()
});

describe("Top Tracks Page", () => {
  test("page must show warning for 5 selected tracks", () => {
    const mockStore = new SpotifyStore();
    const mockAuthStore = new AuthStore();

    // A little bit sloppy but it works
    mockStore.selectedTracks = [
      "5vJTUmbKFvFMcirWag0XJD",
      "5vJTUmbKFvFMcirWag0XJD",
      "5vJTUmbKFvFMcirWag0XJD",
      "5vJTUmbKFvFMcirWag0XJD",
      "5vJTUmbKFvFMcirWag0XJD"
    ];

    const view = render(
      <TopTracksPage
        routing={null}
        AuthStore={mockAuthStore}
        SpotifyStore={mockStore}
      />
    );
    expect(view.text()).toContain("You can't select more than 5");
  });

  test("Get Recommendations button must be visible", () => {
    const mockStore = new SpotifyStore();
    const mockAuthStore = new AuthStore();

    // A little bit sloppy but it works
    mockStore.selectedTracks = [
      "5vJTUmbKFvFMcirWag0XJD",
      "5vJTUmbKFvFMcirWag0XJD",
      "5vJTUmbKFvFMcirWag0XJD",
      "5vJTUmbKFvFMcirWag0XJD"
    ];

    const view = render(
      <TopTracksPage
        routing={null}
        AuthStore={mockAuthStore}
        SpotifyStore={mockStore}
      />
    );

    // Class type not working for some reason so use html tag
    expect(view.find("button").text()).toContain("Get Recommendations");
  });
});
