import React from "react";
import bgImage from "../img/soccer.png";
import "../styles/App.scss";
import "../styles/Home.scss";
import BestPlayersWidget from "./BestPlayersWidget";
import Navigation from "./Navigation";

const Home = () => {
  return (
    <>
      <div className="sv-page">
        <div className="home-image">
          <img className="ui centered large image" src={bgImage}></img>
        </div>
        <Navigation />      
      </div>
      <BestPlayersWidget />
    </>
  );
};

export default Home;
