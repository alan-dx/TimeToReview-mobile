import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { BorderlessButton, TextInput } from "react-native-gesture-handler"
import Input from '../../components/Input';
import { useNavigation } from '@react-navigation/native';
import ColorPicker from '../../components/ColorPicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AddSubjectScreen = (props) => {

    const navigation = useNavigation()

    const [titleSubject, setTitleSubject] = useState('')
    const [markerSubject, setMarkerSubject] = useState('')
    const [infoSubject, setInfoSubject] = useState('')

    function handlePressGoBack() {
        navigation.goBack()
    }

    function handleConfirmAdd() {
        console.log(titleSubject, markerSubject, infoSubject)
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
                <Text style={styles.headerText}>CRIAR MATÉRIA</Text>
            </View>
            <View style={styles.main}>
                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={styles.inputScroll}
                    scrollEnabled={true}
                    enableOnAndroid={true}       
                >
                    <View style={styles.inputBox}>
                        <Text style={styles.inputBoxText}>NOME DA MATÉRIA</Text>
                        <Input value={titleSubject} secureTextEntry={false} onChangeText={setTitleSubject} textAlign="center" placeholder="EDO DE BERNOULLI" />
                    </View>
                    <View style={styles.inputBox}>
                        <ColorPicker markerSubject={markerSubject} setMarkerSubject={setMarkerSubject} />
                    </View>
                    <View style={styles.inputBox}>
                        <Text style={styles.inputBoxText}>INFORMAÇÕES</Text>
                        <TextInput placeholder={"ALGUM DETALHE QUE DESEJE COLOCAR..."} placeholderTextColor="#ABABAB" multiline maxLength={120} style={styles.infoInput} value={infoSubject} onChangeText={setInfoSubject} />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </View>
    )
}

export default AddSubjectScreen;