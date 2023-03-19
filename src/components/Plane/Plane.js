import React, {useState} from 'react';
import Map from './Map/Map';
import classes from './Plane.module.scss';
import { Helmet } from 'react-helmet';

const AIRSPEED_KT = 105;

const Plane = () => {
    const [departureAirport, setDepartureAirport] = useState('')
    const [arrivalAirport, setArrivalAirport] = useState('')

    const [route, setRoute] = useState({});

    return (
        <>
            <Helmet>
                <title>Plane | Weather Guide</title>
                <meta name="description" content="Prepare for your next flight with Weather Guide!" />
            </Helmet>

            <div className={classes.planeContainer}>
                <div className={classes.planeRouteForm}>
                    <input className={classes.planeAirportInput} placeholder="Departure airport (e.g. KCVO)" value={departureAirport} onChange={e => setDepartureAirport(e.target.value?.toUpperCase())} />
                    <input className={classes.planeAirportInput} placeholder="Arrival airport (e.g. KPAO)" value={arrivalAirport} onChange={e => setArrivalAirport(e.target.value?.toUpperCase())} />

                    <div className={classes.planeRouteInfo}>
                        <div>{(route?.length ?? 0).toFixed(2)} nm</div>
                        <div>{((route?.length ?? 0) / AIRSPEED_KT).toFixed(1)} hours @ {AIRSPEED_KT} kt</div>
                    </div>
                </div>

                <Map departureAirport={departureAirport} arrivalAirport={arrivalAirport} onRouteUpdate={i => setRoute(i)} />
            </div>
        </>
    )
}

export default Plane
