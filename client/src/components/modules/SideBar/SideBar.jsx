import styles from "./SideBar.module.scss"
import SideBarTab from "@elements/SideBarTab/SideBarTab"
import SideBarFooter from "@elements/SideBarFooter/SideBarFooter"

import Image from "next/image"
import { useState } from 'react'

export default function SideBar() {

    return (
    <>
        <div className={styles.container}>
        <div>
            <img className={styles.logo} alt="Open Tennis" src="https://cdn.discordapp.com/attachments/755176230264766616/929042998698844220/logo_ot.png" />
            <div className={styles.menu}>
                <SideBarTab label="Dashboard" link="/" icon="fas fa-tachometer-alt"/>
                <SideBarTab label="VIPs" link="/dashboard/vips" icon="far fa-user"/>
                <SideBarTab label="Suivis" link="/dashboard/suivis" icon="far fa-newspaper"/>
            </div>
        </div>

            <SideBarFooter/>
        </div>

    
    </>
    )

}
