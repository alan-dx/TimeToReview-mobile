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
        navigation.goBack()
        props.route?.params.onGoBack()
    }

    useEffect(//Call goBack function many times
        useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', () => {
                props.route?.params.onGoBack()
            })
        }),[])

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