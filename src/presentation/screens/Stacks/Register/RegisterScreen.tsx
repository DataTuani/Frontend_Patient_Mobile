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
        if (currentStep < 3){
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1){
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <View style={[style.container, { backgroundColor: colors.background }]}>
            <Text style={style.title}>Registrar</Text>
            <RegisterStepper currentStep={1}/>
            <View style={style.card}>
                <Text style={[style.titleInput, { color: colors.primary, fontWeight: '600' }]}>Crear Cuenta Nueva</Text>
                <View style={{ width: '90%' }}>
                    <Text style={style.titleInfo}>Informacion Personal I</Text>

                </View>
                <CustomInputRegister
                    label='Nombre Completo'
                    placeholder='Ingresa tu nombre completo'
                />
                <CustomDropdown
                    title='Sexo'
                    items={[
                        { label: 'Masculino', value: 'masculino' },
                        { label: 'Femenino', value: 'femenino' }
                    ]}
                    value={gender}
                    setValue={setGender}
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
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </View>
                <PrimaryButton
                    onPress={() => navigator.navigate('Register2')}
                    label='Siguiente'
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
        marginBottom: 50,
        color:'#003E6D'
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