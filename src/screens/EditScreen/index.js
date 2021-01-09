import React, { useState, useEffect, useContext } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import { BorderlessButton } from "react-native-gesture-handler"
import Input from '../../components/Input';
import { useNavigation } from '@react-navigation/native';
import PickerInfo from '../../components/Picker';
import api from '../../services/api';
import AuthContext from '../../contexts/auth';
import DocumentPicker from 'react-native-document-picker';
import UUIDGenerator from 'react-native-uuid-generator';
import RNFetchBlob from 'rn-fetch-blob';
import InputWLabelL from '../../components/InputWLabelL';

const EditScreen = (props) => {

    const dataScreen = props.route.params.screenData

    const {routines, subjects, user, setSubjects, allReviews, setAllReviews, logoutContext } = useContext(AuthContext)

    const [titleReview, setTitleReview] = useState(dataScreen.title)
    const [trackAudioReview, setTrackAudioReview] = useState(dataScreen.track)
    const [notesReview, setNotesReview] = useState(dataScreen.notes)
    const [subjectReview, setSubjectReview] = useState(dataScreen.subject_id)
    const [routineReview, setRoutineReview] = useState(dataScreen.routine_id)
    const [dateNextSequenceReview, setDateNextSequenceReview] = useState(new Date(dataScreen.dateNextSequenceReview));
    const [currentSequenceReview, setCurrentSequenceReview] = useState(dataScreen.routine_id.sequence[dataScreen.currentSequenceReview])
    const [createdDate] = useState(new Date(dataScreen.createdAt))

    const navigation = useNavigation();

    useEffect(() => {
        let previousDate = new Date(dataScreen.dateNextSequenceReview)
        let nextSequenceReview = dataScreen.routine_id.sequence[dataScreen.currentSequenceReview + 1]
        // console.log(previousDate.getDate(), nextSequenceReview, previousDate.getDay() + nextSequenceReview)
        previousDate.setDate(previousDate.getDate() + Number(nextSequenceReview))
        
        if (props.route.params.fromReviewsScreen) {
            setDateNextSequenceReview(previousDate)
        }

    }, [])

    function handlePressGoBack() {
        navigation.goBack()
    }

    function editReview() {

        let editData = {//check if the data has been modified to decide whether or not to send
            title: titleReview != dataScreen.title ? titleReview : null,
            subject_id: subjectReview._id != dataScreen.subject_id._id ? subjectReview._id : null,
            routine_id: routineReview._id != dataScreen.routine_id._id ? routineReview._id : null,
            track: trackAudioReview != dataScreen.track ? trackAudioReview : null,
            notes: notesReview != dataScreen.notes ? notesReview : null
        }

        console.log('editData', editData)
        
        if (editData.title || editData.subject_id || editData.routine_id || editData.track || editData.notes) {
            api.put('/editReview', editData,
            {
                params: {
                    id: dataScreen._id
                }
            }).then((response) => {

                const index = allReviews.findIndex(item => item._id == response.data.review._id)
                const newAllReviews = allReviews
                newAllReviews[index] = response.data.review

                setAllReviews(newAllReviews)

                props.route.params.onGoBack(response.data.review)
                navigation.goBack()
                
            }).catch((err) => {
                console.log(err)
                if (err == 'Error: Request failed with status code 500') {
                    alert("Erro interno do servidor, tente novamente mais tarde!.")
                } else if (err = 'Error: Network Error') {
                    alert("Sessão expirada!")
                    logoutContext()
                } else {
                    alert('Houve um erro ao tentar salvar sua revisão no banco de dados, tente novamente!')
                }
            })
        }

        if (subjectReview._id != dataScreen.subject_id._id) {//REPRESENTA A MODIFICAÇÃO DA MATÉRIA, MODIFICA APENAS O NÚMERO DE REVISÕES ASSOCIADAS NA TELA DE MATÉRIAS
            //TENTAR USAR O MAP AO INVES DO setSubjects
            const newSubjects = subjects

            const indexOldSubject = subjects.findIndex(item => item._id == dataScreen.subject_id._id)
            const indexNewSubject = subjects.findIndex(item => item._id == subjectReview._id)

            newSubjects[indexOldSubject].associatedReviews = newSubjects[indexOldSubject].associatedReviews.filter(item => item != dataScreen._id)
            newSubjects[indexNewSubject].associatedReviews.push(dataScreen._id)

            setSubjects(newSubjects)

        }

        if(routineReview._id != dataScreen.routine_id._id) {//REPRESENTA A MODIFICAÇÃO DA MATÉRIA, MODIFICA APENAS O NÚMERO DE REVISÕES ASSOCIADAS NA TELA DE MATÉRIAS
            const newRoutines = routines

            const indexOldRoutine = routines.findIndex(item => item._id == dataScreen.routine_id._id)
            const indexNewRoutine = routines.findIndex(item => item._id == routineReview._id)

            newRoutines[indexOldRoutine].associatedReviews = newRoutines[indexOldRoutine].associatedReviews.filter(item => item != dataScreen._id)
            newRoutines[indexNewRoutine].associatedReviews.push(dataScreen._id)
        }

    }

    async function handleAudioSelector() {

        try {
            
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.audio],
            });

            let id;
            let url;
            //callback interface
            await UUIDGenerator.getRandomUUID().then((uuid) => {
                id = uuid
            })

            await RNFetchBlob.fs
            .stat(res.uri)
            .then((stats) => {
                console.log(stats.path)
                url = `file://${stats.path}`
            })
            .catch((err) => {
                console.log(err);
                alert(err)
            });

            let track = {
                id: id,
                url: url,
                type: 'default',
                title: titleReview,
                artist: user.name,
                album: 'TTR - audios',
                artwork: 'https://picsum.photos/100',
            }

            //ASSOCIAR AUDIO DIRETO DO GOOGLE DRIVE

            // let track = {
            //     id: '1',
            //     url:
            //       'https://audio-previews.elements.envatousercontent.com/files/103682271/preview.mp3',
            //     type: 'default',
            //     title: 'My Title',
            //     album: 'My Album',
            //     artist: 'Rohan Bhatia',
            //     artwork: 'https://picsum.photos/100',
            // }

            setTrackAudioReview(track)

          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
              console.log('cancelou')
            } else {
                console.log(err)
                alert('Houve um erro ao selecionar o arquivo, tente novamente!')
            }
          }
    }

    
    function handleSaveNotes(note) {
        setNotesReview(note)
        console.log(note)
    }

    function handleGoToNotesScreen() {
        navigation.navigate("NotesScreen", {
            onGoBack: handleSaveNotes,
            screenData: notesReview
        })
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconsBox}>
                    <BorderlessButton onPress={handlePressGoBack}>
                        <Icon name="close" size={25} color="#F7F7F7" style={styles.iconBack} />
                    </BorderlessButton>
                    <BorderlessButton onPress={editReview}>
                        <Icon name="check" size={25} color="#F7F7F7" style={styles.iconBack} />
                    </BorderlessButton>
                </View>
                <Text style={styles.headerText}>EDITAR REVISÃO</Text>
                <Text style={styles.createdAtText}>Criação: {createdDate.getDate()}/{createdDate.getMonth()+1}/{createdDate.getFullYear()}</Text>
            </View>
            <View style={styles.main}>
                <View style={styles.dntReviewBox}>
                    <View style={styles.dntReview}>
                        <View style={styles.labelIconBox}>
                            <Icon name="sync" size={20} color="#303030" style={{marginRight: 3}} />
                            <Text style={styles.label2}>Índice de sequência atual:</Text>
                        </View>
                        <Text style={styles.subLabel}>{currentSequenceReview}</Text>
                    </View>
                    <View style={styles.dntReview}>
                        <View style={styles.labelIconBox}>
                            <Icon name="calendar" size={20} color="#303030" style={{marginRight: 3}} />
                            {
                                props.route.params.fromReviewsScreen 
                                ?
                                    <Text style={styles.label2}>Próxima revisão - após conclusão</Text>
                                :
                                    <Text style={styles.label2}>Próxima revisão agendada para:</Text>
                            }
                        </View>
                        <Text style={styles.subLabel}>{`${dateNextSequenceReview.getDate()}/${dateNextSequenceReview.getMonth()+1}/${dateNextSequenceReview.getFullYear()}`}</Text>
                    </View>
                </View>
                <InputWLabelL
                    labelTitle="Título da Revisão"
                    value={titleReview}
                    secureTextEntry={false}
                    onChangeText={setTitleReview}
                    placeholder="Ex.: EDO de Bernoulli"
                    textAlign="center"
                    lineColor="#e74e36"
                />
                <View style={styles.inputBox}>
                    <View style={styles.labelBoxR}>
                        <Text style={styles.label}>Disciplina da Revisão</Text>
                        <View style={styles.labelFrame} />
                    </View>
                    <PickerInfo 
                        placeholder="DISCIPLINA"
                        data={subjects}
                        defaultValue={subjectReview.value}
                        onChangeItem={item => {
                            setSubjectReview(item)
                            console.log(item)
                        }}
                    />
                </View>

                <View style={styles.inputBox}>
                    <View style={styles.labelBoxL}>
                        <View style={styles.labelFrame} />
                        <Text style={styles.label}>Sequência de Revisão</Text>
                    </View>
                    <PickerInfo 
                        placeholder="1-3-5-7-21-30" 
                        data={routines}
                        defaultValue={routineReview.value}
                        onChangeItem={(item) => {
                            setRoutineReview(item)
                            if (dataScreen.currentSequenceReview > (item.sequence.length - 1)) {
                                console.log('aq')
                                setCurrentSequenceReview(item.sequence[item.sequence.length - 1])
                            } else {
                                setCurrentSequenceReview(item.sequence[dataScreen.currentSequenceReview])
                            }
                        }}
                    />
                </View>
                <View style={styles.noteAudioBox}>
                    <View style={styles.noteAudioButton}>
                        <Text style={styles.label2}>Anotações</Text>
                        <BorderlessButton style={{marginTop: 5}} onPress={handleGoToNotesScreen}>
                            <Icon2 name="edit" size={25} color="#303030" style={styles.iconBack} />
                        </BorderlessButton>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.noteAudioButton}>
                        <Text style={styles.label2}>Áudio</Text>
                        <BorderlessButton style={{marginTop: 5}} onPress={handleAudioSelector} >
                            <Icon2 name="music" size={25} color="#303030" style={styles.iconBack} />
                        </BorderlessButton>
                    </View>
                </View> 
            </View>
        </KeyboardAvoidingView>
    )
}

export default EditScreen;