import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        justifyContent: "flex-end"
    },
    topBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    titleTop: {
        fontFamily: 'Archivo-Bold',
        fontSize: 30,
    },
    logoBox: {
        width: 150,
        height: 150,
        backgroundColor: '#DE0078'
    },
    selectBox: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '65%',
        backgroundColor: '#14E78E',
        borderTopColor: '#DE0078',
        borderTopWidth: 2
    },
    selectContainer: {
        alignItems: "center",
        justifyContent: 'space-evenly',
        width: '90%',
        display: "flex",
    },
    selectTextBox: {
        alignItems: 'center',
        flex: 1,
        borderBottomColor: '#303030',
        borderBottomWidth: 1
    },
    selectText: {
        fontFamily: 'Archivo-Bold',
        fontSize: 20,
        color: '#F5F5F5'
    },
    devText: {
        color: '#01BA6C',
        position: 'absolute',
        bottom: 5
    }
});

export default styles;