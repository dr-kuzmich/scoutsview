import classnames from "classnames";
import React from "react";
import "../../styles/tta/Match.css";
import { Team } from "../../types";

interface Props {
  team0?: Team;
  team1?: Team;
  setTeam0: (value: Team) => void;
  setTeam1: (value: Team) => void;
  setReady: (value: boolean) => void;
}

const Match = ({team0, team1, setTeam0, setTeam1, setReady}: Props) => {  
  
  return (
    <div style={{marginTop: "100px"}}>
      <h3 className="ui header tta-match-header">Match data</h3>
      <div className="tta-match-teams">
        <div className="ui large input tta-match-team">
          <input type="text" placeholder="Team A" onChange={e => setTeam0({id: "0", value: e.target.value, players: []})} />
        </div>
        <div className="ui large input tta-match-team">
          <input type="text" placeholder="Team B" onChange={e => setTeam1({id: "1", value: e.target.value, players: []})} />
        </div>
      </div>

      <div className="tta-match-details">
        <div className="ui small input tta-match-detail">
          <input type="text" placeholder="Date" />
        </div>
        <div className="ui small input tta-match-detail">
          <input type="text" placeholder="Place" />
        </div>
        <div className="ui small input tta-match-detail">
          <input type="text" placeholder="Weather" />
        </div>
      </div>

      <div className="tta-match-button-container">
        <button className={classnames("ui button tta-match-button", (!team0 || !team1) && "disabled")} onClick={() => setReady(true)}>
          Let's go!
        </button>
      </div>
    </div>
  );
};

export default Match;