import classnames from "classnames";
import { sortBy } from "lodash";
import React from "react";
import allActions from "../../actions/allActions";
import { useAppDispatch } from "../../hooks";
import "../../styles/tta/PlayerList.css";
import { Player } from "../../types";

interface Props {
  players: Player[];
  selectedPlayer: Player | undefined;
  setSelectedPlayer: (v: Player) => void;
  toggle: (v: boolean) => void;
}

const PlayerList = ({ players, selectedPlayer, setSelectedPlayer, toggle }: Props) => {  
  const dispatch = useAppDispatch();
  const updatePlayer = () => selectedPlayer && (dispatch(allActions.matchActions.updatePlayer(selectedPlayer)));

  return (
    <div className="playerlist-players">
      {!players.length ? null :
        <>
          <div className="ui middle aligned divided list">
            {sortBy(players, p => p.id).map(player =>
              <div key={player.id}
                className={classnames("item playerlist-player", selectedPlayer?.id === player.id && "selected")}
                style={{ lineHeight: "30px" }}
                onClick={() => player.id !== selectedPlayer?.id && (updatePlayer(), setSelectedPlayer(player))}
              >
                <div className="content">
                  <span>{player.value}</span>
                </div>
              </div>
            )}
          </div>
          <div className="playerlist-button-container-add-player">
            <button className="ui button mini playerlist-button-add-player" onClick={() => (updatePlayer(), toggle(true))}>
              Add a new player
            </button>
          </div>
        </>
      }
    </div>
  );
};

export default PlayerList;