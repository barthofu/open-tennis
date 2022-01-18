import styles from './DarkModeToggle.module.scss'

export default function DarkModeToggle() {
    return(
    <>
        <div className={styles.container}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0l-11 6v12.131l11 5.869 11-5.869v-12.066l-11-6.065zm7.91 6.646l-7.905 4.218-7.872-4.294 7.862-4.289 7.915 4.365zm-16.91 1.584l8 4.363v8.607l-8-4.268v-8.702zm10 12.97v-8.6l8-4.269v8.6l-8 4.269z"/></svg>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M1.004 6.251l10.996-5.998 10.99 6.06-10.985 5.861-11.001-5.923zm11.996 7.676v9.82l10-5.362v-9.82l-10 5.362zm-2 0l-10-5.411v9.869l10 5.362v-9.82z"/></svg> */}
        </div>


    </>
    )
}