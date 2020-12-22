import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    inputBox: {
        alignItems: 'center',
    },
    labelBoxL: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        alignSelf: 'flex-start',
    },
    labelFrame: {
        height: 1,
        flex: 1,
        backgroundColor: '#60c3eb',
    },
    label: {
        fontFamily: 'Archivo-Bold',
        fontSize: 15,
        marginHorizontal: 3,
        color: '#303030'
    },
    input: {
        backgroundColor: '#E8E8E8',
        width: '80%',
        borderRadius: 15,
        height: 54,
        paddingLeft: 15,
        fontFamily: 'Archivo-SemiBold',
        fontSize: 13,
        color: '#303030'
    }
})

export default styles;