import React, { useState, useEffect } from 'react';
import classes from "./Weather.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useWeather from "./useWeather"
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {faSun} from "@fortawesome/free-solid-svg-icons";
import {faMoon} from "@fortawesome/free-solid-svg-icons";

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

    const getHours = (arg) =>{
        let res = new Date(arg * 1000).getHours()
        if (res < 10){
            res = '0' + res
        }
        return res
    }

    const getMinutes = (arg) =>{
        let res = new Date(arg * 1000).getMinutes()
        if (res < 10){
            res = '0' + res
        }
        return res
    }

    console.log(response.current)


    return(
        <div className={classes.WeatherWrapper}>
            <div className={classes.WeatherTitle}> Need a quick Weather Broadcast?</div>
            <form onSubmit={submitForm} className={classes.formClasses}>
                <FontAwesomeIcon onClick={submitForm} className={classes.searchIcon}  icon={faMagnifyingGlass} />
                <input value={city} onChange={(e)=>{setCity(e.target.value)}} placeholder={"Location"} className={classes.cityInput}/>

                {response.length !== 0 ?

                    <div  className={classes.weatherCardWrapper}>
                        <div className={classes.weatherCard}>
                            <div style={{width:'300px'}} className={classes.cardColumn}>
                                <div className={classes.currentWeather}>
                                    Current Weather
                                </div>
                                <div className={classes.date}>
                                    {new Date(response.current.dt * 1000).getDate()} {months[new Date(response.current.dt  * 1000).getMonth()-1]} {new Date(response.current.dt  * 1000).getFullYear()}
                                </div>
                                <div className={classes.iconWrapper}>
                                    <div className={classes.temp}>
                                        {Math.round(response.current.temp - 273.15)}
                                        <span className={classes.degree}>&#176;</span>
                                    </div>
                                    <img className={classes.icon}  src={`http://openweathermap.org/img/wn/${response.current.weather[0].icon}@4x.png`}/>
                                </div>
                                <div className={classes.weatherType}>
                                    {response.current.weather[0].main}
                                </div>
                            </div>
                            <div style={{width:'350px'}} className={classes.cardColumn}>
                                <div className={classes.topRow + " " + classes.weatherInfoRow}>
                                    <div className={classes.cardRowTitle}>Wind Speed</div>
                                    <div className={classes.rowInfo}> {response.current.wind_speed}  meter/s</div>
                                    <div className={classes.cardLine}></div>
                                </div>
                                <div className={classes.topRow + " " + classes.weatherInfoRow}>
                                    <div className={classes.cardRowTitle}>Wind Direction</div>
                                    <div className={classes.rowInfo}> {response.current.wind_deg}  deg</div>
                                    <div className={classes.cardLine}></div>
                                </div>
                                <div className={classes.topRow + " " + classes.weatherInfoRow}>
                                    <div className={classes.cardRowTitle}>Visibility </div>
                                    <div className={classes.rowInfo}> {response.current.visibility} m</div>
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
                                        <span className={classes.fullDay}>{ Math.floor((response.current.sunset- response.current.sunrise)/3600)  } hours </span>
                                        <span className={classes.fullDay}>{ Math.floor((response.current.sunset - response.current.sunrise-Math.floor((response.current.sunset- response.current.sunrise)/3600)*3600)/60)+1} minutes </span>
                                    </div>
                                    <FontAwesomeIcon className={classes.sunRiseIcon} size={"3x"}  icon={faSun} />
                                </div>

                                <div className={classes.sunriseWrapper}>
                                    <div className={classes.sunriseLine}></div>
                                    <div className={classes.time}>
                                        {getHours(response.current.sunrise)}:{getMinutes(response.current.sunrise)}

                                    </div>
                                    <div className={classes.timeText}>
                                        Rise
                                    </div>
                                    <div className={classes.sunriseLine}></div>
                                    <div className={classes.time}>
                                        {getHours(response.current.sunset)}:{getMinutes(response.current.sunset)}
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
                                <div className={classes.lengthWrapper}>
                                    <div className={classes.dayLength}>
                                        <span className={classes.fullDay}>{24- Math.ceil((response.current.moonrise- response.current.moonset)/3600)  } hours </span>
                                        <span className={classes.fullDay}>{ 60 - Math.ceil((response.current.moonrise - response.current.moonset-Math.floor((response.current.moonrise- response.current.moonset)/3600)*3600)/60)} minutes </span>
                                    </div>
                                    <FontAwesomeIcon className={classes.sunRiseIcon} size={"3x"}  icon={faMoon} />
                                </div>

                                <div className={classes.sunriseWrapper}>
                                    <div className={classes.sunriseLine}></div>
                                    <div className={classes.time}>
                                        {getHours(response.current.moonrise)}:{getMinutes(response.current.moonrise)}
                                    </div>
                                    <div className={classes.timeText}>
                                        Rise
                                    </div>
                                    <div className={classes.sunriseLine}></div>
                                    <div className={classes.time}>
                                        {getHours(response.current.moonset)}:{getMinutes(response.current.moonset)}
                                    </div>
                                    <div className={classes.timeText}>
                                        Set
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <input className={classes.submitButton} value={"Search"} type={"submit"}/>
                }

            </form>
        </div>
    )

}

export default Weather