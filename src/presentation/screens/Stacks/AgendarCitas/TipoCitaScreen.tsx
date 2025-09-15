import React, { useContext, useState } from 'react'
import { Pressable, Text, View } from "react-native";
import { ThemeContext } from '../../../../../context/ThemeContext';
import { globalColors, globalStyles } from '../../../theme/theme';
import { RegisterStepper } from '../../../components/shared/RegisterStepper';
import { PrimaryButton } from '../../../components/shared/PrimaryButton';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../../routes/StackNavigator';
import { ButtonIcons } from '../../../components/shared/ButtonIcon';


export const TipoCitaScreen = () => {

    const [currentStep, setCurrenStep] = useState(1);
    const { colors } = useContext(ThemeContext);
    const styles = globalStyles(colors);
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const [activateButton, setActivateButton] = useState<string | null>(null);

    const nextStep = () => {
        if (currentStep < 4) {
            setCurrenStep(currentStep + 1);
        }else{
            navigation.navigate('SelectHospital');
        }
    }


    return (
        <View style={[styles.ContainerAgendar]}>
            <RegisterStepper
                currentStep={1}

            />
            <Text style={{ fontSize: 30, fontWeight: '700', marginTop: 15, color: globalColors.tertiary }}>Selecciona el tipo de cita</Text>
            <Text style={{ fontSize: 20, marginTop: 5, textAlign: 'center' }}>¿Prefieres una consulta presencial o virtual?</Text>
            <View style={{ width: '100%', marginTop: 50 }}>
                <ButtonIcons
                    title={'Hospital'}
                    icon={'local-hospital'}
                    onPress={() => setActivateButton('Hospital')}
                    colors={'#E6188F'}
                    isActivate={activateButton === 'Hospital '}
                />
                <ButtonIcons
                    title={'TeleConsulta'}
                    icon={'laptop-mac'}
                    isActivate={activateButton === 'TeleConsulta'}
                    onPress={() => console.log('Hola')}
                    colors={'#93C51B'}
                />
            </View>
            <PrimaryButton
                onPress={() => nextStep()}
                label='Siguiente'
                style={{colors:globalColors.tertiary}}
            />
        </View>
    )
}
