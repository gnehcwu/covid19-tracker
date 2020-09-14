import React, { useState, useEffect } from 'react';
import { CountrySelector, GlobalSummary } from './components'
import styles from './App.module.css'
import logo from './logo.svg'
import { getAllCountries, getGlobalTimeline, getTimelineByCountry } from './data-service'

function App() {
  const [global, setGlobal] = useState([]);
  const [countries, setCountries] = useState([])

  useEffect(() => {
    const fetchGlobal = async () => {
      const data = await getGlobalTimeline()
      console.log(1111)
      setGlobal(data)
    }

    fetchGlobal()
  }, [])

  useEffect(() => {
    const fetchCoutries = async () => {
      const data = await getAllCountries()
      console.log(2222, countries)
      setCountries(data)
    }

    fetchCoutries();
  }, [])

  return (
    <div className={styles.app}>
      <div className={styles.logoArea}>
        <img src={logo} className={styles.logo} alt="logo" />
        <div className={styles.logoTitle}>Covid-19 Tracker</div>
      </div>
      <div className={styles.nav}>
        <CountrySelector countries={countries} />
      </div>
      <div className={styles.content}>
        <div className={styles.summary}>
          <GlobalSummary latestInfo={global[0]} />
        </div>
        <div className={styles.timeline}>
        </div>
      </div>
    </div>
  );
}

export default App;
