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

export const MotivoScreen = () => {

    const { colors } = useContext(ThemeContext);
    const styles = globalStyles(colors);
    const [currentStep, setCurrentStep] = useState(4);

    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const nextStep = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
    }
    return (
        <View style={styles.ContainerAgendar}>
            <RegisterStepper currentStep={4} />
            <Text style={{ fontSize: 30, fontWeight: '700', color: globalColors.tertiary, textAlign: 'center', marginTop: 20 }}>
                Explicanos el motivo de la consulta
            </Text>
            <Text style={{ fontSize: 17, marginTop: 20, textAlign: 'center', fontWeight: '300' }}>
                Esta información ayudará al doctor a tener un preámbulo de la consulta que será atendida.
            </Text>
            <View style={{ marginTop: 50, width:'80%' }}>
                <Text style={{ marginBottom: 8, fontWeight:'bold' }}>Motivo de la consulta</Text>

                <View style={style.inputBox}>
                    <TextInput
                        style={style.textArea}
                        placeholder="Escribe el motivo de la consulta"
                        // value={}
                        // onChangeText={setMotivo}
                        multiline
                        textAlignVertical="top"
                    />


                    <View style={{ flexDirection: 'row', marginTop: 8 }}>
                        <Pressable style={{ marginRight: 16 }} onPress={() => console.log("Hola")}>
                            <CustomIonicons name="document-attach-outline" size={22} color="#444" />
                        </Pressable>

                        <Pressable style={{ marginRight: 16 }} onPress={() => console.log("Hola")}>
                            <CustomIonicons name="camera-outline" size={22} color="#444" />
                        </Pressable>
                    </View>
                </View>
            </View>


            <ButtonCitas
                label='Siguiente'
                onPress={() => navigation.navigate("Confirma")}
                style={style.option}
            />

        </View>
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
        padding: 0, // quita padding extra del TextInput
        textAlignVertical:'top'
    },
})
