import React from "react";
import "../styles/App.scss";
import Navigation from "./Navigation";

const Report = () => {
  return (
    <div className="sv-page">
      <Navigation />
      <h2 className="ui header sv-icon-header" style={{ margin: 0 }}>
        <i className="circular address card outline icon"></i>
        <div className="content">
          Analytical report
        </div>
      </h2>
      <p className="sv-text">Under construction</p>
    </div>
  );
};

export default Report;
