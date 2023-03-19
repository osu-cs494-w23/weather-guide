import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import Map from './Map/Map';
import classes from './Plane.module.scss';

const AIRSPEED_KT = 105;

const Plane = () => {
    const [departureAirport, setDepartureAirport] = useState('')
    const [arrivalAirport, setArrivalAirport] = useState('')

    const [airspeed, setAirspeed] = useState(AIRSPEED_KT)

    const [route, setRoute] = useState({});

    const groundSpeed = useMemo(() => airspeed + (route?.tailwindComponent ?? 0), [airspeed, route]);
    const wind = useMemo(() => ({
        speed: Math.abs(route?.tailwindComponent ?? 0),
        component: route?.tailwindComponent > 0 ? 'tail' : 'head'
    }), [route]);

    const flipAirports = () => {
        setDepartureAirport(arrivalAirport);
        setArrivalAirport(departureAirport);
    }

    return (
        <>
            <Helmet>
                <title>Plane | Weather Guide</title>
                <meta name="description" content="Prepare for your next flight with Weather Guide!" />
            </Helmet>

            <div className={classes.planeContainer}>
                <div className={classes.planeRouteForm}>
                    <div className={classes.planeRouteFormInputs}>
                        <div>
                            <input className={classes.planeAirportInput} placeholder="Departure airport (e.g. KCVO)" value={departureAirport} onChange={e => setDepartureAirport(e.target.value?.toUpperCase())} />
                            <input className={classes.planeAirportInput} placeholder="Arrival airport (e.g. KPAO)" value={arrivalAirport} onChange={e => setArrivalAirport(e.target.value?.toUpperCase())} />
                        </div>

                        <FontAwesomeIcon className={classes.planeRouteFlipIcon} icon={faRepeat} onClick={flipAirports} />
                    </div>

                    <div className={classes.planeRouteInfo}>
                        <div>{(route?.length ?? 0).toFixed(2)} nm</div>
                        <div>{((route?.length ?? 0) / groundSpeed).toFixed(1)} hours @ {airspeed.toFixed(0)} kt ({wind.speed.toFixed(0)} kt {wind.component})</div>
                    </div>
                </div>

                <Map departureAirport={departureAirport} arrivalAirport={arrivalAirport} onRouteUpdate={i => setRoute(i)} />
            </div>
        </>
    )
}

export default Plane
