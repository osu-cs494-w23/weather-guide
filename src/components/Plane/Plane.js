import React, {useState} from 'react';
import Map from './Map/Map';
import classes from './Plane.module.scss';
import { Helmet } from 'react-helmet';

const Plane = () => {
    const [departureAirport, setDepartureAirport] = useState('')
    const [arrivalAirport, setArrivalAirport] = useState('')

    return (
        <>
            <Helmet>
                <title>Plane | Weather Guide</title>
                <meta name="description" content="Prepare for your next flight with Weather Guide!" />
            </Helmet>

            <div className={classes.planeContainer}>
                <div className={classes.planeRouteForm}>
                    <input className={classes.planeAirportInput} placeholder="Departure airport" value={departureAirport} onChange={e => setDepartureAirport(e.target.value?.toUpperCase())} />
                    <input className={classes.planeAirportInput} placeholder="Arrival airport" value={arrivalAirport} onChange={e => setArrivalAirport(e.target.value?.toUpperCase())} />
                </div>

                <Map departureAirport={departureAirport} arrivalAirport={arrivalAirport} />
            </div>
        </>
    )
}

export default Plane
