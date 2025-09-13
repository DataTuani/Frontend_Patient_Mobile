import { StyleSheet } from 'react-native';



export const globalColors = {
    primary: '#042558',
    secondary: '#67C3DC',
    tertiary: '#D9E7EA',
    dark: '#000000',
    light: '#FFFFFF',
    gray: '#1E1E1E',
    danger: '#C60726',
    success: '#29842C' 
}


export const globalStyles = (colors: any) => StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        backgroundColor: globalColors.light
    },

    primaryButtom: {
        backgroundColor: colors.primary,
        borderRadius: 42,
        padding: 15,
        //marginBottom: 50,
        width: '50%',
        alignItems: 'center',
        position: 'relative',
        top: 35
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