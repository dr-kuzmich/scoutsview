import classnames from "classnames";
import { uniqueId } from "lodash";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import allActions from "../../actions/allActions";
import { useAppDispatch } from "../../hooks";
import "../../styles/App.css";
import "../../styles/tta/NewPlayerModal.css";
import { Player, Position, Team } from "../../types";
import DropdownWithText from "../simple/DropdownWithText";
import InputWithText from "../simple/InputWithText";

interface Props {
  teams: Team[],
  positions: Position[],
  isShowing: boolean,
  setSelectedPlayer: (v: Player) => void
}

const NewPlayerModal = ({ teams, positions, isShowing, setSelectedPlayer }: Props) => {
  const [name, setName] = useState("");
  const [teamId, setTeamId] = useState("");
  const [positionId, setPositionId] = useState("");

  useEffect(() => {
    isShowing && (setName(""), setTeamId(""), setPositionId(""));
  }, [isShowing]);

  const dispatch = useAppDispatch();

  return !isShowing ? null :
    ReactDOM.createPortal(
      <>
        <div className="sv-modal-overlay"/>
        <div className="sv-modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
          <div className="npm-modal">
            <div className="sv-modal-header">
              <h3 className="ui header">Add a new player</h3>
            </div>
            <InputWithText text="Name" placeholder="Enter a name" onChange={v => setName(v.target.value)}/>
            <DropdownWithText text="Team" values={teams} placeholder="Select a team" selectedId={teamId} setSelectedId={setTeamId}/>
            <DropdownWithText text="Position" values={positions} placeholder="Select a position"
              selectedId={positionId} setSelectedId={setPositionId}/>
            <div className="npm-modal-button-container">
              <button className={classnames("ui button npm-modal-button", !(name.length && teamId && positionId) && "disabled")}
                onClick={() => {
                  if (name.length && teamId.length && positionId.length) {
                    const team = teams.find(t => t.id === teamId) ?? teams[0];
                    const player: Player = {
                      id: uniqueId("player_"),
                      value: name,
                      teamId: team.id,
                      position: positions.find(p => p.id === positionId) || positions[0],
                      shotsSuccessful: 0,
                      shotsMistaken: 0,
                    };
                    dispatch(allActions.matchActions.addPlayer(player));
                    setSelectedPlayer(player);
                  }
                }}>
                Finish
              </button>
            </div>
          </div>
        </div>
      </>, document.body
    );
};

export default NewPlayerModal;
