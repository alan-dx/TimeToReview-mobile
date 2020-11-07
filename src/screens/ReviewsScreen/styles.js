import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    flatlist: {
        marginTop: 10,
        flex: 1
    },
    timerBox: {
        width: '90%',

        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },
    timerCountReviews: {
        width: 40,
        height: 25,
        backgroundColor: '#60c3eb',
        borderRadius: 6,
        elevation: 4,

        alignItems: 'center',
        justifyContent: 'center'
    },
    timerText: {
        color: '#F5F5F5',
        fontFamily: 'Archvio-SemiBold',
        fontSize: 15,
        fontWeight: 'bold'
    },
    timerText2: {
        color: '#303030',
        fontFamily: 'Archvio-SemiBold',
        fontSize: 13,
        fontWeight: 'bold'
    },
    timerController: {
        height: 35,
        width: 35,
        backgroundColor: '#FFFFFF',
        elevation: 4,
        borderRadius: 8,
        
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    timerChronometer: {
        height: 25,
        backgroundColor: '#e74e36',
        width: 70,
        borderRadius: 6,
        elevation: 3,

        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default styles;