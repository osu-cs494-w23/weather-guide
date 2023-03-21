import React, { useState, useEffect } from 'react';
import classes from "./SelectMode.module.scss";
import { Link } from "react-router-dom";

const SelectMode = () =>{

    return(
        <>
            <div className={classes.selectModeWrapper}>
                <div className={classes.cardLeft}>
                    <div className={classes.title + " " + classes.carTitle}>
                        Travel on Land
                    </div>
                </div>
                <div className={classes.cardCenter}>
                    <div className={classes.title + " "+ classes.boatTitle}>
                        Sail The Seas
                    </div>
                </div>
                <div className={classes.cardRight}>
                    <div className={classes.title + " " + classes.planeTitle}>
                        Fly in The Sky
                    </div>
                </div>
            </div>
            <div className={classes.buttonsWrapper}>
                <Link to="/car" className={classes.button + " " + classes.carButton}>
                    Drive
                </Link>
                <Link to="/boat" className={classes.button + " " + classes.sailButton}>
                    Sail
                </Link>
                <Link to="/plane" className={classes.button + " " + classes.planeButton}>
                    Fly
                </Link>
            </div>
        </>
    )
}

export default  SelectMode
