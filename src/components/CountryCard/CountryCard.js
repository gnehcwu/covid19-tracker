import React, { useState } from 'react';
import styles from './CountryCard.module.css'
import cx from 'classnames'

export default function CountryCard({ country }) {
  const [selected, setSelected] = useState(false)

  function handleClick() {
    setSelected(!selected);
  }

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={cx(styles.card, selected && styles.selected)} tabIndex="0">
        <div className={styles.title}>
          <span role="img" aria-label="China" className={styles.flag}>{country.flag}</span>
          <span className={styles.name}>{country.name}</span>
        </div>
        <div className={styles.confirm}>{country.confirmed}</div>
      </div>
    </div>
  )
}
