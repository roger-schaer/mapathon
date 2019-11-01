import React from "react";
import loading from "../assets/loading.svg";

//Returns a spinning wheel
const Loading = () => (
  <div className="spinner">
    <img src={loading} alt="Loading" />
  </div>
);

export default Loading;
