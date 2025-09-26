import React, { useContext, useState } from 'react'
import { Pressable, Text, View, StyleSheet, FlatList, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { globalColors, globalStyles } from '../../../theme/theme';
import { ThemeContext } from '../../../../../context/ThemeContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../../routes/StackNavigator';
import { RegisterStepper } from '../../../components/shared/RegisterStepper';
import { ButtonCitas } from '../../../components/shared/PrimaryButton';
import { CustomIonicons } from '../../../components/shared/Custom_Ionicons';
import { useCitaStore, useHospitalStore, userHorarioStore } from '../../../../hooks/useCitaStore';
import * as Yup from 'yup';
import { Formik } from 'formik';


export const HoraDiaScreen = () => {

  const { colors } = useContext(ThemeContext);
  const styles = globalStyles(colors);
  const [currentStep, setCurrentStep] = useState(3);
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const [selectedHour, setSelectedHour] = useState<{ inicio: string; fin: string } | null>(null);

  const { updateFormData } = useCitaStore();

  ///Generar pares [Inicio, Fin]
  const { horario, loading } = userHorarioStore();

  // --- Mantén tu sort tal cual ---
  const horarioOrdenado = [...horario].sort((a, b) => {
    const toMinutes = (t: string) => {
      const [time, mer] = t.split(" "); // ej: ["07:20", "AM"]
      let [h, m] = time.split(":").map(Number);
      if (mer === "PM" && h !== 12) h += 12;
      if (mer === "AM" && h === 12) h = 0;
      return h * 60 + m;
    };
    return toMinutes(a) - toMinutes(b);
  });

  // --- Crea pares de inicio-fin ---
  const turnos = horarioOrdenado.slice(0, -1).map((hora, i) => ({
    inicio: hora,
    fin: horarioOrdenado[i + 1]   // <- usa horarioOrdenado, no horario
  }));

  // --- Agrupa usando hora 24h numérica ---
  const turnosAgrupados = turnos.reduce((acc, turno) => {
    const [time, mer] = turno.inicio.split(" ");
    let [h] = time.split(":").map(Number);
    if (mer === "PM" && h !== 12) h += 12;
    if (mer === "AM" && h === 12) h = 0;
    const key = h.toString().padStart(2, "0"); // "07", "08", ..., "19"
    if (!acc[key]) acc[key] = [];
    acc[key].push(turno);
    return acc;
  }, {} as Record<string, { inicio: string; fin: string }[]>);


  //Reservar hora
  const reservarHora = () => {
    if (!selectedHour) {
      alert("Seleccione una hora")
      return;
    } else {

    }
  }

  //obtener el dia de hoy ya que las citas solo se agendan del dia de hoy
  const today = new Date();

  //Validacion de campos
  const CitasSchema = Yup.object().shape({
    fecha_hora: Yup.date().required("Deber seleccionar una fecha")
  })

  return (
    <Formik
      initialValues={{ fecha_hora: null as Date | null }}
      validationSchema={CitasSchema}
      onSubmit={(values) => {
        if (values.fecha_hora) {
          const localHora = values.fecha_hora.toLocaleTimeString('es-Ni', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          });
          console.log('Hora Local:', localHora);
        }
        updateFormData({ fecha_hora: values.fecha_hora });
        console.log(values);
        navigation.navigate('Motivo');
        reservarHora();
      }}
    >

      {({ handleSubmit, setFieldValue, errors, touched }) => (
        <View style={styles.ContainerAgendar}>
          <RegisterStepper currentStep={3} totalSteps={5} />
          <Text style={{ fontSize: 30, fontWeight: '700', color: globalColors.tertiary, textAlign: 'center' }}>
            Selecciona fecha y hora
          </Text>
          <Text style={{ fontSize: 17, marginTop: 10, textAlign: 'center' }}>
            Elige el momento que mejor te convenga
          </Text>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontWeight: '300', textAlign: 'center', fontSize: 15 }}>El agendamiento de consultas médicas se realiza para el <Text style={{
              fontWeight: 'bold'
            }}>mismo dia</Text>. Debes seleccionar el intervalo de tiempo que mejor se ajuste a tu disponibilidad.</Text>
          </View>

          <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 18, marginBottom: 10, marginTop: 5, fontWeight: "bold" }}>
              Hora disponible
            </Text>

            {/* ScrollView para las secciones */}
            <ScrollView
              style={{ maxHeight: 500 }}
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            >
              {loading && <ActivityIndicator />}
{Object.keys(turnosAgrupados)
  .sort((a, b) => Number(a) - Number(b))
  .map((hour) => (
    <View key={hour} style={style.section}>
      <Pressable
        style={style.sectionHeader}
        onPress={() => setOpenSection(openSection === hour ? null : hour)}
      >
        {/* Mostrar en formato 12 h para el usuario */}
        <Text style={style.sectionTitle}>
          Sección {Number(hour) % 12 === 0 ? 12 : Number(hour) % 12}
          :00 {Number(hour) < 12 ? "AM" : "PM"}
        </Text>
      </Pressable>

      {openSection === hour && (
        <View style={style.sectionContent}>
          {turnosAgrupados[hour].map((t) => {
            const isSelected = selectedHour?.inicio === t.inicio;
            return (
              <Pressable
                key={`${t.inicio}-${t.fin}`}
                style={[
                  style.turnoChip,
                  isSelected && style.turnoChipSelected,
                ]}
                onPress={() => {
                  setSelectedHour(t);
                  const [time, mer] = t.inicio.split(" ");
                  let [hh, mm] = time.split(":").map(Number);
                  if (mer === "PM" && hh !== 12) hh += 12;
                  if (mer === "AM" && hh === 12) hh = 0;
                  const fullDate = new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    hh,
                    mm
                  );
                  setFieldValue("fecha_hora", fullDate);
                }}
              >
                <CustomIonicons
                  name="time-outline"
                  size={17}
                  color={isSelected ? "#fff" : "#8C8C8C"}
                />
                <Text
                  style={[
                    style.turnoText,
                    isSelected && style.turnoTextSelected,
                  ]}
                >
                  {`${t.inicio} - ${t.fin}`}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  ))}


              {touched.fecha_hora && errors.fecha_hora && (
                <Text style={{ color: 'red' }}>{errors.fecha_hora}</Text>
              )}
            </ScrollView>

            {/* Botón fijo abajo */}
            <ButtonCitas
              label='Siguiente'
              onPress={handleSubmit}
              style={[style.option, { marginTop: 10 }]}
            />
          </View>


        </View>
      )}

    </Formik>

  );
}

const style = StyleSheet.create({
  option: {
    marginRight: 40,
    marginLeft: 40,
    position: 'relative',
    bottom: 20
  },

  turnoChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    margin: 5,
    backgroundColor: '#f8f8f8',
    elevation: 2, // efecto sutil de sombra
  },

  turnoChipSelected: {
    backgroundColor: '#007bff',
    borderColor: '#007bff'
  },

  turnoText: {
    color: '#555',
    fontSize: 14,
    marginLeft: 6
  },

  turnoTextSelected: {
    color: '#fff',
    fontWeight: '600'
  },
  section: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    overflow: "hidden",
  },

  sectionHeader: {
    padding: 10,
    backgroundColor: "#f2f2f2",
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 15,
  },
  sectionContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    padding: 10,
  },
});
