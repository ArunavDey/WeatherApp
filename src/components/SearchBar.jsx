import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function SearchBar(props) {
  const [inputData, setInputData] = useState("");
  const [city, setCity] = useState(getLocalItems);
  const navigate = useNavigate();

  // retrieves the search history from localStorage
  function getLocalItems() {
    let list = localStorage.getItem("lists");
    // console.log(list);

    if (list) {
      return JSON.parse(localStorage.getItem("lists"));
    } else {
      return [];
    }
  }
  // adds the searched city to the localStorage
  function handleSearch() {
    if (inputData) {
      let idx = city.indexOf(inputData);
      if (idx === -1) {
        localStorage.setItem(
          "lists",
          JSON.stringify([...city, inputData.toLowerCase()])
        );
        setCity([...city, inputData.toLowerCase()]);
      } else {
        city.splice(idx, 1);
        localStorage.setItem(
          "lists",
          JSON.stringify([...city, inputData.toLowerCase()])
        );
        setCity([...city, inputData.toLowerCase()]);
      }
      setInputData("");
      navigate("/results");
    }
  }

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(city));
    // console.log(localStorage.getItem("lists"))
  }, [city]);

  return (
    <div className="search-container">
      <h1 className="search-heading">
        WeatherMan
      </h1>
      <div className="search-input">
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          value = {inputData}
          style={{ width: "80%", borderColor: "white" }}
          disableClearable
          options={city.reverse()}
          renderInput={(params) => (
            <TextField
              {...params}
              value={inputData}
              onChange={(e) => {
                // console.log("Called by textfield" + e.target.value)
                setInputData(e.target.value);
                props.setCityName(e.target.value);
              }}
              label="Enter city name"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
          onChange = {(e) => {
            // console.log("Called by Autocomplete" + e.target.innerText)
            setInputData(e.target.innerText);
            props.setCityName(e.target.innerText);
          }}
        />

        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}
