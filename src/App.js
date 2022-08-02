import './App.css';
import Header from './Header.js';
import Footer from './Footer.js';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      cityData: {},
      longitude: 0,
      latitude: 0,
      error: false,
      errorMessage: "",
      mapData: {},
      mapUrl: "",
    };
  }

  submitCityHandler = async (event) => {
    event.preventDefault();

    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.city}&format=json`;



    let cityInfo = await axios.get(url).then(res => res.data);


    console.log("City Info: ", cityInfo);
    this.setState({
      cityData: cityInfo[0],
    })

    console.log("This is it", this.state);

    let mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${cityInfo[0].lat},${cityInfo[0].lon}&zoom=12`;

    this.setState({
      mapUrl: mapUrl
    })
    let image = document.getElementById("mapImage");
    image.style.visibility = 'visible';
  }

  HandleCityInput = (event) => {
    this.setState({
      city: event.target.value,
    });
    console.log(this.state.city);
  }

  hideImage = (event) => {
    event.target.style.display = 'none';
  }

  render() {

    return (
      <>
        <Header cityData={this.state.cityData} />
        <main>
          <form id="form" onSubmit={this.submitCityHandler}>
            <label>Enter a City
              <input type="text" onChange={this.HandleCityInput}></input>
            </label>
            <button type="submit">Explore!</button>
            <ul>
              <li>{this.state.cityData.display_name}</li>
              <li>Latitude: {this.state.cityData.lat}</li>
              <li>Longitude: {this.state.cityData.lon}</li>
            </ul>
            <img id="mapImage" style={{ visibility: "hidden" }} src={this.state.mapUrl} alt="A map of the selected city." />
          </form>
        </main>
        <Footer />
      </>
    );
  }
}

export default App;


