import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC'
    },
    loadingChartBox: {
        width: '95%',
        backgroundColor:'#FFF',
        borderRadius: 20,

        alignItems: 'center',
        justifyContent: 'center',

        elevation: 2
    },
    graphBox: {
        flex: 1,
        backgroundColor:'#FCFCFC',

        alignItems: 'center',
        justifyContent: 'space-around',
    },
    graphBoxTitle: {
        color: '#303030',
        fontFamily: 'DancingScript-Bold',
        fontSize: 22,
    },
    performanceBox: {
        alignItems: 'center',
    },
    performanceButtonBox: {
        borderRadius: 8,

        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',

        elevation: 7
    },
    performanceButton: {
        backgroundColor: '#60c3eb',
        borderRadius: 8,
        width: 35,
        height: 35,

        alignItems: 'center',
        justifyContent: 'center'
    },
    performanceButtonText: {
        color: '#303030',
        fontFamily: 'Archivo-SemiBold',
        fontSize: 17,
    },
    menuBox: {
        backgroundColor:'#FFFF',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,

        height: '45%',
        paddingHorizontal: 5,
        paddingBottom: 3,

        elevation: 10
    },
    menuRow: {
        flex: 1,
        flexDirection: 'row',
    },
    menuItemBox: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent:'center'
    }
})

export default styles;