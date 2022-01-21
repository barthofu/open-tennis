import Dashboard from '@layouts/Dashboard/Dashboard'
import Vips from '@templates/Vips/Vips'
import Vip from '@templates/Vip/Vip'
import VipStats from '@templates/VipStats/VipStats'

import axios from '@utils/axios'

export default function DashboardPage ({ vips }) {

  return (<>

    <Dashboard>
      <Vips vips={vips}></Vips>
      <VipStats vips={vips}></VipStats>
    </Dashboard>
  </>)
}

export async function getServerSideProps ({ req }) {

  const res = await axios.get('/proxy/vips', { headers: { 'cookie': req.headers.cookie } }).catch(e => console.log('erreur'))
  if (!res?.data['hydra:member']) return { redirect: { destination: '/auth/login' } }

  return {
      props: {
          vips: res.data['hydra:member']
      }
  }
}
