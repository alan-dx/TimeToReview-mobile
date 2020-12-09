import React, { useEffect, useState } from 'react';
import { View, Text} from 'react-native';
import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

const ReviewContainer = (props) => {

    const [sequence, setSequence] = useState('')
    const [delayed, setDelayed] = useState(false)
    
    useEffect(() => {
        setSequence(props.data.routine_id.sequence.join('-'))
        let currentDate = new Date().setHours(0,0,0,0)
        let reviewDate = new Date(props.data.dateNextSequenceReview)

        if (reviewDate < currentDate) {
            console.log(reviewDate)
            setDelayed(true)
        }

    }, [])

    return (

        <View style={styles.container}>
            <View style={[styles.subjectColorMarker, {backgroundColor: props.data.subject_id.marker}]} />
            <View style={styles.infoBox}>
                <View style={styles.titleBox}>
                    <Text style={styles.titleReview} numberOfLines={1}>{props.data.title}</Text>
                </View>
                {
                    (delayed && props.haveDelay) && <Icon name="alert-triangle" size={15} color="red" style={styles.alertIcon} />
                }
            </View>
            <View style={styles.optionsBox}>
                <View style={styles.DateButtonsBox}>
                    <Text style={styles.labelDateButtons}>S</Text>
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
                            <Text style={styles.textButton}>{props.titleRightButton}</Text>
                        </RectButton>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ReviewContainer;