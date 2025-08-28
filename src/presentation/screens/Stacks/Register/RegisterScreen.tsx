import { View } from 'react-native';
import { NavigationProp, StackActions, useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../../theme/theme';
import { PrimaryButton } from '../../../components/shared/PrimaryButton';
import { RootStackParams } from '../../../routes/StackNavigator';
import { useContext } from 'react';
import { ThemeContext } from '../../../../../context/ThemeContext';

export const RegisterScreen = () => {

    const navigator = useNavigation<NavigationProp<RootStackParams>>();
    const {colors} = useContext(ThemeContext);
    const styles = globalStyles(colors);

    return (
        <View style={styles.container}>
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
