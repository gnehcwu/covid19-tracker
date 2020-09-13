import React from 'react'
import styles from './CountrySelector.module.css'
import CountryCard from '../CountryCard/CountryCard'

export default function CountrySelector() {
  return (
    <div className={styles.countrySelector}>
      <div className={styles.sortContainer}>
        <div className={styles.sortTitle}>Browse</div>
      </div>
      <div className={styles.selectArea}>
        <div className={styles.browserLocation}>
          <input type="text" className={styles.area} placeholder="Filter to a country" autoComplete="off" autoCorrect="off" />
        </div>
      </div>
      <div className={styles.countryList}>
        <CountryCard />
        <CountryCard />
        <CountryCard />
        <CountryCard />
        <CountryCard />
        <CountryCard />
        <CountryCard />
        <CountryCard />
        <CountryCard />
        <CountryCard />
      </div>
    </div>
  )
}
