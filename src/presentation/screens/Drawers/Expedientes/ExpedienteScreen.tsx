import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalColors } from "../../../theme/theme";
import { CustomIonicons } from "../../../components/shared/Custom_Ionicons";
import { Expediente, useAuthStore, useExpedienteStore } from '../../../../hooks/authStore';


// ===== Helpers =====
const calcularEdad = (isoDate?: string): string => {
    if (!isoDate) return "No aplica";
    const nacimiento = new Date(isoDate);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
    return `${edad}`;
};

const formatFecha = (isoDate?: string): string => {
    if (!isoDate) return "No aplica";
    return new Date(isoDate).toLocaleDateString("es-ES");
};


export const ExpedienteScreen = ({ navigation }: any) => {
    const [tab, setTab] = useState<"basica" | "vacunas">("basica");
    const { expediente, fetchExpediente
        , loading, error
    } = useExpedienteStore();

    useEffect(() => {
        fetchExpediente()
    }, []);

    if (loading) return <Text>Cargando...</Text>
    if (error) return <Text>{error}</Text>
    if (!expediente) return <Text>No hay datos</Text>

    const user = expediente.paciente.usuario;

    const nombreCompleto = [
        user.primer_nombre,
        user.segundo_nombre,
        user.primer_apellido,
        user.segundo_apellido,
    ]
        .filter(Boolean)
        .join(" "); 


    return (
        <ScrollView style={styles.container}>
            {/* Header con botón atrás */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Ver expediente</Text>
            </View>
            <Text style={styles.subtitle}>
                En este apartado podrás visualizar tu expediente médico
            </Text>

            {/* Info principal */}
            <View style={styles.card}>
                <View style={{ flex: 1, gap: 5 }}>
                    <Text style={styles.boldText}>Nombre</Text>
                    <Text>
                        {nombreCompleto}
                    </Text>
                    <Text style={styles.boldText}>Número de expediente</Text>
                    <Text>{expediente.folio}</Text>
                    <Text style={styles.boldText}>Edad</Text>
                    <Text>{calcularEdad(user.fecha_nacimiento)}</Text>
                </View>
                <Image
                    source={require("../../../assets/profile.png")}
                    style={styles.avatar}
                />
            </View>

            {/* Tabs */}
            <View style={styles.tabs}>
                <TabButton
                    text="Información básica"
                    active={tab === "basica"}
                    onPress={() => setTab("basica")}
                />
                <TabButton
                    text="Tarjeta de vacunación"
                    active={tab === "vacunas"}
                    onPress={() => setTab("vacunas")}
                />
            </View>

            {/* Contenido dinámico */}
            {tab === "basica" ? <InformacionBasica
                expediente={expediente}
            /> : <TarjetaVacunacion />}
        </ScrollView>
    );
};

/* ========================
   COMPONENTES REUTILIZABLES
======================== */
const TabButton = ({
    text,
    active,
    onPress,
}: {
    text: string;
    active: boolean;
    onPress: () => void;
}) => (

    <TouchableOpacity
        onPress={onPress}
        style={[styles.tabButton, active && styles.tabButtonActive]}
    >
        <Text style={[styles.tabText, active && styles.tabTextActive]}>{text}</Text>
    </TouchableOpacity>
);

const Section = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View>{children}</View>
    </View>
);

const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
    </View>
);

/* ========================
   COMPONENTE: Info básica
======================== */

const InformacionBasica = ({ expediente }: { expediente: Expediente }) => {
    const u = expediente.paciente.usuario;
    const nombreCompleto = [
        u.primer_nombre,
        u.segundo_nombre,
        u.primer_apellido,
        u.segundo_apellido,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <View style={{ gap: 15 }}>
            <Section title="Información general">
                <InfoRow label="Nombre completo" value={nombreCompleto} />
                <Separator />
                <InfoRow label="Fecha de nacimiento" value={formatFecha(u.fecha_nacimiento)} />
                <Separator />
                <InfoRow label="Género" value={u.genero === "M" ? "Masculino" : "Femenino"} />
                <Separator />
                <InfoRow
                    label="Tipo de sangre"
                    value={expediente.paciente.grupo_sanguineo ?? "No aplica"}
                />
                <Separator />
                <InfoRow
                    label="Alergias"
                    value={
                        expediente.paciente.alergias && expediente.paciente.alergias.length > 0
                            ? expediente.paciente.alergias.map(a => a.descripcion).join(", ")
                            : "No aplica"
                    }
                />
                <Separator />
            </Section>

            <Section title="Información de contacto">
                <InfoRow label="Teléfono" value={u.telefono ?? "No aplica"} />
                <Separator />
            </Section>


            <Section title="Enfermedades patógenas">
                <InfoRow
                    label="Nombre de la enfermedad"
                    value={
                        expediente.paciente.enfermedades && expediente.paciente.enfermedades.length > 0
                            ? expediente.paciente.enfermedades.map(e => e.descripcion).join(", ")
                            : "No aplica"
                    }
                />
                <Separator />
            </Section>
        </View>
    );
};


