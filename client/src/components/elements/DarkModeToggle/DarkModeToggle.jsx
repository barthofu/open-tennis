import styles from './DarkModeToggle.module.scss'

import { useTheme } from 'next-themes'

export default function DarkModeToggle() {

    const {theme, setTheme} = useTheme()

    return(
    <>
        <div className={styles.container}>
            <i className={`${styles.icon} ${theme === 'light' ? 'far' : 'fas'} fa-moon`} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}></i>
        </div>
    </>
    )
}