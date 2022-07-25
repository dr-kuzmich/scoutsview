import classnames from "classnames";
import { flow } from "lodash";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { VictoryChart, VictoryLine, VictoryPolarAxis, VictoryTheme } from "victory";
import { SettingsContext } from "../../App";
import { useAppDispatch, useAppSelector } from "../../hooks";
import allActions from "../../redux/actions/allActions";
import "../../styles/tta/Dashboard.scss";
import { ChartData, Player } from "../../types";
import Stepper from "../primitives/Stepper";

interface Props {
  selectedPlayer: Player | undefined;
  setSelectedPlayer: (v: Player) => void;
}

const Dashboard = ({ selectedPlayer, setSelectedPlayer }: Props) => {
  const { dashboardMode } = useContext(SettingsContext);
  const { players } = useAppSelector(state => state.tta);  
  const [ttaResult, setTTAResult] = useState(0);

  const dispatch = useAppDispatch();

  const chartData: ChartData | undefined = useMemo(() => !selectedPlayer || selectedPlayer.status === "new" ? undefined : 
    flow(
      () => [
        { x: "shots", y: selectedPlayer.shotsSuccessful - selectedPlayer.shotsMistaken },
        { x: "passes", y: selectedPlayer.passesSuccessful - selectedPlayer.passesMistaken },
        { x: "air duels", y: selectedPlayer.airDuelsSuccessful - selectedPlayer.airDuelsMistaken },
        { x: "dribblings", y: selectedPlayer.dribblingsSuccessful - selectedPlayer.dribblingsMistaken },
        { x: "tackles", y: selectedPlayer.tacklesSuccessful - selectedPlayer.tacklesMistaken },
      ],
      coords => ({ coords, minMax: coords.reduce((acc, cur) => {
        if (acc.min > cur.y && cur.y < 0) 
          acc.min = cur.y;
        if (acc.max < cur.y) 
          acc.max = cur.y;  
        return acc;  
      }, { min: 0, max: 0 }) })
    )(), [selectedPlayer]);
  
  useEffect(() => {
    if(selectedPlayer?.status === "new") {
      setTTAResult(0);
    } else if (selectedPlayer?.status === "process") {
      const {
        shotsSuccessful, shotsMistaken, passesSuccessful, passesMistaken, airDuelsSuccessful, airDuelsMistaken, 
        dribblingsSuccessful, dribblingsMistaken, tacklesSuccessful, tacklesMistaken, 
      } = selectedPlayer;
    
      const successfulActions = shotsSuccessful + passesSuccessful + airDuelsSuccessful + dribblingsSuccessful + tacklesSuccessful;
      const mistakenActions = shotsMistaken + passesMistaken + airDuelsMistaken + dribblingsMistaken + tacklesMistaken;      
      setTTAResult(Math.round(successfulActions / (successfulActions + mistakenActions) * 100 || 0));
    } 
  }, [selectedPlayer]);

  const updatePlayer = (player: Player) => {
    setSelectedPlayer(player);
    dispatch(allActions.ttaActions.updatePlayer(player));
  };

  return (
    <div className="dashboard-contaiter">
      {!players.length ? <></> : 
        !selectedPlayer ? <div>Select a player</div> : 
          dashboardMode === "full" ? <div>Under construction</div> :
            <div>
              <div className={classnames("dashboard-lines-cont", selectedPlayer.status === "finished" && "disabled")}>
                <div className="dashboard-line">
                  <div className="dashboard-line-text">Shots</div>
                  <div className="dashboard-line-steppers">
                    <Stepper color="#247719" value={selectedPlayer.shotsSuccessful ?? 0}
                      setValue={v => updatePlayer({ ...selectedPlayer, status: "process", shotsSuccessful: v })} />
                    <Stepper color="#b81d06" value={selectedPlayer.shotsMistaken ?? 0}
                      setValue={v => updatePlayer({ ...selectedPlayer, status: "process", shotsMistaken: v })} />
                  </div>              
                </div>
                <div className="dashboard-line">
                  <div className="dashboard-line-text">Passes</div>
                  <div className="dashboard-line-steppers">
                    <Stepper color="#247719" value={selectedPlayer.passesSuccessful ?? 0}
                      setValue={v => updatePlayer({ ...selectedPlayer, status: "process", passesSuccessful: v })} />
                    <Stepper color="#b81d06" value={selectedPlayer.passesMistaken ?? 0}
                      setValue={v => updatePlayer({ ...selectedPlayer, status: "process", passesMistaken: v })} />
                  </div>              
                </div>
                <div className="dashboard-line">
                  <div className="dashboard-line-text">Air duels</div>
                  <div className="dashboard-line-steppers">
                    <Stepper color="#247719" value={selectedPlayer.airDuelsSuccessful ?? 0}
                      setValue={v => updatePlayer({ ...selectedPlayer, status: "process", airDuelsSuccessful: v })} />
                    <Stepper color="#b81d06" value={selectedPlayer.airDuelsMistaken ?? 0}
                      setValue={v => updatePlayer({ ...selectedPlayer, status: "process", airDuelsMistaken: v })} />
                  </div>              
                </div>
                <div className="dashboard-line">
                  <div className="dashboard-line-text">Dribblings</div>
                  <div className="dashboard-line-steppers">
                    <Stepper color="#247719" value={selectedPlayer.dribblingsSuccessful ?? 0}
                      setValue={v => updatePlayer({ ...selectedPlayer, status: "process", dribblingsSuccessful: v })} />
                    <Stepper color="#b81d06" value={selectedPlayer.dribblingsMistaken ?? 0}
                      setValue={v => updatePlayer({ ...selectedPlayer, status: "process", dribblingsMistaken: v })} />
                  </div>              
                </div>
                <div className="dashboard-line">
                  <div className="dashboard-line-text">Tackles</div>
                  <div className="dashboard-line-steppers">
                    <Stepper color="#247719" value={selectedPlayer.tacklesSuccessful ?? 0}
                      setValue={v => updatePlayer({ ...selectedPlayer, status: "process", tacklesSuccessful: v })} />
                    <Stepper color="#b81d06" value={selectedPlayer.tacklesMistaken ?? 0}
                      setValue={v => updatePlayer({ ...selectedPlayer, status: "process", tacklesMistaken: v })} />
                  </div>              
                </div>
              </div>

              {!chartData ? null :
                <div>
                  <VictoryChart polar
                    domain={{ y: [chartData.minMax.min, chartData.minMax.max]}}
                    theme={VictoryTheme.material}
                  >                    
                    {
                      chartData.coords.map((d, i) => (
                        <VictoryPolarAxis dependentAxis
                          key={i}
                          label={d.x}
                          labelPlacement="perpendicular"
                          style={{ tickLabels: { fill: "none" }, axis: { stroke: "none" } }}
                          axisValue={d.x}
                          standalone={false}
                          theme={VictoryTheme.material}
                        />
                      ))
                    } 

                    <VictoryPolarAxis 
                      theme={VictoryTheme.material}
                      tickFormat={[]}
                    />
                  
                    <VictoryLine
                      data={chartData.coords}
                      style={{
                        data: { stroke: "#c43a31" },
                      }}
                    />
                  </VictoryChart>

                </div>  
              }

              {selectedPlayer.status === "new" ? null :
                <div className="dashboard-result">
                  <span className="dashboard-result-text">{`TTA successful actions: ${ttaResult}%`}</span>
                  <button 
                    className="ui button mini dashboard-result-button-finish-edit" 
                    onClick={() => updatePlayer({ ...selectedPlayer, status: selectedPlayer.status === "process" ? "finished" : "process" })}>
                    {selectedPlayer.status === "process" ? "Finish" : "Edit"}
                  </button>
                </div>
              }
            </div>
      }
    </div>
  );
};

export default Dashboard;
