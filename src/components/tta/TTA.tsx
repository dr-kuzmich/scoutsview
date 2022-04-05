import React, { useContext, useEffect, useState } from "react";
import { useAppSelector, useModal } from "../../hooks";
import "../../styles/App.css";
import "../../styles/tta/TTA.css";
import { Player } from "../../types";
import Navigation from "../Navigation";
import MatchSettings from "./MatchSettings";
import NewPlayerModal from "./NewPlayerModal";
import PlayerList from "./PlayerList";
import Dashboard from "./Dashboard";
import { SettingsContext } from "../../App";

const TTA = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player>();

  const { isShowing, toggle } = useModal();
  const { positions } = useContext(SettingsContext);

  // TODO Look at shallowEqual when I change match and teams after their creation
  const { match, teams, players } = useAppSelector(state => state.tta);

  useEffect(() => {
    toggle(!!match && !players.length);
  }, [match, players.length]);

  return (
    <>
      <div className="sv-page">
        <Navigation />
        <h2 className="ui header sv-icon-header" style={{ margin: 0 }}>
          <i className="circular futbol icon"></i>
          <div className="content">
            Technical and tactical actions
          </div>
        </h2>

        {!teams ? <MatchSettings /> :
          <>
            <div className="tta-teams">
              {`${teams[0].value} - ${teams[1].value}`}
            </div>
            <div className="tta-players-and-tools">
              <PlayerList
                players={players} 
                selectedPlayer={selectedPlayer}
                setSelectedPlayer={setSelectedPlayer}
                toggle={toggle}
              />
              <Dashboard selectedPlayer={selectedPlayer} setSelectedPlayer={setSelectedPlayer} />
            </div>
          </>
        }
      </div>

      {!teams ? null :
        <NewPlayerModal 
          teams={teams} 
          positions={positions} 
          isShowing={isShowing}
          setSelectedPlayer={setSelectedPlayer} 
        />
      }
    </>
  );
};

export default TTA;
