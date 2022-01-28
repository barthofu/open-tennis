import Dashboard from '@layouts/Dashboard/Dashboard'
import Suivis from '@templates/Suivis/Suivis'
// import Vip from '@templates/Suivi/Vip'
import SuivisStats from '@templates/SuivisStats/SuivisStats'

import axios from '@utils/axios'

export default function DashboardPage ({ suivis }) {

  return (<>

    <Dashboard>
      <Suivis suivis={suivis}></Suivis>
      <SuivisStats suivis={suivis}></SuivisStats>
    </Dashboard>
  </>)
}

export async function getServerSideProps ({ req }) {

  const res = await axios.get('/proxy/suivis', { headers: { 'cookie': req.headers.cookie } }).catch(e => console.log('erreur'))
  if (!res?.data['hydra:member']) return { redirect: { destination: '/auth/login' } }

  return {
      props: {
          suivis: res.data['hydra:member']
      }
  }
}
