import React, { useCallback } from 'react'
import styles from './GlobalSummary.module.css'
import CountUp from 'react-countup';

export default function GlobalSummary({ summary = {}, updated }) {
  const getHumanUpdatedTime = useCallback(
    () => {
      const updateTime = (((Date.now() - new Date(updated)) / (60 * 1000))).toFixed()
      if (!updateTime) return 'Updated just now'
      else if (updateTime < 60) return `Updated ${updateTime} mins ago`
      else return 'Updated more than an hour ago'
    },
    [updated],
  )

  return (
    <div className={styles.summary}>
      <div className={styles.header}>
        <h2 className={styles.title}>Total confirmed cases</h2>
        <div className={styles.lastUpdate}>{getHumanUpdatedTime()}</div>
      </div>
      <div className={styles.infoConfirmed}>
        <div className={styles.confirmed}>
          <CountUp start={0} end={summary.confirmed || 0} duration={0.7} separator="," />
        </div>
        <div className={styles.deltaConfirmed}>
          + <CountUp start={0} end={summary.new_confirmed || 0} duration={0.7} separator="," />
        </div>
      </div>
      <div className={styles.infoDetail}>
        <div className={styles.info}>
          <div className={styles.indicatorActive}></div>
          <div className={styles.description}>Active cases:</div>
          <div className={styles.case}>
            <CountUp start={0} end={summary.active || 0} duration={0.7} separator="," />
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.indicatorRecovered}></div>
          <div className={styles.description}>Recovered cases:</div>
          <div className={styles.case}>
            <CountUp start={0} end={summary.recovered || 0} duration={0.7} separator="," />
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.indicatorFatal}></div>
          <div className={styles.description}>Fatal cases:</div>
          <div className={styles.case}>
            <CountUp start={0} end={summary.deaths || 0} duration={0.7} separator="," />
          </div>
        </div>
      </div>
    </div>
  )
}
