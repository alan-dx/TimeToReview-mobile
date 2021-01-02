import React, { useState, useContext } from 'react'
import { Modal, View, Switch, Text, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import AuthContext from '../../contexts/auth'
import PickerInfo from '../Picker'
import styles from './styles'

const FilterModal = (props) => {

    const { subjects, routines } = useContext(AuthContext)
    const [isEnabled, setIsEnabled] = useState(true)
    const [filterOption, setFilterOption] = useState(null)

    function toggleSwitch() {
        setFilterOption(null)
        setIsEnabled(previousState => !previousState)
    }

    function handleConfirmButton() {
        props.handleCloseModal(filterOption)
    }

    function handleCancelButton(params) {
        props.handleCloseModal(null)
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.modalVisible}
        >
            <View style={styles.modalBox}>
                <View style={styles.modalCard}>
                    <View style={styles.modalHeader}>
                        <TouchableHighlight style={{borderRadius: 20}} underlayColor="#F5F5F5" onPress={handleCancelButton}>
                            <Icon name="x" size={25} color="#303030" style={styles.iconBack} />
                        </TouchableHighlight>
                        <TouchableHighlight style={{borderRadius: 20}}  underlayColor="#F5F5F5" onPress={handleConfirmButton}>
                            <Icon name="check" size={25} color="#303030" style={styles.iconBack} />
                        </TouchableHighlight>
                    </View>
                    <View style={{alignItems: 'center', marginTop: 10}}>
                        <Text style={styles.titleOptions}>Filtrar por:</Text>
                        <View style={styles.optionsBox}>
                            <View style={styles.switchItemBox}>
                                <Text style={styles.switchItemText}>Matéria</Text>
                                <Switch 
                                    trackColor={{ false: "#60c3eb", true: "#e74e36" }}
                                    thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                />
                                <Text style={styles.switchItemText}>Rotina</Text>
                            </View>
                        </View>
                    </View>
                    {
                        isEnabled
                            &&
                        <PickerInfo 
                            placeholder="1-3-5-7-21-30" 
                            data={routines}
                            onChangeItem={setFilterOption}
                        />

                    }
                    {
                        !isEnabled
                            &&
                        <PickerInfo 
                            placeholder="CÁLCULO III" 
                            data={subjects}
                            onChangeItem={setFilterOption}
                        />
                    }
                    <Text style={styles.infoText}>Selecione uma matéria ou rotina para filtrar suas revisões.</Text>
                </View>
            </View>
        </Modal>
    )
}

export default FilterModal