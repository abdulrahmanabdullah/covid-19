import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import { fetchCountries } from '../../api';

import styles from './Country.module.css';

export default function CountryPicker({ handleCountryChange }) {
  const [countriesState, setCountriesState] = useState([]);

  useEffect(() => {
    const fetchCountriesAPI = async () => {
      const initAPI = await fetchCountries();
      setCountriesState(initAPI);
    };
    console.log(countriesState);

    fetchCountriesAPI();
  }, [setCountriesState]);
  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=''
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value=''>Global</option>
        {countriesState.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}
