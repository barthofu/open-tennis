import styles from './UserAvatar.module.scss'

export default function UserAvatar() {
    return (
    <>
    
        <div className={styles.container}>
            <i className={`${styles.icon} far fa-user`}></i>
            <div className={styles.user}>Bartholomé {/*{admin.name}*/}</div>
        </div>



    </>
    )
}