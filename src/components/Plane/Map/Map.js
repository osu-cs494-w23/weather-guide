import L from 'leaflet';
import React, { useEffect, useMemo } from 'react';
import { FeatureGroup, LayersControl, MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import airports from '../data/us_airports.json';
import classes from './Map.module.scss';

const OPENWEATHERMAP_APPID = '9de243494c0b295cca9337e1e96b00e2';

const kcvo = airports.find(airport => airport.ICAO === 'KCVO');

const getUtcTime = () => {
    // Get current time in UTC
    const now = new Date();

    // 12 minute delay in radar data
    const utcTimestamp = now.getTime() - 12 * 60 * 1000;
    const utcDate = new Date(utcTimestamp);

    // Round down to nearest 10 minutes
    utcDate.setMinutes(Math.floor(utcDate.getMinutes() / 10) * 10);

    // Format the date as a string
    const formattedDate = utcDate.toISOString().slice(0, 16);

    return formattedDate;
}

const PathLayer = (props) => {
    const map = useMap();

    const { departureAirport, arrivalAirport } = props;

    const departure = useMemo(() => airports.find(airport => airport.ICAO === departureAirport), [departureAirport]);
    const arrival = useMemo(() => airports.find(airport => airport.ICAO === arrivalAirport), [arrivalAirport]);

    useEffect(() => {
        if (departureAirport && arrivalAirport) {
            const departure = airports.find(airport => airport.ICAO === departureAirport);
            const arrival = airports.find(airport => airport.ICAO === arrivalAirport);

            if (!departure || !arrival) return;

            const departurePoint = L.latLng(departure.lat, departure.lon);
            const arrivalPoint = L.latLng(arrival.lat, arrival.lon);

            const path = L.polyline([departurePoint, arrivalPoint], { color: 'magenta', weight: 8 });
            path.addTo(map);

            map.fitBounds([
                [departure.lat, departure.lon],
                [arrival.lat, arrival.lon]
            ], { padding: [25, 25] });

            return () => {
                map.removeLayer(path);
            }
        }
    }, [map, departureAirport, arrivalAirport]);

    return (
        <FeatureGroup>
            {[departure, arrival].filter(i => i).map(airport => (
                <Marker key={airport.ICAO} position={[Number(airport.lat), Number(airport.lon)]}>
                    <Popup>
                        {airport.ICAO}: {airport.name}
                    </Popup>
                </Marker>
            ))}
        </FeatureGroup>
    )
}

const Map = (props) => {
    const { departureAirport, arrivalAirport } = props;

    const cycle = '20230223'
    const center = [Number(kcvo.lat), Number(kcvo.lon)];

    return (
        <>
            <MapContainer center={center} zoom={8} maxZoom={11} className={classes.aviationMap}>
                <LayersControl position="topright">

                    {/* Map Layers */}

                    <LayersControl.BaseLayer name="Hybrid VFR" checked>
                        <TileLayer url={`https://vfrmap.com/${cycle}/tiles/vfrc/{z}/{y}/{x}.jpg`} tms={true} />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="VFR Sectional">
                        <TileLayer url={`https://vfrmap.com/${cycle}/tiles/sectc/{z}/{y}/{x}.jpg`} tms={true} />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="Low IFR">
                        <TileLayer url={`https://vfrmap.com/${cycle}/tiles/ifrlc/{z}/{y}/{x}.jpg`} tms={true} />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="High IFR">
                        <TileLayer url={`https://vfrmap.com/${cycle}/tiles/ehc/{z}/{y}/{x}.jpg`} tms={true} />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="OpenStreetMap">
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    </LayersControl.BaseLayer>

                    {/* Weather Layers */}

                    <LayersControl.Overlay name="Radar" checked>
                        <TileLayer url={`https://a.sat.owm.io/maps/2.0/radar/{z}/{x}/{y}?appid=${OPENWEATHERMAP_APPID}&day=${getUtcTime()}`} />
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="Clouds">
                        <TileLayer url={`https://a.sat.owm.io/vane/2.0/weather/CL/{z}/{x}/{y}?appid=${OPENWEATHERMAP_APPID}`} />
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="Wind" checked>
                        <TileLayer url={`https://a.sat.owm.io/vane/2.0/weather/WND/{z}/{x}/{y}?appid=${OPENWEATHERMAP_APPID}&fill_bound=true`} />
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="Temperature">
                        <TileLayer url={`https://a.sat.owm.io/vane/2.0/weather/TA2/{z}/{x}/{y}?appid=${OPENWEATHERMAP_APPID}&fill_bound=true`} />
                    </LayersControl.Overlay>
                </LayersControl>

                <PathLayer departureAirport={departureAirport} arrivalAirport={arrivalAirport} />
            </MapContainer>
        </>
    )
}

export default Map
