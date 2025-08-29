import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react'
import { globalStyles } from '../../../theme/theme';
import { ThemeContext } from '../../../../../context/ThemeContext';
import { RootStackParams } from '../../../routes/StackNavigator';
import { View, Image, Text, Dimensions, StyleSheet } from 'react-native';
import { ButtonLogin } from '../../../components/shared/PrimaryButton';

const { height } = Dimensions.get('window');

export const InitialScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const { colors } = useContext(ThemeContext);
    const styles = globalStyles(colors);

    return (
        <View style={[style.container, { backgroundColor: colors.background }]}>
            <Image
                source={require('../../../assets/saludito-logo.png')}
                style={style.logo}
            />
            <Text style={[style.title, { color: colors.title }]}>¡Bienvenido a Saludito!</Text>
            <View style={[style.card]}>
                <Text style={[style.cardTitle, { color: colors.primary, fontWeight: '600', }]}>Acceso a Saludito</Text>
                <Text style={style.subtitle}>Selecciona una opción para continuar</Text>
                <ButtonLogin title="Iniciar Sesión" onPress={() => { navigation.navigate('Login') }} />
                <ButtonLogin
                    title="Crear Nueva Cuenta"
                    variant="outlined"
                    onPress={() => { navigation.navigate('Register') }}
                />
                <Text
                    style={[style.footerText]}
                >
                    La Salud comienza con un Saludito

                </Text>
            </View>

        </View>
    )
}

const style = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        paddingHorizontal: 30
    },

    logo: {
        width: 170,
        height: 170,
        marginBottom: 10
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: -height * 0.03,
        marginBottom: 20
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
    cardTitle: {
        fontSize: 22,
        marginBottom: 8,
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
        fontWeight: 'bold'
    }
})