import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { RegisterStepper } from '../../../components/shared/RegisterStepper';

import { useContext } from 'react';
import { globalColors, globalStyles } from '../../../theme/theme';
import { ThemeContext } from '../../../../../context/ThemeContext';
import { ButtonCitas } from '../../../components/shared/PrimaryButton';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../../routes/StackNavigator';
import { CustomIonicons } from '../../../components/shared/Custom_Ionicons';
import { useCitaStore } from '../../../../hooks/useCitaStore';
import * as Yup from 'yup';
import { Formik } from "formik";
import { citasController } from '../../../../controller/citasController';


export const MotivoScreen = () => {

    const { colors } = useContext(ThemeContext);
    const styles = globalStyles(colors);
    const [currentStep, setCurrentStep] = useState(4);
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const { updateFormData } = useCitaStore();

    const nextStep = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
    }

    const CitaSchema = Yup.object().shape({
        motivo_consulta: Yup.string()
            .required('Campo requerido'),
    });

    return (
        <Formik
            initialValues={{
                motivo_consulta: ''
            }}
            validationSchema={CitaSchema}
            onSubmit={async (values) => {
                updateFormData({
                    motivo_consulta: values.motivo_consulta
                });

                const fullData = useCitaStore.getState().formData;

                try {
                    const response = await citasController(fullData);
                    if (response.success) {
                        alert("Cita hecha :D")
                        console.log("Cita hecha", fullData);
                        navigation.navigate('Home');
                    } else {
                        alert(response.message);
                        console.log(console.error(response.data));
                        console.log('Error del backend', fullData);
                    }
                } catch (error) {
                    alert('Error de agendar cita');
                    console.log(error)
                }

            }}
        >
            {({ handleSubmit, values, errors, touched, handleChange }) => (
                <View style={styles.ContainerAgendar}>
                    <RegisterStepper currentStep={4} />
                    <Text style={{ fontSize: 30, fontWeight: '700', color: globalColors.tertiary, textAlign: 'center', marginTop: 20 }}>
                        Explícanos el motivo de la consulta
                    </Text>
                    <Text style={{ fontSize: 17, marginTop: 20, textAlign: 'center', fontWeight: '300' }}>
                        Esta información ayudará al doctor a tener un preámbulo de la consulta.
                    </Text>

                    <View style={{ marginTop: 50, width: '80%' }}>
                        <Text style={{ marginBottom: 8, fontWeight: 'bold' }}>Motivo de la consulta</Text>

                        <View style={style.inputBox}>
                            <TextInput
                                style={style.textArea}
                                placeholder="Escribe el motivo de la consulta"
                                value={values.motivo_consulta}
                                onChangeText={handleChange('motivo_consulta')}
                                multiline
                                textAlignVertical="top"
                            />
                            {touched.motivo_consulta && errors.motivo_consulta && (
                                <Text style={{ color: 'red' }}>{errors.motivo_consulta}</Text>
                            )}
                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                <Pressable style={{ marginRight: 16 }}>
                                    <CustomIonicons name="document-attach-outline" size={22} color="#444" />
                                </Pressable>
                                <Pressable>
                                    <CustomIonicons name="camera-outline" size={22} color="#444" />
                                </Pressable>
                            </View>
                        </View>
                    </View>

                    <ButtonCitas
                        label="Siguiente"
                        onPress={handleSubmit}
                        style={style.option}
                    />
                </View>
            )}
        </Formik>
    )
};


const style = StyleSheet.create({
    option: {
        marginRight: 50,
        marginLeft: 50,
    },

    inputBox: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
        minHeight: 150,
        backgroundColor: "#fff",

    },
    textArea: {
        flex: 1,
        fontSize: 14,
        padding: 0,
        textAlignVertical: 'top'
    },
})
