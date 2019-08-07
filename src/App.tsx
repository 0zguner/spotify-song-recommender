import React from "react";
import "./App.css";
import Router from "./router";
import { BrowserRouter } from "react-router-dom";
import { Normalize } from "styled-normalize";

// Should inject auth store to check if logged in previously and redirect to other page

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Normalize />
      <Router />
    </BrowserRouter>
  );
};

export default App;
