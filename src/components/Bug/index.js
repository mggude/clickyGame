import React from "react";
import "./style.css";

function Bug(props) {
  return (
    <div className="card" onClick={props.imageClick}>
      <div className="img-container">
        <img 
        alt={props.id} 
        src={require("../../images/" + props.image)}  
        />
      </div>
    </div>
  );
}

export default Bug;

