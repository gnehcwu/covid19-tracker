import React, { useState, useEffect, useRef } from 'react';
import { CountrySelector, GlobalSummary, TimelineChart } from './components'
import styles from './App.module.css'
import { ReactComponent as Logo } from './logo.svg'
import { useCovid19Reducer, ACTIONS, Covid19Context } from './state-manage'
import { getAllCountries, getGlobalTimeline, getTimelineByCountry, getCountryFlag } from './data-service'

function App() {
  const [trackerData, dispatch] = useCovid19Reducer();
  const [chartHeight, setChartHeight] = useState(0)
  const [chartWidth, setChartWidth] = useState(0)
  const timelineContainer = useRef(null)

  useEffect(() => {
    const fetchTimeline = async () => {
      let data;
      if (trackerData.selectedCountry === 'Global') {
        data = await getGlobalTimeline()
      } else {
        data = await getTimelineByCountry(trackerData.selectedCountry)
      }
      dispatch({ type: ACTIONS.UPDATE_TIMELINE, payload: { summary: data.summary, timeline: data.timeline } })
    }

    fetchTimeline()
  }, [trackerData.selectedCountry, dispatch])

  useEffect(() => {
    const fetchCoutries = async () => {
      const data = await getAllCountries()
      // Put global in the front of country list
      data.unshift({ name: 'Global', code: 'Global', flag: getCountryFlag(), confirmed: trackerData.summary.confirmed })
      dispatch({ type: ACTIONS.UPDATE_COUTRIES, payload: { countries: data } });
    }

    fetchCoutries();
  }, [trackerData.summary.confirmed, dispatch])

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

  return (
    <Covid19Context.Provider value={{ dispatch: dispatch, selectedCountry: trackerData.selectedCountry }}>
      <div className={styles.app}>
        <div className={styles.logoArea}>
          <Logo fill="#f4c363" stroke="#f4c363" className={styles.logo} alt="logo" />
          <div className={styles.logoTitle}>Covid-19 Tracker</div>
        </div>
        <div className={styles.nav}>
          <CountrySelector countries={trackerData.countries} />
        </div>
        <div className={styles.content}>
          <div className={styles.summary}>
            <GlobalSummary latestInfo={trackerData.summary} />
          </div>
          <div className={styles.timeline} ref={timelineContainer}>
            <TimelineChart width={chartWidth} height={chartHeight} timeline={trackerData.timeline} />
          </div>
        </div>
      </div>
    </Covid19Context.Provider>
  );
}

export default App;
