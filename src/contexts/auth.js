import React, {createContext, useState, useEffect} from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [token, setToken] = useState(null)

    useEffect(() => {
        async function loadStorageData() {
            const storageToken = await AsyncStorage.getItem("@TTR:token")

            if (storageToken) {
                setToken(storageToken)
                api.defaults.headers["Authorization"] = `Bearer ${storageToken}`
            }
        }

        loadStorageData()
    }, [])

    async function signInContext(data) {
        try {
        const response = await api.post('/signIn', data)
        
        if (response.data) {
            const { token } = response.data;
            api.defaults.headers["Authorization"] = `Bearer ${token}`
            AsyncStorage.setItem("@TTR:token", token)
            setToken(token)
        }
        } catch (error) {
            alert("Senha/Email Incorretos. Verifique e tente novamente!")
        }
    }

    async function signUpContext(data) {
        try {
            const response = await api.post('/signUp', data)
            console.log(response.data)
        } catch (error) {
            if (error == "Error: Request failed with status code 400") {
                alert("Usuário já cadastrado! Verifique os dados e tente novamente.")
            } else if (error == "Error: Request failed with status code 500") {
                alert("Houve um erro interno no servidor, tente novamente mais tarde!")
            } else {
                alert(error)
            }
        }
    }

    async function logoutContext() {
        try {
            await AsyncStorage.removeItem("@TTR:token")
            setToken(null)
        } catch (err) {
            alert(err)
        }
    };
    return (
        <AuthContext.Provider value={{signed: token, signInContext, signUpContext, logoutContext}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;