import styles from "./List.module.scss"

export default function List ({ sections, children }) {

    return (<>
        <div className={styles.container}>
            <header className={styles.header}>
                { sections.map((section, i) =>
                    <div key={i} className={styles.section}>{section}</div>
                ) }
            </header>
            <span className={styles.separator}></span>
            <ul className={styles.list}>
                { children }
            </ul>
        </div>
    </>)
}