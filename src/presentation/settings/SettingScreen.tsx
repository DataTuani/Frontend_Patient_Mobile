import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { globalColors, globalStyles } from '../theme/theme';
import { Switch } from 'react-native-gesture-handler'
import { ButtonIcon } from '../components/shared/ButtonIcon';
import { HamburgerMenu } from '../components/shared/HamburgerMenu';
import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';


export const SettingScreen = () => {

    const { currentTheme, toggleTheme } = useContext(ThemeContext);

    return (
        <View style={globalStyles.container}>
            <HamburgerMenu />
            <Text style={styles.title}>Cambio de Tema</Text>
            <TouchableOpacity
                onPress={() => { }}
                style={styles.button}
            >
                <Text style={{
                    marginLeft: 20,
                    color: globalColors.light
                }}>Modo Oscuro</Text>
                <Switch 
                value={currentTheme === 'dark' }
                onChange={() => toggleTheme(currentTheme === 'light' ? 'dark' : 'light')}
                />
            </TouchableOpacity>

            <Text style={styles.title}>Tema de Configración</Text>
            <ButtonIcon
                title='Claro'
                icon='bulb-outline'
                onPress={() => { }}
                isActive={false}
            />
            <ButtonIcon
                title='Oscuro'
                icon='moon-outline'
                onPress={() => { }}
                isActive={false}
            />
            <ButtonIcon
                title='Sistema'
                icon='code-slash-outline'
                onPress={() => { }}
                isActive={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
    },

    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: globalColors.primary,
        padding: 15,
        borderRadius: 10,
        marginBottom: 10
    }
})
