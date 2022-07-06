import classnames from "classnames";
import { sortBy } from "lodash";
import React from "react";
import "../../styles/tta/PlayerList.css";
import { Player } from "../../types";

interface Props {
  players: Player[];
  selectedPlayer: Player | undefined;
  setSelectedPlayer: (v: Player) => void;
  toggle: (v: boolean) => void;
}

const PlayerList = ({ players, selectedPlayer, setSelectedPlayer, toggle }: Props) => {  
  // const dispatch = useAppDispatch();
  // const updatePlayer = () => selectedPlayer && (dispatch(allActions.ttaActions.updatePlayer(selectedPlayer)));

  return (
    <div className="playerlist-container">
      {!players.length ? null :
        <>
          <div className="ui middle aligned divided list playerlist-players">
            {sortBy(players, p => p.id).map(player =>
              <div key={player.id}
                className="item" style={{ display: "flex", alignItems: "baseline" }}
                onClick={() => player.id !== selectedPlayer?.id && (/*updatePlayer(), */setSelectedPlayer(player))}
              >
                <div className={classnames("content playerlist-player", selectedPlayer?.id === player.id && "selected")}>
                  <span>{player.value}</span>
                </div>
                {player.status === "finished" ? <i className="check icon playerlist-icon finished" title="Finished" /> : 
                  player.status === "new" ? <i className="meh outline icon playerlist-icon new" title="New" /> : 
                    <i className="pencil alternate icon playerlist-icon process" title="In process" />}
              </div>
            )}
          </div>
          <div className="playerlist-button-container-add-player">
            <button className="ui button mini playerlist-button-add-player" onClick={() => (/*updatePlayer(), */toggle(true))}>
              Add a new player
            </button>
          </div>
        </>
      }
    </div>
  );
};

export default PlayerList;
