import classnames from "classnames";
import React, { useState } from "react";
import allActions from "../../actions/allActions";
import { useAppDispatch } from "../../hooks";
import "../../styles/tta/MatchSettings.css";

const MatchSettings = () => {
  const [team0Name, setTeam0Name] = useState("");
  const [team1Name, setTeam1Name] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [weather, setWeather] = useState("");

  const dispatch = useAppDispatch();

  return (
    <div style={{ marginTop: "100px" }}>
      <h3 className="ui header tta-match-settings-header">Match data</h3>
      <div className="tta-match-settings-teams">
        <div className="ui large input tta-match-settings-team">
          <input type="text" placeholder="Team A" onChange={e => setTeam0Name(e.target.value)} />
        </div>
        <div className="ui large input tta-match-settings-team">
          <input type="text" placeholder="Team B" onChange={e => setTeam1Name(e.target.value)} />
        </div>
      </div>

      <div className="tta-match-settings-details">
        <div className="ui small input tta-match-settings-detail">
          <input type="text" placeholder="Date" onChange={e => setDate(e.target.value)}/>
        </div>
        <div className="ui small input tta-match-settings-detail">
          <input type="text" placeholder="Place" onChange={e => setPlace(e.target.value)}/>
        </div>
        <div className="ui small input tta-match-settings-detail">
          <input type="text" placeholder="Weather" onChange={e => setWeather(e.target.value)}/>
        </div>
      </div>

      <div className="tta-match-settings-button-container">
        <button className={classnames("ui button tta-match-settings-button", !(team0Name.length && team1Name.length) && "disabled")}
          onClick={() => {
            dispatch(allActions.matchActions.setMatch({ team0Id: "team_0", team1Id: "team_1", date, place, weather }));
            dispatch(allActions.matchActions.setTeams([{ id: "team_0", value: team0Name }, { id: "team_1", value: team1Name }]));
          }}>
          {"Let's go!"}
        </button>
      </div>
    </div>
  );
};

export default MatchSettings;
