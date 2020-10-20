import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: "flex-end"
    },
    topBox: {
        marginTop: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    titleTop: {
        fontFamily: 'Poppins-Bold',
        fontSize: 30,
    },
    logoBox: {
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectBox: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '55%',
        backgroundColor: '#FFFFFF',
    },
    selectContainer: {
        alignItems: "center",
        justifyContent: 'space-evenly',
        width: '90%',
        display: "flex",
    },
    devText: {
        color: '#242424',
        position: 'absolute',
        bottom: 5
    }
});

export default styles;