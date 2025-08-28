import { View } from 'react-native'
import { type NavigationProp, StackActions, useNavigation } from "@react-navigation/native";
import { PrimaryButton } from '../../components/shared/PrimaryButton';
import { type RootStackParams } from '../../routes/StackNavigator';
import { HamburgerMenu } from '../../components/shared/HamburgerMenu';
import { useContext } from 'react';
import { ThemeContext } from '../../../../context/ThemeContext';
import { globalStyles } from '../../theme/theme';

export const HomeScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const { colors } = useContext(ThemeContext);
    const styles = globalStyles(colors);

    return (
        <View style={styles.container}>
            <HamburgerMenu />
            <PrimaryButton
                label='Salir'
                onPress={() => navigation.dispatch(StackActions.popToTop)}
            />
        </View>
    )
}  