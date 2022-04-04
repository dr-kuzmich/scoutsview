import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navigation.css";

const Navigation = () => {
  const { pathname } = useLocation();

  const mainNavigation = () => {
    return (
      <>
        <div className="main-navigation">
          <div className="main-navigation-buttons">
            <div className="ui large buttons">
              <Link to='/tta'>
                <button className="ui button main-navigation-button">Technical and tactical actions</button>
              </Link>
              <div className="or"></div>
              <Link to='/report'>
                <button className="ui button main-navigation-button">Analytical report</button>
              </Link>
            </div>
          </div>
          <div className="main-navigation-about">
            <Link to='/about'>
              <button className="circular ui icon button">
                <i className="icon question circle"></i>
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  };

  const otherNavigation = () => {
    return (
      <div className="main-navigation">
        <div className="main-navigation-home">
          <Link to='/'>
            <button className="circular ui icon button">
              <i className="icon home circle"></i>
            </button>
          </Link>
        </div>
        {pathname === "/about" ? null :
          <div className="main-navigation-about">
            <Link to='/about'>
              <button className="circular ui icon button">
                <i className="icon question circle"></i>
              </button>
            </Link>
          </div>
        }
      </div>
    );
  };

  return (
    <div>
      {pathname === "/" ? mainNavigation() : otherNavigation()}
    </div>
  );
};

export default Navigation;
