import styles from './VipAdd.module.scss'
import VipForm from '@modules/VipForm/VipForm'

export default function VipAdd ({ joueurs, categoriesAccompagnant }) {

    return (<>
        <VipForm joueurs={joueurs} categoriesAccompagnant={categoriesAccompagnant}/>
    </>)
}