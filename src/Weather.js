import React, { useState } from "react";
import axios from "axios";
import './Weather.css';

export default function Weather() {
  let [city, setCity] = useState("");
  let [display, setDisplay] = useState("");
  let [temperature, setTemperature] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [wind, setWind] = useState(null);
  let [description, setDescription] = useState(null);
  let [iconUrl, setIconUrl] = useState(null)

  function showTemp(response) {
    console.log(response.data);
    setTemperature(Math.round(response.data.main.temp));
    setDescription(response.data.weather[0].main);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setIconUrl(`https://openweathermap.org/img/w/${response.data.weather[0].icon}.png`);
  }

  function displayCity(event) {
    event.preventDefault();
    if (city.length > 0 && temperature !== null) {
      setDisplay(
        <div>
          {city} <br />
          Temperature: {temperature}°C <br />
          Description: {description} <br />
          Humidity: {humidity}% <br />
          Wind: {wind} km/h <br />
         <img src={iconUrl} alt="Weather Icon" />
        </div>
      );
    } else {
      let apiKey = "b1ed0f9458087615e9f308eff77952e5";
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      axios.get(url).then(showTemp);
      return "Please enter a city name";
    }
  }

  function changeCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  return (
    <div className="container"> 

      <form onSubmit={displayCity}>
        <input type="text" placeholder="Enter city..." onChange={changeCity} />
        <input type="submit" value="search" />
      </form>
      <div>{display}
       </div>
    </div>
  );
}
