import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    modalBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalCard: {
        height: 200,
        borderRadius: 15,
        width: '80%',
        backgroundColor: '#FFF',
    },
    headerModal: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#303030',
        borderTopLeftRadius:15,
        borderTopRightRadius: 15
    },
    headerText: {
        marginTop: 3,
        fontFamily: 'Poppins-Bold',
        color: '#F7F7F7',
        fontSize: 20,
        alignSelf: 'center'
    }
})

export default styles;