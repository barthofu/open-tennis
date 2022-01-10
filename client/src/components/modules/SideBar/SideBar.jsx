import styles from "./SideBar.module.scss"
import SideBarTab from "@elements/SideBarTab/SideBarTab"
import SideBarFooter from "@elements/SideBarFooter/SideBarFooter"
import Image from "next/image"

export default function SideBar() {
    return (
    <>
        <div className={styles.container}>
            {/* <Image
            alt="Logo"
            // src={}
            layout="fill"
            objectFit="contain"
            /> */}
            <div className={styles.menu}>
                <SideBarTab label="Dashboard" link="/"/>
                <SideBarTab label="Liste VIP" link="/vip"/>
                <SideBarTab label="Suivis" link="/suivis"/>
            </div>
            <SideBarFooter/>
        </div>

    
    </>
    )

}
