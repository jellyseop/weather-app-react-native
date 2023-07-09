import React from "react";
import { ThemeProvider } from "./ThemeContext";
import MainComponent from "./main";

const App = () => {
  return (
    <ThemeProvider>
      <MainComponent />
    </ThemeProvider>
  );
};

export default App;
