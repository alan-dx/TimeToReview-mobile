import React from 'react'
import { View, Text, Modal, TouchableHighlight } from 'react-native'
import styles from './styles'
import Icon from 'react-native-vector-icons/Feather'

const CustomModal = (props) => {

    function handleCancelButton() {
        props.handleCloseModal()

        if (props.handleExtraCancelButton) {
            props.handleExtraCancelButton()
        }
    }

    function handleConfirmButton() {
        props.handleCloseModal()
        
        if (props.handleExtraConfirmButton) {
            props.handleExtraConfirmButton()
        }
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.modalVisible}
        >
            <View style={styles.modalBox}>
                <View style={[styles.modalCard, {height: props.modalCardHeight}]}>
                    <View style={styles.modalHeader}>
                        <TouchableHighlight style={{borderRadius: 20}} underlayColor="#F5F5F5" onPress={handleCancelButton}>
                            <Icon name="x" size={25} color="#303030" />
                        </TouchableHighlight>
                        <View style={styles.headerTitleBox}>
                            <Text numberOfLines={1} style={styles.headerTitleText}>{props.modalTitle}</Text>
                        </View>
                        {
                            !props.didNotShowCheckButton
                                && 
                            <TouchableHighlight style={{borderRadius: 20}}  underlayColor="#F5F5F5" onPress={handleConfirmButton}>
                                <Icon name="check" size={25} color="#303030" />
                            </TouchableHighlight>
                        }
                    </View>
                    <View style={styles.modalBody}>
                        {props.children}
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default CustomModal