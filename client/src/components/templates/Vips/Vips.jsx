import styles from './Vips.module.scss'
import VipRow from '@elements/VipRow/VipRow'

export default function Vips ({ vips }) {

    return (<>
        { vips.map(vip => 
            <VipRow key={vip.id} vip={vip}/>
        ) }
    </>)
}