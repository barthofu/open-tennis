import axios from 'axios'

export default async function refreshToken (req, res) {
    
    const { headers } = req
    
    try {
        const { data, headers: returnedHeaders } = await axios.post(
            '/auth/refresh-token',
            undefined,
            { headers },
        )

        Object.keys(returnedHeaders).forEach(key =>
            res.setHeader(key, returnedHeaders[key]),
        )

        res.status(200).json(data)
    } catch (error) {
        res.send(error)
    }
}