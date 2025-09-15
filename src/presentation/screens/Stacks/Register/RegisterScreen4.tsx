import React, { useContext } from 'react'
import { View, StyleSheet, Text, Image, Dimensions, Button, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { globalColors, globalStyles, } from '../../../theme/theme';
import { CustomInputRegister } from '../../../components/shared/CustomInput';
import { PrimaryButton } from '../../../components/shared/PrimaryButton';
import { RootStackParams } from '../../../routes/StackNavigator';
import { ThemeContext } from '../../../../../context/ThemeContext';
import { RegisterStepper } from '../../../components/shared/RegisterStepper';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRegisterStore } from '../../../../hooks/useRegisterStore';
import { registerController } from '../../../../controller/authController';
import { CustomDropdownNumber } from '../../../components/shared/CustomDropdown';


const height = Dimensions.get('window').height;

export const RegisterScreen4 = () => {

    const navigator = useNavigation<NavigationProp<RootStackParams>>();
    const { colors } = useContext(ThemeContext);
    const styles  = globalStyles(colors);
    const { formData, updateFormData } = useRegisterStore();

    const Register4Schema = Yup.object().shape({
        correo: Yup.string().email('Correo invalido').required('Correo requerido'),
        password: Yup.string().min(6, 'Minimo 6 caracteres').required('Contraseña es requerida'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Las contraseña no coincide')
            .required('Debes confirmar tu contraseña'),
        rol_id: Yup.number().required('Seleccione un rol')
    })
    return (
        <Formik
            initialValues={{
                correo: '', password: '', confirmPassword: '', rol_id: 1
            }}
            validationSchema={Register4Schema}
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
                        console.log('Registro exitoso', fullData);
                        navigator.navigate('Home');
                    } else {
                        alert(response.message);
                        console.log('Error del backend:', fullData);
                    }
                } catch (error) {
                    alert('Error al registrar');
                    console.log(error);
                }
            }}

        >

            {({ handleChange, handleSubmit, values, errors, touched, isSubmitting, setFieldValue }) => (

                <View style={[styles.ContainerRe]}>

                    <Text style={style.title}>Registrar</Text>
                    <RegisterStepper currentStep={4} />
                    <View style={style.card}>
                        <View style={{ width: '90%' }}>
                            <Text style={style.titleInfo}>Credenciales</Text>

                        </View>
                        <CustomInputRegister
                            label='Correo Electronico'
                            placeholder='correo@ejemplo.com'
                            value={values.correo}
                            onChangeText={handleChange('correo')}
                        />
                        {touched.correo && errors.correo && (
                            <Text style={{ color: 'red' }}>{errors.correo}</Text>
                        )}
                        <CustomInputRegister
                            label='Contraseña'
                            placeholder='Escribe contraseña'
                            value={values.password}
                            onChangeText={handleChange('password')}
                            secureTextEntry={true}
                        />
                        {touched.password && errors.password && (
                            <Text style={{ color: 'red' }}>{errors.password}</Text>
                        )}
                        <CustomInputRegister
                            label='Confirmar contraseña'
                            placeholder='Escribe contraseña'
                            value={values.confirmPassword}
                            onChangeText={handleChange('confirmPassword')}
                            secureTextEntry={true}
                        />
                        {touched.confirmPassword && errors.confirmPassword && (
                            <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>
                        )}

                        <CustomDropdownNumber
                            title='Roles'
                            items={[
                                { label: 'Paciente', value: 1 },
                                { label: 'Doctor', value: 2 },
                                { label: 'Enfermera', value: 3 },
                                { label: 'Admin', value: 4 },
                                { label: 'Usuario', value: 5 },
                            ]}
                            value={values.rol_id}
                            setValue={(val) => {
                                const newValue = typeof val === 'function'
                                    ? val(values.rol_id)
                                    : val;
                                setFieldValue('rol_id', newValue);
                            }}
                            placeholder='Selecciona un rol'
                        />
                        <PrimaryButton
                            onPress={() => handleSubmit()}
                            label={isSubmitting ? 'Cargando...' : 'Siguiente'}
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
            )}
        </Formik>
    )
}


const style = StyleSheet.create({
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 50,
        color: '#003E6D'
    },
    titleInfo: {
        fontWeight: '600',
        textAlign: 'left',
        fontSize: 17,
        marginVertical: 7,
        color: globalColors.primary
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