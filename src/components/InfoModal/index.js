import React from 'react';
import {Modal, Text, View, TouchableHighlight, TextInput, Linking} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';

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
                        <Text style={styles.modalHeaderText}>INFO</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.textMarker} />
                            <Text style={styles.infoTitle}>{props.infoData.title}</Text>
                        </View>
                        <Text style={styles.infoText}>{props.infoData.info}</Text>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ReportModal;