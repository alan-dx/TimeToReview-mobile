import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, Image, Text, Linking, Alert, ToastAndroid, ScrollView, TouchableHighlight } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import AuthContext from '../../contexts/auth';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
import notifications from '../../services/notifications';
import PushNotification from 'react-native-push-notification';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import { openComposer } from 'react-native-email-link';
import CustomModal from '../../components/CustomModal';

const SettingScreen = (props) => {

    const navigation = useNavigation()

    const { user, setUser, logoutContext } = useContext(AuthContext)
    const [userName, setUserName] = useState(user.name)
    const [handleTimeModal, setHandleTimeModal] = useState(false)
    const [handleReportModal, setHandleReportModal] = useState(false)
    const [timeHour, setTimeHour] = useState(new Date(user.reminderTime).getHours())
    const [timeMin, setTimeMin] = useState(new Date(user.reminderTime).getMinutes())
    const [filePath, setFilePath] = useState(null)

    useEffect(()  => {

        async function loadStorageProfilePhoto() {
            let source = await AsyncStorage.getItem("@TTR:profilephoto")
            setFilePath(JSON.parse(source))
        }

        console.log(user.reminderTime, new Date('1899-12-31T13:01:00.000Z'))

        loadStorageProfilePhoto()
    }, [])
    
    // timeModal
    const minRef = useRef()
    const hourRef = useRef()

    let hours = [...Array(24).keys()]
    let minutes = [...Array(60).keys()]

    function handleSelectTime(e, data, fun) {
        let posY = e.nativeEvent.contentOffset.y
        fun(data[Math.round(posY/30)])
    }

    function scrollToTime(hour, minute) { //called on modalUseEffect of customModal
        let posYHour = hour * 30
        let posYMin = minute * 30
        hourRef.current.scrollTo({x: 0, y: posYHour, animated: true})
        minRef.current.scrollTo({x: 0, y: posYMin, animated: true})

    }
    //timeModal


    function handleContactWhatsapp() {
        Linking.canOpenURL(`whatsapp://send?phone=${1111}`).then((res) => {
            if (!res) {
                alert("Esta aplicação não esta disponível em seu dispositivo!")
            } else {
                Linking.openURL(`whatsapp://send?phone=${1111}`)
            }
        })
    }

    function handleContactFacebook() {
        Linking.canOpenURL(`fb://app`).then((res) => {
            if (!res) {
                alert("Esta aplicação não esta disponível em seu dispositivo!")
            } else {
                Linking.openURL(`fb://app`)
            }
        })
    }

    function handleContactInstagram() {
        Linking.canOpenURL(`instagram://user?username=instagram`).then((res) => {
            if (!res) {
                alert("Esta aplicação não esta disponível em seu dispositivo!")
            } else {
                Linking.openURL(`instagram://user?username=instagram`)
            }
        })
    }

    function handleCloseTimeModalAndConfirm() {
        setHandleTimeModal(false)
        api.post("/setTimeReminder", {
            date: new Date(0,0,0,timeHour, timeMin)
        }).then((res) => {
            console.log(res.data.reminderTime)
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
            console.log(err)
                if (err == 'Error: Request failed with status code 500') {
                    alert("Erro interno do servidor, tente novamente mais tarde!")
                } else if (err = 'Error: Network Error') {
                    alert("Sessão expirada!")
                    logoutContext()
                } else {
                    alert('Houve um erro ao tentar modificar o horário de lembrete, tente novamente!')
                }
        })

    }
    function handleCloseTimeModalAndCancel() {
        setHandleTimeModal(false)
    }

    function handleResetCharts() {
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
                }).catch((err) => {
                    console.log(err)
                    if (err == 'Error: Request failed with status code 500') {
                        alert('Erro interno do servidor, tente novamente mais tarde!')
                    } else if (err == 'Error: Network Error') {
                        alert('Sessão expirada!')
                        logoutContext()
                    } else {
                        alert('Houve um erro desconhecido, tente novamente mais tarde!')
                    }
                })
              }}
            ],
            { cancelable: false }
          );
    }

    function handleCloseReportModal() {
        setHandleReportModal(false)
    }

    function handleChangeProfilePhoto() {
       ImagePicker.showImagePicker({
           title: "Selecionar Foto",
           mediaType: "photo",
           storageOptions: {
            skipBackup: true,
            path: 'images',
          },
       }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');

            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                alert("Precisamos dessa permissão...")
            } else if (response.customButton) {
                console.log(
                'User tapped custom button: ',
                response.customButton
                );
                console.log(response.customButton);
            } else {
                let source = response;
                console.log('uri',response.path)
                setFilePath(source);
                AsyncStorage.setItem("@TTR:profilephoto", JSON.stringify(source))
            }
    
       })
    }

    function handleUpdateUserData(newName) {
        if (newName) {
            console.log(newName)
            setUserName(newName)
        }
    }

    function handleRestartTutorial() {
        Alert.alert(
            "Feito!",
            "O tutorial das telas foi reinicado com sucesso, para visualizar novamente basta acessar a tela desejada no menu.",
            [
              {
                text: "Confirmar",
                onPress: async () => {
                    await AsyncStorage.multiRemove([
                        "@TTR:firstTimeReviewsScreen", 
                        "@TTR:firstTimeAllReviewsScreen",
                        "@TTR:firstTimeRoutineScreen",
                        "@TTR:firstTimeSubjectScreen",
                        "@TTR:firstTimePerformanceScreen",
                        "@TTR:firstTimeHomeScreen",
                        "@TTR:firstTimeOpenTips"
                    ])
                },
                style: "cancel"
              },
            ],
            { cancelable: false }
          );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <RectButton style={styles.profilePhotoBox} onPress={handleChangeProfilePhoto}>
                    { (filePath != null) ? 
                        <Image source={{uri: 'data:image/jpeg;base64,' + filePath.data}} style={{width: 150, height: 150, borderRadius: 100}} /> : 
                        <Icon name="camera" size={40} color="#303030" />
                    }
                </RectButton>
                <Text style={styles.profileName}>{userName}</Text>
                <Text style={styles.profileEmail}>{user.email}</Text>
            </View>
            <View style={styles.body}>
                <RectButton style={styles.optionContainer} onPress={handleResetCharts}>
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
                <RectButton style={styles.optionContainer} onPress={handleRestartTutorial}>
                    <Text style={styles.optionText}>Reiniciar o tutorial</Text>
                    <Icon name="chevron-right" size={20} color="#60c3eb" />
                </RectButton>
                <RectButton style={styles.optionContainer} onPress={() => setHandleReportModal(true)}>
                    <Text style={styles.optionText}>Entre em contato</Text>
                    <Icon name="chevron-right" size={20} color="#60c3eb" />
                </RectButton>
                <RectButton style={styles.optionContainer} onPress={() => navigation.navigate("DoubtsScreen")}>
                    {/* Explicar como funciona o cálclo da próxima data */}
                    <Text style={styles.optionText}>Tira dúvidas</Text>
                    <Icon name="chevron-right" size={20} color="#60c3eb" />
                </RectButton>
                <RectButton style={styles.optionContainer} onPress={() => navigation.navigate("ProfileScreen", {
                    onGoBack: handleUpdateUserData
                })}>
                    <Text style={styles.optionText}>Seu perfil</Text>
                    <Icon name="chevron-right" size={20} color="#60c3eb" />
                </RectButton>
                <RectButton style={styles.optionContainer} onPress={() => navigation.navigate("AboutScreen")}>
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
                handleTimeModal ? <CustomModal
                    modalVisible={handleTimeModal}
                    handleCloseModalButton={handleCloseTimeModalAndCancel}
                    handleConfirmModalButton={handleCloseTimeModalAndConfirm}
                    modalUseEffect={() => {setTimeout(() => {
                        scrollToTime(timeHour, timeMin)
                    }, 10)}}
                    modalCardHeight={200}
                    modalTitle="HORA LEMBRETE"
                >
                    <View style={styles.timeModalScrollBox}>
                        <Text style={styles.timeModalScrollLabel}>Selecione um horário</Text>
                        <View style={styles.timeModalTimerScroll}>
                            {/* O TAMANHO DO SCROLL DA INCOMBATIVEL COM ALGUNS DISPOSITIVOS, ESTA RECEBENDO VALORES QUEBRADOS */}
                            <View style={styles.timeModalScrollSelectItemLeft} />
                            <View style={styles.timeModalScrollSelectItemRight} />
                                <ScrollView
                                    ref={hourRef}
                                    showsVerticalScrollIndicator={false}
                                    decelerationRate="fast"
                                    contentContainerStyle={{
                                        paddingVertical: 30,
                                    }}
                                    snapToInterval={30}
                                    onMomentumScrollEnd={(e) => handleSelectTime(e, hours, setTimeHour)}
                                >
                                    {hours.map((value, key) => { 
                                        return (
                                            <View key={key} style={styles.timeModalScrollItem}>
                                                <Text style={styles.timeModalScrollText}>
                                                    {value < 10 ? '0' + value : value}
                                                </Text>
                                            </View>
                                        )}
                                    )}
                                </ScrollView>
                                <Text style={{fontSize: 20, marginBottom: 5}}>:</Text>
                                <ScrollView
                                    ref={minRef}
                                    showsVerticalScrollIndicator={false}
                                    decelerationRate="fast"
                                    snapToInterval={30}
                                    contentContainerStyle={{
                                        paddingVertical: 30,
                                    }}
                                    onMomentumScrollEnd={(e) => handleSelectTime(e, minutes, setTimeMin)}

                                >
                                    {minutes.map((value, key) => (
                                        <View key={key} style={styles.timeModalScrollItem}>
                                            <Text style={styles.timeModalScrollText}>
                                                {value < 10 ? '0' + value : value}
                                            </Text>
                                        </View>
                                    ))}
                                </ScrollView>
                        </View>
                    </View>
                </CustomModal> : null
            }
            {
                handleReportModal ? <CustomModal 
                    modalVisible={handleReportModal}
                    handleCloseModalButton={handleCloseReportModal}
                    modalCardHeight={250}
                    modalTitle="ENTRE EM CONTATO"
                    doNotShowCheckButton
                >
                    <View style={styles.reportModalInfoBox}>
                        <Text style={styles.reportModalInfoText}>
                            Relate bugs, sugestões, agradecimentos ou qualquer problema que tenha enfrentado em nosso App, nosso 
                            objetivo é promover a melhor experiência possível para nossos usuários.
                        </Text>
                    </View>
                    <TouchableHighlight style={styles.reportModalCustomButton} underlayColor={"#72c3eb"} onPress={() => {
                        openComposer({
                            to: 'suportettr@gmail.com',
                            subject: 'O que deseja relatar?',
                            })
                    }} >
                        <Text style={styles.reportModalCustomButtonText}>CONTATE</Text>
                    </TouchableHighlight>
                </CustomModal>: null
            }

        </View>
    )
    
}

export default SettingScreen;