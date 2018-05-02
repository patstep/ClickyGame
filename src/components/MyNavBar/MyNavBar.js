import React from "react";
import "./MyNavBar.css";

const MyNavBar = props => (

<div className="nav nav-bar sticky-top bg-dark row navy">
  <div className="col-sm brand">The Clicky Game</div>
  <div className="col-sm" onClick={() => props.resetGame()}> {props.gameMessage} </div>
  <div className="col-sm"> Score: {props.currentScore} | Top Score: {props.highScore}</div>
</div>
);

export default MyNavBar;
