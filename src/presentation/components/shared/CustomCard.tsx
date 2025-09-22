// components/AppointmentCard.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalColors } from '../../theme/theme';

interface AppointmentCardProps {
  date: string;
  hospital: string;
  doctor: string;
  specialty: string;
  onPress: () => void;
  onMenuPress?: () => void;
  estado: string;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  date,
  hospital,
  doctor,
  specialty,
  onPress,
  onMenuPress,
  estado

}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.labelContainer}>
          <Ionicons name="videocam-outline" size={14} color="#aaa" />
          <Text style={styles.label}> TeleConsulta</Text>
        </View>
        <Pressable onPress={onMenuPress}>
          <Ionicons name="ellipsis-vertical" size={18} color="#aaa" />
        </Pressable>
      </View>

      <Text style={styles.date}>{date}</Text>
      <Text style={styles.hospital}>{hospital}</Text>

      <View style={styles.doctorContainer}>
        <Text style={styles.doctorName}>{doctor}</Text>
        <Text style={styles.specialty}>{specialty}</Text>
      </View>

      <View style={{ backgroundColor: "#ccc", width: '25%', borderRadius: 5, padding: 5 }}>
        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{estado}</Text>
      </View>


      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Asistir a cita</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  card: {

    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 15,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    color: '#999',
    fontWeight: 'bold'
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4D4D4D',
    marginTop: 6,

  },
  hospital: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  doctorContainer: {
    marginBottom: 12,
  },
  doctorName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#4D4D4D',
  },
  specialty: {
    fontSize: 13,
    color: '#999',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#008CDB',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});