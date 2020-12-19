import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    modalBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    modalCard: {
        height: 250,
        width: 350,
        borderRadius: 10,
        backgroundColor: '#FFF',

        alignItems: 'center'
    },
    imageBox: {
        flex: 2,
    },
    controllerBox: {
        flex: 1,
        margin: 5,

        alignItems: 'center',
        justifyContent: 'center'

    },
    controllerOptionsBox: {
        width: '60%',
        flexDirection: 'row',
        
        justifyContent: 'space-around',
    },
    controllerButton: {
        marginHorizontal: 5,
        borderRadius: 50,
        padding: 5,

        alignItems: 'center',
        justifyContent: "center"
    }
})

export default styles;