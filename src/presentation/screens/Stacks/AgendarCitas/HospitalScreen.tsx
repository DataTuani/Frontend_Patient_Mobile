import React, { useContext, useEffect, useState } from 'react'
import { Pressable, Text, View, StyleSheet, ScrollView, Alert } from "react-native";
import { ThemeContext } from '../../../../../context/ThemeContext';
import { globalColors, globalStyles } from '../../../theme/theme';
import { RegisterStepper } from '../../../components/shared/RegisterStepper';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../../routes/StackNavigator';
import { CustomIonicons } from '../../../components/shared/Custom_Ionicons';
import { ButtonCitas } from '../../../components/shared/PrimaryButton';
import { useCitaStore, useHospitalStore, userHorarioStore } from '../../../../hooks/useCitaStore';
import * as Yup from 'yup';
import { Formik } from 'formik';


export const HospitalScreen = () => {
    const { colors } = useContext(ThemeContext);
    const styles = globalStyles(colors);
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const [hospitalSelect, setHospitalSelect] = useState<number | null>(null);
    const { hospitales, fetchHospitales, loading, error } = useHospitalStore();
    const { updateFormData } = useCitaStore();

    useEffect(() => {
        fetchHospitales();
    }, []);

    const CitaSchema = Yup.object().shape({
        hospital_id: Yup.number().required("Seleccione un Hospital")
    })

    //importar horarios
    const { fetchHorario, horario } = userHorarioStore();

    return (
        <Formik
            initialValues={{ hospital_id: null }}
            validationSchema={CitaSchema}
            onSubmit={async (values) => {
                if (values.hospital_id === null) return;
                updateFormData({ hospital_id: values.hospital_id });

                //consultar horario
                await fetchHorario(values.hospital_id);
                const horarios = userHorarioStore.getState().horario;

                if (horarios.length === 0) {
                    Alert.alert(
                        "Sin turnos",
                        "Este hospital no tiene turnos disponibles"
                    );
                    return;
                }

                console.log(values);
                navigation.navigate("HoraDia");
            }}
        >
            {({ handleSubmit, setFieldValue, errors, touched }) => (
                <View style={style.container}>
                    <RegisterStepper
                        currentStep={2}
                        totalSteps={5}
                    />
                    <Text style={{ fontSize: 30, fontWeight: '700', color: globalColors.tertiary, textAlign: 'center' }}>Selecciona el Hospital</Text>
                    <Text style={{ fontSize: 17, marginTop: 0, textAlign: 'center' }}>Centros médicos cercanos</Text>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ maxHeight: 550 }}
                        contentContainerStyle={{ paddingBottom: 10 }}
                    >
                        {Array.isArray(hospitales) && hospitales.map((item) => {
                            const isSelected = hospitalSelect === item.id;

                            return (
                                <Pressable
                                    key={item.id}
                                    style={[style.card, isSelected && style.cardSelected]}
                                    onPress={() => {
                                        setHospitalSelect(item.id);
                                        setFieldValue('hospital_id', item.id);
                                    }}

                                >
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontWeight: "600",
                                                color: isSelected ? globalColors.tertiary : "#000",
                                            }}
                                        >
                                            {item.nombre}
                                        </Text>
                                        <Text style={{ fontSize: 14, color: "#333" }}>Codigo: {item.codigo}</Text>
                                    </View>

                                    <View style={style.row}>
                                        <CustomIonicons name="navigate-sharp" size={18} color="gray" />
                                        <Text style={{ marginLeft: 5, color: "gray", fontSize: 14 }}>
                                            {item.direccion}
                                        </Text>
                                    </View>

                                    <Text style={{ marginLeft: 5, color: "gray", fontSize: 14 }}>
                                        Lun-Sáb 24 horas
                                    </Text>

                                    <View style={style.tagsRow}>
                                        <Text style={style.tag}>{item.email}</Text>
                                        <Text style={style.tag}>{item.telefono}</Text>
                                    </View>
                                </Pressable>
                            );
                        })}
                    </ScrollView>
                    {touched.hospital_id && errors.hospital_id && (
                        <Text style={{ color: 'red' }}>{errors.hospital_id}</Text>
                    )}
                    <ButtonCitas
                        label='Confirmar Hospital'
                        onPress={handleSubmit}
                    />
                </View>
            )}
        </Formik>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 5,
        backgroundColor: globalColors.light,

    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    cardSelected: {
        borderColor: "#E6188F",
        backgroundColor: "#FDE6F2",
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },

    tagsRow: {
        flexDirection: "row",
        marginTop: 10,
        gap: 8,
    },
    tag: {
        backgroundColor: "#E91E63",
        color: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 15,
        fontSize: 12,
        fontWeight: "600",
    },

});