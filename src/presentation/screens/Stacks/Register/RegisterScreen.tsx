import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { globalColors, globalStyles } from '../../../theme/theme';
import { RootStackParams } from '../../../routes/StackNavigator';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../../../../context/ThemeContext';
import { CustomInputRegister } from '../../../components/shared/CustomInput';
import { CustomRadioButton } from '../../../components/shared/CustomDropdown';
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
    const { updateFormData } = useRegisterStore();

    const handleConfirm = (date: Date, setFieldValue: (filed: string, value: any) => void) => {
        setFieldValue('fecha_nacimiento', date);
        hideDatePicker();
    }

    const RegisterSchema = Yup.object().shape({
        nombreCompleto: Yup.string()
            .required('Nombre completo requerido'),
        genero: Yup.string()
            .required('Género requerido'),
        fecha_nacimiento: Yup.date()
            .max(new Date(), 'Fecha inválida')
            .required('Fecha de nacimiento requerida'),
        direccion: Yup.string().required('Direccion requerido'),
        telefono: Yup.string().min(8, 'Mínimo 8 caracteres').required('Telefono requerido'),
    })

    return (
        <Formik
            initialValues={{
                nombreCompleto: '',
                genero: '',
                fecha_nacimiento: null as Date | null,
                direccion: '',
                telefono: ''
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values) => {
                updateFormData({
                    nombreCompleto: values.nombreCompleto,
                    genero: values.genero,
                    fecha_nacimiento: values.fecha_nacimiento,
                    direccion: values.direccion,
                    telefono: values.telefono

                });
                console.log(values);
                navigator.navigate('Register2');
                
            }}
        >
            {({ handleChange, handleSubmit, values, errors, touched, isSubmitting, setFieldValue }) => (
                <View style={[styles.ContainerRe]}>
                    <Text style={style.title}>Registrar</Text>
                    <Text style={{ fontWeight: '400' }}>Completa tu registro y sé parte de SINAES</Text>
                    <RegisterStepper currentStep={1} totalSteps={3} />
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
                        <Text style={{ color: 'red', marginRight: 160, marginTop: 5 }}>{errors.nombreCompleto}</Text>
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
                            display="spinner"
                            maximumDate={new Date()}
                            onConfirm={(date) => {
                                handleConfirm(date, setFieldValue);
                            }}
                            onCancel={hideDatePicker}
                        />

                        {touched.fecha_nacimiento && errors.fecha_nacimiento && (
                            <Text style={{ color: 'red', marginTop: 5, marginLeft: 10 }}>{errors.fecha_nacimiento}</Text>
                        )}
                    </View>
                    <CustomInputRegister
                        label='Teléfono'
                        placeholder='Digite numero de telefono'
                        value={values.telefono}
                        onChangeText={handleChange('telefono')}
                    />
                    {touched.telefono && errors.telefono && (
                        <Text style={{ color: 'red', marginRight: 210, marginTop: 5 }}>{errors.telefono}</Text>
                    )}
                    <CustomRadioButton
                        title='Genero'
                        value={values.genero}
                        setValue={(val) => {
                            setFieldValue('genero', val);
                        }}
                        options={[
                            { label: "Masculino", value: "M", color: '#2196F3', icon: "male" },
                            { label: "Femenino", value: "F", color: '#E91E63', icon: "female" }
                        ]}
                    />
                    {touched.genero && errors.genero && (
                        <Text style={{ color: 'red', marginRight: 210, marginTop: 2 }}>{errors.genero}</Text>)}

                    <CustomInputRegister
                        label='Direccion'
                        placeholder='Ingresa tu direccion completa'
                        value={values.direccion}
                        onChangeText={handleChange('direccion')}
                        style={{ height: 50 }}
                    />
                    {touched.direccion && errors.direccion && (
                        <Text style={{ color: 'red', marginRight: 210, marginTop: 5 }}>{errors.direccion}</Text>
                    )}
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
        color: globalColors.primary
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
        marginVertical: 1,
        color: globalColors.primary
    },
    Container: {
        marginVertical: 10,
        width: '90%'
    },
    label: {
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 5,
        color: globalColors.dark
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

}
)