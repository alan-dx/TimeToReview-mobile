import React, {useState, useEffect, useContext} from 'react';
import { Animated, View, Text, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';

import CustomButton from '../../components/CustomButton';
import logoImage from '../../assets/images/icons/logo.png';

import AuthContext from '../../contexts/auth';
import styles from './styles';

const LoginScreen = () => {

    const { signUpContext } = useContext(AuthContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')

    const [logo, setLogo] = useState(new Animated.ValueXY({x: 250, y: 250 }))

    useEffect(() => {
        keyBoardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
        keyBoardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)

        NetInfo.fetch().then(state => {
            console.log("Is connected?", state.isConnected);
            if (!state.isConnected) {
                alert('Verifique sua conexão com a internet e tente novamente!')
                navigation.goBack()
            }
        })
    }, [])

    function keyboardDidShow() {
        Animated.parallel([
            Animated.timing(logo.x, {
                toValue: 160,
                duration: 100,
                useNativeDriver: false
            }),
            Animated.timing(logo.y, {
                toValue: 160,
                duration: 100,
                useNativeDriver: false
            }),
            
        ]).start()
    }

    function keyboardDidHide() {
        Animated.parallel([
            Animated.timing(logo.x, {
                toValue: 250,
                duration: 100,
                useNativeDriver: false
            }),
            Animated.timing(logo.y, {
                toValue: 250,
                duration: 100,
                useNativeDriver: false
            }),
            
        ]).start()
    }

    const navigation = useNavigation();

    function handleClickSignUpButton() {
        if (password != cPassword) {
            return alert("As senhas não conferem! Verifique e tente novamente.")
        }
        if (password && cPassword && name && email) {
            signUpContext({name, email, password})
            navigation.goBack()
        } else {
            alert("Você precisa preencher todos os campos antes de continuar!")
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.topBox}>
                <View style={styles.logoBox}>
                    <Animated.Image source={logoImage} style={{width: logo.x, height: logo.y}} />
                </View>

            </View>
        <View style={styles.selectBox}>
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.inputGroup}
                scrollEnabled={true}
                enableOnAndroid={true}              
            >
                <View style={styles.inputBlock}>
                    <View style={styles.labelBoxR}>
                        <Text style={styles.label}>Qual seu nome?</Text>
                        <View style={styles.labelFrame} />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#565656"
                        value={name}
                        onChangeText={e => setName(e)}
                        autoCapitalize="words"
                    />
                </View>
                <View style={styles.inputBlock}>
                    <View style={styles.labelBoxL}>
                        <View style={styles.labelFrame} />
                        <Text style={styles.label}>Seu Email</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="email@example.com"
                        placeholderTextColor="#565656"
                        value={email}
                        onChangeText={e => setEmail(e)}
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.inputBlock}>
                    <View style={styles.labelBoxR}>
                        <Text style={styles.label}>Sua senha</Text>
                        <View style={styles.labelFrame} />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="******"
                        placeholderTextColor="#565656"
                        value={password}
                        onChangeText={e => setPassword(e)}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.inputBlock}>
                    <View style={styles.labelBoxL}>
                        <View style={[styles.labelFrame, {width: '28%'}]} />
                        <Text style={styles.label}>Confirme a senha</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="******"
                        placeholderTextColor="#565656"
                        value={cPassword}
                        onChangeText={e => setCPassword(e)}
                        secureTextEntry={true}
                    />
                </View>
                <CustomButton text="CADASTRAR" color='#60c3eb' onPress={handleClickSignUpButton} />
            </KeyboardAwareScrollView>
        </View>
    </KeyboardAvoidingView>
    )
}

export default LoginScreen;