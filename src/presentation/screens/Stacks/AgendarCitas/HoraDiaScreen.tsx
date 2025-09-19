import React, { useContext, useState } from 'react'
import { Pressable, Text, View, StyleSheet, FlatList, ScrollView, TouchableOpacity } from "react-native";
import { globalColors, globalStyles } from '../../../theme/theme';
import { ThemeContext } from '../../../../../context/ThemeContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../../routes/StackNavigator';
import { RegisterStepper } from '../../../components/shared/RegisterStepper';
import { ButtonCitas } from '../../../components/shared/PrimaryButton';
import { CustomIonicons } from '../../../components/shared/Custom_Ionicons';
import { useCitaStore } from '../../../../hooks/useCitaStore';
import * as Yup from 'yup';
import { Formik } from 'formik';

const hours = [
  { id: "1", label: "8:00 AM - 09:00 AM", start: "08:00" },
  { id: "2", label: "9:00 AM - 10:00 AM", start: "09:00" },
  { id: "3", label: "10:00 AM - 11:00 AM", start: "10:00" },
  { id: "4", label: "11:00 AM - 12:00 PM", start: "11:00" },
  { id: "5", label: "1:00 PM - 02:00 PM", start: "13:00" },
  { id: "6", label: "2:00 PM - 03:00 PM", start: "14:00" },
  { id: "7", label: "3:00 PM - 04:00 PM", start: "15:00" },
  { id: "8", label: "4:00 PM - 05:00 PM", start: "16:00" },
];

export const HoraDiaScreen = () => {

  const { colors } = useContext(ThemeContext);
  const styles = globalStyles(colors);
  const [currentStep, setCurrentStep] = useState(3);
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const [selectedHour, setSelectedHour] = useState<string | null>(null);

  const { updateFormData } = useCitaStore();

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  }

  const reservarHora = () => {

    if (!selectedHour) {
      alert("Seleccione una hora")
      return;
    } else {
      const selectedLabel = hours.find((h) => h.id === selectedHour)?.label;
      alert(`Fecha: ${today.toLocaleDateString()}\nHora: ${selectedLabel}`);
    }

  }
  const today = new Date();

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

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              {hours.map((hour) => {
                const isSelected = selectedHour === hour.id;
                return (
                  <Pressable
                    key={hour.id}
                    style={[
                      style.hourBox,
                      isSelected && style.hourBoxSelected,

                    ]}
                    onPress={() => {
                      setSelectedHour(hour.id);
                      const today = new Date();
                      const [hh, mm] = hour.start.split(":").map(Number);

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
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                      <CustomIonicons
                        name='time-outline'
                        size={17}
                        color={isSelected ? '#fff' : '#8C8C8C'}
                      />
                      <Text
                        style={{
                          color: isSelected ? "#fff" : "#8C8C8C",
                        }}
                      >
                        {hour.label}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
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
  hourBox: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#8C8C8C',
    minWidth: 160,
    alignItems: "center",
  },
  hourBoxSelected: { backgroundColor: "#007bff", borderColor: "#007bff" },
});
