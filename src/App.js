import './App.css';
import Header from './Header.js';
import Footer from './Footer.js';
import Image from './Image.js';
import Error from './Error.js';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      cityData: {},
      error: false,
      errorMessage: "",
      mapData: {},
      mapUrl: "",
      showCity: false,
    };
  }

  submitCityHandler = async (event) => {
    event.preventDefault();

    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.city}&format=json`;
    try {
      let cityInfo = await axios.get(url).then(res => res.data);

      this.setState({
        cityData: cityInfo[0],
      })

      let mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${cityInfo[0].lat},${cityInfo[0].lon}&zoom=12`;

      this.setState({
        mapUrl: mapUrl,
        showCity: true,
      })
    } catch (error) {
      let errorString = (error.name+': '+error.message);
      this.setState({
        errorMessage: errorString,
        error: true,
      })
    }
  }

  HandleCityInput = (event) => {
    this.setState({
      city: event.target.value,
    });
    if (event.target.value === '') {
      this.render();
      this.setState({
        city: "",
        cityData: {},
        error: false,
        errorMessage: "",
        mapData: {},
        mapUrl: "",
        showCity: false,
      })
    }
    console.log(this.state.city);
  }

  render() {
    let cityDisplay = (this.state.showCity ?
      <>
        <ul>
          <li>{this.state.cityData.display_name}</li>
          <li>Latitude: {this.state.cityData.lat}</li>
          <li>Longitude: {this.state.cityData.lon}</li>
        </ul>
        <Image src={this.state.mapUrl} alt="A map of the selected city." />
      </>
      : this.state.error ? <>
        <Error errorMessage={this.state.errorMessage} />
      </> :
        <></>
    )
    return (
      <>
        <Header cityData={this.state.cityData} />
        <main>
          <form id="form" onSubmit={this.submitCityHandler}>
            <label>Enter a City
              <input type="text" onChange={this.HandleCityInput}></input>
            </label>
            <button type="submit">Explore!</button>
            <div>
              {cityDisplay}
            </div>
          </form>
        </main>
        <Footer />
      </>
    );
  }
}

export default App;


