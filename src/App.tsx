import * as React from "react";
import Main from "./components/Main";
import "./styles/App.css";
import { settings } from "./utils";

export const SettingsContext = React.createContext({ dashboardMode: settings.dashboardMode.full });

const App = () => {
  return (
    <SettingsContext.Provider value={ { dashboardMode: settings.dashboardMode.brief } }>
      <Main />
    </SettingsContext.Provider>
  );
};

export default App;
