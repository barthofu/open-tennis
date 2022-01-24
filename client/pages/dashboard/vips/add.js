import Default from '@layouts/Dashboard/Dashboard'
import VipAdd from '@templates/VipAdd/VipAdd'
import axios from '@utils/axios'

export default function VipAddPage ({ joueurs }) {

    return (<>
        <VipAdd joueurs={joueurs}/>
    </>)
}

export async function getServerSideProps ({ req }) {

    const res = await axios.get('/proxy/joueurs', { headers: { 'cookie': req.headers.cookie } }).catch(e => console.log('erreur'))
    if (!res?.data['hydra:member']) return { redirect: { destination: '/auth/login' } }
  
    return {
        props: {
            joueurs: res.data['hydra:member']
        }
    }
}