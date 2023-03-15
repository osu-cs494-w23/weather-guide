import React, { useState, useEffect } from 'react';
import classes from "./SelectMode.module.scss"


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
                <div className={classes.button + " " + classes.carButton}>
                    Research
                </div>
                <div className={classes.button + " " + classes.sailButton}>
                    Research
                </div>
                <div className={classes.button + " " + classes.planeButton}>
                    Research
                </div>
            </div>
        </>
    )
}

export default  SelectMode

