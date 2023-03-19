import React from 'react'
import useWeather from '../MainPage/WeatherBroadCast/useWeather'


// Given the current temperature of the departing and arriving city
// in degrees Farenheit, this function calculates the percentage
// strain on an electric vehicle's battery.
// EV strain data approximated from here: https://www.geotab.com/uk/blog/temperature-speed-and-ev/
// for this application, speed is assumed to be held constant at 65 mph, the speed limit on most
// interstate freeways.

const calculateEVWeatherStrain = (departing_temperature, arriving_temperature) => {
    const avg_tmp = (departing_temperature+arriving_temperature)/2

    if (avg_tmp < 0) {avg_tmp = 0}
    if (avg_tmp > 95)  {avg_tmp = 95}
    return (67.35 - (avg_tmp*-0.01)**2+(avg_tmp*1.45))

}

const farenheitToCelsius = (temperature) => {
    return (5/9) * (temperature - 32)
}

const CarResult = (props) => {
    const { departingCity, arrivingCity, ev } = props;

    console.log(departingCity)
    
    const departingResult = useWeather(departingCity)[0]
    const arrivingResult = useWeather(arrivingCity)[0]

    console.log(departingResult)

    const departingTemperature = farenheitToCelsius(parseFloat(departingResult.current.weather[0].main))
    const arrivingTemperature = farenheitToCelsius(parseFloat(arrivingResult.current.weather[0].main))

    const weatherStrain = calculateEVWeatherStrain(departingTemperature, arrivingTemperature)

    return (
        <div>
            <p>Departing city temperature: {departingResult.current.weather[0].main }°F</p>
            <p>Arriving city temperature: {arrivingResult.current.weather[0].main }°F</p>
            {ev && <p>Due to the weather along this trip, your EV will perform at {weatherStrain}% of its typical range</p>}
        </div>
    )

}

export default CarResult