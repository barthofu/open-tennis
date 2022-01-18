import styles from "./NavBar.module.scss"
import SearchBar from "@elements/SearchBar/SearchBar"
import NavBarModules from "@elements/NavBarModules/NavBarModules"


export default function NavBar() {
    return (
    <>
    
    <div className={styles.container}>
        <SearchBar/>
        <NavBarModules/>
    </div>
    
    </>
    )

}