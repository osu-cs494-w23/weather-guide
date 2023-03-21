import React, {useEffect, useState} from 'react';
import { Helmet } from 'react-helmet';
import classes from './Boat.module.scss'
import scale from "./scale";
import useScript from "./useScript";
import axios from "axios";

const k = 1.94384

const apiKey = 'LmS4TRIa5dPD2GXE67nA5RfRo4ci7ltA'
const pointKey = 'q7G2gXTe8SaOhZ7bBLVGfWm4RPTCM8wQ'
const APIKEY = '0efd39a5159ec4ff5bd0154841da469a'

const Boat = () => {


    const [lat, setLat] = useState('')
    const [long, setLong] = useState('')
    const [result, setResult] = useState(null)

    useScript("https://unpkg.com/leaflet@1.4.0/dist/leaflet.js", "https://api.windy.com/assets/map-forecast/libBoot.js", "LmS4TRIa5dPD2GXE67nA5RfRo4ci7ltA")

    console.log(result)
    const getWind = (e) =>{
        e.preventDefault()
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${APIKEY}`,{}
        )
            .then(function (response) {
                for (let i in scale){
                    if (scale[i].speed >= response.data.current.wind_speed){
                        scale[i].icon = response.data.current.weather[0].icon
                        setResult(scale[i])
                        return
                    }
                }
                setResult(scale[scale.length-1])
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    let fillerStyles = [classes.filler]

    if (result != null){
        fillerStyles.push(classes.fillerClosed)
    }else{
        fillerStyles.push(classes.fillderOpenned)
    }

    return (
        <>
            <Helmet>
                <title>Boat | Weather Guide</title>
                <meta name="description" content="Prepare for your next sailing adventure with Weather Guide!"/>
            </Helmet>

            <div className={classes.boatWrapper}>
                <div  id="windy" className={classes.windyWrapper}></div>
                <div className={classes.searchLocation}>
                    <div className={fillerStyles.join(" ")}></div>
                    {result == null?
                    <h1 className={classes.title}>Enter Your Location</h1>
                        :
                        <></>
                    }
                    <form onSubmit={getWind}>
                        <input value={long} onChange={(e)=>{setLong(e.target.value)}} placeholder={'Longitude'} className={classes.long}></input>
                        <input value={lat} onChange={(e)=>{setLat(e.target.value)}} placeholder={'Latitude'} className={classes.lat}></input>

                        <input className={classes.submitButton} type={"submit"} value={"Search"} />

                    </form>
                    {result == null?
                        <></>
                        :
                        <div className={classes.resultWrapper}>
                            <p className={classes.cardTitle}>{result.wind}</p>
                            <div className={classes.contentWrapper} style={{display: 'flex'}}>
                                <div className={classes.iconWrapper}>
                                    <img className={classes.icon}  src={`http://openweathermap.org/img/wn/${result.icon}@4x.png`}/>
                                </div>
                                <div className={classes.cardData}>
                                    <p>Beaufort Number: <span className={classes.value}>{result.n}</span></p>
                                    <div className={classes.line}></div>
                                    <p>Wind Speed: <span className={classes.value}>{result.speed} knots</span></p>
                                    <div className={classes.line}></div>
                                    <p>Wave Height: <span className={classes.value}>{result.wave}</span></p>
                                    <div className={classes.line}></div>
                                </div>
                            </div>
                            <div className={classes.desc}>
                                <p>{result.desc}</p>
                            </div>
                        </div>
                    }
                    <div></div>
                </div>
            </div>


        </>
    )
}


export default Boat
