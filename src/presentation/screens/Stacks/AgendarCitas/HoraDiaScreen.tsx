import React, { useContext, useState } from 'react'
import { Pressable, Text, View, StyleSheet, FlatList, ScrollView, TouchableOpacity } from "react-native";
import { globalColors, globalStyles } from '../../../theme/theme';
import { ThemeContext } from '../../../../../context/ThemeContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../../routes/StackNavigator';
import { RegisterStepper } from '../../../components/shared/RegisterStepper';
import { ButtonCitas } from '../../../components/shared/PrimaryButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { CustomIonicons } from '../../../components/shared/Custom_Ionicons';
import { CalendarHours } from '../../../components/fechas';

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


export const HoraDiaScreen = () => {

  const { colors } = useContext(ThemeContext);
  const styles = globalStyles(colors);
  const [currentStep, setCurrentStep] = useState(3);
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [selectDate, setSelectedDate] = useState<string | null>(null);
  const [bookedDates, setBookedDates] = useState<string[]>([]);


  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.navigate('Confirma');
    }
  }


  return (
    <View style={styles.ContainerAgendar}>
      <RegisterStepper currentStep={3} />
      <Text style={{ fontSize: 30, fontWeight: '700', color: globalColors.tertiary, textAlign: 'center' }}>
        Selecciona fecha y hora
      </Text>
      <Text style={{ fontSize: 17, marginTop: 10, textAlign: 'center' }}>
        Elige el momento que mejor te convenga
      </Text>
      <CalendarHours />
      <ButtonCitas
        label='Siguiente'
        onPress={() => navigation.navigate("Confirma")}
        style={style.option}
      />

    </View>
  );
}

const style = StyleSheet.create({
  option: {
    marginRight: 50,
    marginLeft: 50,
  }
});
