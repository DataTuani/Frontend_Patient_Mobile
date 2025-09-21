import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View } from "react-native";
import { ThemeContext } from '../../../../../context/ThemeContext';
import { globalColors, globalStyles } from '../../../theme/theme';
import { RegisterStepper } from '../../../components/shared/RegisterStepper';
import { ButtonCitas, PrimaryButton } from '../../../components/shared/PrimaryButton';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../../routes/StackNavigator';
import { ButtonIcons } from '../../../components/shared/ButtonIcon';
import * as Yup from 'yup';
import { Formik } from "formik";
import { useCitaStore } from '../../../../hooks/useCitaStore';

export const TipoCitaScreen = () => {
    const { colors } = useContext(ThemeContext);
    const styles = globalStyles(colors);
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const [activateButton, setActivateButton] = useState<string | null>(null);
    const { updateFormData } = useCitaStore();

    const CitaSchema = Yup.object().shape({
        tipoCita: Yup.number().required('Escoge una opcion')
    })

    return (

        <Formik
            initialValues={{ tipoCita: null }}
            validationSchema={CitaSchema}
            onSubmit={(values) => {
                //ir actualizando el store con el tipo de cita seleccionado
                updateFormData({ tipoCita: values.tipoCita });
                console.log(values);
                navigation.navigate("SelectHospital");

            }}
        > 
            {({ values, setFieldValue, handleSubmit, errors, touched }) => (
                <View style={[styles.ContainerAgendar]}>
                    <RegisterStepper
                        currentStep={1}
                        totalSteps={5}

                    />
                    <Text style={{ fontSize: 30, fontWeight: '700', marginTop: 15, color: globalColors.tertiary }}>Selecciona el tipo de cita</Text>
                    <Text style={{ fontSize: 20, marginTop: 5, textAlign: 'center' }}>¿Prefieres una consulta presencial o virtual?</Text>
                    <View style={{ width: '100%', marginTop: 50 }}>
                        <ButtonIcons
                            title={'Hospital'}
                            icon={'local-hospital'}
                            onPress={() => {
                                setActivateButton("Hospital");
                                setFieldValue("tipoCita", 1);
                            }}
                            colors={'#E6188F'}
                            isActivate={activateButton === "Hospital"}
                        />
                        <ButtonIcons
                            title={'TeleConsulta'}
                            icon={'laptop-mac'}
                            isActivate={activateButton === "TeleConsulta"}
                            onPress={() => {
                                setActivateButton("TeleConsulta");
                                setFieldValue("tipoCita", 2);
                            }}
                            colors={'#93C51B'}
                        />

                        {touched.tipoCita && errors.tipoCita && (
                            <Text style={{ color: "red", marginTop: 10 }}>
                                {errors.tipoCita}
                            </Text>
                        )}
                    </View>
                    <ButtonCitas
                        label='Siguiente'
                        onPress={handleSubmit}
                        style={style.option}
                    />
                </View>
            )}

        </Formik>
    )
}


const style = StyleSheet.create({
    option: {
        marginLeft: 50,
        marginRight: 50
    }
})