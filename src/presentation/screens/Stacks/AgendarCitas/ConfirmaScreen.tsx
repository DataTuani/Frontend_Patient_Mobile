
import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet } from "react-native";
import { globalColors, globalStyles } from '../../../theme/theme';
import { ThemeContext } from '../../../../../context/ThemeContext';
import { RegisterStepper } from '../../../components/shared/RegisterStepper';

export const ConfirmaScreen = () => {

    const { colors } = useContext(ThemeContext)
    const styles = globalStyles(colors);
    const [currentStep, setCurrentStep] = useState(4);


    const nextStep = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    }
    return (
        <View style={styles.ContainerAgendar}>
            <RegisterStepper
                currentStep={4}
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
        width:'80%',
        height:'20%'
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
});
