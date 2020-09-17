import React from 'react'
import styles from './GlobalSummary.module.css'
import CountUp from 'react-countup';

export default function GlobalSummary({ summary = {} }) {
  const getHumanUpdatedTime = () => {
    return ((Date.now() - new Date(summary.updated_at)) / (60 * 60 * 1000)).toFixed()
  }

  return (
    <div className={styles.summary}>
      <div className={styles.header}>
        <h2 className={styles.title}>Total confirmed cases</h2>
        <div className={styles.lastUpdate}>Updated {getHumanUpdatedTime() || 0} hours ago</div>
      </div>
      <div className={styles.infoConfirmed}>
        <div className={styles.confirmed}>
          <CountUp start={0} end={summary.confirmed || 0} duration={1.5} separator="," />
        </div>
        <div className={styles.deltaConfirmed}>
          + <CountUp start={0} end={summary.new_confirmed || 0} duration={1.5} separator="," />
        </div>
      </div>
      <div className={styles.infoDetail}>
        <div className={styles.info}>
          <div className={styles.indicatorActive}></div>
          <div className={styles.description}>Active cases:</div>
          <div className={styles.case}>
            <CountUp start={0} end={summary.active || 0} duration={1.5} separator="," />
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.indicatorRecovered}></div>
          <div className={styles.description}>Recovered cases:</div>
          <div className={styles.case}>
            <CountUp start={0} end={summary.recovered || 0} duration={1.5} separator="," />
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.indicatorFatal}></div>
          <div className={styles.description}>Fatal cases:</div>
          <div className={styles.case}>
            <CountUp start={0} end={summary.deaths || 0} duration={1.5} separator="," />
          </div>
        </div>
      </div>
    </div>
  )
}
