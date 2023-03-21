import React, {useEffect, useState} from 'react';
import { Helmet } from 'react-helmet';
import classes from './Boat.module.scss'

import useScript from "./useScript";

const apiKey = 'LmS4TRIa5dPD2GXE67nA5RfRo4ci7ltA'

const Boat = () => {

    useScript("https://unpkg.com/leaflet@1.4.0/dist/leaflet.js", "https://api.windy.com/assets/map-forecast/libBoot.js", "LmS4TRIa5dPD2GXE67nA5RfRo4ci7ltA")

    return (
        <>
            <Helmet>
                <title>Boat | Weather Guide</title>
                <meta name="description" content="Prepare for your next sailing adventure with Weather Guide!"/>
            </Helmet>

            <div className={classes.boatWrapper}>
                <div  id="windy" className={classes.windyWrapper}></div>
            </div>
        </>
    )
}


export default Boat
