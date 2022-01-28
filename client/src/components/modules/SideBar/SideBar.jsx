import styles from "./SideBar.module.scss"
import SideBarTab from "@elements/SideBarTab/SideBarTab"
import SideBarFooter from "@elements/SideBarFooter/SideBarFooter"

import { useState } from 'react'
import { useTheme } from 'next-themes'

import logo_dark from '@assets/images/logo_dark.png'
import logo_light from '@assets/images/logo_light.png'

const logos = {
    light: 'https://cdn.discordapp.com/attachments/755176230264766616/936449309426192435/logo_light.png',
    dark: 'https://cdn.discordapp.com/attachments/755176230264766616/936449309656891422/logo_dark.png'
}

export default function SideBar() {

    const {theme, setTheme} = useTheme()

    return (
    <>
        <div className={styles.container}>
            <div>
                {
                    theme === 'light' ? 
                        <img className={styles.logo} alt="Open Tennis" src="https://cdn.discordapp.com/attachments/755176230264766616/936449309426192435/logo_light.png" /> :
                        <img className={styles.logo} alt="Open Tennis" src="https://cdn.discordapp.com/attachments/755176230264766616/936449309656891422/logo_dark.png" />
                }
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
