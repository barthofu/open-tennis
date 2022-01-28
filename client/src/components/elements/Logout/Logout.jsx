import styles from './Logout.module.scss'
import Link from 'next/link'

export default function Logout() {
    return (
        <>

            <div className={styles.container}>
                <Link href="/api/logout">
                    <a><i className={`${styles.icon} fas fa-sign-out-alt`}></i></a>
                </Link>
            </div>
        
        </>
    )
}