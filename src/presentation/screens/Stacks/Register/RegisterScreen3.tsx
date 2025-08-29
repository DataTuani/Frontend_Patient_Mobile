import React, { useContext, useState } from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { globalColors, } from '../../../theme/theme';
import { RootStackParams } from '../../../routes/StackNavigator';
import { ThemeContext } from '../../../../../context/ThemeContext';
import { CustomDropdown } from '../../../components/shared/CustomDropdown';
import { PrimaryButton } from '../../../components/shared/PrimaryButton';


const height = Dimensions.get('window').height;

export const RegisterScreen3 = () => {

    const navigator = useNavigation<NavigationProp<RootStackParams>>();
    const { colors } = useContext(ThemeContext);
    const [blond, setBlond] = useState<string | null>(null);
    const [allergies, setAllergies] = useState<string | null>(null);
    const [diseases, setDiseases] = useState<string | null>(null);


    return (
        <View style={[style.container, { backgroundColor: colors.background }]}>
            <Image
                source={require('../../../assets/saludito.png')}
                style={[style.logo, { marginTop: height * 0.05 }]}
            />
            <Text style={style.title}>¡Bienvenido a Salud
                <Text style={{ color: globalColors.secondary }}>ito</Text>
                !</Text>
            <Text style={style.subtitle}>Completa tu registro para comienza a cuidar tu salud</Text>
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
                    value={blond}
                    setValue={setBlond}
                    placeholder='Selecciona tu grupo sanguineo'
                />

                <CustomDropdown
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
                    value={allergies}
                    setValue={setAllergies}
                    placeholder='Selecciona si tienes alergias'
                />

                <CustomDropdown
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
                    value={diseases}
                    setValue={setDiseases}
                    placeholder='Selecciona si tienes enfermedades cronicas'
                />
                <PrimaryButton
                    onPress={() => navigator.navigate('Register4')}
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
        justifyContent: 'flex-start',
        paddingHorizontal: 25,
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center'
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