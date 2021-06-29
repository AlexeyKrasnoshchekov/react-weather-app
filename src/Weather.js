import React from "react";
import WeatherIcons from "./WeatherIcons.js";

const Weather = ({ date, weatherTime, weatherDegree, weatherFeels, weatherCode, weatherDescription, iconTimes, setIconTimes }) => {   

    if (!(weatherCode > 699 && weatherCode < 800) && !(weatherCode > 899 && weatherCode < 1000)) {
        setIconTimes('day-' + WeatherIcons[weatherCode].icon);
    }

    let weatherTimeSub = weatherTime.substring(weatherTime.length - 8, weatherTime.length - 3);
    let dateFormat = (new Date(date*1000)).getDate();

    

    return(

        <div className="temperature_container">
            <p className="temperature-day">{ dateFormat }</p>
            <p className="temperature-time">{ weatherTimeSub }</p>
            <p className="temperature-degree">{ weatherDegree }</p>
            <p className="temperature-feels">{ weatherFeels }</p>
            <p className={`wi wi-icon wi-${iconTimes}`}></p>
            <p className="temperature-description">{ weatherDescription }</p>
        </div>
    )
}


export default Weather;