import styles from './Vips.module.scss'
import VipRow from '@elements/VipRow/VipRow'
import List from '@modules/List/List'

import { useContext, useEffect, useState } from "react"
import DashboardContext from "@contexts/Dashboard.context"

export default function Vips ({ vips }) {

    const sharedState = useContext(DashboardContext)

    return (<>
        <List sections={['Prenom et Nom', 'Type']}>
        { vips
            .filter(vip => `${vip.prenom} ${vip.nom}`.toLowerCase().includes(sharedState.search.value.toLowerCase()))
            .map((vip, i) => 

                <VipRow index={i} key={vip.id} vip={vip}/>

            ) 
        }
        </List>
    </>)
}