import React, { useState  } from 'react';
import classes from "./Menu.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Routes, Route, Link, useLocation} from "react-router-dom"
import { faCar } from "@fortawesome/free-solid-svg-icons";
import {faSailboat} from "@fortawesome/free-solid-svg-icons";
import {faPlane} from "@fortawesome/free-solid-svg-icons";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {faTemperature0} from "@fortawesome/free-solid-svg-icons";

const locations = [ '/weather', '/car', '/plane', '/boat']
const Menu = () =>{

    const location = useLocation();

    let index = 0
    for (let i in locations){

        if (location.pathname.includes(locations[i])){
            index = parseInt(i)+1
            break
        }
    }
    let marginHighlight = 150*index + 52



    return(
        <div className={classes.menu}>
            <div className={classes.logo}>

            </div>
            <div className={classes.buttonsWrapper}>
                <div  className={classes.highlight} style={{marginLeft: marginHighlight +  "px"}}></div>
                <Link to='/'  className={classes.button}>
                    <FontAwesomeIcon className={classes.buttonIcon}  icon={faHome} />
                    Home
                </Link>
                <Link to='/weather' className={classes.button}>
                    <FontAwesomeIcon className={classes.buttonIcon}  icon={faTemperature0} />
                    Weather
                </Link>
                <Link to='/car'  className={classes.button}>
                    <FontAwesomeIcon className={classes.buttonIcon}  icon={faCar} />
                    Car
                </Link>
                <Link to='/plane' className={classes.button}>
                    <FontAwesomeIcon className={classes.buttonIcon}  flip="vertical"  icon={faPlane} />
                    Plane
                </Link>
                <Link to='/boat'  className={classes.button}>
                    <FontAwesomeIcon className={classes.buttonIcon}  icon={faSailboat} />
                    Boat
                </Link>
            </div>
        </div>
    )
}

export default Menu