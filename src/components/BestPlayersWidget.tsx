import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMovable } from "../hooks";
import "../styles/BestPlayersWidget.css";

// https://www.api-football.com/ & https://dashboard.api-football.com/
const API_KEY = "92a8954a5629cc302e02cbb2074324da";
interface TopScorer {
  photo: string;
  name: string;
  club: string;
  goals: number;
  league: string;
  logo: string;
}

interface Tournament {
  id: number,
  flag: string
}

const leagues: Tournament[] = [
  {id: 39, flag: "england"}, 
  {id: 140, flag: "spain"}, 
  {id: 135, flag: "italy"}, 
  {id: 78, flag: "germany"}, 
  {id: 61, flag: "france"},
];

const BestPlayersWidget = () => {
  const [topScorer, setTopScorer] = useState<TopScorer>();
  const [leagueId, setLeagueId] = useState(leagues[0].id);

  useEffect(() => {
    console.log("leagueIndex", leagueId);
    axios.get("https://v3.football.api-sports.io/players/topscorers?season=2021&league=" + leagueId,
      {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": API_KEY,
        },
      })
      .then(response => {
        console.log(response);
        console.log(response.data.response[0]);
        setTopScorer({ 
          photo: response.data.response[0].player.photo, 
          name: `${response.data.response[0].player.firstname} ${response.data.response[0].player.lastname}`, 
          club: response.data.response[0].statistics[0].team.name,
          goals: response.data.response[0].statistics[0].goals.total, 
          league: response.data.response[0].statistics[0].league.name, 
          logo: response.data.response[0].statistics[0].league.logo, 
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, [leagueId]);

  const { divRef, newCoord, enableDragMode, disableDragMode } = useMovable(90, 20);

  return (
    <div ref={divRef} className="bpw-top-scorers" style={{left: newCoord.x + "px", top: newCoord.y + "px"}}
      onMouseDown={enableDragMode} onMouseUp={disableDragMode}>
      {!topScorer ? <div>No data from API</div> :
        <div className="bpw-container">
          <div className="bpw-photo-and-data">
            <img className="bpw-photo" src={topScorer.photo} />
            <div className="bpw-data">              
              <div className="bpw-name">{topScorer.name}</div>
              <div className="bpw-club">{topScorer.club}</div>
              <div className="bpw-goals">{`${topScorer.goals} goals`}</div>
            </div>
          </div>
          <div className="bpw-league">
            <div className="bpw-logo-and-name">
              <img className="bpw-logo" src={topScorer.logo} />
              <div className="bpw-league-name">{topScorer.league}</div>
            </div>
            <div className="bpw-flags">
              {leagues.map((v, i, a) => 
                <i key={v.id} className={`${v.flag} flag`} 
                  style={ { ...{marginBottom: 0}, ...(i === a.length - 1 ? {marginRight: 0} : undefined) }}
                  onClick={() => setLeagueId(v.id)}>                  
                </i>)}
            </div>
          </div>          
        </div>
      }
    </div>
  );
};

export default BestPlayersWidget;
