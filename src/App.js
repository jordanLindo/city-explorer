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

    let mapUrl = `https://us1.locationiq.com/v1/reverse?key=${process.env.REACT_APP_LOCATION_KEY}&lat=${cityInfo[0].lat}&lon=${cityInfo[0].lon}&format=json`;

    let mapInfo = await axios.get(mapUrl);
    console.log("Map info:", mapInfo)
    this.setState({
      mapData: mapInfo
    })
  }

  HandleCityInput = (event) => {
    this.setState({
      city: event.target.value,
    });
    console.log(this.state.city);
  }

  render() {

    return (
      <>
        <Header cityData={this.state.cityData} />
        <main>
          <form onSubmit={this.submitCityHandler}>
            <label>Enter a City
              <input type="text" onChange={this.HandleCityInput}></input>
            </label>
            <button type="submit">Explore!</button>
            <p>{this.state.cityData.display_name}<br/>Latitude: {this.state.cityData.lat}<br/>Longitude: {this.state.cityData.lon}</p>
          </form>
        </main>
        <Footer />
      </>
    );
  }
}

export default App;
