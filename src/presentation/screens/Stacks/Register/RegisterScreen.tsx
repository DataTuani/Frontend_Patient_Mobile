import { View } from 'react-native';
import { NavigationProp, StackActions, useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../../theme/theme';
import { PrimaryButton } from '../../../components/shared/PrimaryButton';
import { RootStackParams } from '../../../routes/StackNavigator';

export const RegisterScreen = () => {

    const navigator = useNavigation<NavigationProp<RootStackParams>>();

    return (
        <View style={globalStyles.container}>

            <PrimaryButton
                label='Home'
                onPress={() => navigator.navigate('Home')}
            />

            <PrimaryButton
                label='Regresar al home'
                onPress={() => navigator.goBack()}
            />
        </View>
    )
}
