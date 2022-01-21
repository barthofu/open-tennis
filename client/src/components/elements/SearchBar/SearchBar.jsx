import styles from "./SearchBar.module.scss"

import { useContext } from "react"
import DashboardContext from "@contexts/Dashboard.context"

export default function SearchBar() {

    const sharedState = useContext(DashboardContext)

    return(
        <>
            <div className={styles.container}>  
                <input 
                    type="text" 
                    placeholder="Rechercher..."
                    id="submit-search"
                    value={sharedState.search.value}
                    onChange={(e) => sharedState.search.set(e.target.value)}
                />
                <label htmlFor="submit-search">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"/></svg>
                </label>
            </div>
        </>
    )
}