import React, { useContext, useEffect, useState } from "react";
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
  const [ttaResult, setTtaResult] = useState(0);
  
  useEffect(() => {
    if(selectedPlayer?.status === "new") {
      setTtaResult(0);
    } else if (selectedPlayer?.status === "process") {
      const {
        shotsSuccessful, shotsMistaken, passesSuccessful, passesMistaken, airDuelsSuccessful, airDuelsMistaken, 
        dribblingsSuccessful, dribblingsMistaken, tacklesSuccessful, tacklesMistaken, 
      } = selectedPlayer;
    
      const successfulActions = shotsSuccessful + passesSuccessful + airDuelsSuccessful + dribblingsSuccessful + tacklesSuccessful;
      const mistakenActions = shotsMistaken + passesMistaken + airDuelsMistaken + dribblingsMistaken + tacklesMistaken;      
      setTtaResult(Math.round(successfulActions / (successfulActions + mistakenActions) * 100));
    } 
  }, [selectedPlayer]);

  return (
    <div className="dashboard-contaiter">
      {!players.length ? <></> : 
        !selectedPlayer ? <div>Select a player</div> : 
          dashboardMode === "full" ? <div>Under construction</div> :
            <div className="dashboard-lines-cont">
              <div className="dashboard-line">
                <div className="dashboard-line-text">Shots</div>
                <div className="dashboard-line-steppers">
                  <Stepper color="#247719" value={selectedPlayer.shotsSuccessful ?? 0}
                    setValue={v => setSelectedPlayer({ ...selectedPlayer, status: "process", shotsSuccessful: v })} />
                  <Stepper color="#b81d06" value={selectedPlayer.shotsMistaken ?? 0}
                    setValue={v => setSelectedPlayer({ ...selectedPlayer, status: "process", shotsMistaken: v })} />
                </div>              
              </div>
              <div className="dashboard-line">
                <div className="dashboard-line-text">Passes</div>
                <div className="dashboard-line-steppers">
                  <Stepper color="#247719" value={selectedPlayer.passesSuccessful ?? 0}
                    setValue={v => setSelectedPlayer({ ...selectedPlayer, status: "process", passesSuccessful: v })} />
                  <Stepper color="#b81d06" value={selectedPlayer.passesMistaken ?? 0}
                    setValue={v => setSelectedPlayer({ ...selectedPlayer, status: "process", passesMistaken: v })} />
                </div>              
              </div>
              <div className="dashboard-line">
                <div className="dashboard-line-text">Air duels</div>
                <div className="dashboard-line-steppers">
                  <Stepper color="#247719" value={selectedPlayer.airDuelsSuccessful ?? 0}
                    setValue={v => setSelectedPlayer({ ...selectedPlayer, status: "process", airDuelsSuccessful: v })} />
                  <Stepper color="#b81d06" value={selectedPlayer.airDuelsMistaken ?? 0}
                    setValue={v => setSelectedPlayer({ ...selectedPlayer, status: "process", airDuelsMistaken: v })} />
                </div>              
              </div>
              <div className="dashboard-line">
                <div className="dashboard-line-text">Dribblings</div>
                <div className="dashboard-line-steppers">
                  <Stepper color="#247719" value={selectedPlayer.dribblingsSuccessful ?? 0}
                    setValue={v => setSelectedPlayer({ ...selectedPlayer, status: "process", dribblingsSuccessful: v })} />
                  <Stepper color="#b81d06" value={selectedPlayer.dribblingsMistaken ?? 0}
                    setValue={v => setSelectedPlayer({ ...selectedPlayer, status: "process", dribblingsMistaken: v })} />
                </div>              
              </div>
              <div className="dashboard-line">
                <div className="dashboard-line-text">Tackles</div>
                <div className="dashboard-line-steppers">
                  <Stepper color="#247719" value={selectedPlayer.tacklesSuccessful ?? 0}
                    setValue={v => setSelectedPlayer({ ...selectedPlayer, status: "process", tacklesSuccessful: v })} />
                  <Stepper color="#b81d06" value={selectedPlayer.tacklesMistaken ?? 0}
                    setValue={v => setSelectedPlayer({ ...selectedPlayer, status: "process", tacklesMistaken: v })} />
                </div>              
              </div>
              {selectedPlayer.status === "new" ? null :
                <div className="dashboard-result">
                  <h3 className="ui header">{`TTA successful actions: ${ttaResult}%`}</h3>
                </div>
              }
            </div>
      }
    </div>
  );
};

export default Dashboard;
