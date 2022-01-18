import styles from "./NavBar.module.scss"
import SearchBar from "@elements/SearchBar/SearchBar"
import DarkModeToggle from "@elements/DarkModeToggle/DarkModeToggle"
import UserAvatar from "@elements/UserAvatar/UserAvatar"
import PushNotification from "@elements/PushNotification/PushNotification"

export default function NavBar() {
    return (<>
    
    <div className={styles.container}>
        <SearchBar/>
            
        <div className={styles.modules}>
            <PushNotification/>
            <DarkModeToggle/>
            <UserAvatar/>
        </div>
    </div>
    <span className={styles.separator}></span>
    
    </>)

}