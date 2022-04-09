import axios from "axios";
import React, { useEffect, useState } from "react";
import bgImage from "../img/soccer.png";
import "../styles/App.css";
import "../styles/Home.css";
import Navigation from "./Navigation";

const API_KEY = "92a8954a5629cc302e02cbb2074324da";
interface TopScorer {
  name: string;
  goals: number;
}

const Home = () => {
  const [topScorer, setTopScorer] = useState<TopScorer>();

  useEffect(() => {
    axios.get("https://v3.football.api-sports.io/players/topscorers?season=2021&league=39",
      {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": API_KEY,
        },
      })
      .then(response => {
        console.log(response);
        console.log(response.data.response[0]);
        setTopScorer({ name: response.data.response[0].player.name, goals: response.data.response[0].statistics[0].goals.total });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="sv-page">
      <div className="home-image">
        <img className="ui centered large image" src={bgImage}></img>
      </div>
      <Navigation />
      {!topScorer ? null :
        <div className="home-top-scorers">
          {`Top EPL Scorer: ${topScorer.name} - ${topScorer.goals} goals`}
        </div>
      }
    </div>
  );
};

export default Home;
