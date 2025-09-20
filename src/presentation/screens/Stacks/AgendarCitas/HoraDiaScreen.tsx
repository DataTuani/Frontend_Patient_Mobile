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

  const turnos = horario.slice(0, -1).map((hora, i) => ({
    inicio: hora,
    fin: horario[i + 1]
  }));

  // Agrupar turnos por la "hora base" (ej: 00, 01, 02)
  const turnosAgrupados = turnos.reduce((acc, turno) => {
    const hourKey = turno.inicio.split(":")[0]; // "00", "01", etc.
    if (!acc[hourKey]) acc[hourKey] = [];
    acc[hourKey].push(turno);
    return acc;
  }, {} as Record<string, { inicio: string; fin: string }[]>);


  //Pasos interfaz
  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  }

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
          <RegisterStepper currentStep={3} />
          <Text style={{ fontSize: 30, fontWeight: '700', color: globalColors.tertiary, textAlign: 'center' }}>
            Selecciona fecha y hora
          </Text>
          <Text style={{ fontSize: 17, marginTop: 10, textAlign: 'center' }}>
            Elige el momento que mejor te convenga
          </Text>
          <View style={{ marginTop: 40 }}>
            <Text style={{ fontWeight: '300', textAlign: 'center', fontSize: 15 }}>El agendamiento de consultas médicas se realiza para el <Text style={{
              fontWeight: 'bold'
            }}>mismo dia</Text>. Debes seleccionar el intervalo de tiempo que mejor se ajuste a tu disponibilidad.</Text>
          </View>

          <View style={{ flex: 1, padding: 20, maxHeight: 400 }}>

            <Text style={{ fontSize: 18, marginBottom: 20, marginTop: 10, fontWeight: "bold" }}>Hora disponible</Text>

            <View style={style.turnosContainer}>
              {loading && <ActivityIndicator />}

              {Object.entries(turnosAgrupados).map(([hour, group]) => (
                <View>
                  {/*Boton de seccion*/}
                  <Pressable
                    style={style.sectionHeader}
                    onPress={() => setOpenSection(openSection === hour ? null : hour)}
                  >
                    <Text style={style.sectionTitle}>Seccion {hour}:00</Text>
                  </Pressable>

                  {/*Turnos dentro de la seccion */}
                  {openSection === hour && (
                    <View style={style.sectionContent}>
                      {group.map((t, idx) => {
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
                              const [hh, mm] = t.inicio.split(":").map(Number);

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
                                isSelected && style.turnoChipSelected,
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
            </View>
          </View>
          <ButtonCitas
            label='Siguiente'
            onPress={handleSubmit}
            style={style.option}
          />

        </View>
      )}

    </Formik>

  );
}

const style = StyleSheet.create({
  option: {
    marginRight: 50,
    marginLeft: 50,
  },

  turnosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 8
  },

  turnoChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    backgroundColor: '#f8f8f8'
  },

  turnoChipSelected: {
    backgroundColor: '#007bff',
    borderColor: '#007bff'
  },

  turnoText: {
    color: '#555',
    fontSize: 14,
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
    padding: 10,
    backgroundColor: "#fff",
  },
});
