import React, { useContext, useState } from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
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

const height = Dimensions.get('window').height;

export const RegisterScreen3 = () => {

    const navigator = useNavigation<NavigationProp<RootStackParams>>();
    const { colors } = useContext(ThemeContext);
    const  styles = globalStyles(colors);
    const { updateFormData } = useRegisterStore();

    const Register3Schema = Yup.object().shape({
        grupo_sanguineo: Yup.string().required('Seleccione una opcion'),
        alergias: Yup.array().required('Seleccione una opcion'),
        enfermedades_cronicas: Yup.array().required('Seleccione una opcion')
    })

    return (
        <Formik
            initialValues={{
                grupo_sanguineo: '',
                alergias: [],
                enfermedades_cronicas: []
            }}
            validationSchema={Register3Schema}
            onSubmit={(values) => {
                updateFormData({
                    grupo_sanguineo: values.grupo_sanguineo,
                    alergias: values.alergias,
                    enfermedades_cronicas: values.enfermedades_cronicas
                });
                console.log(values);
                navigator.navigate('Register4');
            }}
        >

            {({ handleSubmit, values, errors, touched, isSubmitting, setFieldValue }) => (
                <View style={[styles.ContainerRe]}>

                    <Text style={style.title}>Registrar</Text>
                    <RegisterStepper currentStep={3} />
                    <View style={style.card}>
                        <View style={{ width: '90%' }}>
                            <Text style={style.titleInfo}>Informacion Medica</Text>
                        </View>
                        <CustomDropdown
                            title='Grupo Sanguineo'
                            items={[
                                { label: 'A+', value: 'a+' },
                                { label: 'A-', value: 'a-' },
                                { label: 'B+', value: 'b+' },
                                { label: 'B-', value: 'b-' },
                                { label: 'AB+', value: 'ab+' },
                                { label: 'AB-', value: 'ab-' },
                                { label: 'O+', value: 'o+' },
                                { label: 'O-', value: 'o-' }
                            ]}
                            value={values.grupo_sanguineo}
                            setValue={(val) => {
                                const newValue = typeof val == 'function'
                                    ? val(values.grupo_sanguineo)
                                    : val;
                                setFieldValue('grupo_sanguineo', newValue);
                            }}
                            placeholder='Selecciona tu grupo sanguineo'
                        />
                        {touched.grupo_sanguineo && errors.grupo_sanguineo && (
                            <Text style={{ color: 'red' }}>{errors.grupo_sanguineo}</Text>
                        )}
                        <CustomDropdownItems
                            title='Alergias'
                            items={[
                                { label: 'Polvo', value: 'polvo' },
                                { label: 'Pólenes', value: 'polenes' },
                                { label: 'Ácaros', value: 'acaros' },
                                { label: 'Picaduras de insectos', value: 'picaduras de insectos' },
                                { label: 'Medicamentos (penicilina, aspirina, etc.)', value: 'medicamentos' },
                                { label: 'Alimentos (maní, mariscos, lácteos, huevo, trigo, soya)', value: 'alimentos' },
                                { label: 'Látex', value: 'latex' },
                                { label: 'Perfumes o fragancias', value: 'perfume o fragrancias' },
                                { label: 'Pelo de animales', value: 'pelo de animales' },
                                { label: 'Moho', value: 'moho' },
                            ]}
                            value={values.alergias}
                            setValue={(val) => {
                                const newValue = typeof val === 'function'
                                    ? val(values.alergias)
                                    : val;
                                setFieldValue('alergias', newValue);
                            }}
                            placeholder='Selecciona si tienes alergias'
                        />
                        {touched.alergias && errors.alergias && (
                            <Text style={{ color: 'red' }}>{errors.alergias}</Text>
                        )}
                        <CustomDropdownItems
                            title='Enfermedades Cronicas'
                            items={[
                                { label: 'Diabetes (Tipo 1, Tipo 2)', value: 'diabetes' },
                                { label: 'Hipertensión arterial', value: 'Ha' },
                                { label: 'Asma', value: 'asma' },
                                { label: 'Epilepsia', value: 'epilepsia' },
                                { label: 'Enfermedad pulmonar obstructiva crónica (EPOC)', value: 'epoc' },
                                { label: 'Enfermedades cardíacas (insuficiencia cardíaca, arritmias)', value: 'ec' },
                                { label: 'Enfermedad renal crónica', value: 'erc' },
                                { label: 'Hipotiroidismo o hipertiroidismo', value: 'eh' },
                                { label: 'Artritis reumatoide', value: 'ar' },
                                { label: 'Migraña crónica', value: 'migraña' },
                            ]}
                            value={values.enfermedades_cronicas}
                            setValue={(val) => {
                                const newValue = typeof val === 'function'
                                    ? val(values.enfermedades_cronicas)
                                    : val;
                                setFieldValue('enfermedades_cronicas', newValue);
                            }}
                            placeholder='Selecciona si tienes enfermedades cronicas'
                        />
                        {touched.enfermedades_cronicas && errors.enfermedades_cronicas && (
                            <Text style={{ color: 'red' }}>{errors.enfermedades_cronicas}</Text>
                        )}
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