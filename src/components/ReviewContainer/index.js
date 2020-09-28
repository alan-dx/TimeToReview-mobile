import React, { useEffect, useState } from 'react';
import { View, Text} from 'react-native';
import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';

const ReviewContainer = (props) => {
    const [sequence, setSequence] = useState('')
    
    useEffect(() => {
        setSequence(props.data.routine_id.sequence.join('-'))
    }, [])

    return (

        <View style={styles.container}>
                <View style={[styles.subjectColorMarker, {backgroundColor: props.data.subject_id.marker}]} />
            <View style={styles.titleBox}>
                <Text style={styles.titleReview}>{props.data.title}</Text>
            </View>
            
            <View style={styles.optionsBox}>
                <View style={styles.DateButtonsBox}>
                    <Text style={styles.labelDateButtons}>TIMER: {props.data.timer}s</Text>
                    <View style={styles.editButtonBox}>
                        <RectButton onPress={props.onPressEdit} style={styles.containerButton}>
                            <Text style={styles.textButton}>EDITAR</Text>
                        </RectButton>
                    </View>
                </View>
                <View style={styles.DateButtonsBox}>
                    <Text style={styles.labelDateButtons}>{sequence}</Text>
                    <View style={styles.checkButtonBox}>
                        <RectButton onPress={props.onPressConclude} style={styles.containerButton}>
                            <Text style={styles.textButton}>CONCLUIR</Text>
                        </RectButton>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ReviewContainer;