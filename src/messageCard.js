import React from "react";
import "./MessageCard.css";
export default function MessageCard({ id, name, text }) {
  return (
    <div className="MessageCard">
      <div className="peepsInfo">
        <p className="peepsname">{name}</p>
        <p className="peepsId">{id}</p>
      </div>

      <p className="textArea">{text}</p>
    </div>
  );
}
