import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import CustomButton from '../../components/CustomButton';
import AuthContext from '../../contexts/auth';
import api from '../../services/api';
import styles from './styles';

const ChangePassScreen = () => {

    const navigation = useNavigation()
    const { logoutContext } = useContext(AuthContext)
    const [password, setPassword] = useState()
    const [cPassword, setCPassword] = useState()


    function handleCheckPass() {
        if (password != cPassword) {
            return alert('As senhas não conferem, verifique e tente novamente!')
        } else {
            api.post('/changePassword', {
                password: password
            }).then((response) => {
                alert('Senha redefinida com sucesso!')
                navigation.navigate('PreLoadScreen')
            }).catch((err) => {
                console.log(err)
                if (err == 'Error: Request failed with status code 401') {
                    alert("Redefinição não autorizada, tente novamente!")
                } else if (err = 'Error: Network Error') {
                    alert("Sessão expirada!")
                    logoutContext()
                } else {
                    alert('Houve um erro durante ao verificar sua senha, tente novamente.')
                }
            })
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputBlock}>
                <View style={styles.labelBoxL}>
                    <View style={styles.labelFrame} />
                    <Text style={styles.label}>Insira a nova senha:</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="******"
                    placeholderTextColor="#565656"
                    onChangeText={e => setPassword(e)}
                    value={password}
                    secureTextEntry
                    keyboardType="default"
                />
            </View>
            <View style={styles.inputBlock}>
                    <View style={styles.labelBoxR}>
                        <Text style={styles.label}>Confirme a nova senha:</Text>
                        <View style={styles.labelFrame} />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="******"
                        placeholderTextColor="#565656"
                        onChangeText={e => setCPassword(e)}
                        value={cPassword}
                        secureTextEntry={true}
                    />
                </View>
            <CustomButton text="REDEFINIR" color='#e74e36' onPress={handleCheckPass} />
        </View>
    )
}

export default ChangePassScreen;
