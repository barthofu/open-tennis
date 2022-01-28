import styles from './LoginForm.module.scss'
import { useState } from 'react'
import axios from '@utils/axios'
import Router from 'next/router'
import { useTheme } from 'next-themes'

export default function LoginForm () {

    const [ credentialsError, setCredentialsError ] = useState(false)
    const { theme, setTheme } = useTheme()

    const logUser = (event) => {
        event.preventDefault()

        const data = {
            username: event.target.username.value,
            password: event.target.password.value,
        }

        axios({
            url: '/login',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify(data)
        })
        .then(res => {
            Router.push('/')
        })
        .catch(err => {
            setCredentialsError(true)
        })
    }

    return (
        <div className={styles.formContainer}>
                {
                    theme === 'light' ? 
                        <img className={styles.logo} alt="Open Tennis" src="https://cdn.discordapp.com/attachments/755176230264766616/936449309426192435/logo_light.png" /> :
                        <img className={styles.logo} alt="Open Tennis" src="https://cdn.discordapp.com/attachments/755176230264766616/936449309656891422/logo_dark.png" />
                }            <form onSubmit={logUser}>
                
                { credentialsError && <span className='error'>Identifiants invalides</span> }

                <label htmlFor='username'></label>
                <input type="text" placeholder="Nom d'utilisateur" name="username" id="username" required />

                <label htmlFor='password'></label>
                <input type="password" placeholder="Mot de passe" name="password" id="password" required />

                <button type="submit">Se connecter</button>
            </form>
        </div>
    )
}