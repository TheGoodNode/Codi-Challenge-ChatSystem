import React from "react";
import "./MessageCard.css";
export default function MessageCard({ id, name, text, date }) {
  return (
    <div className="MessageCard">
      <div className="peepsInfo">
        <p className="peepsname">{name}</p>
        <p className="peepsId">{id}</p>
      </div>
      <div className="MessageBox">
        <p className="textArea">{text}</p>
      </div>
      <time className="date">{date}</time>
    </div>
  );
}
