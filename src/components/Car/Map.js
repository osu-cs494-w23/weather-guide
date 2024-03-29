/*global google*/
import React, { Component } from "react";
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    DirectionsRenderer
} from "react-google-maps";

class Map extends Component {
    state = {
        directions: null,


};

componentDidMount() {
    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
        {
            origin: {lat: this.props.origin.lat, lng: this.props.origin.lng},
            destination: {lat: this.props.destination.lat, lng: this.props.destination.lng},
            travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                console.log(result)
                this.setState({
                    directions: result
                });
            } else {
                console.error(`error fetching directions ${result}`);
            }
        }
    );
}

render() {
    const GoogleMapExample = withGoogleMap(props => (
        <GoogleMap
            defaultCenter={{ lat: 6.5244, lng:  3.3792 }}
            defaultZoom={13}
        >
            <DirectionsRenderer
                directions={this.state.directions}
            />
        </GoogleMap>
    ));
    
    return (
        <div>
            <GoogleMapExample
                containerElement={<div style={{ height: `500px`, width: "500px" }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>


       );
    }
}

export default Map;