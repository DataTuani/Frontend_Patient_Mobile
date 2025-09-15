import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { globalColors, globalStyles } from '../theme/theme';
import { Pressable, Switch } from 'react-native-gesture-handler'
import { HamburgerMenu } from '../components/shared/HamburgerMenu';
import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';


export const SettingScreen = () => {
    const { colors, currentTheme, toggleTheme } = useContext(ThemeContext);
    const style = globalStyles(colors);
    return (
        <View style={style.container}>
            <HamburgerMenu />
            <Text style={{color: colors.title}}>Cambio de Tema</Text>
            <Pressable
                onPress={() => { }}
                style={styles.button}
            >
                <Text style={{
                    marginLeft: 20,
                    color: globalColors.light
                }}>Modo Oscuro</Text>
                <Switch
                    value={currentTheme === 'dark'}
                    onChange={() => toggleTheme(currentTheme === 'light' ? 'dark' : 'light')}
                />
            </Pressable>
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
