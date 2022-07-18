import React, { useState } from "react";

const api = {
  key: "5548dc3776887cd60acb44353f9daf3a",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  const days = [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
  ];

  const date = new Date();
  const day = days[date.getDay()];
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);

  const search = (event) => {
    if (event.key === "Enter") {
      fetch(
        `${api.base}weather?q=${city}&units=metric&APPID=${api.key}&lang=pl`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setCity("");
          console.log(result);
        });
    }
  };

  return (
    <main>
      <section className="search_box">
        <input
          type="text"
          className="search_bar"
          placeholder="Szukaj..."
          onChange={(e) => setCity(e.target.value)}
          value={city}
          onKeyPress={search}
        />
      </section>

      {typeof weather.main != "undefined" ? (
        <section className="main_box">
          <p className="main_daytime">
            {day}, {hours}:{minutes}
          </p>
          <p className="main_city">
            {weather.name}, {weather.sys.country}
          </p>
          <p className="main_temperature">{Math.round(weather.main.temp)}°C</p>
          <p className="main_state">{weather.weather[0].description}</p>
        </section>
      ) : (
        ""
      )}
    </main>
  );
}

export default App;
