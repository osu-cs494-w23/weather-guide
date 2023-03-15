import React, { useState  } from 'react';
import classes from "./MainPage.module.scss"
import Banner from "./Banner/Banner";
import SelectMode from "./SelectMode/SelectMode";
import Weather  from "./WeatherBroadCast/Weather"
const MainPage = () =>{

    return(
        <>

            <Banner></Banner>
            <SelectMode></SelectMode>
            <Weather></Weather>

        </>
    )

}

export default MainPage