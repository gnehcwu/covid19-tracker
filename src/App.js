import React, { useState, useEffect, useRef } from 'react';
import { CountrySelector, GlobalSummary, TimelineChart } from './components'
import styles from './App.module.css'
import logo from './logo.svg'
import { getAllCountries, getGlobalTimeline, getTimelineByCountry, getCountryFlag } from './data-service'

function App() {
  const [selected, setSelected] = useState('global')
  const [timeline, setTimeline] = useState([])
  const [summary, setSummary] = useState({})
  const [countries, setCountries] = useState([])
  const [chartHeight, setChartHeight] = useState(0)
  const [chartWidth, setChartWidth] = useState(0)
  const timelineContainer = useRef(null)

  useEffect(() => {
    const fetchTimeline = async () => {
      if (selected === 'global') {
        const data = await getGlobalTimeline()
        setSummary(data[0])
        setTimeline(data.reverse())
      } else {
        const data = await getTimelineByCountry(selected)
        setSummary(data.timeline[0])
        setTimeline(data.timeline.reverse())
      }
    }

    fetchTimeline()
  }, [selected])

  useEffect(() => {
    const fetchCoutries = async () => {
      const data = await getAllCountries()
      // Put global in the front of country list
      data.unshift({ name: 'global', code: 'global', flag: getCountryFlag(), confirm: summary.confirmed })
      setCountries(data)
    }

    fetchCoutries();
  }, [])

  useEffect(() => {
    setChartHeight(timelineContainer.current.clientHeight)
  }, [])

  useEffect(() => {
    function handleResize() {
      setChartWidth(timelineContainer.current.clientWidth)
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [])

  function changeSelected(country) {
    setSelected(country)
  }

  return (
    <div className={styles.app}>
      <div className={styles.logoArea}>
        <img src={logo} className={styles.logo} alt="logo" />
        <div className={styles.logoTitle}>Covid-19 Tracker</div>
      </div>
      <div className={styles.nav}>
        <CountrySelector countries={countries} changeSelected={changeSelected} selected={selected} />
      </div>
      <div className={styles.content}>
        <div className={styles.summary}>
          <GlobalSummary latestInfo={summary} />
        </div>
        <div className={styles.timeline} ref={timelineContainer}>
          <TimelineChart width={chartWidth} height={chartHeight} timeline={timeline} />
        </div>
      </div>
    </div>
  );
}

export default App;
