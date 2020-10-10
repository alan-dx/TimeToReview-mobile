import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    graphBox: {
        height: '55%',
        backgroundColor:'#F7F7F7',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
    },
    graphBoxTitle: {
        color: '#303030',
        fontFamily: 'DancingScript-Bold',
        fontSize: 22,
    },
    performanceButtonBox: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    performanceButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: -5,
        padding: 2,
        backgroundColor: '#FFFFFF',
        borderRadius: 30
    },
    performanceButtonText: {
        color: '#303030',
        fontFamily: 'Archivo-SemiBold',
        fontSize: 20,
    },
    menuBox: {
        flex: 1,
        paddingHorizontal: 5,
        paddingBottom: 3,
        backgroundColor:'#F7F7F7',
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