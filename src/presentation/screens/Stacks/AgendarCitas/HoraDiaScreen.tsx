import React, { useContext, useState } from 'react'
import { Pressable, Text, View, StyleSheet, FlatList, ScrollView } from "react-native";
import { globalColors, globalStyles } from '../../../theme/theme';
import { ThemeContext } from '../../../../../context/ThemeContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../../routes/StackNavigator';
import { RegisterStepper } from '../../../components/shared/RegisterStepper';
import { PrimaryButton } from '../../../components/shared/PrimaryButton';
export const HoraDiaScreen = () => {

  const { colors } = useContext(ThemeContext);
  const styles = globalStyles(colors);
  const [currentStep, setCurrentStep] = useState(3);
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.navigate('Confirma');
    }
  }

  const dates = [
    { id: "1", day: "Lun", date: "15" },
    { id: "2", day: "Mar", date: "16" },
    { id: "3", day: "Mié", date: "17" },
    { id: "4", day: "Jue", date: "18" },
    { id: "5", day: "Vie", date: "19" },
    { id: "6", day: "Sáb", date: "20" },
    { id: "7", day: "Dom", date: "21" },
  ];

  const hours = [
    { id: "1", label: "8:00 AM - 09:00 AM" },
    { id: "2", label: "9:00 AM - 10:00 AM" },
    { id: "3", label: "10:00 AM - 11:00 AM" },
    { id: "4", label: "11:00 AM - 12:00 PM" },
    { id: "5", label: "1:00 PM - 02:00 PM" },
    { id: "6", label: "2:00 PM - 03:00 PM" },
    { id: "7", label: "3:00 PM - 04:00 PM" },
    { id: "8", label: "4:00 PM - 05:00 PM" },
  ];

  return (
    <View style={styles.ContainerAgendar}>
      <RegisterStepper currentStep={3} />

      <Text style={{ fontSize: 30, fontWeight: '700', color: globalColors.tertiary, textAlign: 'center' }}>
        Selecciona fecha y hora
      </Text>
      <Text style={{ fontSize: 17, marginTop: 10, textAlign: 'center' }}>
        Elige el momento que mejor te convenga
      </Text>
      <Text style={{ fontSize: 18, marginBottom: 10, marginTop: 20, fontWeight: "bold" }}>
        Fecha
      </Text>
      {/* Sección de Fecha */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.listContainer}
        style={{ maxHeight: 90 }}
      >
        {dates.map((item) => {
          const isSelected = selected === item.id;
          return (
            <Pressable
              key={item.id}
              style={[style.dateBox, isSelected && style.dateBoxSelected]}
              onPress={() => setSelected(item.id)}
            >
              <Text style={{ color: isSelected ? globalColors.light : globalColors.dark, fontSize: 14 }}>
                {item.day}
              </Text>
              <Text style={{ color: isSelected ? globalColors.light : globalColors.dark, fontSize: 18, fontWeight: 'bold' }}>
                {item.date}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
      {/* Sección de Hora disponible */}
      <Text style={{ fontSize: 18, marginBottom: 15, marginTop: 25, fontWeight: "bold" }}>
        Hora disponible
      </Text>
      <View style={style.hoursContainer}>
        {hours.map((hour) => {
          const isSelected = selectedHour === hour.id;
          return (
            <Pressable
              key={hour.id}
              style={[style.hourBox, isSelected && style.hourBoxSelected]}
              onPress={() => setSelectedHour(hour.id)}
            >
              <Text style={{ color: isSelected ? "#fff" : "#000", fontSize: 14 }}>
                {hour.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <PrimaryButton
        label='Siguiente'
        onPress={nextStep}
        style={{ marginTop: 20 }}
      />

    </View>
  );
}

const style = StyleSheet.create({
  listContainer: {
    gap: 10,
    paddingVertical: 5,
  },
  dateBox: {
    width: 60,
    height: 70,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  dateBoxSelected: {
    backgroundColor: "#E6188F",
    borderColor: "#E6188F",
  },
  hoursContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  hourBox: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  hourBoxSelected: {
    backgroundColor: "#E6188F",
    borderColor: "#E6188F",
  },
});
