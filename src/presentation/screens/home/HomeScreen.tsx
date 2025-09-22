<<<<<<< HEAD
import React, { useEffect } from 'react';
=======
import React, { useEffect, useState } from 'react';
>>>>>>> 3dbfd2f4877f6cfa20471bf25af9716d7f246237
import { View, Text, StyleSheet, TouchableOpacity, Pressable, ScrollView } from 'react-native'
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { type RootStackParams } from '../../routes/StackNavigator';
import { Header, } from '../../components/shared/HamburgerMenu';
import { useContext } from 'react';
import { ThemeContext } from '../../../../context/ThemeContext';
import { globalColors, globalStyles } from '../../theme/theme';
import { CustomIonicons } from '../../components/shared/Custom_Ionicons';
import { useHistorialCitaStore } from '../../../hooks/useCitaStore';

export const HomeScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const { colors } = useContext(ThemeContext);
    const styles = globalStyles(colors);
    const { citas, loading, error, fetchHistorial } = useHistorialCitaStore();

<<<<<<< HEAD
=======

    const { citas, loading, error, fetchHistorial } = useHistorialCitaStore();

>>>>>>> 3dbfd2f4877f6cfa20471bf25af9716d7f246237
    useEffect(() => {
        fetchHistorial();
    }, []);

    const citasFiltradas = (citas || [])
        .filter((c) => c.estado?.nombre === "Pendiente")
        .map((c) => {
            const d = new Date(c.fecha_hora);

            // Fecha en español, ejemplo: "Viernes 12 de septiembre de 2025"
            let fecha = d.toLocaleDateString("es-ES", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
            });
            fecha = fecha.replace(",", ""); // quitar coma

            // Hora en 12h con AM/PM
            const hora = d.toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            });

            return {
                id: c.id,
                motivo: c.motivo_consulta,
                fecha,
                hora,
            };
        });

    return (
        <View style={styles.container}>
            <Header />
            <View style={{ marginTop: 20 }}>
                <Text style={[style.TextStyle, { color: '#042558' }]}>Bienvenido a SINAES</Text>
                <Text style={{ color: '042558' }}>En SIANES pensamos en tí y en tu familia.</Text>
            </View>
            <TouchableOpacity style={style.cardAgendar}
                onPress={() => navigation.navigate("TipoCita")}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={style.circlePlus}>
                        <Text style={style.plus}>+</Text>
                    </View>
                    <View style={{ marginLeft: 12 }}>
                        <Text style={style.cardTitle}>Agendar consulta</Text>
                        <Text style={style.cardSubtitle}>Agenda una consulta médica.</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={style.row}>
                {/* Medicamentos */}
                <View style={style.cardSmall}>
                    <View style={style.badge}>
                        <Text style={style.badgeText}>Pendientes</Text>
                    </View>
                    <Text style={style.number}>8</Text>
                    <Text style={style.cardTitleSmall}>Mis medicamentos</Text>
                    <Text style={style.cardSubtitleSmall}>Medicamentos para hoy</Text>
                </View>

                {/* Teleconsultas */}
                <Pressable style={style.cardSmall}
                    onPress={() => navigation.navigate('Waiting')}
                >
                    <View style={style.teleContainer}>
                        <CustomIonicons
                            name={'laptop-outline'}
                            size={40}
                            color={'gray'}
                        />
                    </View>
                    <Text style={style.cardTitleSmall}>Teleconsulta</Text>
                    <Text style={style.cardSubtitleSmall}>Asistir a una teleconsulta</Text>
                </Pressable>
            </View>
            <View style={{ marginTop: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#042558' }}>Proximas Consultas</Text>
                    <Pressable
                        onPress={() => navigation.navigate("HistorialCitas")}
                    >
                        <Text style={{ color: '#007AFF', fontStyle: 'italic' }}>Ver todas</Text>
                    </Pressable >
                </View>
                <ScrollView style={{ maxHeight: 250 }}>
                    {loading && <Text>Cargando...</Text>}
                    {error && <Text style={{ color: "red" }}>{error}</Text>}

                    {citasFiltradas.map((e) => (
                        <View key={e.id} style={style.consultaCard}>
                            <View>
                                <Text style={{ color: "#000", fontWeight: "bold", fontSize: 17 }}>
                                    {e.motivo}
                                </Text>
                                <Text style={{ color: globalColors.gray, fontWeight: "300" }}>
                                    {e.fecha} - {e.hora}
                                </Text>
                            </View>
                            <Pressable onPress={() => console.log("Ver cita", e.id)}>
                                <Text style={{ color: globalColors.gray }}>Ver</Text>
                            </Pressable>
                        </View>
                    ))}

                    {citasFiltradas.length === 0 && !loading && (
                        <Text style={{ color: globalColors.gray }}>No hay próximas consultas</Text>
                    )}
                </ScrollView>
            </View>
        </View >
    )
}

const style = StyleSheet.create({
    TextStyle: {
        fontSize: 45,
        fontWeight: 'bold'
    },
    cardAgendar: {
        backgroundColor: globalColors.light,
        borderRadius: 12,
        padding: 18,
        marginTop: 20,
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 2, height: 2
        },
        elevation: 5
    },
    circlePlus: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#E91E63',
        justifyContent: 'center',
        alignItems: 'center',

    },
    plus: {
        fontWeight: "bold",
        fontSize: 24,
        color: '#fff'
    },
    cardTitle: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: 'center'
    },
    cardSubtitle: {
        fontSize: 12,
        textAlign: 'center',
        color: globalColors.gray,
        marginTop: 4
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20
    },
    cardSmall: {
        flex: 1,
        backgroundColor: globalColors.light,
        borderRadius: 12,
        padding: 15,
        marginHorizontal: 5,
        alignItems: "center",
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ddd'
    },
    badge: {
        backgroundColor: '#8BC34A',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 8,
    },
    badgeText: {
        color: globalColors.light,
        fontWeight: 'bold',
        fontSize: 12
    },
    number: {
        fontSize: 28,
        fontWeight: "bold",
        color: '#333',
        marginBottom: 6
    },
    cardTitleSmall: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 4
    },
    cardSubtitleSmall: {
        fontSize: 12,
        color: 'gray',
        textAlign: 'center'
    },
    teleContainer: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8
    },
    consultaCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        marginBottom: 8,

    },


})