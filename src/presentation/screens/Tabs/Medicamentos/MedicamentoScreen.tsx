import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, Text, View, StyleSheet, TextInput, ActivityIndicator, Modal, TouchableOpacity } from 'react-native'
import { globalColors, globalStyles } from '../../../theme/theme';
import { ThemeContext } from '../../../../../context/ThemeContext';
import { MedicamentoCard } from '../../../components/shared/CustomCard';
import { CustomIonicons } from '../../../components/shared/Custom_Ionicons';
import { useMedicamentoStore } from '../../../../hooks/useMedicamentoStore';


type Medicamento = {
  id: number;
  nombre: string;
  dosis: string;
  frecuencia: string;
  duracion?: string;
  fecha_inicio?: string;
  instrucciones?: string;
};

export const MedicamentoScreen = () => {

    const { colors } = useContext(ThemeContext);
    const styles = globalStyles(colors);
    const [searchText, setSearchText] = useState("");
    const { medicamentos, loading, error, fetchMedicamentos } = useMedicamentoStore();
    const [selectedMed, setSelectedMed] = useState<Medicamento | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchMedicamentos();
    }, []);

    const filteredMedicamentos = medicamentos.filter((med) =>
        med.nombre.toLowerCase().includes(searchText.toLowerCase())
    );

    if (loading)
        return (
            <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size={"large"} color={colors.primary} />
            </View>
        );
    if (error)
        return (
            <View style={[styles.container, { justifyContent: "center", alignItems: "center", padding: 20 }]}>
                <Text style={{ color: colors.text }}>{error}</Text>
            </View>
        );

    return (
        <View style={styles.container}>
            {/* Barra de búsqueda */}
            <View style={style.containerIn}>
                <TextInput
                    style={style.InputSearch}
                    placeholder="Buscar medicamento..."
                    value={searchText}
                    onChangeText={setSearchText} // actualiza searchText al escribir
                />
                <CustomIonicons name="search-outline" />
            </View>

            {/* Lista filtrada */}
            <ScrollView>
                {filteredMedicamentos.length === 0 ? (
                    <View style={{ padding: 20 }}>
                        <Text style={{ textAlign: "center", color: "gray" }}>
                            No se encontraron medicamentos.
                        </Text>
                    </View>
                ) : (
                    filteredMedicamentos.map((med) => (
                        <MedicamentoCard
                            key={med.id}
                            nombre={med.nombre}
                            dosis={med.dosis}
                            frecuencia={med.frecuencia}
                            onPress={() => {
                                setSelectedMed(med);
                                setModalVisible(true);
                            }}
                        />
                    ))
                )}
            </ScrollView>
            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "#fff",
                            padding: 20,
                            borderRadius: 12,
                            width: "85%",
                            elevation: 5,
                        }}
                    >
                        {selectedMed && (
                            <>
                                <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
                                    {selectedMed.nombre}
                                </Text>
                                <Text><Text style={{ fontWeight: "600" }}>Dosis:</Text> {selectedMed.dosis}</Text>
                                <Text><Text style={{ fontWeight: "600" }}>Frecuencia:</Text> {selectedMed.frecuencia}</Text>
                                <Text><Text style={{ fontWeight: "600" }}>Duración:</Text> {selectedMed.duracion}</Text>
                                <Text><Text style={{ fontWeight: "600" }}>Fecha de inicio:</Text> {selectedMed.fecha_inicio}</Text>
                                <Text><Text style={{ fontWeight: "600" }}>Instrucciones:</Text> {selectedMed.instrucciones}</Text>
                            </>
                        )}

                        <TouchableOpacity
                            style={{
                                marginTop: 20,
                                backgroundColor: "#007BFF",
                                padding: 10,
                                borderRadius: 8,
                                alignItems: "center",
                            }}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={{ color: "#fff", fontWeight: "bold" }}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

const style = StyleSheet.create({
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
    },

})