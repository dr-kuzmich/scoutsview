import classnames from "classnames";
import React, { useEffect, useState } from "react";
import { useModal } from "../../hooks";
import "../../styles/App.css";
import "../../styles/tta/TTA.css";
import { Player, Team } from "../../types";
import Navigation from "../Navigation";
import Match from "./Match";
import NewPlayerModal from "./NewPlayerModal";

const TTA = () => {  
  const [ready, setReady] = useState(true);  
  const [team0, setTeam0] = useState<Team>({id: "team_0", value: "Manchester United", players: []});
  const [team1, setTeam1] = useState<Team>({id: "team_1", value: "Liverpool", players: []});
  // const [ready, setReady] = useState(false);
  // const [team0, setTeam0] = useState<Team>();  
  // const [team1, setTeam1] = useState<Team>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player>();

  const {isShowing, toggle} = useModal();

  useEffect(() => {
    toggle(ready && !players.length);
  }, [ready, players.length])

  console.log("players", players);
  
  return (
    <>
      <div className="sv-page">
        <Navigation />
        <h2 className="ui header sv-icon-header" style={{margin: 0}}>
          <i className="circular futbol icon"></i>
          <div className="content">
            Technical and tactical actions
          </div>        
        </h2>

        {!ready ? <Match team0={team0} team1={team1} setTeam0={setTeam0} setTeam1={setTeam1} setReady={setReady} /> :
          <div className="tta-container">
            <div className="tta-teams">
              {`${team0?.value} - ${team1?.value}`}        
            </div>
            <div className="tta-players-and-tools">
              <div className="tta-players">
                {!players.length ? null :
                  <>
                    <div className="ui middle aligned divided list">
                      {players.map(v =>
                      <div key={v.id} className={classnames("item tta-player", selectedPlayer?.id === v.id && "selected")} style={{lineHeight: "30px"}}
                        onClick={() => setSelectedPlayer(v)}>
                        <div className="content"> 
                          <span>{v.value}</span>
                        </div>
                      </div>
                      )}
                    </div>
                    <div className="tta-button-container-add-player">
                      <button className="ui button mini tta-button-add-player" onClick={() => toggle(true)}>
                        Add a new player
                      </button>
                    </div>
                  </>
                }
              </div>
              <div className="tta-tools">    
                Calculations        
              </div>            
            </div>            
          </div>
        }
      </div>

      <NewPlayerModal teams={team0 && team1 ? [team0, team1] : []} isShowing={isShowing} addNewPlayer={v => setPlayers([...players, v])}/>
    </>
  );
};

export default TTA;