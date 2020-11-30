import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    modalBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    modalCard: {
        width: 350,
        height: 200,
        borderRadius: 10,
        backgroundColor: '#FFF',

        alignItems: "center",
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
    modalBody: {
        flex: 1,
        width: '100%',

        alignItems: 'center',
        justifyContent: 'center'
    },
    inputLabel: {
        fontFamily: 'Archivo-SemiBold',
        fontSize: 16,
        textAlign: 'justify',
        color: '#303030',

        marginBottom: 10
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