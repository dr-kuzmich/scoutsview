import React, { useContext } from "react";
import { SettingsContext } from "../../App";
import { useAppSelector } from "../../hooks";
import "../../styles/tta/Dashboard.css";
import { Player } from "../../types";
import Stepper from "../simple/Stepper";

interface Props {
  selectedPlayer: Player | undefined;
  setSelectedPlayer: (v: Player) => void;
}

const Dashboard = ({ selectedPlayer, setSelectedPlayer }: Props) => {
  const { dashboardMode } = useContext(SettingsContext);
  const { players } = useAppSelector(state => state.tta);

  return (
    <div className="dashboard-contaiter">
      {!players.length ? <></> : 
        !selectedPlayer ? <div>Select a player</div> : 
          dashboardMode === "full" ? <div>Under construction</div> :
            <div className="dashboard-shots">
              <div className="dashboard-shots-text">Shots</div>
              <div className="dashboard-shots-steppers">
                <Stepper color="#247719" value={selectedPlayer?.shotsSuccessful ?? 0}
                  setValue={v => selectedPlayer && setSelectedPlayer({ ...selectedPlayer, shotsSuccessful: v })} />
                <Stepper color="#b81d06" value={selectedPlayer?.shotsMistaken ?? 0}
                  setValue={v => selectedPlayer && setSelectedPlayer({ ...selectedPlayer, shotsMistaken: v })} />
              </div>
            </div>
      }
    </div>
  );
};

export default Dashboard;
