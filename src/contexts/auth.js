import React, {createContext, useState, useEffect} from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({chidlren}) => {
    const [token, setToken] = useState(null)

    useEffect(() => {

    }, [])

    async function signInContext(data) {
        const response = await api.post('/signUp', data)
        console.log(response.data)
    }

    return (
        <AuthContext.Provider value={{signed: !!token, token, signInContext, signUpContext, logoutContext}}>
            {chidlren}
        </AuthContext.Provider>
    )
}

export default AuthContext;