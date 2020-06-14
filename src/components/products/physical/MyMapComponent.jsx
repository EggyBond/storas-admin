import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


const onClick = (mapsMouseEvent) =>{
    var coordinate = mapsMouseEvent.latLng.toJSON();
    console.log("onClick", coordinate);
    latlng = {lat : coordinate.lat, lng: coordinate.lng};
}

var latlng = { lat: -34.397, lng: 150.644 };

export const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAQfQZH03I4q_B6XXBXbyZR-xR5NWZt5iM&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={props.latlng}
    onClick={props.onMapClick}
  >
    {props.isMarkerShown && <Marker position={props.latlng} onClick={props.onMarkerClick} />}
  </GoogleMap>
)

