import React, { useContext, useEffect, useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import AuthContext from '../../contexts/auth';
import { RectButton } from 'react-native-gesture-handler';
import TimeModal from '../../components/TimeModal';
import api from '../../services/api';

const SettingScreen = () => {

    const { user, setUser } = useContext(AuthContext)
    const [handleTimeModal, setHandleTimeModal] = useState(false)
    const [timeHour, setTimeHour] = useState(new Date(user.reminderTime).getHours())
    const [timeMin, setTimeMin] = useState(new Date(user.reminderTime).getMinutes())

    function handleContactWhatsapp() {
        Linking.canOpenURL(`whatsapp://app`).then((res) => {
            if (!res) {
                alert("Você não possui esse aplicativo!")
            } else {
                Linking.openURL(`whatsapp://app`)
            }
        })
    }

    function handleContactFacebook() {
        Linking.canOpenURL(`fb://app`).then((res) => {
            if (!res) {
                alert("Você não possui esse aplicativo!")
            } else {
                Linking.openURL(`fb://app`)
            }
        })
    }

    function handleContactInstagram() {
        Linking.canOpenURL(`instagram://app`).then((res) => {
            if (!res) {
                alert("Você não possui esse aplicativo!")
            } else {
                Linking.openURL(`instagram://app`)
            }
        })
    }

    function handleCloseTimeModal() {
        setHandleTimeModal(false)

        api.post("/setTimeReminder", {
            date: new Date(0,0,0,timeHour, timeMin)
        }).then((res) => {
            user.reminderTime = res.data.reminderTime
            setUser(user)
            setTimeHour(new Date(res.data.reminderTime).getHours())
            setTimeMin(new Date(res.data.reminderTime).getMinutes())
        }).catch((err) => {
            alert(err, "Houve um erro durante a edição do horário, tente novamente!")
        })

    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <RectButton style={styles.profilePhotoBox}>
                    <Icon name="camera" size={40} color="#303030" />
                </RectButton>
                <Text style={styles.profileName}>{user.name}</Text>
                <Text style={styles.profileEmail}>{user.email}</Text>
            </View>
            <View style={styles.body}>
                <RectButton style={styles.optionContainer}>
                    <Text style={styles.optionText}>Zerar gráficos de desempenho</Text>
                    <Icon name="chevron-right" size={20} color="#60c3eb" />
                </RectButton>
                <RectButton style={styles.optionContainer} onPress={() => setHandleTimeModal(true)}>
                    <Text style={styles.optionText}>Definir horário do lembrete</Text>
                    <Icon name="chevron-right" size={20} color="#60c3eb" />
                </RectButton>
                <RectButton style={styles.optionContainer}>
                    <Text style={styles.optionText}>Futuras atualizações</Text>
                    <Icon name="chevron-right" size={20} color="#60c3eb" />
                </RectButton>
                <RectButton style={styles.optionContainer}>
                    {/* Explicar como funciona o cálclo da próxima data */}
                    <Text style={styles.optionText}>Tira dúvidas</Text>
                    <Icon name="chevron-right" size={20} color="#60c3eb" />
                </RectButton>
                <RectButton style={styles.optionContainer}>
                    <Text style={styles.optionText}>Seu perfil</Text>
                    <Icon name="chevron-right" size={20} color="#60c3eb" />
                </RectButton>
                <RectButton style={styles.optionContainer}>
                    <Text style={styles.optionText}>Tutorial</Text>
                    <Icon name="chevron-right" size={20} color="#60c3eb" />
                </RectButton>
                <RectButton style={styles.optionContainer}>
                    <Text style={styles.optionText}>Sobre</Text>
                    <Icon name="chevron-right" size={20} color="#60c3eb" />
                </RectButton>
                <View style={styles.devBox}>
                    <Text style={styles.optionText}>Compartilhe com seus amigos!</Text>
                    <View style={styles.devBoxButtons}>
                        <RectButton onPress={handleContactInstagram}>
                            <Icon2 name="instagram" size={30} color="#303030" />
                        </RectButton>
                        <RectButton onPress={handleContactWhatsapp}>
                            <Icon3 name="whatsapp" size={32} color="#303030" />
                        </RectButton>
                        <RectButton onPress={handleContactFacebook}>
                            <Icon2 name="facebook-square" size={30} color="#303030" />
                        </RectButton>
                    </View>
                </View>
            </View>
            {   
                //Resolve useRef undefined
                handleTimeModal ? <TimeModal
                    timeHour={timeHour}
                    timeMin={timeMin}
                    setTimeHour={setTimeHour}
                    setTimeMin={setTimeMin}
                    modalVisible={handleTimeModal}
                    handleCloseModal={handleCloseTimeModal}
                /> : null
            }

        </View>
    )
    
}

export default SettingScreen;