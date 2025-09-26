import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react'
import { RootStackParams } from '../../../routes/StackNavigator';
import { ThemeContext } from '../../../../../context/ThemeContext';
import { globalColors, globalStyles } from '../../../theme/theme';
import { Pressable, View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { CustomIonicons } from '../../../components/shared/Custom_Ionicons';
import AppointmentCard from '../../../components/shared/CustomCard';
import { useHistorialCitaStore } from '../../../../hooks/useCitaStore';


export const HistorialCitaScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const { colors } = useContext(ThemeContext);
    const styles = globalStyles(colors);
    const [activeTab, setActiveTab] = useState<"Proximas" | "Historial">("Proximas");
    const { citas, loading, error, fetchHistorial } = useHistorialCitaStore();
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        fetchHistorial();
    }, []);

    const citasFiltradas =
        activeTab === "Proximas"
            ? citas.filter((e) => e.estado.nombre === "Pendiente")
            : citas;

    return (

        <View style={styles.container}>
            {/* Contenedor de Tabs */}
            <View
                style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    borderRadius: 10,
                    backgroundColor: "#e5e5e5", // gris claro de fondo
                    padding: 2,
                }}
            >
                {/* Botón Próximas */}
                <Pressable
                    style={[style.container, { backgroundColor: activeTab === "Proximas" ? "#fff" : "transparent", }]}
                    onPress={() => setActiveTab("Proximas")}
                >
                    <Text style={{ color: "#000" }}>Próximas</Text>
                </Pressable>

                {/* Botón Historial */}
                <Pressable
                    style={[style.container, { backgroundColor: activeTab === "Historial" ? "#fff" : "transparent", }]}
                    onPress={() => setActiveTab("Historial")}
                >
                    <Text style={{ color: "#000" }}>Historial</Text>
                </Pressable>
            </View>

            {/* Contenido dinámico */}
            <View style={{ marginTop: 20 }}>
                <View style={style.containerIn}>
                    <TextInput
                        style={style.InputSearch}
                    >
                        <CustomIonicons
                            name='search-outline'
                        />
                    </TextInput>
                    <CustomIonicons name="menu-outline" />
                </View>
                <ScrollView style={{ marginTop: 10, maxHeight:650 }}>
                    {citasFiltradas.map((cita) => {
                        const dateObj = new Date(cita.fecha_hora);
                        const fecha = dateObj.toLocaleDateString("es-ES", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        });

                        return (
                            <AppointmentCard
                                key={cita.id}
                                date={fecha}
                                hospital={cita.hospital.nombre}
                                doctor={`Dr. ${cita.medico.usuario.primer_nombre} ${cita.medico.usuario.primer_apellido}`}
                                specialty={cita.medico.especialidad.nombre}
                                estado={cita.estado.nombre}
                                tipo={cita.tipo.tipo}                     
                                showButton={cita.tipo.tipo === "Consulta-Virtual"} 
                                onPress={() => console.log("Asistir/Ver cita", cita.id)}
                                onMenuPress={() => console.log("Menú cita", cita.id)}
                            />
                        );
                    })}
                </ScrollView>

            </View>
        </View>
    )
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 10,
        alignItems: "center",
    },

    InputSearch: {
        width: '80%',
        elevation: 2,
        borderRadius: 10,
        backgroundColor: globalColors.light,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    containerIn: {
        marginTop: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5,
        gap: 10
    }
})