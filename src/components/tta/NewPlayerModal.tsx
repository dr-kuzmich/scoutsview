import classnames from "classnames";
import { uniqueId } from "lodash";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "../../styles/App.css";
import "../../styles/tta/NewPlayerModal.css";
import { Player, Team } from "../../types";
import { positions } from "../../utils";
import DropdownWithText from "../simple/DropdownWithText";
import InputWithText from "../simple/InputWithText";

const NewPlayerModal = ({ teams, isShowing, addNewPlayer }: {teams: Team[], isShowing: boolean, addNewPlayer: (v: Player) => void}) => {
  const [name, setName] = useState("");
  const [teamId, setTeamId] = useState("");
  const [positionId, setPositionId] = useState("");

  useEffect(() => {
    isShowing && (setName(""), setTeamId(""), setPositionId(""));
  }, [isShowing])

  console.log("name", name);
  console.log("teamId", teamId);
  
  return !isShowing ? null : 
    ReactDOM.createPortal(
      <>
        <div className="sv-modal-overlay"/>
        <div className="sv-modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
          <div className="npm-modal">
            <div className="sv-modal-header">
              <h3 className="ui header">Add a new player</h3>
            </div>
            <InputWithText text="Name" placeholder="Cristiano Ronaldo" onChange={v => setName(v.target.value)}/>
            <DropdownWithText text="Team" values={teams} placeholder="Manchester United" selectedId={teamId} setSelectedId={setTeamId}/>          
            <DropdownWithText text="Position" values={positions} placeholder="CF" selectedId={positionId} setSelectedId={setPositionId}/>   
            <div className="npm-modal-button-container">
              <button className={classnames("ui button npm-modal-button", !(name.length && teamId && positionId) && "disabled")} 
                onClick={() => {
                  if (name.length && teamId.length && positionId.length) {
                    const team = teams.find(t => t.id === teamId) || teams[0];
                    const player = {
                      id: uniqueId("player_"),
                      value: name,
                      team,
                      position: positions.find(p => p.id === positionId) || positions[0]
                    };                    
                    team.players = [...team.players, player];
                    addNewPlayer(player);
                  }
                }}>
                Finish
              </button>
            </div>       
          </div>
        </div>
      </>, document.body
    )
};

export default NewPlayerModal;