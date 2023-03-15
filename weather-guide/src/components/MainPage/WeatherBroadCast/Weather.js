import React, { useState, useEffect } from 'react';
import classes from "./Weather.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSailboat, faSearch} from "@fortawesome/free-solid-svg-icons";

import { useDispatch } from 'react-redux';
import { setCity } from '../../../redux/reducers';

const Weather = () => {
  const [cityInput, setCityInput] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setCity(cityInput));
    console.log(cityInput);
    setCityInput('');
  };

  const handleInputChange = (e) => {
    setCityInput(e.target.value);
  };

  return (
    <div className={classes.WeatherWrapper}>
      <div className={classes.WeatherTitle}> Need a quick Weather Broadcast?</div>
      <form className={classes.formClasses} onSubmit={handleSubmit}>
        <FontAwesomeIcon className={classes.searchIcon} icon={faSearch} />
        <input placeholder={"Location"} className={classes.cityInput} value={cityInput} onChange={handleInputChange} />
        <input className={classes.submitButton} value={"Search"} type={"submit"} />
      </form>
    </div>
  );
};

export default Weather;
