import React from 'react';
import { Map, Marker, Circle, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import '../App.css';

class MapTiles extends React.Component {
    state = {
      lat: this.props.lat,
      lng: this.props.lng,
      zoom: this.props.zoom,
      ready: false
    }

  componentDidUpdate(prevProps) {
    if (this.props.lat !== prevProps.lat) {
      this.setState({lat: this.props.lat});
      this.setState({lng: this.props.lng});
    }
  }

  render() {
    let position = [this.state.lat, this.state.lng];
    let issIcon = new L.Icon({
        iconUrl: require('../assets/iss-image.png'),
        iconRetinaUrl: require('../assets/iss-image.png'),
        iconAnchor: (0, 0),
        iconSize: new L.Point(32, 32)
    });

    if (!this.state.ready) {
      setInterval(() => {
        this.setState({ready: true});
      }, 1500);
      return <p>'Data is loading...'</p>;
    }
      return (
          <Map center={position} zoom={this.state.zoom}>
            <TileLayer
              url={'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'}
              attribution={'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery Â© <a href="https://www.mapbox.com/">Mapbox</a>'}
              maxZoom={5}
              id={'mapbox/light-v10'}
              tileSize={512}
              zoomOffset={-1}
              accessToken={'pk.eyJ1Ijoic2d0cnVpZG8iLCJhIjoiY2tkN2w1NDFlMGxlOTJwc2M4NHp6c3J5cyJ9.gdYLJS0K1SfZZfKEO3-MhA'}
            />
            <Circle
              center={position}
              radius={2000000}></Circle>
            <Marker 
              position={position}
              icon={issIcon}>
            </Marker>
          </Map>
      )
  }
}

export default MapTiles;