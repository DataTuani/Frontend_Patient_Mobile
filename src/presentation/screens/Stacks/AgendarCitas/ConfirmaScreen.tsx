import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { globalColors, globalStyles } from '../../../theme/theme';
import { ThemeContext } from '../../../../../context/ThemeContext';
import { RegisterStepper } from '../../../components/shared/RegisterStepper';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../../routes/StackNavigator';
import { useCitaStore, useHospitalStore } from '../../../../hooks/useCitaStore';
import { useAuthStore } from '../../../../hooks/authStore';
import { citasController } from '../../../../controller/citasController';

export const ConfirmaScreen = () => {

    const { colors } = useContext(ThemeContext)
    const styles = globalStyles(colors);
    const [currentStep, setCurrentStep] = useState(5);
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    //Obtener datos de los formularios
    const { formData, resetForm } = useCitaStore();
    const { hospitales } = useHospitalStore();
    const { user, token } = useAuthStore();

    //Datos a mostrar

    const hospitalesNombre =
        hospitales.find((e) => e.id === formData.hospital_id)?.nombre ?? "-";
    const tipoText =
        formData.tipoCita === 1
            ? "Presencial"
            : formData.tipoCita === 2
                ? "TeleConsulta"
                : "-";
    const fecha = formData.fecha_hora
        ? new Date(formData.fecha_hora).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        : '-';

    const hora = formData.fecha_hora
        ? new Date(formData.fecha_hora).toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true, // true = formato 12 h con AM/PM
        })
        : '—';


    //Obtener todo los datos recogido
    const fullData = useCitaStore.getState().formData;
    const handleAgendar = async () => {
        try {
            if (!user?.paciente_id) {
                Alert.alert("Error", "No se encontró el paciente logueado")
                return;
            }
            const res = await citasController(fullData);
            if (res.success) {
                alert('Cita hecha :D');
                console.log("Cita hecha", fullData);
                navigation.navigate('Home');
            }
            else {
                alert(res.message);
                console.log("Error del backend", fullData);
            }
        } catch (error) {
            console.log("Error al agendar cita");
        }
    }


    const nextStep = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
    }
    return (
        <View style={styles.ContainerAgendar}>
            <RegisterStepper
                currentStep={5} totalSteps={5}
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
                    <Text style={style.cardValue}>{tipoText}</Text>
                </View>

                <View style={style.cardRow}>
                    <Text style={style.cardLabel}>Hospital:</Text>
                    <Text style={style.cardValue}>{hospitalesNombre}</Text>
                </View>

                <View style={style.cardRow}>
                    <Text style={style.cardLabel}>Fecha:</Text>
                    <Text style={style.cardValue}>{fecha}</Text>
                </View>

                <View style={style.cardRow}>
                    <Text style={style.cardLabel}>Hora:</Text>
                    <Text style={style.cardValue}>{hora}</Text>
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
                    onPress={() => navigation.goBack()}
                >
                    <Text style={{ color: 'gray', marginLeft: 50, fontSize: 14, fontWeight: 'bold' }}>Modificar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        style.toggleButton,
                        { backgroundColor: globalColors.tertiary }
                    ]}
                    onPress={handleAgendar}
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
