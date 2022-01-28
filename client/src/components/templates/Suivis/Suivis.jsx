import styles from './Suivis.module.scss'
import SuivisRow from '@elements/SuivisRow/SuivisRow'
import List from '@modules/List/List'

import { useContext, useEffect, useState } from "react"
import DashboardContext from "@contexts/Dashboard.context"

export default function Suivis ({ suivis }) {

    const sharedState = useContext(DashboardContext)

    return (<>
        <List sections={['Title','Date' ,'Type']}>
        { suivis
            .filter(suivis => `${suivis.title}`.toLowerCase().includes(sharedState.search.value.toLowerCase()))
            .map((suivi, i) => 

                <SuivisRow index={i} key={suivi.id} suivi={suivi}/>

            ) 
        }
        </List>
    </>)
}