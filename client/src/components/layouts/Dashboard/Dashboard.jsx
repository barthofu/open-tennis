import styles from './Dashboard.module.scss'

import NavBar from '@modules/NavBar/NavBar'
import SideBar from '@modules/SideBar/SideBar'
import DashboardContext from '@contexts/Dashboard.context'

import Script from 'next/script'
import { useState } from 'react'

export default function Dashboard({ children }) {

    const [search, setSearch] = useState('');

    const sharedState = {
        search: {
            value: search,
            set: setSearch
        }
    }

    return (<>
        <DashboardContext.Provider value={sharedState}>
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
        </DashboardContext.Provider>

    </>)
}