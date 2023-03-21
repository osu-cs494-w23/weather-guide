import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import classes from './Car.module.scss';
import Geocode from "react-geocode";
import Map from './Map';
import withScriptjs from 'react-google-maps/lib/withScriptjs';

Geocode.setApiKey("AIzaSyCn83Izszh5s1DBeiFCmaVQZM7jAXMwMdU");
const MapLoader = withScriptjs(Map)

const Car = () => {

    const [departingCity, setDepartingCity] = useState('')
    const [arrivingCity, setarrivingCity] = useState('')
    const [result, setResult] = useState('')

    const origin = {}
    const destination = {}

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(departingCity, arrivingCity)
        Geocode.fromAddress(departingCity).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                origin.lat = lat
                origin.lng = lng
            }
        )
        Geocode.fromAddress(arrivingCity).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                destination.lat = lat
                destination.lng = lng
            }
        )

        console.log(origin, destination, typeof(origin.lat))


        setResult(<MapLoader googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCn83Izszh5s1DBeiFCmaVQZM7jAXMwMdU"
        loadingElement={<div style={{ height: `100%` }} />} origin={origin} destination={destination} />)

    }

    return (
        <>
            <Helmet>
                <title>Car | Weather Guide</title>
                <meta name="description" content="Prepare for your next road trip with Weather Guide!" />
            </Helmet>

            <div className={classes.titleContainer}>
                <h1 className={classes.title}>Planning a long road trip?</h1>
            </div>

            <div className={classes.inputContainer}>
                <form onSubmit = {handleSubmit}>
                    <p>I want to drive from:</p>
                    <input className={classes.cityInput} placeholder="Departing City" value={departingCity} onChange={e => setDepartingCity(e.target.value)}/>
                    <p>To:</p>
                    <input className={classes.cityInput} placeholder="Arriving City" value={arrivingCity} onChange={e => setarrivingCity(e.target.value)}/>
                    <button type = 'submit' className={classes.submitButton}>Submit</button>
                </form>
            </div>
            <div className={classes.resContainer}>
                {result && <p>Here's your result: {result} </p>}
            </div>
        </>
    )
}

export default Car
