import React, {createContext, useState, useEffect} from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    
    const [routines, setRoutines] = useState([])
    const [subjects, setSubjects] = useState(null)
    const [reviews, setReviews] = useState([])
    const [allReviews, setAllReviews] = useState([])

    async function loadServerData() {
        console.log('requisição')
        return await api.get('/listUser')
    }

    useEffect(() => {
        async function loadStorageData() {
            const storageToken = await AsyncStorage.getItem("@TTR:token")
            const storageUser = await AsyncStorage.getItem("@TTR:user")

            if (storageToken) {
                setUser(JSON.parse(storageUser))
                setToken(storageToken)
                api.defaults.headers["Authorization"] = `Bearer ${storageToken}`//VERFICAR A NECESSIDADE DE CAUSAR O LOGOUT QND TOKEN FOR INVÁLIDO
                await api.get('/verifyToken').catch((err) => {
                    logoutContext()
                })
            }
        }
        loadStorageData()
    }, [])

    async function signInContext(data) {
        try {

            const response = await api.post('/signIn', data)
    
            if (response.data) {
                const { token, user } = response.data;
                api.defaults.headers["Authorization"] = `Bearer ${token}`
                AsyncStorage.setItem("@TTR:token", token)
                AsyncStorage.setItem("@TTR:user", JSON.stringify(user))
                setToken(token)
                setUser(user)
            }
        } catch (error) {
            alert(`Senha/Email Incorretos. Verifique e tente novamente!, ${error}`)
        }
    }

    async function signUpContext(data) {
        try {
            const response = await api.post('/signUp', data)
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

    async function loadUserReviews(user_id) {
        try {
            const response = await api.get('/indexReviews', {
                params: {
                    user_id: user_id
                }
            })

            return response.data

        } catch (err) {
            alert(err)
        }
    }

    return (
        <AuthContext.Provider value={{signed: token, user: user, signInContext, signUpContext, logoutContext, loadUserReviews, routines, setRoutines, subjects, setSubjects, reviews, setReviews, loadServerData, allReviews, setAllReviews}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;