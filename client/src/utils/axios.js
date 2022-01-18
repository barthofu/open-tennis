import Axios from 'axios'
import { baseURL } from '@configs/connections'

const axios = Axios.create({
    baseURL: baseURL + '/api',
    withCredentials: true
})

// axios.interceptors.request.use((config) => {

//     console.log()
//     return config
// })



// const refreshAuthLogic = (failedRequest) => 
//     axiosInstance
//         .post('/auth/token/refresh', {
//             body: {
//                 refresh_token: localStorage.getItem('refresh_token')
//             }
//         })
//         .then(res => {

//             const { token, refresh_token } = res.data

//             localStorage.setItem('token', token)
//             localStorage.setItem('refresh_token', refresh_token)

//             axiosInstance.defaults.headers.Authorization = `Bearer ${token}`

//             return Promise.resolve()
//         })

// createAuthRefreshInterceptor(axiosInstance, failedRequest =>
//     // 1. First try request fails - refresh the token.
//     axiosInstance.get('/api/refreshToken').then(resp => {
//       // 1a. Clear old helper cookie used in 'authorize.ts' higher order function.
//       if (axiosInstance.defaults.headers.setCookie) {
//         delete axiosInstance.defaults.headers.setCookie
//       }
//       const {accessToken} = resp.data
//       // 2. Set up new access token
//       const bearer = `Bearer ${accessToken}`
//       axiosInstance.defaults.headers.Authorization = bearer
  
//       // 3. Set up new refresh token as cookie
//       const responseCookie = setCookie.parse(resp.headers['set-cookie'])[0] // 3a. We can't just acces it, we need to parse it first.
//       axiosInstance.defaults.headers.setCookie = resp.headers['set-cookie'] // 3b. Set helper cookie for 'authorize.ts' Higher order Function.
//       axiosInstance.defaults.headers.cookie = cookie.serialize(
//         responseCookie.name,
//         responseCookie.value,
//       )
//       // 4. Set up access token of the failed request.
//       failedRequest.response.config.headers.Authorization = bearer
  
//       // 5. Retry the request with new setup!
//       return Promise.resolve()
//     }),
//   )
  

export default axios