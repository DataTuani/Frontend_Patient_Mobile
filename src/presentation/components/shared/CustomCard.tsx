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

interface CardProps {
  number: number;
  min: number;
  person_number: number;
  nameDoctor: string;
  especialidad: string;
  hospital: string;
  progress: number;
}


export const ContainerCard = ({
  number,
  min,
  person_number,
  nameDoctor,
  especialidad,
  hospital,
  progress
}: CardProps) => {

  return (
    <View style={stylesCard.card}>
      <View style={{ marginRight: 10 }}>
        <Text style={stylesCard.label}>Tu posición en la fila</Text>
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>

        <Text style={{ fontSize: 40, textAlign: 'center', color: globalColors.tertiary, fontWeight: 'bold' }}>#{number}</Text>
        <Text style={{ fontWeight: '400', fontSize: 18 }}>Posición en la fila</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 40 }}>
          {/* Columna de minutos */}
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{min}</Text>
            <Text>minutos estimados</Text>
          </View>

          {/* Columna de personas */}
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{person_number}</Text>
            <Text>Personas adelante</Text>
          </View>
        </View>
      </View>

      <View style={stylesCard.base_progress}>
        <View style={[stylesCard.progress_interno, { width: `${progress * 100}%` }]}></View>
      </View>

      <View style={{ justifyContent: 'center', marginTop: 20 }}>

        <View style={{ flexDirection: 'row', gap: 180 }}>
          <Text style={stylesCard.subtitle}>Doctor:</Text>
          <Text style={stylesCard.subTitle} >{nameDoctor}</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 148, marginTop: 5 }}>
          <Text style={stylesCard.subtitle}>Especialidad:</Text>
          <Text style={stylesCard.subTitle}>{especialidad}</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 171, marginTop: 5 }}>
          <Text style={stylesCard.subtitle}>Hospital:</Text>
          <Text style={stylesCard.subTitle}>{hospital}</Text>
        </View>
      </View>
    </View>

  )

}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
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


const stylesCard = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 9,
    marginHorizontal: 9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: globalColors.gay_2
  },

  container_label: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  subtitle: {
    color: '#8C8C8C',
    fontSize: 15,
    fontWeight: 'bold'
  },
  subTitle: {
    fontWeight: '400',
    fontSize: 15,
    textAlign: 'right',
    color: '#4d4d4d'
  },
  base_progress: {
    width: '100%',
    height: 10,
    backgroundColor: globalColors.gray,
    borderRadius: 5,
    marginTop:10
  },
  progress_interno: {

    height: "100%",
    backgroundColor: globalColors.tertiary,
    borderRadius: 5
  }
}
)