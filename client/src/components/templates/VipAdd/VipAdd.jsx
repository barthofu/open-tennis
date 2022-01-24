import styles from './VipAdd.module.scss'
import VipForm from '@modules/VipForm/VipForm'
import Router from 'next/router'

export default function VipAdd ({ joueurs }) {

    return (<>
        <VipForm joueurs={joueurs}/>
    </>)
}