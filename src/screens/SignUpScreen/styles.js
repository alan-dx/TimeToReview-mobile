import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    topBox: {
        marginTop: 10,
        height: '35%',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 10,
    },
    topBoxLine: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backBtn: {
        position: 'absolute',
        left: '2%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleTop: {
        fontFamily: 'Archivo-Bold',
        fontSize: 30,
    },
    logoBox: {
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectBox: {
        flex: 1,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputGroup: {
        width: screenWidth,//because the KeyboardAwareScrollView => width: '100%' dosen't worked
        alignItems: 'center',
        height: 500
    },
    inputBlock: {
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    labelBoxL: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        width: '90%',
    },
    labelBoxR: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        width: '90%',
    },
    labelFrame: {
        height: 1,
        flex: 1,
        backgroundColor: '#60c3eb',
    },
    label:{
        fontFamily:'Archivo-Bold',
        color: '#303030',
        fontSize: 15,
        paddingHorizontal: '1%'
    },
    input: {
        backgroundColor: '#E8E8E8',
        width: '80%',
        borderRadius: 15,
        height: 54,
        paddingLeft: 15,
    }
})

export default styles;