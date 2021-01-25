import React from 'react';
import './App.css';
import MapTiles from './components/map';

class App extends React.Component {
  state = {
    issLatitude: 0,
    issLongitude: 0,
    timeStamp: [],
    zoom: 2
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch('http://api.open-notify.org/iss-now.json')
    .then(res => res.json())
    .then((data) => {
      this.setState({ issLatitude: data.iss_position.latitude });
      this.setState({ issLongitude: data.iss_position.longitude });
      this.setState({ timeStamp: data.timestamp });
      this.intervalID = setTimeout(this.getData.bind(this), 1000);
    })
    .catch(console.log)
  }

  render() {
    return (
      <div className="console">
        <div className="text">
          <h1>ISS Tracker</h1>
          <p>Latitude: {this.state.issLatitude}</p>
          <p>Longitude: {this.state.issLongitude}</p>
          <p>Time in milliseconds: {this.state.timeStamp}</p>
        </div>
        <MapTiles 
          lat={this.state.issLatitude} 
          lng={this.state.issLongitude}
          zoom={this.state.zoom} />
      </div> 
    )
  }
}

export default App;