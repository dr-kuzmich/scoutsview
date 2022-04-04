import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import Report from "./Report";
import TTA from "./tta/TTA";

const Main = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tta' element={<TTA />} />
        <Route path='/report' element={<Report />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </>
  );
};

export default Main;
