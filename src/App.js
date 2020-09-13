import React from 'react';
import { CountrySelector, GlobalSummary } from './components'
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.nav}>
        <GlobalSummary />
        <CountrySelector />
      </div>
      <div className={styles.content}>
        <div className={styles.contentHeader}>
          <div className={styles.header}>
            <h2 className={styles.title}>Global</h2>
          </div>
        </div>
        <div className={styles.detail}>
        </div>
      </div>
    </div>
  );
}

export default App;
