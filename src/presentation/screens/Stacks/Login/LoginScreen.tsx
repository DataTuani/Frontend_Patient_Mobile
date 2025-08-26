import { Text, View } from "react-native";
import { globalStyles } from "../../../theme/theme";
import { PrimaryButton } from "../../../components/shared/PrimaryButton";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from "../../../routes/StackNavigator";

export const LoginScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    return (
        <View style={globalStyles.container}>
            <Text>Login Screen</Text>
            <PrimaryButton label="Login" onPress={() => { navigation.navigate('Home') }} />
            <PrimaryButton
            label="Register"
            onPress={() => {navigation.navigate('Register')}}
            />

        </View>
    )
}
