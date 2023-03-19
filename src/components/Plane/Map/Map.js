import React from 'react';
import { LayersControl, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import classes from './Map.module.scss';
import airports from '../data/us_airports.json';

const kcvo = airports.find(airport => airport.ICAO === 'KCVO');

const Map = () => {
    const cycle = '20230223'
    const center = [Number(kcvo.lat), Number(kcvo.lon)];

    return (
        <>
            <MapContainer center={center} zoom={8} maxZoom={11} className={classes.aviationMap}>
                <LayersControl position="topright">
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

                    <LayersControl.Overlay name="Radar">
                        <TileLayer url="https://a.sat.owm.io/maps/2.0/radar/{z}/{x}/{y}?appid=9de243494c0b295cca9337e1e96b00e2&day=2023-03-19T04:00" />
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="Clouds">
                        <TileLayer url="https://a.sat.owm.io/vane/2.0/weather/CL/{z}/{x}/{y}?appid=9de243494c0b295cca9337e1e96b00e2" />
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="Wind">
                        <TileLayer url="https://a.sat.owm.io/vane/2.0/weather/WND/{z}/{x}/{y}?appid=9de243494c0b295cca9337e1e96b00e2&fill_bound=true" />
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="Temperature">
                        <TileLayer url="https://a.sat.owm.io/vane/2.0/weather/TA2/{z}/{x}/{y}?appid=9de243494c0b295cca9337e1e96b00e2&fill_bound=true" />
                    </LayersControl.Overlay>
                </LayersControl>

                {airports.map(airport => (
                    <Marker key={airport.ICAO} position={[Number(airport.lat), Number(airport.lon)]}>
                        <Popup>
                            {airport.ICAO}: {airport.name}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </>
    )
}

export default Map
