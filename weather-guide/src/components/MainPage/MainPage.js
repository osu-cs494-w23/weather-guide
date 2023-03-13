import React, { useState  } from 'react';
import classes from "./MainPage.module.scss"
import Menu from "./Menu/Menu";
import Banner from "./Banner/Banner";
import SelectMode from "./SelectMode/SelectMode";
import Footer from "./Footer/Footer";
import Weather  from "./WeatherBroadCast/Weather"
const MainPage = () =>{

    return(
        <>
            <Menu></Menu>
            <Banner></Banner>
            <SelectMode></SelectMode>
            <Weather></Weather>
            <Footer></Footer>
        </>
    )

}

export default MainPage