import styles from './UserAvatar.module.scss'

export default function UserAvatar() {
    return (
    <>
    
        {/* <div className={styles.container}>
            <i className={`${styles.icon} far fa-user`}></i>
            <div className={styles.dropdownMenu}>

            </div>
        </div> */}

        <div className={styles.container}>
            <ul>
                <li className={styles.dropdown}>

                    <i className={`${styles.icon} far fa-user`}></i>    

                    <div className={styles.dropdownMenu} aria-labelledby="dropdownUser">
                        <div class={styles.dropdowItem}>

                            <h5 class="">Bartholomé Gili</h5>
    
                        </div>

                        <div className={styles.dropdownDivider}></div>
                        
                        <ul>
                            <li>
                                <a className={styles.dropdownItem} href="">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-power">
                                            <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                                            <line x1="12" y1="2" x2="12" y2="12"></line>
                                        </svg>
                                    </span>
                                    Se déconnecter
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>

    </>
    )
}