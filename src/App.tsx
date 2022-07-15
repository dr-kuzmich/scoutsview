import * as React from "react";
import Main from "./components/Main";
import { positions } from "./consts";
import { settings } from "./settings";
import "./styles/App.scss";

const SETTINGS_DEFAULT = { 
  positions,
  dashboardMode: settings.dashboardMode.brief,
};

export const SettingsContext = React.createContext(SETTINGS_DEFAULT);

const App = () => {
  return (
    <SettingsContext.Provider value={ SETTINGS_DEFAULT }>
      <Main />
    </SettingsContext.Provider>
  );
};

export default App;
