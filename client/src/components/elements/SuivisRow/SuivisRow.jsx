import styles from './SuivisRow.module.scss'
import Link from 'next/link'
import dateFormat from 'dateformat'
import Router from 'next/router'
import axios from '@utils/axios'

export default function SuivisRow ({ suivi }) {

    const deleteSuivi = () => {

        if (window.confirm('Voulez-vous vraiment supprimer ce suivi ?')) {
            axios({
                url: `/proxy/suivis/${suivi.id}`,
                method: 'DELETE',
            })
            .then(res => {
                Router.push(`/dashboard/vips/${suivi.vip.split('/').slice(-1)[0]}`)
            })
            .catch(err => {
                console.error(err)
            })
        }
    }

    return (
        <details className={styles.container}>
            <summary className={styles.summary}>
                <div className={styles.name}>
                    {suivi.title}
                </div>
                <div className={styles.datetime}>
                    {dateFormat(suivi.created_at, 'dd/mm/yyyy - HH:MM')}
                </div>
                <div className={styles.typeContainer}>
                    <div className={`${styles.type} ${styles[suivi['@type'].toLowerCase()]}`}>{suivi['@type']}</div>
                </div>
            </summary>
            <div className={styles.content}>
                <div className={styles.description}>Description : <span>{suivi.description}</span> </div>
                {/* <div className={styles.responsable}> {suivi.responsable} </div> */}
                {
                    suivi.statut && <div className={styles.statut}>Statut : <span>{suivi.statut}</span> </div>
                }
                {
                    suivi.sources && <div className={styles.sources}>Source : <span>{suivi.sources}</span> </div>
                }

                <button className={styles.delete} onClick={deleteSuivi}>Supprimer</button>
            </div>
        </details>
    )

}