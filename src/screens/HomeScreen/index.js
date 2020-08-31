import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import Header from '../../components/Header';
import AuthContext from '../../contexts/auth';
import Icon from 'react-native-vector-icons/AntDesign';
import MenuButton from '../../components/MenuButton';
import Chart from '../../components/Chart';
import { BorderlessButton } from 'react-native-gesture-handler';

const HomeScreen = () => {

    const { logoutContext } = useContext(AuthContext);

    function handleClickLogoutButton() {
        logoutContext()
    }

    return (
        <View style={styles.container}>
            <Header title="MENU" onPress={handleClickLogoutButton}>
                <Icon name="logout" size={25} style={{alignSelf: 'flex-end'}} color="#025CE2" />
            </Header>
            
            <View style={styles.graphBox}>
                <Text style={styles.graphBoxTitle}>Você possui 47 revisões pendentes!</Text>
                <Chart />
                <View style={styles.performanceButtonBox}>
                    <BorderlessButton style={styles.performanceButton}>
                        <Icon name="up" size={28} color="#025CE2" />
                    </BorderlessButton>
                    <Text style={styles.performanceButtonText}>Visualizar desempenho completo</Text>
                </View>
            </View>

            <View style={styles.menuBox}>
                <View style={styles.menuRow}>
                    <View style={styles.menuItemBox}>
                        <MenuButton title="Revisões" subtitle="15 Revisões Cadastradas">
                            <Icon name="exception1" size={21} style={{alignSelf: 'flex-end'}} color="#F7F7F7" />
                        </MenuButton>
                    </View>
                    <View style={styles.menuItemBox}>
                        <MenuButton title="Rotinas" subtitle="7 Rotinas">
                            <Icon name="sync" size={20} style={{alignSelf: 'flex-end'}} color="#F7F7F7" />
                        </MenuButton>
                    </View>
                </View>
                <View style={styles.menuRow}>
                    <View style={styles.menuItemBox}>
                        <MenuButton title="Matérias" subtitle="12 Matérias">
                            <Icon name="book" size={23} style={{alignSelf: 'flex-end'}} color="#F7F7F7" />
                        </MenuButton>
                    </View>
                    <View style={styles.menuItemBox}>
                        <MenuButton title="Configurações">
                            <Icon name="setting" size={23} style={{alignSelf: 'flex-end'}} color="#F7F7F7" />
                        </MenuButton>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default HomeScreen;