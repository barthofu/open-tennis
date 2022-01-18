import styles from "./SideBarTab.module.scss"
import Link from "next/link"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function SideBarTab({ label, link, icon }) {

    const router = useRouter()
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {

        if (router.pathname === link) setIsActive(true)

    }, [link, router.pathname])

    return(<>

        <Link href={ link }>
            <a className={isActive ? styles.active : ''}><i className={`${styles.icon} ${icon}`} /> <span>{ label }</span></a> 
        </Link>
    
    </>)
}