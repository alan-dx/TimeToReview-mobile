import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import CustomButton from '../../components/CustomButton';

import styles from './styles';

const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.topBox}>
                <View>
                
                    <Text style={styles.titleTop}>LOGIN</Text>
                </View>
                <View style={styles.logoBox}>

                </View>
            </View>
        <View style={styles.selectBox}>
            <KeyboardAwareScrollView 
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.inputGroup}
                scrollEnabled={false}
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
                    />
                </View>
                <CustomButton text="LOGAR" color='#DE0078' />
            </KeyboardAwareScrollView>
        </View>
    </View>
    )
}

export default LoginScreen;