import React, { useState  } from 'react';
import classes from "./Menu.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import { faCar } from "@fortawesome/free-solid-svg-icons";
import {faSailboat} from "@fortawesome/free-solid-svg-icons";
import {faPlane} from "@fortawesome/free-solid-svg-icons";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {faTemperature0} from "@fortawesome/free-solid-svg-icons";

const Menu = () =>{





    return(
        <div className={classes.menu}>
            <div className={classes.logo}>

            </div>
            <div className={classes.buttonsWrapper}>
                <div  className={classes.button}>
                    <FontAwesomeIcon className={classes.buttonIcon}  icon={faHome} />
                    Home
                </div>
                <div  className={classes.button}>
                    <FontAwesomeIcon className={classes.buttonIcon}  icon={faTemperature0} />
                    Weather
                </div>
                <div  className={classes.button}>
                    <FontAwesomeIcon className={classes.buttonIcon}  icon={faCar} />
                    Car
                </div>
                <div  className={classes.button}>
                    <FontAwesomeIcon className={classes.buttonIcon}  flip="vertical"  icon={faPlane} />
                    Plane
                </div>
                <div  className={classes.button}>
                    <FontAwesomeIcon className={classes.buttonIcon}  icon={faSailboat} />
                    Boat
                </div>
            </div>
        </div>
    )
}

export default Menu