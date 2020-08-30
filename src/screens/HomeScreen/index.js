import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import Header from '../../components/Header';
import AuthContext from '../../contexts/auth';
import Icon from 'react-native-vector-icons/AntDesign';
import MenuButton from '../../components/MenuButton';

const HomeScreen = () => {

    const { logoutContext } = useContext(AuthContext);

    function handleClickLogoutButton() {
        logoutContext()
    }

    return (
        <View style={styles.container}>
            <Header title="MENU" />
            
            <View style={styles.graphBox}>

            </View>

            <View style={styles.menuBox}>
                <View style={styles.menuRow}>
                    <View style={styles.menuItemBox}>
                        <MenuButton />
                    </View>
                    <View style={styles.menuItemBox}>
                        <MenuButton />
                    </View>
                </View>
                <View style={styles.menuRow}>
                    <View style={styles.menuItemBox}>
                        <MenuButton />
                    </View>
                    <View style={styles.menuItemBox}>
                        <MenuButton />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default HomeScreen;