import Default from '@layouts/Dashboard/Dashboard'
import VipEdit from '@templates/VipEdit/VipEdit'
import axios from '@utils/axios'

export default function VipEditPage ({ vip, categoriesAccompagnant, joueurs }) {

    return (<>
        <VipEdit vip={vip} categoriesAccompagnant={categoriesAccompagnant} joueurs={joueurs}/>
    </>)
}

export async function getServerSideProps ({ req, params: { id } }) {

    const res = await axios.get(`/proxy/vips/${id}`, { headers: { 'cookie': req.headers.cookie } }).catch(e => console.log('erreur'))
    if (!res?.data['id']) return { redirect: { destination: '/auth/login' } }

    // fetch vips relations
    if (res.data['@type'] === 'Accompagnant') {
        const resAccompagne = await axios.get(`/proxy/joueurs/${res.data.accompagne.split('/').slice(-1)}`, { headers: { 'cookie': req.headers.cookie } }).catch(e => console.log('erreur'))
        if (resAccompagne?.data['id']) res.data.accompagne = resAccompagne.data
        else res.data.accompagne = null

        //fetch categorie
        const resCategorie = await axios.get(`/proxy/categorie_accompagnants/${res.data.categorie.split('/').slice(-1)}`, { headers: { 'cookie': req.headers.cookie } }).catch(e => console.log('erreur'))
        if (resCategorie?.data['id']) res.data.categorie = resCategorie.data
    }
    else if (res.data['@type'] === 'Joueur') {
        const accompagnants = res.data.accompagnants.map(accompagnant => accompagnant.split('/').slice(-1)[0])
        res.data.accompagnants = []
        for (const accompagnant of accompagnants) {
            const resAccompagnant = await axios.get(`/proxy/accompagnants/${accompagnant}`, { headers: { 'cookie': req.headers.cookie } }).catch(e => console.log('erreur'))
            if (resAccompagnant?.data['id']) res.data.accompagnants.push(resAccompagnant.data)
        }
    }

    const categoriesAccompagnant = await axios.get('/proxy/categorie_accompagnants', { headers: { 'cookie': req.headers.cookie } }).catch(e => console.log('erreur'))
    if (!categoriesAccompagnant?.data['hydra:member']) return { redirect: { destination: '/auth/login' } }

    const joueurs = await axios.get('/proxy/joueurs', { headers: { 'cookie': req.headers.cookie } }).catch(e => console.log('erreur'))
    if (!joueurs?.data['hydra:member']) return { redirect: { destination: '/auth/login' } }

    console.log(res.data)

    return {
        props: {
            joueurs: joueurs.data['hydra:member'],
            vip: res.data,
            categoriesAccompagnant: categoriesAccompagnant.data['hydra:member']
        }
    }
}