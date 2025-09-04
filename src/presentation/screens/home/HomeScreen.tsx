import { View, Text, StyleSheet } from 'react-native'
import { type NavigationProp, StackActions, useNavigation } from "@react-navigation/native";
import { PrimaryButton } from '../../components/shared/PrimaryButton';
import { type RootStackParams } from '../../routes/StackNavigator';
import { HamburgerMenu } from '../../components/shared/HamburgerMenu';
import { useContext } from 'react';
import { ThemeContext } from '../../../../context/ThemeContext';
import { globalColors, globalStyles } from '../../theme/theme';

export const HomeScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const { colors } = useContext(ThemeContext);
    const styles = globalStyles(colors);
    const name = 'Melanie Arias'

    return (
        <View style={styles.container}>
            <HamburgerMenu />
            <Text style={style.TextStyle}>Bienvenida,</Text>
            <Text style={style.TextStyle}>{name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'stretch', marginHorizontal: 5, justifyContent: 'space-between' }}></View>
            <PrimaryButton
                label='Salir'
                onPress={() => navigation.dispatch(StackActions.popToTop)}
            />
        </View>
    )
}

const style = StyleSheet.create({
    TextStyle: {
        fontSize: 45,
        color: globalColors.dark,
        fontWeight: 'bold'
    }
})