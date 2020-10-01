import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import Header from '../../components/Header';
import AuthContext from '../../contexts/auth';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import MenuButton from '../../components/MenuButton';
import Chart from '../../components/Chart';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

const HomeScreen = () => {

    //OPÇÕES (PRO) => REVISÕES, ROTINAS, MATÉRIAS, LISTAR TODAS AS REVISÕES, CONFIGURAÇÕES, SOBRE
    //OPÇÕES (BASIC) => REVISÕES, ROTINAS, LISTAR TODAS AS REVISÕES, MATÉRIAS, CONFIGURAÇÕES, TORNE-SE PREMIUM

    const navigation = useNavigation()
    const { logoutContext, setSubjects, setRoutines } = useContext(AuthContext);

    useEffect(() => {
        
        navigation.addListener('focus', async () => {
            await api.get('/listUser').then((response) => {
                if (response) {
                    setSubjects(response.data.subjects)
                    setRoutines(response.data.routines)
                }
            })
        })
        
    }, [navigation])

    function handleClickLogoutButton() {
        logoutContext()
    }

    function handleClickGoToReviewsScreen() {
        navigation.navigate('ReviewsScreen')
    }

    function handleClickGoToRoutineScreen() {
        navigation.navigate('RoutineScreen')
    }

    function handleClickGoToSubjectScreen() {
        navigation.navigate('SubjectScreen')
    }

    function handleClickGoToSettingScreen() {
        navigation.navigate('SettingScreen')
    }

    function handleClickGoToPerformanceScreen() {
        navigation.navigate('PerformanceScreen')
    }

    return (
        <View style={styles.container}>
            <Header title="MENU" onPress={handleClickLogoutButton}>
                <Icon name="logout" size={22} color="#025CE2" />
            </Header>
            
            <View style={styles.graphBox}>
                <Text style={styles.graphBoxTitle}>Você possui 47 revisões pendentes!</Text>
                {/* NESSE GRÁFICO INDICAR A QUANTIDADE DE REVISÕES POR DIA */}
                <Chart />
                <View style={styles.performanceButtonBox}>
                    <BorderlessButton onPress={handleClickGoToPerformanceScreen} style={styles.performanceButton}>
                        <Icon name="up" size={28} color="#025CE2" />
                    </BorderlessButton>
                    <Text style={styles.performanceButtonText}>Visualizar desempenho completo</Text>
                </View>
            </View>

            <View style={styles.menuBox}>
                <View style={styles.menuRow}>
                    <View style={styles.menuItemBox}>
                        <MenuButton onPress={handleClickGoToReviewsScreen} title="Revisões" subtitle="15 Revisões Cadastradas">
                            <Icon name="exception1" size={22} color="#303030" />
                        </MenuButton>
                    </View>
                    <View style={styles.menuItemBox}>
                        <MenuButton onPress={handleClickGoToRoutineScreen} title="Rotinas" subtitle="7 Rotinas">
                            <Icon name="sync" size={22} color="#303030" />
                        </MenuButton>
                    </View>
                    <View style={styles.menuItemBox}>
                        <MenuButton onPress={handleClickGoToRoutineScreen} title="Todas Revisões" subtitle="7 Rotinas">
                            <Icon name="profile" size={22} color="#303030" />
                        </MenuButton>
                    </View>
                </View>
                <View style={styles.menuRow}>
                    <View style={styles.menuItemBox}>
                        <MenuButton onPress={handleClickGoToSubjectScreen} title="Matérias" subtitle="12 Matérias">
                            <Icon name="book" size={22} color="#303030" />
                        </MenuButton>
                    </View>
                    <View style={styles.menuItemBox}>
                        <MenuButton onPress={handleClickGoToSettingScreen} title="Seja Premium">
                            <Icon2 name="trending-up" size={22} color="#303030" />
                        </MenuButton>
                    </View>
                    <View style={styles.menuItemBox}>
                        <MenuButton onPress={handleClickGoToSettingScreen} title="Configurações">
                            <Icon name="setting" size={23} color="#303030" />
                        </MenuButton>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default HomeScreen;