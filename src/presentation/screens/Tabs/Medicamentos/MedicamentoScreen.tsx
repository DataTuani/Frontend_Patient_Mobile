import React, { useContext, useState } from 'react'
import { ScrollView, Text, View, StyleSheet, TextInput } from 'react-native'
import { globalColors, globalStyles } from '../../../theme/theme';
import { ThemeContext } from '../../../../../context/ThemeContext';
import { MedicamentoCard } from '../../../components/shared/CustomCard';
import { CustomIonicons } from '../../../components/shared/Custom_Ionicons';

export const MedicamentoScreen = () => {

    const { colors } = useContext(ThemeContext);
    const styles = globalStyles(colors);
    const [searchText, setSearchText] = useState("");

    const medicamentos = [
        { id: 1, nombre: 'Ibuprofeno 500 mg', dosis: '2 dosis cada 12 hrs' },
        { id: 2, nombre: 'Paracetamol 650 mg', dosis: '1 tableta cada 8 hrs' },
        { id: 3, nombre: 'Amoxicilina 875 mg', dosis: '1 cápsula cada 12 hrs' },
        { id: 4, nombre: 'Loratadina 10 mg', dosis: '1 tableta cada 24 hrs' },
        { id: 5, nombre: 'Omeprazol 20 mg', dosis: '1 cápsula antes del desayuno' },
        { id: 6, nombre: 'Metformina 850 mg', dosis: '1 tableta con el desayuno' },
        { id: 7, nombre: 'Atorvastatina 40 mg', dosis: '1 tableta en la noche' },
        { id: 8, nombre: 'Vitamina C 1 g', dosis: '1 tableta diaria' },
    ];

    const filteredMedicamentos = medicamentos.filter((med) =>
        med.nombre.toLowerCase().includes(searchText.toLowerCase())
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
                            onPress={() => console.log("Seleccionado:", med.nombre)}
                        />
                    ))
                )}
            </ScrollView>
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
    }
})