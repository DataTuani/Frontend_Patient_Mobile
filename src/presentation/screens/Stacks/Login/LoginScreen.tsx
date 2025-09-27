import React, { useState } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { globalColors, globalStyles } from "../../../theme/theme";
import { ButtonLogin } from "../../../components/shared/PrimaryButton";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from "../../../routes/StackNavigator";
import { useContext } from "react";
import { ThemeContext } from "../../../../../context/ThemeContext";
import { CustomInput, CustomInputPas } from "../../../components/shared/CustomInput";
import * as Yup from 'yup';
import { Formik } from 'formik';
import { loginController } from "../../../../controller/authController";
import { useAuthStore } from '../../../../hooks/authStore';
import { Ionicons } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';



export const LoginScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const { colors } = useContext(ThemeContext);
    const styles = globalStyles(colors);
    const [showPassword, setShowPassword] = useState(false);
    const setUser = useAuthStore((state) => state.setUser);

    const LoginSchema = Yup.object().shape({
        correo: Yup.string().email('Correo invalido').required('Correo es requerido'),
        contraseña: Yup.string().min(6, 'Minimo 6 caracteres').required('Contraseña es requerido')
    })

    return (
        <Formik
            initialValues={{ correo: '', contraseña: '' }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                const result = await loginController(values.correo, values.contraseña);
                if (result.success) {

                    const { usuario, token } = result.data;

                    setUser(
                        {
                            id: usuario.id,
                            correo: usuario.correo,
                            contraseña: "",
                            paciente_id: usuario.Paciente?.id ?? null,
                        },
                        token
                    );
                    console.log("Token: ", token);
                    console.log(values)
                    navigation.navigate("Home");
                }
                else {
                    alert(result.message);
                    console.log(values);
                }
                setSubmitting(false);
            }}
        >
            {({ handleChange, handleSubmit, values, errors, touched, isSubmitting }) => (
                <View style={[style.container, { backgroundColor: colors.background }]}>

                    <Spinner
                        visible={isSubmitting}
                        color={globalColors.tertiary}     // color del spinner
                        overlayColor="rgba(0,0,0,0.25)"
                    />

                    <Image
                        source={require('../../../assets/sinaes_logo .png')}
                        style={style.logo}
                    />
                    <Text style={[style.cardTitle, { color: colors.primary, fontWeight: '600', }]}>SINAES</Text>
                    <CustomInput
                        label="Correo Electronico"
                        placeholder="Ingresar tu correo"

                        value={values.correo}
                        onChangeText={handleChange('correo')}
                    />

                    {touched.correo && errors.correo && (
                        <Text style={{ color: 'red' }}>{errors.correo}</Text>
                    )}

                    <CustomInputPas
                        label="Contraseña"
                        placeholder="Ingresar tu Contraseña"
                        secureTextEntry={!showPassword}
                        value={values.contraseña}
                        onChangeText={handleChange('contraseña')}
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
                    {touched.contraseña && errors.contraseña && (
                        <Text style={{ color: 'red' }}>{errors.contraseña}</Text>
                    )}
                    <ButtonLogin title={isSubmitting ? "Cargando..." : "Iniciar Sesion"} onPress={handleSubmit} />
                    <Text
                        style={[style.footerText]}
                    >
                        ¿Primera vez en Saludito? {''}
                        <Text style={{ color: globalColors.gay_2, fontWeight: 'bold' }}
                            onPress={() => navigation.navigate('Register')}
                        >Crear Cuenta</Text>
                    </Text>
                </View>
            )}
        </Formik>
    )
}

const style = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 100,
        paddingHorizontal: 30,
    },
    logo: {
        width: 170,
        height: 170,
        marginBottom: 10,
    },

    cardTitle: {
        fontSize: 50,
        marginBottom: 10,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center'
    },
    footerText: {
        marginTop: 20,
        fontSize: 13,
        color: globalColors.gray,
        fontWeight: '400'
    },
    filled: {
        backgroundColor: globalColors.gay_2,
        color: '#fff'
    },
    input: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 8,
        fontSize: 16
    }
})