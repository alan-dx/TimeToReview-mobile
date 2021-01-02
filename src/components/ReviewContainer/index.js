import React, { useEffect, useState } from 'react';
import { View, Text, ToastAndroid} from 'react-native';
import styles from './styles';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

const ReviewContainer = (props) => {

    const [sequence, setSequence] = useState('')
    const [delayed, setDelayed] = useState(false)
    
    useEffect(() => {
        setSequence(props.data.routine_id.sequence.join('-'))
        let currentDate = new Date().setHours(0,0,0,0)
        let reviewDate = new Date(props.data.dateNextSequenceReview)

        if (reviewDate < currentDate) {
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
                    (delayed && props.haveDelay) && <Icon name="alert-triangle" size={20} color="red" style={styles.alertIcon} />
                }
            </View>
            <View style={styles.optionsBox}>
                <View style={styles.DateButtonsBox}>
                    <Text style={styles.labelDateButtons}> </Text>
                    <View style={styles.editButtonBox}>
                        <RectButton onPress={props.onPressEdit} style={styles.containerButton}>
                            <Text style={styles.textButton}>EDITAR</Text>
                        </RectButton>
                    </View>
                </View>
                <View style={styles.DateButtonsBox}>
                    <Text numberOfLines={1} style={styles.labelDateButtons}>{sequence}</Text>
                    <View style={styles.checkButtonBox}>
                        <RectButton onPress={props.onPressConclude} style={styles.containerButton}>
                            <Text style={styles.textButton}>{props.titleRightButton}</Text>
                        </RectButton>
                    </View>
                </View>
                {
                    props.data.track  && props.haveExtraOptions  ? 
                        <BorderlessButton style={styles.audioButton} onPress={props.onPressAudioButton}>
                            <Icon name="music" size={20} color="#303030" />
                        </BorderlessButton>
                    :
                        <BorderlessButton style={styles.audioButton} onPress={() => {
                            if (props.haveExtraOptions) {
                                ToastAndroid.show('Não há áudio associado!', 300)
                            }
                        }}>
                            <Icon name="music" size={20} color="#F0F0F0" />
                        </BorderlessButton>

                }
                { 
                    props.data.notes.title != '' && props.haveExtraOptions  ? 
                        <BorderlessButton style={styles.noteButton} onPress={props.onPressNotesButton}>
                            <Icon name="edit" size={20} color="#303030" />
                        </BorderlessButton>
                    :
                        <BorderlessButton style={styles.noteButton} onPress={() => {
                            if (props.haveExtraOptions) {
                                ToastAndroid.show('Não há nota associada!', 300)
                            }
                        }}>
                            <Icon name="edit" size={20} color="#F0F0F0" />
                        </BorderlessButton>
                }
            </View>
        </View>
    )
}

export default ReviewContainer;