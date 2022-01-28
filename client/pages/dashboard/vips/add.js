import Default from '@layouts/Dashboard/Dashboard'
import VipAdd from '@templates/VipAdd/VipAdd'
import axios from '@utils/axios'

export default function VipAddPage ({ joueurs, categoriesAccompagnant }) {

    return (<>
        <VipAdd joueurs={joueurs} categoriesAccompagnant={categoriesAccompagnant}/>
    </>)
}

export async function getServerSideProps ({ req }) {

    const joueurs = await axios.get('/proxy/joueurs', { headers: { 'cookie': req.headers.cookie } }).catch(e => console.log('erreur'))
    if (!joueurs?.data['hydra:member']) return { redirect: { destination: '/auth/login' } }

    const categoriesAccompagnant = await axios.get('/proxy/categorie_accompagnants', { headers: { 'cookie': req.headers.cookie } }).catch(e => console.log('erreur'))
    if (!categoriesAccompagnant?.data['hydra:member']) return { redirect: { destination: '/auth/login' } }

    return {
        props: {
            joueurs: joueurs.data['hydra:member'],
            categoriesAccompagnant: categoriesAccompagnant.data['hydra:member']
        }
    }
}