import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import classes from './Car.module.scss';
import CarResult from './CarResult';

const Car = () => {

    const [departingCity, setDepartingCity] = useState('')
    const [arrivingCity, setarrivingCity] = useState('')
    const [result, setResult] = useState('')

    useEffect(() => {
        if (departingCity && arrivingCity) {
            console.log("data read")
            setResult(<CarResult departingCity={departingCity} arrivingCity={arrivingCity} ev={true}></CarResult>)
        }
    })

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
                <p>I want to drive from:</p>
                <input className={classes.cityInput} placeholder="Departing City" value={departingCity} onChange={e => setDepartingCity(e.target.value)}/>
                <p>To:</p>
                <input className={classes.cityInput} placeholder="Arriving City" value={arrivingCity} onChange={e => setarrivingCity(e.target.value)}/>
            </div>
            <div className={classes.resultContainer}>
                {result && <p>Here's your result: {result} </p>}
            </div>
        </>
    )
}

export default Car
