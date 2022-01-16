import AuthService from "./AuthService"
import { useState, useEffect } from 'react'

export default function WithAuth({ children }) {

    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        
        const authService = new AuthService()
        
        if (!authService.loggedIn()) {
            //redirect to login page
        }
        setIsLoading(false)
    }, [])

    return isLoading ? (
        <div>LOADING...</div>
    ) : children
}