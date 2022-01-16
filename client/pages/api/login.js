import axios from '@utils/axios'
 
export default async function login (req, res) {
    
    const { headers, body } = req

    try {
        const { data, headers: returnedHeaders } = await axios.post(
            '/auth/login',
            body,
            { headers }
        )

        Object.entries(returnedHeaders).forEach((keyArr) =>
            res.setHeader(keyArr[0], keyArr[1])
        )
    } catch ({ response: { status, data }}) {
        res.status(status).json(data)
    }
}