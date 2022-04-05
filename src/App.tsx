import * as React from "react";
import Main from "./components/Main";
import "./styles/App.css";
import { positions, settings } from "./utils";

export const SettingsContext = React.createContext({ 
  positions: positions,
  dashboardMode: settings.dashboardMode.full,
});

const App = () => {
  return (
    <SettingsContext.Provider value={ { positions: positions, dashboardMode: settings.dashboardMode.brief } }>
      <Main />
    </SettingsContext.Provider>
  );
};

export default App;
