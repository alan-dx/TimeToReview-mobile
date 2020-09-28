import React, {createContext, useState, useEffect} from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    
    const [routines, setRoutines] = useState([])
    const [subjects, setSubjects] = useState([])

    useEffect(() => {
        async function loadStorageData() {
            const storageToken = await AsyncStorage.getItem("@TTR:token")
            const storageUser = await AsyncStorage.getItem("@TTR:user")

            if (storageToken) {
                setToken(storageToken)
                setUser(JSON.parse(storageUser))
                api.defaults.headers["Authorization"] = `Bearer ${storageToken}`//VERFICAR A NECESSIDADE DE CAUSAR O LOGOUT QND TOKEN FOR INVÁLIDO

                await api.get('/verifyToken').catch((err) => {
                    logoutContext()
                })
            }
        }
        loadStorageData()
    }, [])

    // useEffect(() => {//VERIFICAR A POSSIBILIDADE DE FAZER A REQUISIÇÃO AO ABRIR O APP (economizar dados)
    //     async function loadServerReviews() {
    //         api.get('/indexReviews').then((response) => {
    //             console.log(response)
    //         })
    //     }

    //     loadServerReviews()
    // }, [routines])

    async function signInContext(data) {
        try {

            const response = await api.post('/signIn', data)
            // const teste = await api.get('https://servicodados.ibge.gov.br/api/v1/localidades/distritos/160030312/')
    
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
        <AuthContext.Provider value={{signed: token, user: user, signInContext, signUpContext, logoutContext, loadUserReviews, routines, setRoutines, subjects, setSubjects}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;