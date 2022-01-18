import Dashboard from '@layouts/Dashboard/Dashboard'
import Vips from '@templates/Vips/Vips'
import Vip from '@templates/Vip/Vip'
import VipStats from '@templates/VipStats/VipStats'

import { useRouter } from 'next/router'
import Modal from 'react-modal'
import axios from '@utils/axios'

export default function DashboardPage ({ vips }) {
  const router = useRouter()

  return (<>

    <Modal
      isOpen={!!router.query.id}
      onRequestClose={() => router.push('/dashboard/vips', undefined, { shallow: true })}
      contentLabel='Vip'
      ariaHideApp={false}
    >
      <Vip vip={vips.find(vip => vip.id === router.query.id)} pathname={router.pathname}></Vip>
    </Modal>

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
          vips: res.data['hydra:member'].concat(res.data['hydra:member'])
      }
  }
}
