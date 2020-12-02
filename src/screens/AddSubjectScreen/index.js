import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { BorderlessButton, TextInput } from "react-native-gesture-handler"
import Input from '../../components/Input';
import { useNavigation } from '@react-navigation/native';
import ColorPicker from '../../components/ColorPicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import api from '../../services/api';
import AuthContext from '../../contexts/auth';

const AddSubjectScreen = (props) => {

    const navigation = useNavigation()

    const { logoutContext } = useContext(AuthContext)
    const [titleSubject, setTitleSubject] = useState('')
    const [markerSubject, setMarkerSubject] = useState('')

    function handlePressGoBack() {
        navigation.goBack()
    }

    function handleConfirmAdd() {

        if (!titleSubject || !markerSubject) {
            alert("Preencha todos os campos abaixo")
        } else {
            api.post("/createSubject", {
                title: titleSubject,
                marker: markerSubject
            }).then((response) => {
                props.route.params.onGoBack(response.data)
                navigation.goBack()
            }).catch((err) => {
                console.log(err)
                if (err == 'Error: Request failed with status code 500') {
                    alert("Erro interno do servidor, tente novamente mais tarde!.")
                } else if (err = 'Error: Network Error') {
                    alert("Sessão expirada!")
                    logoutContext()
                } else {
                    alert('Houve um erro ao tentar salvar sua matéria no banco de dados, tente novamente!')
                }
            })
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconsBox}>
                    <BorderlessButton onPress={handlePressGoBack}>
                        <Icon name="close" size={25} color="#F7F7F7" style={styles.iconBack} />
                    </BorderlessButton>
                    <BorderlessButton onPress={handleConfirmAdd} >
                        <Icon name="check" size={25} color="#F7F7F7" style={styles.iconBack} />
                    </BorderlessButton>
                </View>
                <Text style={styles.headerText}>CRIAR DISCIPLINA</Text>
            </View>
            <View style={styles.main}>
                    <View style={styles.inputBox}>
                        <View style={styles.labelBoxL}>
                            <View style={styles.labelFrame} />
                            <Text style={styles.label}>Nome da Disciplina</Text>
                        </View>
                    <Input value={titleSubject} secureTextEntry={false} onChangeText={setTitleSubject} textAlign="center" placeholder="CÁLCULO III" />
                    </View>
                    <View style={styles.inputBox}>
                        <View style={styles.labelBoxR}>
                            <Text style={styles.label}>Cor do Marcador</Text>
                            <View style={styles.labelFrame} />
                        </View>
                        <ColorPicker markerSubject={markerSubject} setMarkerSubject={setMarkerSubject} />
                    </View>
            </View>
        </View>
    )
}

export default AddSubjectScreen;