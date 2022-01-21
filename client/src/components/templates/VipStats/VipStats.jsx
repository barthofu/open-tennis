import styles from './VipStats.module.scss'

import { useContext } from "react"
import DashboardContext from "@contexts/Dashboard.context"

export default function VipStats({ vips }) {

    const sharedState = useContext(DashboardContext)

    return <div>{sharedState.search.value}</div>
}