import React from 'react';
import {View, Text, Modal, TouchableHighlight} from 'react-native'
import styles from './styles'
import Icon from 'react-native-vector-icons/Feather'


const NotesModal = (props) => {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.modalVisible}
        >
            <View style={styles.modalBox}>
                <View style={styles.modalCard}>
                    <View style={styles.titleBox}>
                        <View style={styles.titleLabelBox}>
                            <Text numberOfLines={1} style={styles.titleText}>{props.notes.title}</Text>
                        </View>
                        <TouchableHighlight underlayColor="#DDDD" style={styles.closeButton} onPress={props.handleCloseModal}>
                            <Icon name="x" size={25} color="#303030" style={styles.iconBack} />
                        </TouchableHighlight>
                    </View>
                    <View style={styles.notesBox}>
                        <Text 
                            style={[styles.noteText, {textAlign: props.notes.align}]}
                        >
                            {props.notes.note}
                        </Text>
                    </View>
                </View>

            </View>
        </Modal>
    )
}

export default NotesModal;