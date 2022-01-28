import Dashboard from '@layouts/Dashboard/Dashboard'
import Vips from '@templates/Vips/Vips'
import Vip from '@templates/Vip/Vip'
import Stats from '@modules/Stats/Stats'

import axios from '@utils/axios'

export default function DashboardPage ({ vips, suivis }) {

	return (<>

		<Dashboard>
		<Vips vips={vips}></Vips>
		<Stats vips={vips} suivis={suivis}></Stats>
		</Dashboard>
	</>)
}

export async function getServerSideProps ({ req }) {

	const vips = await axios.get('/proxy/vips', { headers: { 'cookie': req.headers.cookie } }).catch(e => console.log('erreur'))
	if (!vips?.data['hydra:member']) return { redirect: { destination: '/auth/login' } }

	const suivis = await axios.get('/proxy/suivis', { headers: { 'cookie': req.headers.cookie } }).catch(e => console.log('erreur'))
	if (!suivis?.data['hydra:member']) return { redirect: { destination: '/auth/login' } }

	return {
		props: {
			vips: vips.data['hydra:member'],
			suivis: suivis.data['hydra:member']
		}
	}
}
