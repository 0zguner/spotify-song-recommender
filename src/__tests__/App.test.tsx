import React from "react";
import ReactDOM from "react-dom";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { render } from "enzyme";
import App from "../App";

Enzyme.configure({
  adapter: new Adapter()
});

describe("App", () => {
  test("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("must show Login with Spotify at startup", () => {
    const view = render(<App />);
    expect(view.text()).toMatch("Login with Spotify");
  });
});
