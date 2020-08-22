import React from 'react';
import {
    View,
    Text
} from 'react-native';
import styles from './styles';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const DecisionLogin = () => {
    
    const navigation = useNavigation()

    function handleClickNavigateToSignIn() {
        navigation.navigate('SignIn')
    }

    function handleClickNavigateToSignUp() {
        navigation.navigate('SignUp')
    }

    return (
        <View style={styles.container}>
            <View style={styles.topBox}>
                <Text style={styles.titleTop}>SEJA BEM VINDO!</Text>
                <View style={styles.logoBox}>

                </View>
            </View>
            <View style={styles.selectBox}>
                <View style={styles.selectContainer}>
                        <Text style={styles.selectText}>O que deseja fazer?</Text>
                        <CustomButton text="LOGIN" color='#DE0078' onPress={handleClickNavigateToSignIn} />
                        <CustomButton text="CADASTRO" color='#01BA6C' onPress={handleClickNavigateToSignUp}/>
                </View>
                <Text style={styles.devText}>Por: Alan Almeida</Text>
            </View>
        </View>
    )
}

export default DecisionLogin;