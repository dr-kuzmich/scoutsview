import React from "react";
import "../styles/App.css";
import Navigation from "./Navigation";
import bgImage from '../img/soccer.png';
import "../styles/Home.css";

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