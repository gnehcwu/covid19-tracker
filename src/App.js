import React, { useEffect, useRef } from 'react'
import { CountrySelector, GlobalSummary, TimelineChart } from './components'
import styles from './App.module.css'
import { ReactComponent as Logo } from './logo.svg'
import { useCovid19Reducer, ACTIONS, Covid19Context } from './state-manage'
import { getAllCountries, getGlobalTimeline, getTimelineByCountry, getCountryFlag } from './data-service'

function App() {
  const [trackerData, dispatch] = useCovid19Reducer()
  const timelineContainer = useRef(null)

  useEffect(() => {
    const fetchTimeline = async () => {
      let data
      if (trackerData.selectedCountry === 'Global') {
        data = await getGlobalTimeline()
        dispatch({
          type: ACTIONS.UPDATE_GLOBAL_CASE,
          payload: { globalConfirmed: data.summary.confirmed }
        })
      } else {
        data = await getTimelineByCountry(trackerData.selectedCountry)
      }
      dispatch({
        type: ACTIONS.UPDATE_TIMELINE,
        payload: { summary: data.summary, updated: data.updated, timeline: data.timeline }
      })
    }

    fetchTimeline()
  }, [trackerData.selectedCountry, dispatch])

  useEffect(() => {
    const fetchCoutries = async () => {
      const data = await getAllCountries()
      // Put global in the front of country list
      data.unshift({
        name: 'Global',
        code: 'Global',
        flag: getCountryFlag(),
        confirmed: trackerData.globalConfirmed
      })
      dispatch({ type: ACTIONS.UPDATE_COUTRIES, payload: { countries: data } })
    }

    fetchCoutries()
  }, [trackerData.globalConfirmed, dispatch])

  useEffect(() => {
    document.title = `Covid-19 ${trackerData.selectedCountryName} | ${trackerData.summary.confirmed}`
  })

  return (
    <Covid19Context.Provider value={{ dispatch: dispatch, selectedCountry: trackerData.selectedCountry }}>
      <div className={styles.app}>
        <div className={styles.nav}>
          <div className={styles.logoArea}>
            <Logo fill="#00809d" stroke="#00809d" className={styles.logo} alt="logo" />
            <div className={styles.logoTitle}>Covid-19 Tracker</div>
          </div>
          <div className={styles.countrySelectArea}>
            <CountrySelector countries={trackerData.countries} />
          </div>
          <div className={styles.footer}>
            Data from
            <a className={styles.dataSource} href="https://about-corona.net/" target="_blank" rel="noopener noreferrer">about-corona</a>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.summary}>
            <GlobalSummary summary={trackerData.summary} updated={trackerData.updated} />
          </div>
          <div className={styles.timeline} ref={timelineContainer}>
            <TimelineChart container={timelineContainer} timeline={trackerData.timeline} />
          </div>
        </div>
      </div>
    </Covid19Context.Provider>
  )
}

export default App
