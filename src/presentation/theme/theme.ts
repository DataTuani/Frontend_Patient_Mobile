import { StyleSheet } from 'react-native';



export const globalColors = {
    primary: '#003E6D',
    secondary: '#67C3DC',
    tertiary: '#008CCA',
    dark: '#000000',
    light: '#FFFFFF',
    gray: '#ccc',
    gay_2: '#4D4D4D',
    success: '#29842C'
}


export const globalStyles = (colors: any) => StyleSheet.create({
    ContainerRe: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 25,
        alignItems: 'center',
        backgroundColor:globalColors.light
    },
    ContainerAgendar:{
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal:15,
        alignItems: 'center',
        backgroundColor:globalColors.light
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: globalColors.light
    },

    primaryButtom: {
        backgroundColor: globalColors.tertiary,
        borderRadius: 15,
        padding: 15,
        //marginBottom: 50,
        width: '50%',
        alignItems: 'center',
        position: 'relative',
        top: 20
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center'
    },
    titleInfo: {
        fontWeight: '600',
        textAlign: 'left',
        fontSize: 17,
        marginVertical: 7,
        color: globalColors.primary
    },
})