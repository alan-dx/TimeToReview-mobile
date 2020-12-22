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

const AddScreen = (props) => {

    const {routines, subjects, setAllReviews, allReviews, user, logoutContext} = useContext(AuthContext)

    const [titleReview, setTitleReview] = useState('')
    const [trackAudioReview, setTrackAudioReview] = useState(null)
    const [subjectReview, setSubjectReview] = useState('')
    const [routineReview, setRoutineReview] = useState('')
    const [dateNextSequenceReview, setDateNextSequenceReview] = useState('');
    const [ notesReview, setNotesReview ] = useState({
        title: '',
        note: '',
        align: 'left'
    })

    const navigation = useNavigation();

    function handlePressGoBack() {
        navigation.goBack()
        setTrackAudioReview('')
    }

    function handleCreateReview() {
        const currentDate = new Date()
        
        if (!titleReview || !subjectReview || !routineReview) {
            alert("Preencha todos os campos!")
        } else {
            api.post('/createReview', {
                title: titleReview,
                routine_id: routineReview._id,
                subject_id: subjectReview._id,
                dateNextSequenceReview: dateNextSequenceReview,
                track: trackAudioReview,
                notes: notesReview
            }).then((response) => {

                navigation.goBack()
                setAllReviews([...allReviews, response.data])

                subjects.forEach(item => {
                    if (item._id == subjectReview._id) {
                        item.associatedReviews.push(response.data._id)
                    }
                })

                routines.forEach(item => {
                    if (item._id == routineReview._id) {
                        item.associatedReviews.push(response.data._id)
                    }
                })

                if (dateNextSequenceReview.getDate() == currentDate.getDate()) {
                    props.route.params.onGoBack(response.data)
                }

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
    }

    function handleGoToNotesScreen() {
        navigation.navigate("NotesScreen", {
            onGoBack: handleSaveNotes,
            screenData: {
                title: '',
                note: '',
                align: 'left'
            }
        })
    }

    //ADICIONAR A DATA DE QUANDO FOI CRIADA
    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconsBox}>
                    <BorderlessButton onPress={handlePressGoBack}>
                        <Icon name="close" size={25} color="#F7F7F7" style={styles.iconBack} />
                    </BorderlessButton>
                    <BorderlessButton onPress={handleCreateReview}>
                        <Icon name="check" size={25} color="#F7F7F7" style={styles.iconBack} />
                    </BorderlessButton>
                </View>
                <Text style={styles.headerText}>ADICIONAR REVISÃO</Text>
            </View>
            <View style={styles.main}>
                <View style={styles.dntReview}>
                    <View style={styles.labelIconBox}>
                        <Icon name="calendar" size={20} color="#303030" style={{marginRight: 3}} />
                        <Text style={styles.label2}>Data da primeira Revisão</Text>
                    </View>
                    <Text style={styles.subLabel}>{dateNextSequenceReview == "" ? "GERADA AUTOMATICAMENTE AO SELECIONAR UMA ROTINA" : `${dateNextSequenceReview.getDate()}/${dateNextSequenceReview.getMonth()}/${dateNextSequenceReview.getFullYear()}` }</Text>
                </View>
                <InputWLabelL 
                    labelTitle="Título da Revisão"
                    value={titleReview}
                    secureTextEntry={false}
                    onChangeText={setTitleReview}
                    placeholder="Ex.: EDO de Bernoulli"
                    textAlign="center"
                />
                {/* <View style={styles.inputBox}>
                    <View style={styles.labelBoxL}>
                        <View style={styles.labelFrame} />
                        <Text style={styles.label}>Título da Revisão</Text>
                    </View>
                    <Input value={titleReview} secureTextEntry={false} onChangeText={setTitleReview} textAlign="center" placeholder="EDO DE BERNOULLI" />
                </View> */}
                <View style={styles.inputBox}>
                    <View style={styles.labelBoxR}>
                        <Text style={styles.label}>Disciplina da Revisão</Text>
                        <View style={styles.labelFrame} />
                    </View>
                    <PickerInfo 
                        placeholder="DISCIPLINA"
                        data={subjects}
                        onChangeItem={setSubjectReview}
                    />
                </View>

                <View style={styles.inputBox}>
                    <View style={styles.labelBoxL}>
                        <View style={styles.labelFrame} />
                        <Text style={styles.label}>Rotina da Revisão</Text>
                    </View>
                    <PickerInfo 
                        placeholder="1-3-5-7-21-30" 
                        data={routines}
                        onChangeItem={(item) => {
                            const currentDate = new Date()
                            setRoutineReview(item)
                            const nextDate = currentDate.getDate() + Number(item.sequence[0])
                            setDateNextSequenceReview(new Date(currentDate.getFullYear(), currentDate.getMonth(), nextDate, 3))
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
                        <BorderlessButton style={{marginTop: 5}} onPress={handleAudioSelector}>
                            <Icon2 name="music" size={25} color="#303030" style={styles.iconBack} />
                        </BorderlessButton>
                    </View>
                </View> 
            </View>
        </KeyboardAvoidingView>
    )
}

export default AddScreen;