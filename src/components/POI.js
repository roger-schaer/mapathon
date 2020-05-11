import React from "react";
import "./POI.css";

export default function POI(props) {
  const { name, description, lat, lng, image, url } = props;
  const { Categories, Creator, Status } = props;

  return (
    <div className="poi">
      {Status && (
        <span className="status">
          <small>{Status.name}</small>
        </span>
      )}
      {Categories && Categories.length > 0 && (
        <div className="categories">
          {Categories.map((category) => (
            <span className="category" key={category.id}>
              {category.image && (
                <img className="category-image" src={category.image} />
              )}
              <small> {category.name}</small>
            </span>
          ))}
        </div>
      )}
      <h2>
        {url ? (
          <a href={url} target="_blank" className="App-link">
            {name}
          </a>
        ) : (
          <span>{name}</span>
        )}
      </h2>
      {image && <img className="poi-image" alt={name} src={image} />}
      <section>{description}</section>
      <hr />
      <section>Created by {Creator.name}</section>
    </div>
  );
}
