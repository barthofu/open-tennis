import styles from "./NavBarModules.module.scss"
import DarkModeToggle from "@elements/DarkModeToggle/DarkModeToggle"
import UserAvatar from "@elements/UserAvatar/UserAvatar"
import PushNotification from "@elements/PushNotification/PushNotification"

export default function NavBarModules() {
    return (
    <>
    
    <div className={styles.container}>
        <PushNotification/>
        <DarkModeToggle/>
        <UserAvatar/>
    </div>
    
    </>
    )
}