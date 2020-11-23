import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    modalBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    modalCard: {
        height: 250,
        width: 350,
        borderRadius: 10,
        backgroundColor: '#FFF'
    },
    modalHeader: {
        width: '100%',
        height: 50,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center"
    },
    modalHeaderText: {
        marginTop: 6,
        fontFamily: "Poppins-Bold",
        color: '#FFFFFF',
        fontSize: 20
    },
    scrollBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    scrollLabel: {
        fontSize: 17,
        color: '#707070',
        fontFamily: 'Archivo-SemiBold'
    },
    timerScroll: {
        height: 90,
        width: 85,
        alignItems: 'center',
        flexDirection: 'row',
    },
    scrollItem:{
        width: 40,
        height: 30,
        alignItems: 'center'
    },
    scrollText: {
        fontFamily: 'Archivo-Bold',
        fontSize: 18,
        color: '#303030',
    },
    scrollSelectItemLeft: {
        width: 40,
        height: 30,
        borderTopColor: '#60c3eb',
        borderTopWidth: 1,
        borderBottomColor: '#60c3eb',
        borderBottomWidth: 1,
        
        position: 'absolute',
        top: 30
    },
    scrollSelectItemRight: {
        width: 40,
        height: 30,
        borderTopColor: '#60c3eb',
        borderTopWidth: 1,
        borderBottomColor: '#60c3eb',
        borderBottomWidth: 1,
        
        position: 'absolute',
        top: 30,
        right: 0
    },
    infoBox: {
        width: '90%',
    },
    infoText: {
        fontFamily: 'Archivo',
        fontSize: 14,
        textAlign: 'center',
        color: '#303030'
    },
    input: {
        width: 60,
        borderRadius: 13,
        backgroundColor: '#E8E8E8',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'Archivo-SemiBold',
        fontSize: 13,
        color: '#303030'
    },
})

export default styles;