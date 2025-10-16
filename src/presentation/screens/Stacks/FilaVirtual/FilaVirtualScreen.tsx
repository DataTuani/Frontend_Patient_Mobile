import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { ThemeContext } from '../../../../../context/ThemeContext';
import { globalColors, globalStyles } from '../../../theme/theme';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../../routes/StackNavigator';
import { ContainerCard } from '../../../components/shared/CustomCard';
import { PrimaryButton } from '../../../components/shared/PrimaryButton';
import { useFilaStore } from '../../../../hooks/useFilaStore';
import { useCitaStore} from '../../../../hooks/useCitaStore';

export const FilaVirtualScreen = () => {

    const { colors } = useContext(ThemeContext)
    const styles = globalStyles(colors);
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const { fila, loading, error, fetchFila } = useFilaStore();
    const {formData} = useCitaStore();

    const citaId = formData?.id;


  if (!citaId) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: globalColors.tertiary, textAlign: 'center', fontSize: 20 }}>
          No tienes ninguna cita activa para mostrar en la fila.
        </Text>
        <PrimaryButton
          style={styleFila.button}
          onPress={() => navigation.goBack()}
          label="Volver"
        />
      </View>
    );
  }

    useEffect(() => {
        if (citaId) {
            fetchFila(citaId);
        }
    }, [citaId]);

    console.log(citaId)

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={{ color: colors.text }}>Cargando fila...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: 'red' }}>{error}</Text>
            </View>
        );
    }

    if (!fila) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: colors.text }}>No hay fila disponible</Text>
            </View>
        );
    }

    const doctor =
        fila.medico.usuario.primer_nombre +
        ' ' +
        fila.medico.usuario.primer_apellido;

    const especialidad = fila.medico.especialidad.nombre;
    const hospital = fila.hospital.nombre;


    const progress =
        fila.totalEnFila > 0
            ? (fila.totalEnFila - fila.personasDelante) / fila.totalEnFila
            : 0;

    return (
        <View style={styles.container}>
            <ContainerCard
                number={fila.turnoPaciente.numero_turno}
                min={fila.posicion}
                person_number={fila.personasDelante}
                nameDoctor={doctor}
                especialidad={especialidad}
                hospital={hospital}
                progress={progress}
            />

            <PrimaryButton
                style={styleFila.button}
                onPress={() => navigation.goBack()}
                label={'Salir de esta fila'}
            />



        </View>
    )
}

const styleFila = StyleSheet.create({
    button: {
        alignSelf: 'center'
    }

})
