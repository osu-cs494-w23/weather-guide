import React, { useState, useEffect } from 'react';
import classes from "./Footer.module.scss"




const Footer = () => {

    return(
        <div className={classes.footer}>
            <div className={classes.columnWrapper}>
                <div className={classes.column}>
                    <div className={classes.columnTitle}>
                        Navigation
                    </div>
                    <div className={classes.columnText}>
                        Home
                    </div>
                    <div className={classes.columnText}>
                        Weather
                    </div>
                    <div className={classes.columnText}>
                        Car
                    </div>
                    <div className={classes.columnText}>
                        Plane
                    </div>
                    <div className={classes.columnText}>
                        Boat
                    </div>
                </div>
                <div className={classes.column}>
                    <div className={classes.columnTitle}>
                        Creators
                    </div>
                    <div className={classes.columnText}>
                        Sergiy Greblov
                    </div>
                    <div className={classes.columnText}>
                        Salam Rahal-Arabi
                    </div>
                    <div className={classes.columnText}>
                        Andrew Dassonville
                    </div>
                    <div className={classes.columnText}>
                        Avi Desai
                    </div>
                </div>
                <div className={classes.column}>
                    <div className={classes.columnTitle}>
                        Assisted By
                    </div>
                    <div className={classes.columnText}>
                        Rob Hess
                    </div>
                    <div className={classes.columnText}>
                        Sumer Patel
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Footer