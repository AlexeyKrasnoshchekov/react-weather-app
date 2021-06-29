import React from "react";

const GeolocationWeather = ({ location, temperature, description, setTemperature, icon }) => {   

    const toFahrenheit = () => {
        let scaleName = document.querySelector('.scale-name');

        if (scaleName.textContent === 'C') {       
            scaleName.textContent = 'F';
            setTemperature( Math.floor(temperature / 5 * 9 + 32) );
            
        } else {
            scaleName.textContent = 'C';
            setTemperature( Math.floor( (temperature - 32)*(5/9) ) );
        }
        
    }  

  return (
    <div class="location">
      <h1 class="location-place">{location}</h1>
      <div class="temperature">
        <div class="degree-section">
          <h2 class="temperature-degree" onClick={toFahrenheit}>{temperature} <span className="scale-name">C</span></h2>
          <span></span>
        </div>
      </div>
      <div class="degree-container">
        <i class={`wi wi-icon wi-${icon}`}></i>
        <div class="temperature-description">{description}</div>
      </div>
    </div>
  );
};

export default GeolocationWeather;
