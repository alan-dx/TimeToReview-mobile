import React, {useState} from 'react';
import {View, Text, Modal, Button} from 'react-native';
import { RectButton, TouchableHighlight } from 'react-native-gesture-handler';
import styles from './styles';

const MyModal = (props) => {

    function teste() {
        console.log('aaa')
    }

    return (
        <>
            <Modal
                visible={props.modalVisible}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalBox}>
                    <View style={styles.modalCard}>
                        <View style={styles.headerModal}>
                            <Text style={styles.headerText}>DISCIPLINA</Text>
                        </View>
                        <TouchableHighlight onPress={() => teste} style={{backgroundColor: 'red'}}>
                            <Text>X</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default MyModal;