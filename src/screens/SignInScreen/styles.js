import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    topBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 10,
    },
    titleTop: {
        fontFamily: 'Archivo-Bold',
        fontSize: 30,
    },
    logoBox: {
        width: 120,
        height: 120,
        backgroundColor: '#DE0078'
    },
    selectBox: {
        height: '65%',
        backgroundColor: '#14E78E',
        borderTopColor: '#DE0078',
        borderTopWidth: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputGroup: {
        width: screenWidth,
        alignItems: 'center'
    },
    inputBlock: {
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    labelBoxL: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    labelBoxR: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
    },
    labelFrame: {
        height: 2,
        width: '35%',
        backgroundColor: '#DE0078',
    },
    label:{
        fontFamily:'Archivo-Bold',
        color: '#FCFCFC',
        fontSize: 20,
        paddingHorizontal: '2%'
    },
    input: {
        backgroundColor: '#4EFFB4',
        width: '80%',
        borderRadius: 15,
        height: 54,
        paddingLeft: 15,
    }
})

export default styles;