import React from 'react'
import LostUserImage from '../assets/404oopsies.png';
import styles from '../styles/NotFound.module.css';

const NotFound = () => {
  return (
    <div className={`${styles.Distancing} text-center`}>
        <img className={styles.Image} src={LostUserImage} />
        <p className={`mt-4 ${styles.Text}`}><strong>ERROR 404: </strong> Seems like there's nothing to see here :/</p>
    </div>
  )
}

export default NotFound