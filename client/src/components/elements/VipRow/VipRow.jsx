import Link from 'next/link'
import styles from './VipRow.module.scss'

export default function VipRow ({ index, vip }) {

    return (<>
        <Link href={`/dashboard/vips/[id]`} as={`/dashboard/vips/${vip.id}`}>
            <a style={{ animationDelay: `${index * 0.05}s` }} className={styles.container} >
                <div className={styles.name}>
                    {vip.prenom} {vip.nom}
                </div>
                <div className={`${styles.type} ${styles[vip['@type'].toLowerCase()]}`}>
                    {vip['@type']}
                </div>
            </a>
        </Link>
    </>)

}