import {  View } from 'react-native'
import { globalStyles } from '../../theme/theme';
import { type NavigationProp, StackActions, useNavigation } from "@react-navigation/native";
import { PrimaryButton } from '../../components/shared/PrimaryButton';
import { type RootStackParams } from '../../routes/StackNavigator';
import { HamburgerMenu } from '../../components/shared/HamburgerMenu';
import { CustomIonicons } from '../../components/shared/Custom_Ionicons';

export const HomeScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    return (
        <View style={globalStyles.container}>
            <HamburgerMenu />
            <PrimaryButton
                label='Salir'
                onPress={() => navigation.dispatch(StackActions.popToTop)}
            />

        </View>
    )
}
