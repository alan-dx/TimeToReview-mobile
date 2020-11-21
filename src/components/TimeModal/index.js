import React, { useEffect, useRef, useState } from 'react';
import {Modal, Text, View, TouchableHighlight, TextInput} from 'react-native';
import Input from '../Input';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';

const TimeModal = (props) => {

    let hours = [...Array(24).keys()]
    let minutes = [...Array(60).keys()]

    const [timerHour, setTimerHour] = useState(8)
    const [timerMin, setTimerMin] = useState(30)

    const minRef = useRef()
    const hourRef = useRef()
    
    useEffect(() => {
        setTimeout(() => {
            scrollToTime(props.timeHour, props.timeMin)
        }, 10)
    }, [])

    function handleSelectTime(e, data, fun) {
        let posY = e.nativeEvent.contentOffset.y
        alert(`${posY} data: ${data[posY/30]}`)
        fun(data[posY/30])
    }

    function scrollToTime(hour, minute) {
        let posYHour = hour * 30
        let posYMin = minute * 30
        hourRef.current.scrollTo({x: 0, y: posYHour, animated: true})
        minRef.current.scrollTo({x: 0, y: posYMin, animated: true})

    }

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
                        <Text style={styles.modalHeaderText}>{props.modalTitle || 'HORÁRIO'}</Text>
                    </View>
                    <View style={styles.scrollBox}>
                        <Text style={styles.scrollLabel}>Selecione um horário</Text>
                        <View style={styles.timerScroll}>
                            {/* O TAMANHO DO SCROLL DA INCOMBATIVEL COM ALGUNS DISPOSITIVOS, ESTA RECEBENDO VALORES QUEBRADOS */}
                            <View style={styles.scrollSelectItemLeft} />
                            <View style={styles.scrollSelectItemRight} />
                                <ScrollView
                                    ref={hourRef}
                                    showsVerticalScrollIndicator={false}
                                    decelerationRate="fast"
                                    snapToInterval={30}
                                    contentContainerStyle={{
                                        paddingVertical: 30,
                                    }}
                                    onMomentumScrollEnd={(e) => handleSelectTime(e, hours, props.setTimeHour)}
                                >
                                    {hours.map((value, key) => { 
                                        return (
                                            <View key={key} style={styles.scrollItem}>
                                                <Text style={styles.scrollText}>
                                                    {value < 10 ? '0' + value : value}
                                                </Text>
                                            </View>
                                        )}
                                    )}
                                </ScrollView>
                                <Text style={{fontSize: 20}}>:</Text>
                                <ScrollView
                                    ref={minRef}
                                    showsVerticalScrollIndicator={false}
                                    decelerationRate="fast"
                                    snapToInterval={30}
                                    contentContainerStyle={{
                                        paddingVertical: 30,
                                    }}
                                    onMomentumScrollEnd={(e) => handleSelectTime(e, minutes, props.setTimeMin)}

                                >
                                    {minutes.map((value, key) => (
                                        <View key={key} style={styles.scrollItem}>
                                            <Text style={styles.scrollText}>
                                                {value < 10 ? '0' + value : value}
                                            </Text>
                                        </View>
                                    ))}
                                </ScrollView>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default TimeModal;