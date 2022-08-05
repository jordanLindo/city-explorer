import './App.css';
import Header from './Header.js';
import Image from './Image.js';
import Weather from './Weather.js';
import Error from './Error.js';
import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      cityData: {},
      cityName: "",
      lat: 0,
      lon: 0,
      error: false,
      errorMessage: "",
      errorWeather: false,
      errorWeatherMessage: "",
      mapData: {},
      mapUrl: "",
      showCity: false,
      forecast: [],
      showForecast: false,
    };
  }

  submitCityHandler = async (event) => {
    event.preventDefault();
    this.resetState();

    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.city}&format=json`;
    try {
      let cityInfo = await axios.get(url).then(res => res.data);
      this.state.cityData = cityInfo[0];
      this.state.cityName = this.state.cityData.display_name.split(',')[0];

      let mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${cityInfo[0].lat},${cityInfo[0].lon}&zoom=12`;
      this.setState({
        mapUrl: mapUrl,
        showCity: true,
      })
    } catch (error) {
      let errorString = (error.name + ': ' + error.message);
      this.setState({
        errorMessage: errorString,
        error: true,
      })
    }

    try {
      console.log();
      let weatherUrl = `${process.env.REACT_APP_SERVER}/weather?lat=${this.state.cityData.lat}&lon=${this.state.cityData.lon}`;

      let results = await axios.get(weatherUrl);
      console.log(results.data);
      let forecastArr = results.data.data;
      this.setState({
        forecast: forecastArr,
        showForecast: true
      })
    } catch (error) {
      let errorString = (error.name + ': ' + error.message);
      this.setState({
        errorWeatherMessage: errorString,
        errorWeather: true,
      })
    }
  }

  HandleCityInput = (event) => {
    this.setState({
      city: event.target.value,
    });
    if (event.target.value === '') {
      this.resetState();
      this.render();
    }
    console.log(this.state.city);
  }

  resetState() {
    this.setState({
      cityData: {},
      error: false,
      errorMessage: "",
      errorWeatherMessage: "",
      errorWeather: false,
      mapData: {},
      mapUrl: "",
      showCity: false,
      showForecast: false,
    });
  }

  render() {
    let cityDisplay = (this.state.showCity ?
      <>
        <ul style={{ listStyleType: "none" }}>
          <li>{this.state.cityData.display_name}</li>
          <li>Latitude: {this.state.cityData.lat}</li>
          <li>Longitude: {this.state.cityData.lon}</li>
        </ul>
        <Image src={this.state.mapUrl} alt="A map of the selected city." />
      </> : this.state.error ?
        <>
          <Error errorMessage={this.state.errorMessage} />
        </> :
        <></>
    )

    let forecastDisplay = (this.state.showForecast ?
      <>
        <Weather forecast={this.state.forecast} />
      </>
      : this.state.error ?
        <>
          <Error errorMessage={this.state.errorWeatherMessage} />
        </> :
        <></>

    )
    return (
      <>
        <Header cityData={this.state.cityData} />
        <main>
          <form id="form" onSubmit={this.submitCityHandler}>
            <label>Enter a City</label><br />
            <input type="text" onChange={this.HandleCityInput}></input><br/>
            <Button type="submit">Explore!</Button>
            <div>
              {cityDisplay}
              {forecastDisplay}
            </div>
          </form>
        </main>
      </>
    );
  }
}

export default App;
