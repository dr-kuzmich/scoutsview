import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMovable } from "../hooks";
import "../styles/BestPlayersWidget.css";

// https://www.api-football.com/ & https://dashboard.api-football.com/
const API_KEY = "92a8954a5629cc302e02cbb2074324da";
interface TopScorer {
  name: string;
  goals: number;
}

const BestPlayersWidget = () => {
  const [topScorer, setTopScorer] = useState<TopScorer>();

  useEffect(() => {
    axios.get("https://v3.football.api-sports.io/players/topscorers?season=2021&league=39",
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
        setTopScorer({ name: response.data.response[0].player.name, goals: response.data.response[0].statistics[0].goals.total });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const { divRef, newCoord, enableDragMode, disableDragMode } = useMovable(90, 20);

  return (
    <div ref={divRef} className="bpw-top-scorers" style={{left: newCoord.x + "px", top: newCoord.y + "px"}}
      onMouseDown={enableDragMode} onMouseUp={disableDragMode}>
      {!topScorer ? <div>No data from API</div> :
        <div className="bpw-top-scorers-names">
          {`EPL: ${topScorer.name} - ${topScorer.goals} goals`}
        </div>
      }
    </div>
  );
};

export default BestPlayersWidget;
