import styles from './VipEdit.module.scss'
import VipForm from '@modules/VipForm/VipForm'

export default function VipAdd ({ vip, joueurs, categoriesAccompagnant }) {

    return (<>
        <VipForm 
            joueurs={joueurs} 
            categoriesAccompagnant={categoriesAccompagnant}
            edit={true}
            data={vip}
            
        />
    </>)
}