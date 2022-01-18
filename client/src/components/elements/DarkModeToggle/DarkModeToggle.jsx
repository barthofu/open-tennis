import styles from './DarkModeToggle.module.scss'

import { useState } from 'react'

export default function DarkModeToggle() {

    const [isDarkMode, setIsDarkMode] = useState(false)

    return(
    <>
        <div className={styles.container}>
            <i className={`${styles.icon} ${isDarkMode ? 'far' : 'fas'} fa-moon`} onClick={() => setIsDarkMode(!isDarkMode)}></i>
        </div>
    </>
    )
}