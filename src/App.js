import React, { useState, useEffect, useRef } from 'react';
import { CountrySelector, GlobalSummary } from './components'
import styles from './App.module.css'
import logo from './logo.svg'
import { getAllCountries, getGlobalTimeline, getTimelineByCountry } from './data-service'
import { Line } from 'react-chartjs-2';

function App() {
  const [global, setGlobal] = useState([]);
  const [countries, setCountries] = useState([])
  const [chartHeight, setChartHeight] = useState(0)
  const [chartWidth, setChartWidth] = useState(0)
  const timelineContainer = useRef(null)

  useEffect(() => {
    const fetchGlobal = async () => {
      const data = await getGlobalTimeline()
      setGlobal(data.reverse())
    }

    fetchGlobal()
  }, [])

  useEffect(() => {
    const fetchCoutries = async () => {
      const data = await getAllCountries()
      setCountries(data)
    }

    fetchCoutries();
  }, [])

  useEffect(() => {
    setChartHeight(timelineContainer.current.clientHeight)
  }, [])

  useEffect(() => {
    function handleResize() {
      console.log(1111);
      setChartWidth(timelineContainer.current.clientWidth)
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }
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
          <GlobalSummary latestInfo={global[global.length - 1]} />
        </div>
        <div className={styles.timeline} ref={timelineContainer}>
          <Line
            height={chartHeight}
            width={chartWidth}
            data={{
              labels: global.map(({ date }) => date),
              datasets: [{
                data: global.map(({ confirmed }) => confirmed),
                label: 'Infected',
                borderColor: '#de3700',
                borderWidth: 1,
                pointStyle: 'dash'
              }, {
                data: global.map(({ deaths }) => deaths),
                label: 'Deaths',
                borderColor: '#767676',
                borderWidth: 1,
                pointStyle: 'dash'
              },
              ],
            }}
          />
        </div>
      </div>
    </div >
  );
}

export default App;
