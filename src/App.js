import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Container, Grid, Card, Feed, Image, Search, Label, Dimmer, Loader, Header } from 'semantic-ui-react';
import WeatherCard from './Components/WeatherCard'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: { woeid: 2367105, name: 'Boston' },
      query: null,
      searchList: [],
      weatherInfo: null,
      error: null,
    }
    this.getWeatherData = this.getWeatherData.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.resultRenderer = this.resultRenderer.bind(this);
  }

  componentDidMount() {
    this.getWeatherData();
  }

  getWeatherData() {
    this.setState({ weatherInfo: null })
    axios.get(`https://www.metaweather.com/api/location/${this.state.location.woeid}/`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(res => {
        const weatherInfo = res.data.consolidated_weather;
        this.setState({ weatherInfo });
      })
      .catch(error => this.setState({ error }));
  }

  handleSearch(e) {
    if (e.keyCode === 13) {
      const query = e.target.value;
      axios.get(`https://www.metaweather.com/api/location/search/?query=${query}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then(res => {
          const searchList = res.data;
          this.setState({ searchList });
        })
        .catch(error => this.setState({ error }))
      e.preventDefault();
    }
  }

  resultRenderer = ({ woeid, title }) => <div onClick={() => {
    this.setState({ location: { woeid, name: title }, searchList: [] })
    this.getWeatherData()
  }}><Label key={woeid} content={title} /></div>;

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <Header color='blue' textAlign='center'>WeatherForce</Header>
          <Container textAlign='left'>
            <Search  noResultsMessage={'Press enter to search'} results={this.state.searchList} resultRenderer={this.resultRenderer} name="search" placeholder="Search Location" onKeyDown={this.handleSearch} ></Search>
          </Container>
        </header>
        <Container>
          <h1>{this.state.weatherInfo !== null ? this.state.location.name : null}</h1>
          <Grid columns={6} stackable stretched inverted>
            <Grid.Row>
              {this.state.weatherInfo === null ?
                <Container style={{height: '10em', display: 'flex', alignItems: 'center'}}>
                  <Dimmer active inverted >
                    <Loader inline={true} content='Loading'/>
                  </Dimmer>
                </Container> :
                this.state.weatherInfo.map((day, index) => {
                  if (index === 0) {
                    return (<Grid.Column>
                      <WeatherCard
                        today={true}
                        wDate={day.applicable_date}
                        condition={day.weather_state_abbr}
                        cTemp={day.the_temp}
                        mxTemp={day.max_temp}
                        mTemp={day.min_temp}
                        wSpeed={day.wind_speed}
                        wDirection={day.wind_direction_compass}
                        aPressure={day.air_pressure}
                        hum={day.humidity}
                        vis={day.visibility}
                      />
                    </Grid.Column>)
                  }
                  return (<Grid.Column>
                    <WeatherCard
                      today={false}
                      wDate={day.applicable_date}
                      condition={day.weather_state_abbr}
                      mxTemp={day.max_temp}
                      mTemp={day.min_temp}
                      wSpeed={day.wind_speed}
                      wDirection={day.wind_direction_compass}
                      aPressure={day.air_pressure}
                      hum={day.humidity}
                      vis={day.visibility}
                    />
                  </Grid.Column>)
                })
              }
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
