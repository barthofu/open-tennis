import styles from './Vips.module.scss'
import VipRow from '@elements/VipRow/VipRow'
import List from '@modules/List/List'

export default function Vips ({ vips }) {

    return (<>
        <List sections={['Prenom et Nom', 'Type']}>
        { vips.map(vip => 
            <VipRow key={vip.id} vip={vip}/>
        ) }
        </List>
    </>)
}