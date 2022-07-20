import React, { useState, useEffect } from "react";

const api = {
  key: "5548dc3776887cd60acb44353f9daf3a",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [time, setTime] = useState("");

  const days = [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
  ];

  function getTime() {
    const date = new Date();
    const hour = date.toLocaleTimeString();
    const day = days[date.getDay()];
    return `${day}, ${hour}`;
  }

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

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      className={
        typeof weather.main != "undefined"
          ? weather.weather[0].main === "Clouds"
            ? "app clouds"
            : weather.weather[0].main === "Clear"
            ? "app clear"
            : weather.weather[0].main === "Thunderstorm"
            ? "app thunderstorm"
            : weather.weather[0].main === "Snow"
            ? "app snow"
            : weather.weather[0].main === "Rain"
            ? "app rain"
            : "app"
          : "app"
      }
    >
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
          <p className="main_daytime">{time}</p>
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
