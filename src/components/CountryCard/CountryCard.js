import React from 'react';
import styles from './CountryCard.module.css'
import cx from 'classnames'
import { ACTIONS } from '../../state-manage/reducer'

export default function CountryCard({ country, dispatch, selectedCoutry }) {
  function handleClick() {
    dispatch({ type: ACTIONS.SWITCH_COUNTRY, payload: { country: country.code } })
  }

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={cx(styles.card, country.code === selectedCoutry && styles.selected)} tabIndex="0">
        <div className={styles.title}>
          <span role="img" aria-label="China" className={styles.flag}>{country.flag}</span>
          <span className={styles.name}>{country.name}</span>
        </div>
        <div className={styles.confirm}>{country.confirmed}</div>
      </div>
    </div>
  )
}
