import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

import Graph from "./Graph";

const API_KEY = process.env.REACT_APP_API_KEY;

export default function ResultPage(props) {
  const [res, setRes] = useState(0);
  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          props.cityName +
          "&appid=" +
          API_KEY
      )
      .then((response) => {
        setRes(response.status);
      })
      .catch((err) => {
        setRes(err.response.status);
      });
  }, [props.cityName, res]);

  if (res === 200) {
    return (
      <div>
        <a href="/">Go back</a>
        <Graph cityName={props.cityName}/>
      </div>
    );
  } else if (res === 404) {
    return (
      <div>
        <a href="/">Go back</a>
        <h1 className="city">City not found</h1>
      </div>
    );
  } else {
    return <div>
        <a href="/">Go back</a>
    </div>
  }
}
