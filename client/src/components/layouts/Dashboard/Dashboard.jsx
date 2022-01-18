import styles from './Dashboard.module.scss'

import NavBar from '@modules/NavBar/NavBar'
import SideBar from '@modules/SideBar/SideBar'

import Script from 'next/script'

export default function Dashboard({ children }) {
    return (<>
    
        <SideBar/>
        <NavBar/>
        <div className={styles.content}>
            { children[0] }
            <span className={styles.separator}></span>
            { children[1] }
        </div>

        
        <Script 
            src="https://kit.fontawesome.com/d055a26e11.js"
            strategy="beforeInteractive"
            crossOrigin="anonymous"
        />
    
    </>)
}