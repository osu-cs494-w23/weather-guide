import React, { useState, useEffect } from 'react';
import classes from "./Weather.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {faSailboat, faSearch} from "@fortawesome/free-solid-svg-icons";

const Weather = () =>{

    return(
        <div className={classes.WeatherWrapper}>
            <div className={classes.WeatherTitle}> Need a quick Weather Broadcast?</div>
            <form className={classes.formClasses}>
                <FontAwesomeIcon className={classes.searchIcon}  icon={faSearch} />
                <input placeholder={"Location"} className={classes.cityInput}/>
                <input className={classes.submitButton} value={"Search"}  type={"submit"}/>
            </form>
        </div>
    )

}

export default Weather