import SuivisRow from "@elements/SuivisRow/SuivisRow"
import List from "@modules/List/List"
import SuivisForm from "@modules/SuivisForm/SuivisForm"
import Link from "next/link"
import styles from "./Vip.module.scss"

export default function Vip ({ vip, responsableId }) {

    return (<>
        <div className={styles.container}>
        
            <div className={styles.header}>  </div>
        
            <div className={styles.infos}>

                <section className={styles.photo}>
                    <img src={vip.photo || "https://www.batitoiture.lu/wp-content/uploads/2017/12/profile.png"} alt={vip.nom} />
                </section>

                <section className={styles.utils}>
                    <h1 className={styles.name}>{vip.prenom} {vip.nom.toUpperCase()}</h1>
                    <div>
                        <span className={styles.age}>{vip.age} ans </span>
                         - 
                        <span className={styles.nationalite}> {vip.nationalite}</span>
                    </div>

                    <div className={styles.priseEnCharge}>Prise en charge : <span>{vip.priseEnCharge}</span></div>
                    

                    { vip['@type'] === 'Joueur' && <>
                        <div className={styles.classementATP}>#{vip.classementATP}</div>
                        <div className={styles.accompagnants}>
                            Accompagnants : 
                            {vip.accompagnants.map(accompagnant => 
                                <Link key={accompagnant.id} href={`/dashboard/vips/${accompagnant.id}`}>
                                    <a className={styles.accompagnant}>{accompagnant.prenom.slice(0, 1)}. {accompagnant.nom}</a>
                                </Link>
                            )}
                        </div>
                    </> }
                    { vip['@type'] === 'Accompagnant' && <>
                        <div className={styles.categorie}>{vip.categorie}</div>
                        <div className={styles.accompagne}>
                            Accompagne : 
                            <Link href={`/dashboard/vips/${vip.accompagne.id}`}>
                                <a>{vip.accompagne.nom.slice(0, 1)}. {vip.accompagne.prenom}</a>
                            </Link>
                        </div>
                        </>
                    }
                </section>

                { vip.description && vip.description !== "" ? <>
                    <span className={styles.separator}></span>

                    <section className={styles.description}>
                        {vip.description}
                    </section> </>:
                    ''
                }

            </div>

            <span className={styles.separator}></span>

            <div className={styles.suivisContainer}>
                  <List sections={[ 'Titre', 'Date', 'Type' ]}>
                      {vip.suivis
                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                        .map((suivi, i) => 
                            <SuivisRow index={i} key={suivi.id} suivi={suivi}/>
                        )
                      }
                  </List>  
                  <span className={styles.separator}></span>
                  <SuivisForm vip={vip} responsableId={responsableId}/>
            </div>

        </div>
        
        
    </>
    )
} 