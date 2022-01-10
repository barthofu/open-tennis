import styles from "./SideBarTab.module.scss"
import Link from "next/link"

export default function SideBarTab({ label, link }) {
    return(
    <>
    
    <Link href={ link }>
        <a>{ label }</a> 
    </Link>
    
    </>
    )
}