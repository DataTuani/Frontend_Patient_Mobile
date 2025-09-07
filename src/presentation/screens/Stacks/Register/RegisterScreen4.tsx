import React, { useContext } from 'react'
import { View, StyleSheet, Text, Image, Dimensions, Button, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { globalColors, } from '../../../theme/theme';
import { CustomInputRegister } from '../../../components/shared/CustomInput';
import { PrimaryButton } from '../../../components/shared/PrimaryButton';
import { RootStackParams } from '../../../routes/StackNavigator';
import { ThemeContext } from '../../../../../context/ThemeContext';
import { RegisterStepper } from '../../../components/shared/RegisterStepper';

const height = Dimensions.get('window').height;

export const RegisterScreen4 = () => {

    const navigator = useNavigation<NavigationProp<RootStackParams>>();
    const { colors } = useContext(ThemeContext);


    return (
        <View style={[style.container, { backgroundColor: colors.background }]}>

            <Text style={style.title}>Registrar</Text>
            <RegisterStepper currentStep={4}/>
            <View style={style.card}>
                <View style={{ width: '90%' }}>
                    <Text style={style.titleInfo}>Credenciales</Text>

                </View>
                <CustomInputRegister
                    label='Correo Electronico'
                    placeholder='correo@ejemplo.com'
                />
                <CustomInputRegister
                    label='Contraseña'
                    placeholder='Escribe contraseña'
                />
                <CustomInputRegister
                    label='Confirmar contraseña'
                    placeholder='Escribe contraseña'
                />
                <PrimaryButton
                    onPress={() => navigator.navigate('Home')}
                    label='Registrate'
                />
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ marginTop: 60, fontSize: 16, color: colors.primary }}>¿Ya tienes una cuenta? {''}
                        <Text style={{ fontWeight: 'bold', color: colors.secondary }}
                            onPress={() => navigator.navigate('Login')}
                        >Inicia Sesion</Text>
                    </Text>
                </View>
            </View>
        </View>
    )
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 25,
        alignItems: 'center',
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom:50,
        color:'#003E6D'
    },
    titleInfo: {
        fontWeight: '600',
        textAlign: 'left',
        fontSize: 17,
        marginVertical: 7,
        color:globalColors.primary
    },
    card: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        alignItems: 'center'
    },
}
)