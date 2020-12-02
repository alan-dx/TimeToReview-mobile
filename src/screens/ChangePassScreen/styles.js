import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',

        alignItems: 'center',
        justifyContent: 'center'
    },
    inputGroup: {
        width: '100%',
        alignItems: 'center'
    },
    inputBlock: {
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    input: {
        backgroundColor: '#E8E8E8',
        width: '80%',
        borderRadius: 15,
        height: 54,
        paddingLeft: 15,
    },
    labelBoxL: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'flex-start',
    },
    labelBoxR: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'flex-end',
    },
    labelFrame: {
        height: 1,
        flex: 1,
        backgroundColor: '#e74e36',
    },
    label:{
        fontFamily:'Archivo-Bold',
        color: '#303030',
        fontSize: 15,
        textAlign: 'center',
        paddingHorizontal: '1%'
    },
})

export default styles;