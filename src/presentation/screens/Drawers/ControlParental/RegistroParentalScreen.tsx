import React, { useContext } from 'react'
import { ThemeContext } from '../../../../../context/ThemeContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ControlParentalStackParams, RootStackParams } from '../../../routes/StackNavigator';
import { globalStyles } from '../../../theme/theme';
import { View, StyleSheet } from 'react-native';
import { ButtonCitas } from '../../../components/shared/PrimaryButton';
import { CustomInputRegister } from '../../../components/shared/CustomInput';

export const RegistroParental = () => {

    const navigation = useNavigation<NavigationProp<ControlParentalStackParams>>();
    const { colors } = useContext(ThemeContext);
    const styles = globalStyles(colors);


    return (
        <View style={styles.container}>

            <View style={{ justifyContent: 'center', marginTop: 50 }}>
                <CustomInputRegister
                    label='Correo electronico'
                    value=''
                    onChangeText={() => console.log('')}
                    placeholder='Ingrese su Correo electronico'
                    style2={stylesP.textStyle}
                    style={stylesP.input}
                />
                <ButtonCitas
                    label='Conectar cuenta existente'
                    onPress={() =>navigation.navigate("ControlParental")}
                    style={stylesP.button}
                />
            </View>

        </View>
    );
};

const stylesP = StyleSheet.create({

    input: {
        justifyContent: 'center',
        marginLeft: 20
    },

    textStyle: {
        marginLeft: 25
    },

    button: {
        marginTop: 30,

    },

});