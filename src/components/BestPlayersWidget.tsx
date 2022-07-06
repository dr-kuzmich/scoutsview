import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { leagues } from "../consts";
import { useAppDispatch, useAppSelector, useMovable } from "../hooks";
import allActions from "../redux/actions/allActions";
import "../styles/BestPlayersWidget.css";
import { SeasonDoesntStart, Topscorer } from "../types";
import { getCountryByLeagueId, getCurrentSeason } from "../utils";

interface LoadingStatus {
  error: string,
  loading: boolean,
}

const message = (text: string) => <div className="bpw-message">{text}</div>;

const BestPlayersWidget = () => {
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>({error: "", loading: false});
  const [topscorer, setTopscorer] = useState<Topscorer | SeasonDoesntStart>();
  const [leagueId, setLeagueId] = useState(leagues[0].id);

  const dispatch = useAppDispatch();

  const topscorersLoadingData = useAppSelector(state => state.api);

  useEffect(() => {
    isEmpty(topscorersLoadingData.topscorers) && dispatch(allActions.apiActions.addTopscorers(getCurrentSeason()));
  }, []);

  useEffect(() => {
    setLoadingStatus({error: topscorersLoadingData.error || "", loading: topscorersLoadingData.loading === "pending"});
  }, [topscorersLoadingData.error, topscorersLoadingData.loading]);

  useEffect(() => {
    if (!isEmpty(topscorersLoadingData.topscorers)) {
      setTopscorer(topscorersLoadingData.topscorers[leagueId]);
    } 
  }, [leagueId, topscorersLoadingData.topscorers]);

  const { divRef, newCoord, enableDragMode, disableDragMode } = useMovable(90, 20);

  return (
    <div ref={divRef} className="bpw-top-scorers" style={{left: newCoord.x + "px", top: newCoord.y + "px"}}
      onMouseDown={enableDragMode} onMouseUp={disableDragMode}
    >
      {loadingStatus.loading ? message("Data is loading. Please wait") : 
        loadingStatus.error.length ? message(loadingStatus.error) : 
          !topscorer ? message("No data from server") :
            <div className="bpw-container">
              { isEmpty(topscorer) ? message(`The season in ${getCountryByLeagueId(leagueId)} doesn't start yet`) :
                <div className="bpw-photo-and-data">
                  <img className="bpw-photo" src={topscorer.photo} />
                  <div className="bpw-data">              
                    <div className="bpw-name">{topscorer.name}</div>
                    <div className="bpw-club">{topscorer.club}</div>
                    <div className="bpw-goals">{`${topscorer.goals} goals`}</div>
                  </div>
                </div>
              }
              <div className="bpw-league">
                <div className="bpw-logo-and-name">
                  <img className="bpw-logo" src={topscorer.logo} />
                  <div className="bpw-league-name">{topscorer.league}</div>
                </div>
                <div className="bpw-flags">
                  {leagues.map((v, i, a) => 
                    <i key={v.id} className={`${v.country} flag`} 
                      style={ { ...{marginBottom: 0}, ...(i === a.length - 1 ? {marginRight: 0} : undefined) }}
                      onClick={() => setLeagueId(v.id)}>                  
                    </i>)
                  }
                </div>
              </div>          
            </div>
      }
    </div>
  );
};

export default BestPlayersWidget;
