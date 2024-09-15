import React, { useEffect, useState } from "react";
import "./Homepage.css";

const api = {
  key: "d44ce99514e15c8b1ed0ef115fbf1b4a",
  base: "https://api.openweathermap.org/data/2.5/",
};

function Homepage() {
  const [query, setQuery] = useState("Delhi");
  const [weather, setWeather] = useState({});
  const [ico, setIco] = useState("");

  const search = async () => {
    if (query !== "") {
      await fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
        .then((response) => response.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    } else return 0;
  };

  useEffect(() => {
    search();
  }, []);

   useEffect(() => {
    if (weather.weather && weather.weather[0]) {
      let iconCode = weather.weather[0].icon[0]+weather.weather[0].icon[1]+'d';
      console.log(iconCode);
      setIco(`http://openweathermap.org/img/wn/${iconCode}@2x.png`);
    }
  }, [weather]);

  return (
    <>
      <div className="container">
        <div className="wrap">
          <div className="search">
            <input
              type="text"
              placeholder="Location"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn" onClick={search}>
              <i className="fa fa-search"></i>
            </button>
          </div>
          
          <div className="wea-img">
            <img id="wimg" alt="" src={ico} />
            <p id="wimgtxt">{weather.name || "India"}</p>
          </div>
 
          {weather.main && (
            <div className="temp">
              <h2>
                <span id="tem">{weather.main.temp} °C</span>
              </h2>
              <h4>
                <span id="desc">{weather.weather[0].description}</span>
              </h4>
            </div>
          )}

          {weather.main && (
            <div className="wea-etc">
              <div className="wea-etc-align">
                <i className="fa-solid fa-water"></i>
                <div className="humidity">
                  <h5>
                    <span id="hum">{weather.main.humidity} %</span>
                  </h5>
                  <p>Humidity</p>
                </div>
              </div>

              <div className="wea-etc-align">
                <i className="fa-solid fa-wind"></i>
                <div className="windspeed">
                  <h5>
                    <span id="wind">{weather.wind.speed} KPH</span>
                  </h5>
                  <p>Windspeed</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Homepage;
