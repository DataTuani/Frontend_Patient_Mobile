import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions,  TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { globalColors, globalStyles } from '../../../theme/theme';
import { RootStackParams } from '../../../routes/StackNavigator';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../../../../context/ThemeContext';
import { CustomInputRegister } from '../../../components/shared/CustomInput';
import { CustomDropdown } from '../../../components/shared/CustomDropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Ionicons } from '@expo/vector-icons';
import { PrimaryButton } from '../../../components/shared/PrimaryButton';
import { RegisterStepper } from '../../../components/shared/RegisterStepper';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRegisterStore } from '../../../../hooks/useRegisterStore';

export const RegisterScreen = () => {

    const navigator = useNavigation<NavigationProp<RootStackParams>>();
    const { colors } = useContext(ThemeContext);
    const styles = globalStyles(colors);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);
    const [currentStep, setCurrentStep] = useState(1);
    const { updateFormData } = useRegisterStore();

    const handleConfirm = (date: Date, setFieldValue: (filed: string, value: any) => void) => {
        setFieldValue('fecha_nacimiento', date);
        hideDatePicker();
    }

    const nextStep = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const RegisterSchema = Yup.object().shape({
        nombreCompleto: Yup.string()
            .required('Nombre completo requerido'),
        genero: Yup.string()
            .required('Género requerido'),
        fecha_nacimiento: Yup.date()
            .max(new Date(), 'Fecha inválida')
            .required('Fecha de nacimiento requerida'),
    })

    return (
        <Formik
            initialValues={{
                nombreCompleto: '',
                genero: '',
                fecha_nacimiento: null as Date | null,
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values) => {
                updateFormData({
                    nombreCompleto: values.nombreCompleto,
                    genero: values.genero,
                    fecha_nacimiento: values.fecha_nacimiento
                });
                console.log(values);
                navigator.navigate('Register2');
                nextStep();
            }}
        >
            {({ handleChange, handleSubmit, values, errors, touched, isSubmitting, setFieldValue }) => (
                <View style={[styles.ContainerRe]}>
                    <Text style={style.title}>Registrar</Text>
                    <RegisterStepper currentStep={1} />
                    <View style={style.card}>
                        <Text style={[style.titleInput, { color: colors.primary, fontWeight: '600' }]}>Crear Cuenta Nueva</Text>
                        <View style={{ width: '90%' }}>
                            <Text style={style.titleInfo}>Informacion Personal I</Text>

                        </View>
                        <CustomInputRegister
                            label='Nombre Completo'
                            placeholder='Ingresa tu nombre completo'
                            value={values.nombreCompleto}
                            onChangeText={handleChange('nombreCompleto')}
                        />
                        {touched.nombreCompleto && errors.nombreCompleto && (
                            <Text style={{ color: 'red' }}>{errors.nombreCompleto}</Text>
                        )}
                        <CustomDropdown
                            title='Sexo'
                            items={[
                                { label: 'Masculino', value: 'M' },
                                { label: 'Femenino', value: 'F' }
                            ]}
                            value={values.genero}
                            setValue={(val) => {
                                const newValue = typeof val === 'function'
                                    ? val(values.genero)
                                    : val;
                                setFieldValue('genero', newValue);
                            }}
                            placeholder='Selecciona tu género'
                        />
                        {touched.genero && errors.genero && (
                            <Text style={{ color: 'red' }}>{errors.genero}</Text>
                        )}
                        <View style={style.Container}>
                            <Text style={style.label}>Fecha de nacimiento</Text>
                            <TouchableOpacity style={style.inputContainer} onPress={showDatePicker}>
                                <Text style={style.inputText}>{values.fecha_nacimiento ? values.fecha_nacimiento.toLocaleDateString() : 'dd/mm/aaaa'}</Text>
                                <Ionicons name='calendar-outline' size={20} color='gray' />
                            </TouchableOpacity>

                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={(date) => {
                                    handleConfirm(date, setFieldValue);
                                }}
                                onCancel={hideDatePicker}
                            />

                            {touched.fecha_nacimiento && errors.fecha_nacimiento && (
                                <Text style={{ color: 'red' }}>{errors.fecha_nacimiento}</Text>
                            )}
                        </View>
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
    titleInput: {
        fontSize: 22,
        marginBottom: 8,
        textAlign: 'center'
    },
    titleInfo: {
        fontWeight: '600',
        textAlign: 'left',
        fontSize: 17,
        marginVertical: 7,
        color: globalColors.primary
    },
    Container: {
        marginVertical: 10,
        width: '90%'
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        color: globalColors.primary
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 12,
        borderRadius: 8,
        elevation: 8,
        backgroundColor: 'white',
        borderColor: '#fff'
    },
    inputText: {
        fontSize: 16,
        color: '#999'
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