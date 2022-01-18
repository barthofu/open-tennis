import styles from './PushNotification.module.scss'

export default function PushNotification() {
    
    return (<>
        <div className={styles.container}>
            <i className={`${styles.icon} far fa-bell`}></i>
        </div>

    </>)
}