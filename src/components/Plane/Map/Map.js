import * as turf from '@turf/turf';
import * as geomag from 'geomag';
import L from 'leaflet';
import * as LGeodesic from 'leaflet.geodesic';
import React, { useEffect, useMemo } from 'react';
import { FeatureGroup, LayersControl, MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import airports from '../data/us_airports.json';
import winds from '../data/winds_aloft.json';
import classes from './Map.module.scss';

const warningMessage = 'NOT FOR NAVIGATIONAL USE.'

const OPENWEATHERMAP_APPID = '9de243494c0b295cca9337e1e96b00e2';
const M_TO_NM = 0.000539957;

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

const distanceToGeodesicLine = (coord, geodesicLine) => {
    const point = turf.point(coord);
    const line = turf.lineString(geodesicLine.getLatLngs()[0].map(latlng => [latlng.lng, latlng.lat]));
    const nearestPoint = turf.nearestPointOnLine(line, point);
    return turf.distance(point, nearestPoint, { units: 'meters' });
}

const windToUV = (wspd, wdir) => {
    const wdirRad = (wdir * Math.PI) / 180;
    const u = -wspd * Math.sin(wdirRad);
    const v = -wspd * Math.cos(wdirRad);
    return { u, v };
}

const uvToWind = (u, v) => {
    const wspd = Math.sqrt(u * u + v * v);
    const wdir = (Math.atan2(-u, -v) * 180) / Math.PI;
    return { wdir: wdir < 0 ? wdir + 360 : wdir, wspd };
}

const combineWindsAloft = (winds) => {
    const { u, v } = winds.reduce((acc, wind) => {
        const { u, v } = windToUV(wind.properties.wspd, wind.properties.wdir);

        acc.u += u;
        acc.v += v;

        return acc;
    }, { u: 0, v: 0 });

    let { wdir, wspd } = uvToWind(u, v);
    wspd = wspd / winds.length;

    return { wdir, wspd };
}

const initialTrueBearing = (lat1, lon1, lat2, lon2) => {
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    const θ = Math.atan2(y, x);

    const initialBearing = ((θ * 180) / Math.PI + 360) % 360;
    return initialBearing;
}

const calculateMagneticBearing = (geodesicLine) => {
    const geodesicLineLatLngs = geodesicLine.getLatLngs()[0];
    const magneticBearings = [];

    for (let i = 0; i < geodesicLineLatLngs.length - 1; i++) {
        const lat1 = geodesicLineLatLngs[i].lat;
        const lon1 = geodesicLineLatLngs[i].lng;
        const lat2 = geodesicLineLatLngs[i + 1].lat;
        const lon2 = geodesicLineLatLngs[i + 1].lng;

        const trueBearing = initialTrueBearing(lat1, lon1, lat2, lon2);
        const magneticDeclination1 = geomag.field(lat1, lon1).declination;
        const magneticDeclination2 = geomag.field(lat2, lon2).declination;
        const averageMagneticDeclination = (magneticDeclination1 + magneticDeclination2) / 2;
        const magneticBearing = (trueBearing - averageMagneticDeclination + 360) % 360;

        magneticBearings.push(magneticBearing);
    }

    return magneticBearings;
}

const PathLayer = (props) => {
    const map = useMap();

    const { departureAirport, arrivalAirport, onRouteUpdate } = props;

    const departure = useMemo(() => airports.find(airport => airport.ICAO === departureAirport), [departureAirport]);
    const arrival = useMemo(() => airports.find(airport => airport.ICAO === arrivalAirport), [arrivalAirport]);

    useEffect(() => {
        if (departureAirport && arrivalAirport) {
            const departure = airports.find(airport => airport.ICAO === departureAirport);
            const arrival = airports.find(airport => airport.ICAO === arrivalAirport);

            if (!departure || !arrival) return;

            const departurePoint = L.latLng(departure.lat, departure.lon);
            const arrivalPoint = L.latLng(arrival.lat, arrival.lon);

            console.log(departure.lat, departure.lon)
            console.log(arrival.lat, arrival.lon)

            // const path = L.polyline([departurePoint, arrivalPoint], { color: 'magenta', weight: 8 });
            const path = new LGeodesic.GeodesicLine([departurePoint, arrivalPoint], { color: 'magenta', weight: 8 });
            path.addTo(map);

            map.fitBounds([
                [departure.lat, departure.lon],
                [arrival.lat, arrival.lon]
            ], { padding: [25, 25] });

            // Calculate the distance between two points
            // Turf uses [lon, lat] for some reason
            const from = turf.point([departure.lon, departure.lat]);
            const to = turf.point([arrival.lon, arrival.lat]);

            const segmentLength = turf.distance(from, to, { units: 'meters' }) * M_TO_NM;

            const orderedWinds = winds.features.sort((a, b) => {
                return distanceToGeodesicLine(a.geometry.coordinates, path) - distanceToGeodesicLine(b.geometry.coordinates, path);
            });

            const magneticBearings = calculateMagneticBearing(path);
            const avgMagneticBearing = magneticBearings.reduce((acc, bearing) => acc + bearing, 0) / magneticBearings.length;

            const absoluteWinds = combineWindsAloft(orderedWinds.slice(0, 3));

            // calculate wind impact on ground speed
            const tailwindComponent = -absoluteWinds.wspd * Math.cos((absoluteWinds.wdir - avgMagneticBearing) * Math.PI / 180);
            console.log(tailwindComponent)

            if (onRouteUpdate) {
                onRouteUpdate({
                    departure: departure.ICAO,
                    departureName: departure.name,
                    arrival: arrival.ICAO,
                    arrivalName: arrival.name,
                    length: segmentLength,
                    magneticBearing: avgMagneticBearing,
                    absoluteWinds: absoluteWinds,
                    tailwindComponent: tailwindComponent,
                });
            }

            return () => {
                map.removeLayer(path);
            }
        }
    }, [map, departureAirport, arrivalAirport, onRouteUpdate]);

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
    const { departureAirport, arrivalAirport, onRouteUpdate } = props;

    const cycle = '20230223'
    const center = [Number(kcvo.lat), Number(kcvo.lon)];

    return (
        <>
            <MapContainer center={center} zoom={8} maxZoom={11} className={classes.aviationMap}>
                <LayersControl position="topright">

                    {/* Map Layers */}

                    <LayersControl.BaseLayer name="Hybrid VFR" checked>
                        <TileLayer url={`https://vfrmap.com/${cycle}/tiles/vfrc/{z}/{y}/{x}.jpg`} attribution={warningMessage} tms={true} />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="VFR Sectional">
                        <TileLayer url={`https://vfrmap.com/${cycle}/tiles/sectc/{z}/{y}/{x}.jpg`} attribution={warningMessage} tms={true} />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="Low IFR">
                        <TileLayer url={`https://vfrmap.com/${cycle}/tiles/ifrlc/{z}/{y}/{x}.jpg`} attribution={warningMessage} tms={true} />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="High IFR">
                        <TileLayer url={`https://vfrmap.com/${cycle}/tiles/ehc/{z}/{y}/{x}.jpg`} attribution={warningMessage} tms={true} />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="OpenStreetMap">
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution={warningMessage} />
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

                <PathLayer departureAirport={departureAirport} arrivalAirport={arrivalAirport} onRouteUpdate={onRouteUpdate} />
            </MapContainer>
        </>
    )
}

export default Map
