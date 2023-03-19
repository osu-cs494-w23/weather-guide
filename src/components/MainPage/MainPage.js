import React from 'react';
import { Helmet } from 'react-helmet';
import Banner from './Banner/Banner';
import SelectMode from './SelectMode/SelectMode';
import Weather from "./WeatherBroadCast/Weather";

const MainPage = () => {
    return (
        <>
            <Helmet>
                <title>Weather Guide</title>
                <meta name="description" content="Land, sea or air, we'll help you get there!" />
            </Helmet>

            <Banner></Banner>
            <SelectMode></SelectMode>
            <Weather></Weather>

        </>
    )

}

export default MainPage
