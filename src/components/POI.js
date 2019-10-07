import React from "react";
import "./POI.css";

export default function POI(props) {
  const { name, description, lat, lng, image, url } = props;
  const { Categories, Tags, User, Status } = props;

  let statusColor;
  if (Status) {
    switch (Status.id) {
      case 1:
        statusColor = "red";
        break;
      case 2:
        statusColor = "orange";
        break;
      case 3:
        statusColor = "green";
        break;
    }
  }

  return (
    <div className="poi" style={{ borderColor: statusColor }}>
      {Status && (
        <span className="status" style={{ color: statusColor }}>
          <small>{Status.name}</small>
        </span>
      )}
      <h4>
        {url ? (
          <a href={url} target="_blank" className="App-link">
            {name}
          </a>
        ) : (
          <span>{name}</span>
        )}
      </h4>
    </div>
  );
}
