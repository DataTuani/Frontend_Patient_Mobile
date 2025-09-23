import React, { useContext } from 'react'
import { ThemeContext } from '../../../../../context/ThemeContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ControlParentalStackParams, RootStackParams } from '../../../routes/StackNavigator';
import { globalColors, globalStyles } from '../../../theme/theme';
import { View,StyleSheet} from 'react-native';
import { ButtonCitas} from '../../../components/shared/PrimaryButton';

export const IniciarControlParentalScreen = () => {

    const navigation = useNavigation<NavigationProp<ControlParentalStackParams>>();
    const { colors } = useContext(ThemeContext);
    const styles = globalStyles(colors);


    return (
        <View style={styles.container}>
           <ButtonCitas 
           label='Conectar cuenta existente'
           onPress={() => navigation.navigate("RegistroParental")}
           style={stylesP.button}
           />

           <ButtonCitas 
           label='Crear Cuenta'
           onPress={() => console.log('')}
           style={stylesP.buttonSecond}
           style2={{color: globalColors.gay_2}}
           />
        </View>
    );
};

const stylesP = StyleSheet.create({   
    button: {
        marginTop: 50,
        
    },
    buttonSecond: {
        backgroundColor: globalColors.light,
        borderColor: globalColors.tertiary,
        borderWidth: 1

    }
}); 