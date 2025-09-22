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
import * as ImagePicker from 'expo-image-picker';
import * as Document from 'expo-document-picker';



export const MotivoScreen = () => {
    const { colors } = useContext(ThemeContext);
    const styles = globalStyles(colors);
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const { updateFormData } = useCitaStore();


    const CitaSchema = Yup.object().shape({
        motivo_consulta: Yup.string()
            .required('Campo requerido'),
    });

    const pickImage = async () => {
        //pedir permiso
        const permiso = await ImagePicker.requestCameraPermissionsAsync()
        if (!permiso.granted) {
            alert("Se requiere permiso para acceder a la galeria");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            //guarda en el store            
            updateFormData({ File: uri });
        }
    }

    const pickDocument = async () => {
        try {
            const result = await Document.getDocumentAsync({
                type: "*/*",
                copyToCacheDirectory: true,
            });

            if (result.assets && result.assets.length > 0) {
                const uri = result.assets[0].uri;
                updateFormData({ File: uri });
            }
        } catch (err) {
            console.log("Error al seleccionar un archivo: ", err);
        }
    }


    return (
        <Formik
            initialValues={{
                motivo_consulta: ''
            }}
            validationSchema={CitaSchema}
            onSubmit={(values) => {
                updateFormData({
                    motivo_consulta: values.motivo_consulta
                });
                console.log(values);
                navigation.navigate("Confirma");
            }}
        >
            {({ handleSubmit, values, errors, touched, handleChange }) => (
                <View style={styles.ContainerAgendar}>
                    <RegisterStepper currentStep={4} totalSteps={5}/>
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
                                <Pressable style={{ marginRight: 16 }}
                                    onPress={pickDocument}
                                >
                                    <CustomIonicons name="document-attach-outline" size={22} color="#444" />
                                </Pressable>
                                <Pressable onPress={pickImage}>
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



