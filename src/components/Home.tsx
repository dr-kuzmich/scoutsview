import React from "react";
import bgImage from "../img/soccer.png";
import "../styles/App.css";
import "../styles/Home.css";
import Navigation from "./Navigation";

const Home = () => {
  return (
    <div className="sv-page">
      <div className="home-image">
        <img className="ui centered large image" src={bgImage}></img>
      </div>
      <Navigation />
    </div>
  );
};

export default Home;
