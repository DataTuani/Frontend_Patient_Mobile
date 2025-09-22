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

interface AppointmentCardProps {
  date: string;
  hospital: string;
  doctor: string;
  specialty: string;
  estado: string;
  tipo: string; // "TeleConsulta" | "Consulta-Presencial" | "Seguimiento"
  showButton?: boolean;
  onPress: () => void;
  onMenuPress?: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  date,
  hospital,
  doctor,
  specialty,
  estado,
  tipo,
  showButton = false,
  onPress,
  onMenuPress,
}) => {
  const isTele = tipo === 'TeleConsulta';
  const labelIcon = isTele ? 'videocam-outline' : 'business-outline';
  const labelText = isTele ? 'TeleConsulta' : 'Consulta Presencial';

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.labelContainer}>
          <Ionicons name={labelIcon} size={14} color="#aaa" />
          <Text style={styles.label}> {labelText}</Text>
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

      <View style={styles.estadoBox}>
        <Text style={styles.estadoText}>{estado}</Text>
      </View>

      {showButton && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Asistir a cita</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,               // ⬇️ menos padding
    marginVertical: 8,         // ⬇️ menos margen
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,       // ⬇️ sombra más sutil
    shadowRadius: 2,
    elevation: 2,
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
    fontSize: 12,
    color: '#999',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4D4D4D',
    marginTop: 4,
  },
  hospital: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  doctorContainer: {
    marginBottom: 8,
  },
  doctorName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4D4D4D',
  },
  specialty: {
    fontSize: 12,
    color: '#999',
  },
  estadoBox: {
    backgroundColor: '#ccc',
    width: '25%',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 5,
    alignSelf: 'flex-start',
  },
  estadoText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 6,
  },
  button: {
    backgroundColor: '#008CDB',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
});
