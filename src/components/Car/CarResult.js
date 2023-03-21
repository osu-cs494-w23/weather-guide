import React from 'react';
import { withScriptjs } from "react-google-maps";

import Map from './Map'

function CarResult() {

  const MapLoader = withScriptjs(Map);

  return (

    <div className="result">
    <MapLoader
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCn83Izszh5s1DBeiFCmaVQZM7jAXMwMdU"
        loadingElement={<div style={{ height: `100%` }} />}
    />
    </div>
  );
}

export default CarResult;