import React, { useContext, useEffect, useState } from 'react';
import { View, Image, Text, Linking, Alert, ToastAndroid } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import AuthContext from '../../contexts/auth';
import { RectButton } from 'react-native-gesture-handler';
import TimeModal from '../../components/TimeModal';
import api from '../../services/api';
import notifications from '../../services/notifications';
import PushNotification from 'react-native-push-notification';
import { useNavigation } from '@react-navigation/native';

const SettingScreen = () => {

    const navigation = useNavigation()

    const { user, setUser } = useContext(AuthContext)
    const [handleTimeModal, setHandleTimeModal] = useState(false)
    const [timeHour, setTimeHour] = useState(new Date(user.reminderTime).getHours())
    const [timeMin, setTimeMin] = useState(new Date(user.reminderTime).getMinutes())

    function handleContactWhatsapp() {
        Linking.canOpenURL(`whatsapp://send?phone=${1111}`).then((res) => {
            if (!res) {
                alert("Você não possui esse aplicativo!")
            } else {
                Linking.openURL(`whatsapp://send?phone=${1111}`)
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
        Linking.canOpenURL(`instagram://user?username=alan_almj`).then((res) => {
            if (!res) {
                alert("Você não possui esse aplicativo!")
            } else {
                Linking.openURL(`instagram://user?username=alan_almj`)
            }
        })
    }

    function handleCloseTimeModal() {
        setHandleTimeModal(false)
        api.post("/setTimeReminder", {
            date: new Date(0,0,0,timeHour, timeMin)
        }).then((res) => {
            const currentDate = new Date()
            const reminderTime = new Date(res.data.reminderTime)
            user.reminderTime = reminderTime

            setUser(user)
            setTimeHour(reminderTime.getHours())
            setTimeMin(reminderTime.getMinutes())

            PushNotification.cancelAllLocalNotifications()

            //Para remover o aviso no dia em que foi setado bote + 1 no dia

            notifications
                .configure()
                .localNotificationSchedule(
                {
                    channelId: "default-channel-id",
                    title:'TimeToReview!',
                    message:`É hora de revisar, vamos lá? Não deixe pra depois...`,
                    date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), reminderTime.getHours(), reminderTime.getMinutes(), reminderTime.getSeconds()),
                    vibrate:500,
                    priority: "high",
                    repeatType: "day",
                    allowWhileIdle: true
                }
        )
        }).catch((err) => {
            alert(err, "Houve um erro durante a edição do horário, tente novamente!")
        })

    }

    function handleCleanCharts() {
        Alert.alert(
            "Atenção!",
            "Você tem certeza que deseja zerar os gráficos de desempenho? Essa ação é realizada automaticamente toda segunda-feira.",
            [
              {
                text: "Cancelar",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Confirmar", onPress: () => {
                api.get('/resetCharts').then((response) => {
                    ToastAndroid.show('Gráficos e ciclos resetados!', 600)
                    navigation.navigate("PreLoadScreen")
                }).catch((err) => alert(err))
              }}
            ],
            { cancelable: false }
          );
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
                <RectButton style={styles.optionContainer} onPress={handleCleanCharts}>
                    <Text style={styles.optionText}>Zerar dados de desempenho</Text>
                    <Icon name="chevron-right" size={20} color="#60c3eb" />
                </RectButton>
                <RectButton style={styles.optionContainer} onPress={() => setHandleTimeModal(true)}>
                    <Text style={styles.optionText}>Definir horário do lembrete</Text>
                    <Icon name="chevron-right" size={20} color="#60c3eb" />
                </RectButton>
                <RectButton style={styles.optionContainer} onPress={() => navigation.navigate("UpdatesScreen")} >
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