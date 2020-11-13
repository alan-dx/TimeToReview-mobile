import React, { useCallback, useContext, useEffect } from 'react';
import {View, Text, BackHandler} from 'react-native';
import styles from './styles';
import { BorderlessButton } from  'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../contexts/auth';

const Header = (props) => {

    const navigation = useNavigation()
    const { logoutContext } = useContext(AuthContext);

    function handleGoBack() {
        if (props.title == "REVISÕES") {
            props.route?.params.onGoBack()
    
            if (props.route?.params.finishCycleActive) {//EM OUTRAS TELAS PASSE SEMPRE COMO TRUE
                navigation.goBack()
            } else {
                alert("Há um ciclo em execução, finalize-o primeiro!")
            }
        } else {
            navigation.goBack()
        }
    }

    useEffect(//Call goBack function many times
        () => {
            if (props.title == "REVISÕES") {
                BackHandler.addEventListener('hardwareBackPress', () => {
                    return true
                })
            } else {
                BackHandler.removeEventListener('hardwareBackPress')
            }
            // console.log('OK', props.route?.params.finishCycleActive)
            // if (props.title == "REVISÕES") {
            //     console.log(props.title)
            //     if (props.route?.params.finishCycleActive) {
            //         BackHandler.addEventListener('hardwareBackPress', () => {
            //             console.log('1')
            //             props.route?.params.onGoBack()
            //         })
            //     } else if (props.route?.params.finishCycleActive != undefined) {
            //         BackHandler.addEventListener('hardwareBackPress', () => {
            //             console.log(props.route?.params.finishCycleActive)
            //             alert("Há um ciclo em execução, finalize-o primeiro!")
            //             return true
            //         })
            //     }
            // }
        },[props.route?.params.finishCycleActive])

    function handleLogout() {
        logoutContext();
    }

    return (
        <View style={[styles.container, {backgroundColor: props.color}]}>
            <Text style={styles.title}>{props.title}</Text>
            {
              props.showLogout ? (
                <View style={styles.buttonBox}> 
                    <BorderlessButton onPress={handleLogout} style={styles.buttonContainer}>
                        <Icon name="logout" size={20} color="#FFF" />
                    </BorderlessButton>
                </View>
            ) : (
                <View style={styles.buttonBox}> 
                    <BorderlessButton onPress={handleGoBack} style={styles.buttonContainer}>
                        <Icon name="left" size={20} color="#FFF" />
                    </BorderlessButton>
                </View>
                )

            }
        </View>
    );
}

export default Header;