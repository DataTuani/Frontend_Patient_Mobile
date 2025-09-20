import React, { useContext, useState } from 'react'
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { globalColors, globalStyles, } from '../../../theme/theme';
import { RootStackParams } from '../../../routes/StackNavigator';
import { ThemeContext } from '../../../../../context/ThemeContext';
import { CustomDropdown, CustomDropdownItems } from '../../../components/shared/CustomDropdown';
import { PrimaryButton } from '../../../components/shared/PrimaryButton';
import { RegisterStepper } from '../../../components/shared/RegisterStepper';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRegisterStore } from '../../../../hooks/useRegisterStore';
import { CustomInputPas, CustomInputRegister } from '../../../components/shared/CustomInput';
import { registerController } from '../../../../controller/authController';
import { Ionicons } from '@expo/vector-icons';

const height = Dimensions.get('window').height;

export const RegisterScreen3 = () => {

    const navigator = useNavigation<NavigationProp<RootStackParams>>();
    const { colors } = useContext(ThemeContext);
    const styles = globalStyles(colors);
    const { updateFormData } = useRegisterStore();
    const [showPassword, setShowPassword] = useState(false);

    const Register3Schema = Yup.object().shape({
        correo: Yup.string().email('Correo invalido').required('Correo requerido'),
        password: Yup.string().min(6, 'Minimo 6 caracteres').required('Contraseña es requerida'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Las contraseña no coincide')
            .required('Debes confirmar tu contraseña'),
    })

    return (
        <Formik
            initialValues={{
                correo: '', password: '', confirmPassword: '', rol_id: 1
            }}
            validationSchema={Register3Schema}
            onSubmit={async (values) => {
                updateFormData({
                    correo: values.correo,
                    password: values.password,
                    rol_id: values.rol_id
                });

                const fullData = useRegisterStore.getState().formData;
                try {
                    const response = await registerController(fullData);

                    if (response.success) {
                        console.log('Registro Exitoso', fullData);
                        navigator.navigate('Home');
                    } else {
                        alert(response.message);
                        console.log("Error del backend", fullData);
                    }

                } catch (error) {
                    alert("Error al registrar");
                    console.log(error)

                }
            }}
        >

            {({ handleSubmit, values, errors, touched, isSubmitting, handleChange }) => (
                <View style={[styles.ContainerRe]}>

                    <Text style={style.title}>Registrar</Text>
                    <Text style={{ fontWeight: '400' }}>Completa tu registro y sé parte de SINAES</Text>
                    <RegisterStepper currentStep={3} />

                    <CustomInputRegister
                        label='Correo Electronico'
                        placeholder='correo@ejemplo.com'
                        value={values.correo}
                        onChangeText={handleChange('correo')}
                    />
                    {touched.correo && errors.correo && (
                        <Text style={{ color: 'red', marginRight: 220, marginTop: 5 }}>{errors.correo}</Text>
                    )}
                    <CustomInputPas
                        label='Contraseña'
                        placeholder='Escribe contraseña'
                        value={values.password}
                        onChangeText={handleChange('password')}
                        secureTextEntry={!showPassword}
                        style={{}}
                        rightIcon={
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons
                                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                                    size={20}
                                    color="gray"
                                />
                            </TouchableOpacity>
                        }
                    />
                    {touched.password && errors.password && (
                        <Text style={{ color: 'red', marginRight: 180, marginTop: 5 }}>{errors.password}</Text>
                    )}
                    <CustomInputPas
                        label='Confirmar contraseña'
                        placeholder='Escribe contraseña'
                        value={values.confirmPassword}
                        onChangeText={handleChange('confirmPassword')}
                        secureTextEntry={!showPassword}
                        rightIcon={
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons
                                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                                    size={20}
                                    color="gray"
                                />
                            </TouchableOpacity>
                        }
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                        <Text style={{ color: 'red', marginRight: 145, marginTop: 5 }}>{errors.confirmPassword}</Text>
                    )}
                    <View style={{ marginTop: 5, marginRight: 20 }}>
                        <Text style={{ fontWeight: '400', marginBottom: 5, color: globalColors.gay_2 }}>Políticas de contraseña</Text>
                        <Text style={{ fontWeight: '400', color: globalColors.gay_2 }}>  ○ La contraseña debe tener mínimo 8 caracteres.</Text>
                        <Text style={{ fontWeight: '400', color: globalColors.gay_2 }}>  ○ Debe incluir letras mayúsculas y minúsculas.</Text>
                        <Text style={{ fontWeight: '400', color: globalColors.gay_2 }}>  ○ Debe contener al menos un número.</Text>
                        <Text style={{ fontWeight: '400', color: globalColors.gay_2 }}>  ○ Debe tener al menos un carácter especial (@, #, $, %, &).</Text>
                        <Text style={{ fontWeight: '400', color: globalColors.gay_2 }}>  ○ No debe contener espacios.</Text>
                        <Text style={{ fontWeight: '400', color: globalColors.gay_2 }}>  ○ No puede ser igual al nombre de usuario.</Text>
                    </View>

                    <PrimaryButton
                        onPress={() => handleSubmit()}
                        label={isSubmitting ? 'Cargando...' : 'Siguiente'}
                    />
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ marginTop: 60, fontSize: 16, color: globalColors.dark }}>¿Ya tienes una cuenta? {''}
                            <Text style={{ fontWeight: 'bold', color: globalColors.dark }}
                                onPress={() => navigator.navigate('Login')}
                            >Inicia Sesion</Text>
                        </Text>
                    </View>
                </View>

            )}
        </Formik>
    )
}


const style = StyleSheet.create({
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#003E6D'
    },
}
)