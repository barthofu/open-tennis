import styles from './VipRow.module.scss'

export default function VipRow ({ vip }) {

    return (<>
        <p><strong>{vip.nom} {vip.prenom}</strong> - {vip['@type']}</p>
    </>)

}