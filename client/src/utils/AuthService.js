import axios from './axios'

export default class AuthService {

    async login(username, password) {

        const loginResponse = await this.fetch('/auth/login', {
            method: 'POST',
            body: {
                username,
                password
            }
        })
        
        this.setToken(loginResponse.data.token)

        const meResponse = await this.fetch('/api/me')

        this.setProfile(meResponse.data)

        return this.getProfile()
    }

    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('profile')
    }

    // checkers

    loggedIn() {
        const token = this.getToken()
        return !!token && !isTokenExpired(token)
    }


    // getters et setters

    setProfile(profile) { localStorage.setItem('profile', JSON.stringify(profile)) }

    getProfile() {
        const profile = localStorage.getItem('profile')
        return profile ? JSON.parse(profile) : {}
    }

    setToken(token) { localStorage.setItem('token', token) } 

    getToken() { return localStorage.getItem('token') }

    // fetch

    fetch(url, options) {

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.loggedIn())
            headers['Authorization'] = `Bearer ${this.getToken()}`
        
        return axios(url, {
            headers,
            ...options
        })
    }

}