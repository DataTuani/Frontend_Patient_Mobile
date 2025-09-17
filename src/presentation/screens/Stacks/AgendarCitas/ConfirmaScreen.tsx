
import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { globalColors, globalStyles } from '../../../theme/theme';
import { ThemeContext } from '../../../../../context/ThemeContext';
import { RegisterStepper } from '../../../components/shared/RegisterStepper';
import { CustomIonicons } from '../../../components/shared/Custom_Ionicons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../../routes/StackNavigator';

export const ConfirmaScreen = () => {

    const { colors } = useContext(ThemeContext)
    const styles = globalStyles(colors);
    const [currentStep, setCurrentStep] = useState(5);
    const navigation = useNavigation<NavigationProp<RootStackParams>>();


    const nextStep = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
    }
    return (
        <View style={styles.ContainerAgendar}>
            <RegisterStepper
                currentStep={5}
            />
            <Text style={{ fontSize: 30, fontWeight: '700', color: globalColors.tertiary, textAlign: 'center' }}>
                Confirmar cita
            </Text>
            <Text style={{ fontSize: 17, marginTop: 10, textAlign: 'center' }}>
                Revisa los detalles de tu cita
            </Text>

            <View style={style.cardContainer}>
                <Text style={style.cardTitle}>Resumen de la cita</Text>

                <View style={style.cardRow}>
                    <Text style={style.cardLabel}>Tipo:</Text>
                    <Text style={style.cardValue}>Presencial</Text>
                </View>

                <View style={style.cardRow}>
                    <Text style={style.cardLabel}>Hospital:</Text>
                    <Text style={style.cardValue}>Hospital Dermatológico</Text>
                </View>

                <View style={style.cardRow}>
                    <Text style={style.cardLabel}>Fecha:</Text>
                    <Text style={style.cardValue}>15 Sept 2025</Text>
                </View>

                <View style={style.cardRow}>
                    <Text style={style.cardLabel}>Hora:</Text>
                    <Text style={style.cardValue}>8:10 AM</Text>
                </View>
            </View>

            <View style={style.toggleRow}>
                <TouchableOpacity
                    style={[
                        style.toggleButton, {
                            backgroundColor: globalColors.light
                        }, {
                            borderColor: "gray"
                        }, {
                            borderWidth: 1
                        }
                    ]}
                    onPress={() => console.log('Hola')}
                >
                    <Text style={{ color: 'gray', marginLeft: 50, fontSize: 14, fontWeight: 'bold' }}>Modificar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        style.toggleButton,
                        { backgroundColor: globalColors.tertiary }
                    ]}
                    onPress={() => console.log("hola")}
                >
                    <Text style={{ color: globalColors.light, marginLeft: 55, fontSize: 14, fontWeight: "bold" }}>Agendar</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}


const style = StyleSheet.create({
    cardContainer: {
        backgroundColor: globalColors.light,
        padding: 20,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginTop: 60,
        width: '80%',
        height: '20%'
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: globalColors.tertiary,
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    cardLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555',
    },
    cardValue: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
    },
    toggleButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        marginHorizontal: 6,
        borderRadius: 10,
        gap: 15
    },
    toggleRow: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        marginTop: 20
    }
});
