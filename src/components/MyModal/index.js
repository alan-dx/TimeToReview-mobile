import React, { useEffect } from 'react';
import {Modal, Text, View, TouchableHighlight} from 'react-native';
import Input from '../Input';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';

const MyModal = (props) => {

    return (
        <Modal
                animationType="fade"
                transparent={true}
                visible={props.modalVisible}
        >
            <View style={styles.modalBox}>
                <View style={styles.modalCard}>
                    <View style={[styles.modalHeader, {backgroundColor: props.modalTitle == 'ADICIONAR ROTINA'?'#e74e36':'#60c3eb'}]}>
                        <TouchableHighlight style={{borderRadius: 20, padding: 1}} underlayColor={'#404040'} onPress={() => props.handleCloseModal()}>
                            <Icon name="close" size={20} color="#F7F7F7" style={styles.iconBack} />
                        </TouchableHighlight>
                        <Text style={styles.modalHeaderText}>{props.modalTitle}</Text>
                        <TouchableHighlight style={{borderRadius: 20, padding: 1}} underlayColor={"#404040"} onPress={() => props.handleCloseModalAndAdd()}>
                            <Icon name="check" size={20} color="#F7F7F7" style={styles.iconBack} />
                        </TouchableHighlight>
                    </View>
                    <View style={styles.modalBody}>
                        <Input keyboardType="number-pad" value={props.sequenceRoutine} secureTextEntry={false} onChangeText={props.setSequenceRoutine} textAlign="center" placeholder="1-3-7-15-21-30" />
                        <View style={styles.infoBox}>
                            <Text style={styles.infoText}>
                                Insira no formato: 1-3-7-15-21-30. Cada dígito indica após quantos dias, a partir da última revisão, a revisão associada será realizada. O - deve ser utilizado como separador!
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default MyModal;