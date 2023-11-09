import React, { useState } from "react";
import search_icon from '../Assets/search.png';
import drizzle_icon from '../Assets/drizzle.png';
import snow_icon from '../Assets/snow.png';
import rain_icon from '../Assets/rain.png';
import wind_icon from '../Assets/wind.png';
import cloud_icon from '../Assets/cloud.png';
import clear_icon from '../Assets/clear.png'
import humidity_icon from '../Assets/humidity.png';
import './weatherApp.css';

const WeatherApp = ()=>{

    let API_KEY = "*******************************************";

    const [Wicon,setWicon] = useState(cloud_icon)

    const search = async ()=>{
        const element = document.getElementsByClassName("cityInput");

        if(element[0].value === "")
        {
            return 0;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${API_KEY}&units=metric`

        let response = await fetch(url);
        let data = await response.json();

        const humdity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");
        element[0].value = ""
        humdity[0].innerHTML = data.main.humidity + "%";
        wind[0].innerHTML = Math.floor(data.wind.speed) + "km/h";
        temperature[0].innerHTML = Math.floor(data.main.temp) + "°C";
        location[0].innerHTML = data.name;

        if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
            setWicon(clear_icon)
        }

        else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
            setWicon(cloud_icon)
        }
        else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
            setWicon(drizzle_icon)
        }
        else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
            setWicon(drizzle_icon)
        }
        else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
            setWicon(rain_icon)
        }
        else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
            setWicon(rain_icon)
        }
        else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
            setWicon(snow_icon)
        }
        else{
            setWicon(clear_icon)
        }
    }
    return(
        <div className="container">
            <div className="top-bar">
                <input placeholder="Search city..." type="text" className="cityInput"/>
                <div className="search-icon">
                    <img src={search_icon} onClick={()=>search()} alt="search icon" />
                </div>
            </div>
                <div className="weather-image">
                    <img src={Wicon}  alt=""/>
                </div>
                <div className="weather-temp">------</div>
                <div className="weather-location">------</div>
                <div className="data-container">
                <div className="element">
                        <img src={humidity_icon} alt=""/>
                    <div className="data">
                        <div className="humidity-percent">----%</div>
                        <div className="text">humidity</div>

                    </div>
                </div>
                <div className="element">
                        <img src={wind_icon} alt=""/>
                    <div className="data">
                        <div className="wind-rate">--- km/h</div>
                        <div className="text">Wind Speed</div>

                    </div>
                </div>
                </div>

        </div>
    )
}

export default WeatherApp