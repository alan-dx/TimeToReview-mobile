import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import CustomButton from '../../components/CustomButton';
import AuthContext from '../../contexts/auth';

const HomeScreen = () => {

    const { logoutContext } = useContext(AuthContext);

    function handleClickLogoutButton() {
        logoutContext()
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>HOMESCREEN - EM DESENOLVIMENTO...</Text>
            <CustomButton text="SAIR" color='#025CE2' onPress={handleClickLogoutButton} />
        </View>
    )
}

export default HomeScreen;