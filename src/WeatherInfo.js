import FormattedDate from "./FormattedDate";
import WeatherIcon from "./WeatherIcon";
import WeatherTemperature from "./WeatherTemperature";
import "./Weather.css";

export default function WeatherInfo(props) {
    return(
        <div className="WeatherInfo">
            <h1>{props.data.city}</h1>
            <ul>
                <li>
                    <FormattedDate date={props.data.date} />
                </li>
                <li>{props.data.description}</li>
            </ul>
            
                <div className="col-2"></div>
                <div>
                    <WeatherTemperature celsius={props.data.temperature} />
                </div>
                <div className="displayedTemperature">
                    <WeatherIcon code={props.data.icon} size={120} color={"white"} />
                </div>
                <div>
                    <ul>
                        <li>humidity: {props.data.humidity}%</li>
                        <li>wind: {Math.round(props.data.wind)} km/h</li>
                    </ul>
                </div>
            
        </div>
    );
}