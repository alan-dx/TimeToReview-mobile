import React from 'react';
import {Modal, Text, View, TouchableHighlight, TextInput, Linking} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { openInbox, openComposer } from 'react-native-email-link'

const ReportModal = (props) => {

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
                        <Text style={styles.modalHeaderText}>CONTATE-NOS</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <View style={styles.textMarker} />
                        <Text style={styles.infoText}>
                            Relate bugs, sugestões, agradecimentos ou qualquer problema que tenha enfrentado em nosso App. Nosso 
                            objetivo sempre será trazer a melhor experiência possível para nossos usuários.
                        </Text>
                    </View>
                        <TouchableHighlight style={styles.customButton} underlayColor={"#72c3eb"} onPress={() => {
                            openComposer({
                                to: 'suportettr@gmail.com',
                                subject: 'O que deseja relatar?',
                             })
                        }} >
                            <Text style={styles.modalHeaderText}>CONTATE</Text>
                        </TouchableHighlight>
                </View>
            </View>
        </Modal>
    )
}

export default ReportModal;