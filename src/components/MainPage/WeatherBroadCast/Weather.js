import React, { useState, useEffect } from 'react';
import classes from "./Weather.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useWeather from "./useWeather"
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {faSun} from "@fortawesome/free-solid-svg-icons";

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]
const Weather = () =>{

    const [city, setCity] = useState("")
    const [search, setSearch] = useState("")
    const [response, loading, error] = useWeather(search)

    console.log(response)

    const submitForm = (e) =>{
        e.preventDefault()
        setSearch(city)
        setCity('')
    }


    return(
        <div className={classes.WeatherWrapper}>
            <div className={classes.WeatherTitle}> Need a quick Weather Broadcast?</div>
            <form onSubmit={submitForm} className={classes.formClasses}>
                <FontAwesomeIcon onClick={submitForm} className={classes.searchIcon}  icon={faMagnifyingGlass} />
                <input value={city} onChange={(e)=>{setCity(e.target.value)}} placeholder={"Location"} className={classes.cityInput}/>
                <input className={classes.submitButton} value={"Search"}  type={"submit"}/>
                {response.length !== 0 ?

                    <div  className={classes.weatherCardWrapper}>
                        <div className={classes.weatherCard}>
                            <div style={{width:'300px'}} className={classes.cardColumn}>
                                <div className={classes.currentWeather}>
                                    Current Weather
                                </div>
                                <div className={classes.date}>
                                    {new Date(response.dt * 1000).getDate()} {months[new Date(response.dt * 1000).getMonth()-1]} {new Date(response.dt * 1000).getFullYear()}
                                </div>
                                <div className={classes.iconWrapper}>
                                    <div className={classes.temp}>
                                        {Math.round(response.main.temp - 273.15)}
                                        <span className={classes.degree}>&#176;</span>
                                    </div>
                                    <img className={classes.icon}  src={`http://openweathermap.org/img/wn/${response.weather[0].icon}@4x.png`}/>
                                </div>
                                <div className={classes.weatherType}>
                                    {response.weather[0].main}
                                </div>
                            </div>
                            <div style={{width:'350px'}} className={classes.cardColumn}>
                                <div className={classes.topRow + " " + classes.weatherInfoRow}>
                                    <div className={classes.cardRowTitle}>Wind Speed</div>
                                    <div className={classes.rowInfo}> {response.wind.speed}  meter/s</div>
                                    <div className={classes.cardLine}></div>
                                </div>
                                <div className={classes.topRow + " " + classes.weatherInfoRow}>
                                    <div className={classes.cardRowTitle}>Wind Direction</div>
                                    <div className={classes.rowInfo}> {response.wind.deg}  deg</div>
                                    <div className={classes.cardLine}></div>
                                </div>
                                <div className={classes.topRow + " " + classes.weatherInfoRow}>
                                    <div className={classes.cardRowTitle}>Visibility </div>
                                    <div className={classes.rowInfo}> {response.visibility}  meters</div>
                                    <div className={classes.cardLine}></div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.weatherCard}>
                            <div className={classes.sunriseColumn}>
                                <div className={classes.subtitle}>
                                    Daytime
                                </div>
                                <div className={classes.lengthWrapper}>
                                    <div className={classes.dayLength}>
                                        { Math.floor((response.sys.sunset- response.sys.sunrise)/3600)}
                                        { Math.floor((response.sys.sunset - response.sys.sunrise-Math.floor((response.sys.sunset- response.sys.sunrise)))/60)}
                                    </div>
                                    <FontAwesomeIcon className={classes.sunRiseIcon} size={"3x"}  icon={faSun} />
                                </div>

                                <div className={classes.sunriseWrapper}>
                                    <div className={classes.sunriseLine}></div>
                                    <div className={classes.time}>
                                        {new Date(response.sys.sunrise * 1000).getHours()}:
                                        {new Date(response.sys.sunrise * 1000).getMinutes()} AM
                                    </div>
                                    <div className={classes.timeText}>
                                        Rise
                                    </div>
                                    <div className={classes.sunriseLine}></div>
                                    <div className={classes.time}>
                                        {new Date(response.sys.sunset * 1000).getHours()}:
                                        {new Date(response.sys.sunset * 1000).getMinutes()} PM
                                    </div>
                                    <div className={classes.timeText}>
                                        Set
                                    </div>
                                </div>
                            </div>
                            <div className={classes.sunriseColumn}>
                                <div className={classes.subtitle}>
                                    Nighttime
                                </div>
                                <FontAwesomeIcon className={classes.sunRiseIcon} size={"4x"}  icon={faSun} />

                                <div className={classes.time}>
                                    {new Date(response.sys.sunrise * 1000).getHours()}
                                    {new Date(response.sys.sunrise * 1000).getMinutes()}
                                    {new Date(response.sys.sunrise * 1000).getSeconds()}
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <></>
                }

            </form>
        </div>
    )

}

export default Weather