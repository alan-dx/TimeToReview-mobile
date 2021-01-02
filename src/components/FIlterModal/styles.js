import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    modalBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    modalCard: {
        width: 350,
        height: 270,
        borderRadius: 10,
        backgroundColor: '#FFF',

        alignItems: "center",
        justifyContent: 'space-evenly',
        position: 'relative'
    },
    modalHeader: {
        width: '95%',
        flexDirection: 'row',

        justifyContent: 'space-between',
        position: 'absolute',
        top: 10
    },
    titleOptions: {
        fontFamily: 'Archivo-Bold',
        color: '#303030',
        fontSize: 17,
    },
    optionsBox: {
        flexDirection: 'row',
        width: '90%',

        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 10
    },
    switchItemBox: {
        flexDirection: 'row',

        alignItems: 'center',
        justifyContent: 'center'
    },
    switchItemText: {
        fontFamily: 'Archivo-SemiBold',
        fontSize: 14,
        color: '#303030',

        marginHorizontal: 5
    },
    infoText: {
        fontFamily: 'Archivo-Medium',
        color: '#303030',
        fontSize: 14,
        textAlign: 'center'
    }
})

export default styles