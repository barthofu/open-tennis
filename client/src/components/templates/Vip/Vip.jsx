import styles from "./Vip.module.scss"

export default function Vip ({ vip }) {

    return (<>
        <div className={styles.container}>
            <div className={styles.topRow}>
                
                <div className={styles.leftColumn}>

                    <div className={styles.data}>
                        <div className={styles.title}>Nom</div>
                        <span>{vip.nom}</span>
                    </div>
                    
                    <div className={styles.data}>
                    <div className={styles.title}>Prénom</div>
                        <span>{vip.prenom}</span>
                    </div>

                </div>
                
                <div className={styles.middleColumn}>
                    <div className={styles.picture}>
                        <img src={vip.photo} alt={vip.nom} />
                    </div>
                </div>
                
                <div className={styles.rightColumn}>
                    <div className={styles.data}>
                        <div className={styles.title}>Âge</div>
                        <span>{vip.age}</span>
                    </div>
                    
                    <div className={styles.data}>
                        <div className={styles.title}>Nationalité</div>
                        <span>Pastaga{vip.flag}{vip.nationality}</span>
                    </div>
                
                </div>
            </div>  
            
            <div className={styles.midRow}>
                <div className={styles.data}>
                    <div className={styles.title}>Description</div>
                    <div className={styles.description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    </div>
                </div>
                

                

            </div>

            <div className={styles.bottomRow}>
                <div className={styles.leftColumn}></div>
                <div className={styles.right}></div>
            </div>
            
        </div>
        
    </>
    )
} 