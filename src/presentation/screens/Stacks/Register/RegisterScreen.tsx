import { View, StyleSheet, Text, Image, Dimensions, Button, TouchableOpacity } from 'react-native';
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
import { registerController } from '../../../../controller/authController';


const height = Dimensions.get('window').height;

export const RegisterScreen = () => {

    const navigator = useNavigation<NavigationProp<RootStackParams>>();
    const { colors } = useContext(ThemeContext);
    const styles = globalStyles(colors);
    const [gender, setGender] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);
    const [currentStep, setCurrentStep] = useState(1);

    const handleConfirm = (date: Date) => {
        setSelectedDate(date);
        hideDatePicker();
    }

    const nextStep = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const RegisterSchema = Yup.object().shape({
        correo: Yup.string()
            .email('Correo inválido')
            .required('Correo es requerido'),

        password: Yup.string()
            .min(6, 'Mínimo 6 caracteres')
            .required('Contraseña es requerida'),

        nombreCompleto: Yup.string()
            .min(10, 'Mínimo 10 caracteres')
            .required('Primer nombre requerido'),

        cedula: Yup.string()
            .length(16, 'Debe tener 16 caracteres')
            .required('Cédula requerida'),

        fecha_nacimiento: Yup.date()
            .max(new Date(), 'Fecha inválida')
            .required('Fecha de nacimiento requerida'),

        telefono: Yup.string()
            .min(8, 'Mínimo 8 dígitos')
            .required('Teléfono requerido'),

        genero: Yup.string()
            .required('Género requerido'),

        direccion: Yup.string()
            .required('Dirección requerida'),

        grupo_sanguineo: Yup.string()
            .required('Debe escoger una opción'),

        enfermedades_cronicas: Yup.string()
            .required('Debe escoger una opción'),

        alergias: Yup.string()
            .required('Debe escoger una opción'),
    })

    return (
        <Formik
            initialValues={{
                correo: '',
                password: '',
                nombreCompleto: '',
                cedula: '',
                fecha_nacimiento: null as Date | null,
                telefono: '',
                genero: '',
                direccion: '',
                grupo_sanguineo: '',
                enfermedades_cronicas: '',
                alergias: ''
            }}
            validationSchema={RegisterSchema}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);

                const nombres = values.nombreCompleto.trim().split(' ');

                const primer_nombre = nombres[0] || '';
                const segundo_nombre =
                    nombres.length > 3
                        ? nombres.slice(1, nombres.length - 2).join(' ')
                        : nombres[1] || '';
                const primer_apellido = nombres.length > 2 ? nombres[nombres.length - 2] : '';
                const segundo_apellido = nombres.length > 3 ? nombres[nombres.length - 1] : '';

                const result = await registerController(
                    values.correo,
                    values.password,
                    primer_nombre,
                    segundo_nombre,
                    primer_apellido,
                    segundo_apellido,
                    values.cedula,
                    values.fecha_nacimiento as Date,
                    values.telefono,
                    values.genero,
                    values.direccion,
                    values.grupo_sanguineo,
                    values.enfermedades_cronicas,
                    values.alergias
                );
                if (result.success) {
                    console.log(values);
                    navigator.navigate('Register2');
                }
                else {
                    alert('Error de registrar');
                    console.log(values);
                }
                setSubmitting(false);
            }}
        >

            {({ handleChange, handleSubmit, values, errors, touched, isSubmitting }) => (
                <View style={[style.container, { backgroundColor: colors.background }]}>
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
                        <CustomDropdown
                            title='Sexo'
                            items={[
                                { label: 'Masculino', value: 'masculino' },
                                { label: 'Femenino', value: 'femenino' }
                            ]}
                            value={gender}
                            setValue={(val) => {
                                setGender(val);
                                values.genero 
                            }}
                            placeholder='Selecciona tu género'
                        />
                        <View style={style.Container}>
                            <Text style={style.label}>Fecha de nacimiento</Text>
                            <TouchableOpacity style={style.inputContainer} onPress={showDatePicker}>
                                <Text style={style.inputText}>{selectedDate ? selectedDate.toLocaleDateString() : 'dd/mm/aaaa'}</Text>
                                <Ionicons name='calendar-outline' size={20} color='gray' />
                            </TouchableOpacity>

                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={(date) => {
                                    handleConfirm(date);
                                    values.fecha_nacimiento = date;
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
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 25,
        alignItems: 'center',
    },
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