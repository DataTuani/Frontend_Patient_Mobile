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
        backgroundColor: colors.background
    },

    primaryButtom: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        padding: 10, 
        marginBottom: 10,
        width: '100%',
        alignItems: 'center'
    },
})