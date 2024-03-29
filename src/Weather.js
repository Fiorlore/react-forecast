import { useState } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";
import "./Weather.css";

export default function Weather(props){
    const [weatherData, setWeatherData] = useState({ ready: false });
    const [city, setCity] = useState(props.defaultCity);

    function changeCity(event) {
        event.preventDefault();
        setCity(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        searchCity();
    }

    function searchCity() {
        const apiKey = "889ddb82ac517574ec1ec04289422270";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(handleResponse);
    }

    function handleResponse(response) {
        setWeatherData({
            ready: true,
            coordinates: response.data.coord,
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            date: new Date(response.data.dt * 1000),
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            wind: response.data.wind.speed,
            city: response.data.name,
        });
    }

    if (weatherData.ready) {
        return (
        <div className="Weather">
            <div className="FormAndCurrentWeather">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-9">
                        <input
                        type="search"
                        placeholder="Type a city..."
                        className="form-control"
                        autoFocus="on"
                        onChange={changeCity} 
                        />
                    </div>
                    <div className="col-3">
                        <input
                        type="submit"
                        value="Search"
                        className="btn btn-primary w-100"
                        />
                    </div>    
                </div>
            </form>
            <WeatherInfo data={weatherData} />
            </div>
            <WeatherForecast coordinates={weatherData.coordinates} />
        </div>
        );
    } else {
        searchCity();
        return "Loading...";
    }
}
