import React from 'react'
import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import { globalColors, globalStyles } from "../../../theme/theme";
import { ButtonLogin } from "../../../components/shared/PrimaryButton";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from "../../../routes/StackNavigator";
import { useContext } from "react";
import { ThemeContext } from "../../../../../context/ThemeContext";
import { CustomInput } from "../../../components/shared/CustomInput";
import * as Yup from 'yup';
import { Formik } from 'formik';
import { loginController } from "../../../../controller/authController";
import { useAuthStore } from '../../../../hooks/authStore';

const { height } = Dimensions.get('window');

export const LoginScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const { colors } = useContext(ThemeContext);
    const styles = globalStyles(colors);

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

                    <Image
                        source={require('../../../assets/sinaes_logo .png')}
                        style={style.logo}
                    />
                    <Text style={[style.cardTitle, { color: colors.primary, fontWeight: '600', }]}>SINAES</Text>
                    <CustomInput
                        label="Correo Electronico"
                        placeholder="Ingresar tu correo"
                        variant="outlined"
                        value={values.correo}
                        onChangeText={handleChange('correo')}
                    />

                    {touched.correo && errors.correo && (
                        <Text style={{ color: 'red' }}>{errors.correo}</Text>
                    )}

                    <CustomInput
                        label="Contraseña"
                        placeholder="Ingresar tu Contraseña"
                        variant="outlined"
                        secureTextEntry={true}
                        value={values.contraseña}
                        onChangeText={handleChange('contraseña')}
                    />
                    {touched.contraseña && errors.contraseña && (
                        <Text style={{ color: 'red' }}>{errors.contraseña}</Text>
                    )}
                    <ButtonLogin title={isSubmitting ? "Cargando..." : "Iniciar Sesion"} onPress={handleSubmit} />
                    <Text
                        style={[style.footerText]}
                    >
                        ¿Primera vez en Saludito? {''}
                        <Text style={{ color: globalColors.gay_2, fontWeight:'bold' }}
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
        color:globalColors.gray,
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