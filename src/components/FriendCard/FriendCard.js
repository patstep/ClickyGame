import React from "react";
import "./FriendCard.css";



const FriendCard = props => (
  <div className={`card ${props.goodBad}`}>
    <div className="card-img">
      <img alt={props.name} src={props.image} />
    </div>
    <div className="card-img-overlay" onClick={() => props.handleTouchFriend(props.id)}>
      
    </div>
  </div>
);

export default FriendCard;
