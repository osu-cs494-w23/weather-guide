import { faRepeat, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import Map from './Map/Map';
import classes from './Plane.module.scss';

const hoursToHoursMinutes = (hours) => {
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60).toString().padStart(2, '0');
    return `${h}h${m}m`;
}

const Plane = () => {
    const [departureAirport, setDepartureAirport] = useState('')
    const [arrivalAirport, setArrivalAirport] = useState('')
    const [route, setRoute] = useState({});

    const [showAdvanced, setShowAdvanced] = useState(false)

    const [airspeed, setAirspeed] = useState(110)
    const [altitude, setAltitude] = useState(6000)

    const groundSpeed = useMemo(() => Number(airspeed) + (route?.tailwindComponent ?? 0), [airspeed, route]);
    const wind = useMemo(() => ({
        speed: Math.abs(route?.tailwindComponent ?? 0),
        component: route?.tailwindComponent > 0 ? 'tail' : 'head'
    }), [route]);
    const duration = useMemo(() => (route?.length ?? 0) / groundSpeed, [route, groundSpeed]);

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
                        {route?.departure && route?.arrival && (
                            <div className={classes.planeRouteTitle}>
                                {route.departureName}
                                <FontAwesomeIcon className={classes.planeRouteArrowIcon} icon={faArrowRight} />
                                {route.arrivalName}
                            </div>
                        )}
                        <div className={classes.planeRouteLength}>{(route?.length ?? 0).toFixed(1)} nm</div>
                        <div className={classes.planeRouteDuration}>{duration > 0 ? hoursToHoursMinutes(duration) : '∞'} @ {(Number(airspeed) ?? 0).toFixed(0)} kt ({wind.speed.toFixed(0)} kt {wind.component})</div>
                    </div>

                    <div className={classes.planeRouteAdvancedToggle} onClick={() => setShowAdvanced(!showAdvanced)}>
                        {showAdvanced ? 'Hide' : 'Show'} advanced options
                    </div>

                    {showAdvanced && (
                        <div className={classes.planeRouteAdvanced}>
                            <div className={classes.planeRouteAdvancedInput}>
                                <label>Airspeed</label>
                                <input type="number" value={airspeed} onChange={e => setAirspeed(e.target.value)} />
                            </div>

                            <div className={classes.planeRouteAdvancedInput}>
                                <label>Altitude</label>
                                <input type="number" value={altitude} onChange={e => setAltitude(e.target.value)} />
                            </div>
                        </div>
                    )}
                </div>

                <Map departureAirport={departureAirport} arrivalAirport={arrivalAirport} onRouteUpdate={setRoute} />
            </div>
        </>
    )
}

export default Plane
