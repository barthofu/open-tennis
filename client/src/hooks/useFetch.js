import axios from '@utils/axios'
import cookieCutter from 'cookie-cutter'
import { useEffect,useState } from 'react'

export default function useFetch (url, options) {

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {(
        async () => {
            try {
                setLoading(true)
                const res = await axios(
                    url,
                    {
                        headers: {
                            'Authorization': `Bearer ${cookieCutter.get('token')}`
                        }
                    }
                )
                setData(res.data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
    )()}, [url, options])

    return { data, error, loading }
}