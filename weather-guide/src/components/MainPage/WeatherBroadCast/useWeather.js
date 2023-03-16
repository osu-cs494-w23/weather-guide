import { useEffect, useState } from 'react'
const APIKEY = '0efd39a5159ec4ff5bd0154841da469a'

const useWeather = ((query) =>{
    const [weatherResponse, setWeatherResponse] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(()=>{
        let ignore = false
        const controller = new AbortController()
        let responseBody = {}
        async function fetchCity() {
            setLoading(true)
            try {
                const response = await fetch(
                    `http://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${APIKEY}`,
                    { signal: controller.signal }
                )

                if (response.status !== 200){
                    setError(true)
                }else{
                    setError(false)
                    responseBody = await response.json()
                    fetchWeather(responseBody)
                }
            } catch (e) {
                if (e instanceof DOMException) {
                    console.log("canceled by Dom")
                } else {
                    setError(true)
                    console.log(e)
                    throw e
                }
            }
        }

        async function fetchWeather(r) {
            try {
                let lat = r[0].lat
                let long = r[0].lon
                console.log(long)
                const res = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKEY}`,
                )

                if (res.status !== 200){
                    setError(true)
                }else{
                    setError(false)
                    responseBody = await res.json()
                    setWeatherResponse(responseBody)
                }
            } catch (e) {
                if (e instanceof DOMException) {
                    console.log("canceled by Dom")
                } else {
                    setError(true)
                    console.log(e)
                    throw e
                }
            }
        }

        if (query !== ""){
            fetchCity()
        }

        return () =>{
            ignore = true
            controller.abort()
        }


    }, [query])


    return [weatherResponse, loading, error]
})

export default useWeather