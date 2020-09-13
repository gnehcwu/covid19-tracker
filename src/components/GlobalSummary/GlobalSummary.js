import React, { useState } from 'react'
import styles from './GlobalSummary.module.css'

export default function GlobalSummary() {
  return (
    <div className={styles.summary}>
      <div className={styles.header}>
        <h2 className={styles.title}>Total confirmed cases</h2>
        <div className={styles.lastUpdate}>Updated 8 mins ago</div>
      </div>
      <div className={styles.infoConfirmed}>
        <div className={styles.confirmed}>28797422</div>
        <div className={styles.deltaConfirmed}>+ 266518</div>
      </div>
      <div className={styles.infoDetail}>
        <h2 className={styles.info}>
          <div className={styles.indicatorActive}></div>
          <div className={styles.description}>Active cases</div>
          <div className={styles.total}>19,491,050</div>
        </h2>
        <h2 className={styles.info}>
          <div className={styles.indicatorRecovered}></div>
          <div className={styles.description}>Recovered cases</div>
          <div className={styles.total}>19,491,050</div>
        </h2>
        <h2 className={styles.info}>
          <div className={styles.indicatorFatal}></div>
          <div className={styles.description}>Fatal cases</div>
          <div className={styles.total}>19,491,050</div>
        </h2>
      </div>
    </div>
  )
}
