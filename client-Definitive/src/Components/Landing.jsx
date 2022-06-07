import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getDogs, getTemperaments} from "../Actions/index";
import { NavLink } from "react-router-dom";
import "./Landing.css";

export const LandingPage = () => {

const dispatch = useDispatch();    
// useEffect(() => {
//     dispatch(getTemperaments());
//     dispatch(getDogs());
// }, []);    

  return (
    <div className="fondoLanding">
      <div className="title">
        <h1>HENRY DOGS</h1>
      </div>
      <div className="LandingBtn">
        <NavLink to="/Home">
          <button className="pushable">
            <span className="front">START</span>
          </button>
        </NavLink>
      </div>
    </div>
  );
};
export default LandingPage;