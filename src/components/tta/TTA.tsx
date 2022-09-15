import React, { useContext, useEffect, useState } from "react";
import { useAppSelector, useModal, useTooltip } from "../../hooks";
import "../../styles/App.scss";
import "../../styles/tta/TTA.scss";
import { Player } from "../../types";
import Navigation from "../Navigation";
import MatchSettings from "./MatchSettings";
import NewPlayerModal from "./NewPlayerModal";
import PlayerList from "./PlayerList";
import Dashboard from "./Dashboard";
import { SettingsContext } from "../../App";
import { weatherTypes } from "../../consts";

const TTA = () => {
  // TODO id instead of player (and remove setSelectedPlayer from Dashboard)
  const [selectedPlayer, setSelectedPlayer] = useState<Player>();

  const { isShowing, toggle } = useModal();
  const { positions } = useContext(SettingsContext);

  // TODO Look at shallowEqual when I change match and teams after their creation
  const { match, teams, players } = useAppSelector(state => state.tta);

  useEffect(() => {
    !players.length && toggle(!!match);
  }, [match]);

  const { tooltip: teamsTooltip, ref: teamsRef } = useTooltip(teams ? `${teams[0].value} - ${teams[1].value}` : "", [teams] || []);
  const { tooltip: placeTooltip, ref: placeRef } = useTooltip(match?.place || "", [match?.place] || []);

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
            <div className="tta-match-info">
              <div ref={teamsRef} className="tta-teams" title={teamsTooltip}>
                {`${teams[0].value} - ${teams[1].value}`}
              </div>
              <div className="tta-add-info">
                <div className="tta-add-info-column tta-aic-left">
                  <i className="calendar alternate outline icon"></i>
                  <div className="tta-aic-text">{match?.date}</div>
                </div>                
                <div className="tta-add-info-column tta-aic-middle">
                  <i className="cloud icon"></i>
                  {/* TODO Remove arrays in weatherTypes.find (Map instead) and for positions */}
                  <div className="tta-aic-text">{match?.weatherId.length ? weatherTypes.find(v => v.id === match.weatherId)?.value : "Unknown"}</div>
                </div>
                <div className="tta-add-info-column tta-aic-right">
                  <i className="map marker alternate icon"></i>
                  <div ref={placeRef} className="tta-aic-text" title={placeTooltip}>{match?.place.length ? match.place : "Unknown"}</div>
                </div>
              </div>
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
          toggle={toggle}
          setSelectedPlayer={setSelectedPlayer} 
        />
      }
    </>
  );
};

export default TTA;
