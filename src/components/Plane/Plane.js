import React from 'react';
import Map from './Map/Map';
import classes from './Plane.module.scss';

const Plane = () => {
    return (
        <>
            <div className={classes.planeContainer}>
                <div className={classes.planeRouteForm}>

                </div>
                <Map />
            </div>
        </>
    )
}

export default Plane
