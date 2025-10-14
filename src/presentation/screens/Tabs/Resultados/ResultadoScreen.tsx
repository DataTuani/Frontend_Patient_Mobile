import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, View, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import { globalColors, globalStyles } from '../../../theme/theme'
import { useContext } from 'react';
import { ThemeContext } from '../../../../../context/ThemeContext';
import { ResultadoCard } from '../../../components/shared/CustomCard';
import { CustomIonicons } from '../../../components/shared/Custom_Ionicons';
import { useResultadosStore } from '../../../../hooks/useResultadoStore';
import * as Linking from 'expo-linking';


// ResultadoScreen.tsx (o donde lo tengas)
export const ResultadoScreen = () => {
  const { colors } = useContext(ThemeContext);
  const styles = globalStyles(colors);
  const [activeTab, setActiveTab] = useState<"Disponibles" | "Pendientes">("Disponibles");
  const [searchText, setSearchText] = useState("");
  const { resultados, loading, error, fetchResultados } = useResultadosStore();

  useEffect(() => {
    fetchResultados();
  }, []);

  const filteredResultados = resultados.filter((res) => {

    const isPendiente = res.estado?.nombre?.toLowerCase() === "pendiente";
    const hasResultado = !!res.resultado_url;

    if (activeTab === "Disponibles" && !hasResultado) return false;
    if (activeTab === "Pendientes" && !isPendiente) return false;

    if (!searchText.trim()) return true;

    const q = searchText.toLowerCase();
    return (
      res.tipo_examen.toLowerCase().includes(q) ||
      res.instrucciones.toLowerCase().includes(q) ||
      res.estado.nombre.toLowerCase().includes(q)
    );
  });

  if (loading) 
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  if (error) 
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center", padding: 20 }]}>
        <Text style={{ color: colors.text, textAlign: "center" }}>{error}</Text>
      </View>
    );
  

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

        <ScrollView style={{maxHeight:800}}>
          {filteredResultados.length === 0 ? (
            <View style={{ padding: 20 }}>
              <Text style={{ textAlign: "center" }}>
                {activeTab === "Disponibles" ? "No hay resultados disponibles." : "No hay citas pendientes."}
              </Text>
            </View>
          ) : (
            filteredResultados.map((cita) => {              
              // Mostrar botones solo si estamos en "Disponibles" y existe resultado
              const showButton = activeTab === "Disponibles" && !!cita.resultado_url;
              const fecha = new Date(cita.created_at);
              const fechaFormateada = fecha.toLocaleString();

              return (
                <ResultadoCard
                  key={cita.id}
                  title={`Examen: ${cita.tipo_examen}`}
                  resultado_descripcion={cita.instrucciones}
                  dateInicio={fechaFormateada}
                  dateFinal={'15-50-50'}
                  showButton={showButton}
                  onPress={() => console.log("General press", cita.id)} 
                  onPressVisualizar={() => Linking.openURL(cita.resultado_url)}
                  onMenuPress={() => console.log("Menu", cita.id)}
                  MB={"40"}
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