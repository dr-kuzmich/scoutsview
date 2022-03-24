import React from "react";
import "../styles/App.css";
import Navigation from "./Navigation";



const About = () => {  
  
  return (
    <div className="sv-page">
      <Navigation />
      <h2 className="ui header sv-icon-header" style={{margin: 0}}>
        <i className="circular question icon"></i>
        <div className="content">
          About
        </div>
      </h2>
      <p className="sv-text">This application is about football analytics</p>
    </div>
  );
};

export default About;