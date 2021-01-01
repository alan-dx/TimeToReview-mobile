import React, {useState, useEffect, useContext} from 'react';
import { Animated, View, Text, TextInput, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import CustomButton from '../../components/CustomButton';
import logoImage from '../../assets/images/icons/logo.png';

import AuthContext from '../../contexts/auth';

import styles from './styles';
import { BorderlessButton } from 'react-native-gesture-handler';

const LoginScreen = () => {

    const { signInContext } = useContext( AuthContext )
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation();

    const [logo] = useState(new Animated.ValueXY({x: 250, y: 250 }))

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


    function handleClickSignInButton() {
        signInContext({email, password})
    }

    function handleGoToForgotPassword() {
        navigation.navigate("ForgotPassword")
    }

    return (
        <View style={styles.container}>
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
                    <View style={styles.labelBoxL}>
                        <View style={styles.labelFrame} />
                        <Text style={styles.label}>Seu Email</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="email@example.com"
                        placeholderTextColor="#565656"
                        onChangeText={e => setEmail(e)}
                        value={email}
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.inputBlock}>
                    <View style={styles.labelBoxR}>
                        <Text style={styles.label}>Sua Senha</Text>
                        <View style={styles.labelFrame} />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="******"
                        placeholderTextColor="#565656"
                        onChangeText={e => setPassword(e)}
                        value={password}
                        secureTextEntry={true}
                    />
                </View>
                <CustomButton text="LOGAR" color='#e74e36' onPress={handleClickSignInButton}/>
                <View style={styles.forgotPasswordBox}>
                    <BorderlessButton onPress={handleGoToForgotPassword}>
                        <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                    </BorderlessButton>
                </View>
            </KeyboardAwareScrollView>
        </View>
    </View>
    )
}

export default LoginScreen;