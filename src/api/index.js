import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
  let changeableURL = url;
  if (country) {
    changeableURL = `${url}/countries/${country}`;
  }
  try {
    // Destruct data and object inside data from response
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableURL);

    // Return this object
    return {
      confirmed,
      deaths,
      recovered,
      lastUpdate,
    };
  } catch (err) {
    console.log(`Some error ocurred in fetchData - ${err}`);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    return data.map(({ confirmed, deaths, reportDate: date }) => ({
      confirmed: confirmed.total,
      deaths: deaths.total,
      date,
    }));
  } catch (error) {
    console.log(`Error ocurred in fetchDailyData -> ${error}`);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    return countries.map((country) => country.name);
  } catch (error) {
    console.log(`Error ocurred in Countries -> ${error}`);
  }
};
