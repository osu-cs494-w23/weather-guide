import React from 'react';
import Map from './Map/Map';
import classes from './Plane.module.scss';
import { Helmet } from 'react-helmet';

const Plane = () => {
    return (
        <>
            <Helmet>
                <title>Plane | Weather Guide</title>
                <meta name="description" content="Prepare for your next flight with Weather Guide!" />
            </Helmet>

            <div className={classes.planeContainer}>
                <div className={classes.planeRouteForm}>

                </div>
                <Map />
            </div>
        </>
    )
}

export default Plane