/* ========================
   COMPONENTE: Vacunas
======================== */
const TarjetaVacunacion = () => {
    const vacunas = [
        {
            nombre: "Hepatitis B",
            fecha: "12 de abril del 2025",
            centro: "Hospital Central",
            estado: "Aplicada",
            proxima: "12/05/2025",
        },
        {
            nombre: "Hepatitis B",
            fecha: "12 de abril del 2025",
            centro: "Hospital Central",
            estado: "Aplicada",
            proxima: "12/05/2025",
        },
    ];

    return (
        <View style={{ gap: 15 }}>
            {vacunas.map((v, i) => (
                <View key={i} style={styles.vaccineCard}>
                    {/* Ícono a la izquierda */}
                    <View style={styles.iconContainer}>
                        <Image
                            source={require('../../../assets/vacuna.png')}
                            style={{ width: 28, height: 28, resizeMode: 'contain' }}
                        />
                    </View>


                    {/* Info a la derecha */}
                    <View style={{ flex: 1, marginLeft: 15, marginTop: 5, gap: 2 }}>
                        <View style={styles.row}>
                            <Text style={styles.vaccineTitle}>{v.nombre}</Text>
                            <CustomIonicons
                                name="chevron-forward-outline"
                                size={15}
                            />
                        </View>

                        <Text>Fecha: {v.fecha}</Text>
                        {/* Fila: Centro y Próxima dosis */}
                        <View style={styles.row}>
                            <Text>Centro: {v.centro}</Text>
                            <Text style={styles.nextDose}>Próxima dosis: <Text style={{ fontWeight: '400' }}> {v.proxima}</Text></Text>
                        </View>

                        <Text>Estado: <Text style={{ fontWeight: 'bold' }}>{v.estado}</Text> </Text>
                    </View>
                </View>
            ))}
        </View>
    );
};

/* ========================
   SEPARADOR
======================== */
const Separator = () => <View style={styles.separator} />;

/* ========================
   ESTILOS
======================== */
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 20 },
    header: { flexDirection: "row", alignItems: "center", marginTop: 25 },
    title: { fontSize: 25, fontWeight: "bold", marginLeft: 10, color: '#042558' },
    subtitle: { color: "#042558", marginTop: 5, marginLeft: 35, fontWeight: 'bold', fontSize: 15 },
    card: {
        flexDirection: "row",
        backgroundColor: globalColors.light,
        padding: 15,
        borderRadius: 15,
        alignItems: "center",
        marginBottom: 20,
        elevation: 2,
        marginTop: 20,

    },
    boldText: { fontWeight: "bold", fontSize: 15, color: globalColors.gay_2 },
    avatar: { width: 70, height: 70, borderRadius: 30 },
    tabs: { flexDirection: "row", marginBottom: 20 },
    tabButton: {
        flex: 1,
        padding: 12,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        backgroundColor: globalColors.light,
        marginHorizontal: 5,
        elevation: 2
    },
    tabButtonActive: { backgroundColor: globalColors.tertiary },
    tabText: { textAlign: "center", color: globalColors.gay_2, fontWeight: "bold" },
    tabTextActive: { color: "#fff" },
    section: { marginBottom: 20 },
    sectionTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 10 },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
    },
    infoLabel: { color: "#555" },
    infoValue: { fontWeight: "600" },
    separator: { height: 1, backgroundColor: "#ddd" },
    vaccineCard: {
        backgroundColor: globalColors.light,
        padding: 15,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: globalColors.dark,
        elevation: 2, // sombreado en Android
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        flexDirection: 'row',
    },
    iconContainer: {
        width: 20, // ancho fijo para columna izquierda
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    vaccineTitle: { fontWeight: "bold", marginBottom: 0 },
    nextDose: { color: globalColors.dark, marginTop: 0, fontWeight: 'bold' },
});
