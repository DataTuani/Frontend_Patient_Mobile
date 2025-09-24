import React, { useState } from 'react';
import { ScrollView, Text, TextInput, View, StyleSheet, Pressable } from 'react-native'
import { globalColors, globalStyles } from '../../../theme/theme'
import { useContext } from 'react';
import { ThemeContext } from '../../../../../context/ThemeContext';
import { ResultadoCard } from '../../../components/shared/CustomCard';
import { CustomIonicons } from '../../../components/shared/Custom_Ionicons';
import { RootStackParams } from '../../../routes/StackNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';

// ResultadoScreen.tsx (o donde lo tengas)
export const ResultadoScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const { colors } = useContext(ThemeContext);
  const styles = globalStyles(colors);
  const [activeTab, setActiveTab] = useState<"Disponibles" | "Pendientes">("Disponibles");
  const [searchText, setSearchText] = useState("");

  const citas = [
    {
      id: 1,
      fechaInicio: '12/12/2025',
      fechaFinal: '13/12/2025',
      resultado: {
        title: 'Análisis de Sangre Completo',
        descripcion: 'Hemograma completo, glucosa, colesterol, triglicéridos',
        MB: '2.5',
      },
    },
    {
      id: 2,
      fechaInicio: '20/12/2025',
      fechaFinal: '—',
      // sin resultado aún
    },
    {
      id: 3,
      fechaInicio: '22/12/2025',
      fechaFinal: '23/12/2025',
      resultado: {
        title: 'Examen de Orina',
        descripcion: 'Análisis de proteínas y glucosa',
        MB: '1.1',
      },
    },
  ];

  // Filtrado por tab y por búsqueda (si quieres búsqueda por título o descripción)
  const filteredCitas = citas.filter((cita) => {
    const hasResultado = !!cita.resultado;

    // Filtrado por tab
    if (activeTab === "Disponibles" && !hasResultado) return false;
    if (activeTab === "Pendientes" && hasResultado) return false;

    // Filtrado por searchText (opcional). Busca en título y descripción del resultado,
    // y si no hay resultado, permite buscar por 'Resultado pendiente' o fechas.
    if (!searchText.trim()) return true;

    const q = searchText.toLowerCase();
    const title = cita.resultado?.title?.toLowerCase() ?? "resultado pendiente";
    const desc = cita.resultado?.descripcion?.toLowerCase() ?? "";
    const fechas = `${cita.fechaInicio} ${cita.fechaFinal}`.toLowerCase();

    return title.includes(q) || desc.includes(q) || fechas.includes(q);
  });

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          borderRadius: 10,
          backgroundColor: "#e5e5e5",
          padding: 2,
        }}
      >
        <Pressable
          style={[style.container, { backgroundColor: activeTab === "Disponibles" ? "#fff" : "transparent" }]}
          onPress={() => setActiveTab("Disponibles")}
        >
          <Text style={{ color: "#000" }}>Disponibles</Text>
        </Pressable>

        <Pressable
          style={[style.container, { backgroundColor: activeTab === "Pendientes" ? "#fff" : "transparent" }]}
          onPress={() => setActiveTab("Pendientes")}
        >
          <Text style={{ color: "#000" }}>Pendientes</Text>
        </Pressable>
      </View>

      {/* Búsqueda y lista */}
      <View style={{ marginTop: 20 }}>
        <View style={style.containerIn}>
          <TextInput
            style={style.InputSearch}
            placeholder="Buscar..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <CustomIonicons name="menu-outline" />
        </View>

        <ScrollView>
          {filteredCitas.length === 0 ? (
            <View style={{ padding: 20 }}>
              <Text style={{ textAlign: "center" }}>
                {activeTab === "Disponibles" ? "No hay resultados disponibles." : "No hay citas pendientes."}
              </Text>
            </View>
          ) : (
            filteredCitas.map((cita) => {
              const res = cita.resultado;
              // Mostrar botones solo si estamos en "Disponibles" y existe resultado
              const showButton = activeTab === "Disponibles" && !!res;

              return (
                <ResultadoCard
                  key={cita.id}
                  title={res?.title ?? "Resultado pendiente"}
                  resultado_descripcion={res?.descripcion ?? "El resultado aún no está disponible."}
                  dateInicio={cita.fechaInicio}
                  dateFinal={cita.fechaFinal}
                  showButton={showButton}
                  onPress={() => console.log("General press", cita.id)}
                  onPressVisualizar={() => console.log("Visualizar", cita.id)}
                  onPressDescargar={() => console.log("Descargar", cita.id)}
                  onMenuPress={() => console.log("Menu", cita.id)}
                  MB={res?.MB ?? "—"}
                />
              );
            })
          )}
        </ScrollView>
      </View>
    </View>
  );
};

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