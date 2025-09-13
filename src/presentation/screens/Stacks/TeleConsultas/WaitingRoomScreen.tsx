import { Dimensions, SafeAreaView, View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { globalColors, globalStyles } from '../../../theme/theme';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../../../../context/ThemeContext'
import { RootStackParams } from '../../../routes/StackNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ButtonIcon, ButtonIcons } from '../../../components/shared/ButtonIcon';
import { CustomIonicons } from '../../../components/shared/Custom_Ionicons';
import { PrimaryButton } from '../../../components/shared/PrimaryButton';

export const WaitingRoomScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const { colors } = useContext(ThemeContext);
    // const styles = globalStyles(colors);

    const { height } = Dimensions.get('window');

    const [cameraOn, setCamerOn] = useState<boolean>(true);
    const [micOn, setMicOn] = useState<boolean>(true);



    return (
        <SafeAreaView style={styles.container}>

            <Image
                source={require('../../../assets/Reloj.png')}
                style={[{ marginTop: height * 0.03, width: 140, height: 140 }]}
                resizeMode="contain"
            />

            <Text style={{ fontSize: 30, fontWeight: '700', marginTop: 15, color: '#003E6D' }}>Sala de espera</Text>
            <Text style={{ fontSize: 20, marginTop: 5, textAlign: 'center' }}>El Dr. Carlos Ruiz se unirá pronto</Text>

            <Text style={{ fontSize: 18, marginTop: 15, fontWeight: 'bold', color: globalColors.gray }}>Cita programada: <Text>10:10pm</Text></Text>
            <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 16 }}>Verifica tu equipo: </Text>

            <View style={styles.toggleRow}>
                <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        cameraOn ? { backgroundColor: '#008CCA' } : { borderColor: '#008CCA', borderWidth: 1, backgroundColor: 'transparent' }
                    ]}
                    onPress={() => setCamerOn(!cameraOn)}
                    activeOpacity={0.8}
                >
                    <View style={{ marginLeft: 30 }}>
                        <CustomIonicons name={cameraOn ? 'camera' : 'camera-outline'} size={18} color={cameraOn ? colors.buttonText : colors.primary} />
                    </View>

                    <Text style={{ color: cameraOn ? colors.buttonText : colors.primary, marginLeft: 8, fontSize: 14, fontWeight: '600' }}>Cámara</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        micOn ? { backgroundColor: '#008CCA' } : { borderColor: '#008CCA', borderWidth: 1, backgroundColor: 'transparent' }
                    ]}
                    onPress={() => setMicOn(!micOn)}
                    activeOpacity={0.8}
                >
                    <View style={{ marginLeft: 30 }}>
                        <CustomIonicons name={micOn ? 'mic' : 'mic-off-outline'} size={18} color={micOn ? colors.buttonText : colors.primary} />
                    </View>

                    <Text style={{ color: micOn ? colors.buttonText : colors.primary, marginLeft: 8, fontSize: 14, fontWeight: '600' }}>Micrófono</Text>
                </TouchableOpacity>
            </View>
            <PrimaryButton
            onPress={()=> navigation.navigate('Connecting')} 
            label='Next'
            />

        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingBottom: 24,
        backgroundColor: globalColors.light
    },
    verifyLabel: {

        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8
    },

    toggleButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        marginHorizontal: 6,
        borderRadius: 10,
        gap: 15
    },
    toggleRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 20
    }
})