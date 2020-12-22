import React from 'react';
import {View, Text, Modal, TouchableHighlight} from 'react-native'
import styles from './styles'
import Icon2 from 'react-native-vector-icons/Feather'


const NotesModal = (props) => {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.modalVisible}
        >
            <View style={styles.modalBox}>
                <View style={styles.modalCard}>
                    <View>
                        <Text>{props.notes.title}</Text>
                    </View>
                    <View>
                        <Text 
                            style={{textAlign: props.notes.align}}
                        >
                            {props.notes.note}
                        </Text>
                    </View>
                </View>
                <TouchableHighlight underlayColor="#DDDD" style={styles.closeButton} onPress={props.handleCloseModal}>
                    <Icon2 name="x" size={25} color="#303030" style={styles.iconBack} />
                </TouchableHighlight>
            </View>
        </Modal>
    )
}

export default NotesModal;