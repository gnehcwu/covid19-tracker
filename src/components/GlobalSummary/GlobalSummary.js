import React from 'react'
import styles from './GlobalSummary.module.css'
import CountUp from 'react-countup';

export default function GlobalSummary({ latestInfo = {} }) {
  return (
    <div className={styles.summary}>
      <div className={styles.header}>
        <h2 className={styles.title}>Total confirmed cases</h2>
        <div className={styles.lastUpdate}>Updated 8 mins ago</div>
      </div>
      <div className={styles.infoConfirmed}>
        <div className={styles.confirmed}>
          <CountUp start={0} end={latestInfo.confirmed || 0} duration={2} separator="," />
        </div>
        <div className={styles.deltaConfirmed}>
          + <CountUp start={0} end={latestInfo.new_confirmed || 0} duration={2} separator="," />
        </div>
      </div>
      <div className={styles.infoDetail}>
        <div className={styles.info}>
          <div className={styles.indicatorActive}></div>
          <div className={styles.description}>Active cases:</div>
          <div className={styles.case}>
            <CountUp start={0} end={latestInfo.active || 0} duration={2} separator="," />
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.indicatorRecovered}></div>
          <div className={styles.description}>Recovered cases:</div>
          <div className={styles.case}>
            <CountUp start={0} end={latestInfo.recovered || 0} duration={2} separator="," />
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.indicatorFatal}></div>
          <div className={styles.description}>Fatal cases:</div>
          <div className={styles.case}>
            <CountUp start={0} end={latestInfo.deaths || 0} duration={2} separator="," />
          </div>
        </div>
      </div>
    </div>
  )
}
