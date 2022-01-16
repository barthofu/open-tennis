import styles from './LoginForm.module.scss'
import { useState } from 'react'
import cookieCutter from 'cookie-cutter'
import axios from '@utils/axios'

export default function LoginForm () {

    const [ credentialsError, setCredentialsError ] = useState(false)

    const logUser = (event) => {
        event.preventDefault()

        axios
            .post('/auth/login', {
                    username: event.target.username.value, 
                    password: event.target.password.value 
                }
            )
            .then(async loginResponse => {
                const { token, refresh_token } = loginResponse.data

                cookieCutter.set('token', token, { path: '/' })
                cookieCutter.set('refresh_token', refresh_token, {path: '/' })

                const meResponse = await axios({
                    url: '/api/me',
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                })

                cookieCutter.set('profile', JSON.stringify(meResponse.data), { path: '/' })

            })
            .catch(err => {
                setCredentialsError(true)
            })
    }


    return (
        <form onSubmit={logUser}>
            
            { credentialsError && <span className='error'>Identifiants invalides</span> }

            <label htmlFor='username'></label>
            <input type="text" placeholder="Nom d'utilisateur" name="username" id="username" required />

            <label htmlFor='password'></label>
            <input type="password" placeholder="Mot de passe" name="password" id="password" required />

            <button type="submit">Se connecter</button>
        </form>
    )
}