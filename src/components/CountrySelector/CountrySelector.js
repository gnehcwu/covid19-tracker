import React, { useState, useEffect } from 'react'
import styles from './CountrySelector.module.css'
import CountryCard from '../CountryCard/CountryCard'

export default function CountrySelector({ countries, selectedCoutry }) {
  const [filteredCoutries, setFilteredCountries] = useState(countries)
  const [filter, setFilter] = useState('');

  function filterCountry(event) {
    setFilter(event.target.value)
  }

  useEffect(() => {
    const filtered = countries.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
    setFilteredCountries(filtered)
  }, [filter, countries])

  return (
    <div className={styles.countrySelector}>
      <div className={styles.sortContainer}>
        <div className={styles.sortTitle}>Filter to a country</div>
      </div>
      <div className={styles.selectArea}>
        <input type="text" value={filter} onChange={filterCountry}
          className={styles.search}
          placeholder="Country..."
          autoComplete="off" autoCorrect="off" />
      </div>
      <div className={styles.countryList}>
        {filteredCoutries.map(country => (
          <CountryCard key={country.code} country={country} />
        ))}
      </div>
    </div>
  )
}
