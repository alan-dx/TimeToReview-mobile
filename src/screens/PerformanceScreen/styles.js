import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    scrollContainer: {
        alignItems: 'center'
    },
    totalReviewsText: {
        fontFamily: 'Archivo-SemiBold',
        fontSize: 18,
        color: '#303030',

        marginBottom: 5
    },
    chartBox: {
        width: '95%',
        backgroundColor: '#FFF',
        borderRadius: 20,

        elevation: 2,
        marginTop: 2,
        marginBottom: 10,
        alignItems: 'center',
    },
    textChartPieBox: {
        marginTop: 5,
        fontFamily: 'Archivo-SemiBold',
        fontSize: 17,
        color: '#303030'
    },
    lineChartPieBox: {
        marginTop: 2,
        height: 1,
        width: '90%',
        backgroundColor: '#60c3eb'
    },
    subLineChartPieBox: {
        width: '90%',

        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    subLineText: {
        fontFamily: 'Archivo-Medium',
        fontSize: 11,
        color: '#606060'
    }
})

export default styles;