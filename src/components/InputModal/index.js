import React, {useState} from 'react';
import {Modal, Text, View, TouchableHighlight, TextInput, Linking} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';

const InputModal = (props) => {
   
    const [inputValue, setInputValue] = useState(props.inputValue)

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.modalVisible}
        >
            <View style={styles.modalBox}>
                <View style={styles.modalCard}>
                    <View style={[styles.modalHeader, {backgroundColor: '#e74e36'}]}>
                        <TouchableHighlight style={{borderRadius: 20, position: 'absolute', left: 20}} underlayColor={'#e74e'} onPress={() => props.handleCloseModal()}>
                            <Icon name="close" size={20} color="#F7F7F7" />
                        </TouchableHighlight>
                        <Text style={styles.modalHeaderText}>EDITAR NOME</Text>
                        <TouchableHighlight style={{borderRadius: 20, position: 'absolute', right: 20}} underlayColor={'#e74e'} onPress={() => props.handleCloseAndConfirmModal(inputValue)}>
                            <Icon name="check" size={20} color="#F7F7F7" />
                        </TouchableHighlight>
                    </View>
                    <View style={styles.modalBody}>
                        <Text style={styles.inputLabel}>Insira o seu Nome: </Text>
                        <TextInput
                            style={styles.input}
                            keyboardType={"default"}
                            value={inputValue}
                            onChangeText={(text) => setInputValue(text)}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default InputModal;