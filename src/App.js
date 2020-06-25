import React from 'react';
import { Cards, Charts, CountryPicker } from './components';
import { fetchData } from './api';
import styles from './App.module.css';
import covidImage from './assets/covid19.png';

export default class App extends React.Component {
  // Hold and update data
  state = {
    data: {},
    country: '',
  };
  async componentDidMount() {
    const loadData = await fetchData();
    this.setState({ data: loadData });
  }

  handleCountryChange = async (country) => {
    const fetchCountry = await fetchData(country);
    this.setState({ data: fetchCountry, country: country });
  };
  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img src={covidImage} className={styles.image} alt='Covid-19' />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Charts data={data} country={country} />
      </div>
    );
  }
}
