import React, { useContext, useState } from 'react'
import { Pressable, Text, View, StyleSheet, FlatList, ScrollView } from "react-native";
import { ThemeContext } from '../../../../../context/ThemeContext';
import { globalColors, globalStyles } from '../../../theme/theme';
import { RegisterStepper } from '../../../components/shared/RegisterStepper';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../../routes/StackNavigator';
import { CustomIonicons } from '../../../components/shared/Custom_Ionicons';
import { ButtonCitas, PrimaryButton } from '../../../components/shared/PrimaryButton';


interface Hospitales {
    id: number;
    centro: string;
    km: string;
    direccion: string;
    fecha: string;
    hora: string;
}

export const HospitalScreen = () => {

    const [currentStep, setCurrenStep] = useState(2);
    const { colors } = useContext(ThemeContext);
    const styles = globalStyles(colors);
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const [hospitalSelect, setHospitalSelect] = useState<number | null>(null);

    const nextStep = () => {
        if (currentStep < 4) {
            setCurrenStep(currentStep + 1);
        } else {
            navigation.navigate('HoraDia');
        }
    }
    const hospitales: Hospitales[] = [
        { id: 1, centro: 'Hospital Dermatológico', km: '2.5 Km', direccion: 'Av. Principal 123, Centro', fecha: '04 Abril 2025', hora: '10:30' },
        { id: 2, centro: 'Hospital Alemán Nicaragüense', km: '3.2 Km', direccion: 'Km 5 Carretera Norte, Managua', fecha: '05 Abril 2025', hora: '09:00' },
        { id: 3, centro: 'Hospital Vivian Pellas', km: '4.1 Km', direccion: 'Carretera Sur, Managua', fecha: '06 Abril 2025', hora: '11:15' },
        { id: 4, centro: 'Hospital Dermatológico', km: '2.5 Km', direccion: 'Av. Principal 123, Centro', fecha: '04 Abril 2025', hora: '10:30' },
        { id: 5, centro: 'Hospital Alemán Nicaragüense', km: '3.2 Km', direccion: 'Km 5 Carretera Norte, Managua', fecha: '05 Abril 2025', hora: '09:00' },
        { id: 6, centro: 'Hospital Vivian Pellas', km: '4.1 Km', direccion: 'Carretera Sur, Managua', fecha: '06 Abril 2025', hora: '11:15' },


    ];


    return (
        <View style={style.container}>
            <RegisterStepper
                currentStep={2}
            />
            <Text style={{ fontSize: 30, fontWeight: '700', color: globalColors.tertiary, textAlign: 'center' }}>Selecciona el Hospital</Text>
            <Text style={{ fontSize: 17, marginTop: 0, textAlign: 'center' }}>Centros médicos cercanos</Text>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ maxHeight: 550 }}
                contentContainerStyle={{ paddingBottom: 10 }}
            >
                {hospitales.map((item) => {
                    const isSelected = hospitalSelect === item.id;

                    return (
                        <Pressable
                            key={item.id}
                            style={[style.card, isSelected && style.cardSelected]}
                            onPress={() => setHospitalSelect(item.id)}
                        >
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: "600",
                                        color: isSelected ? globalColors.tertiary : "#000",
                                    }}
                                >
                                    {item.centro}
                                </Text>
                                <Text style={{ fontSize: 14, color: "#333" }}>{item.km}</Text>
                            </View>

                            <View style={style.row}>
                                <CustomIonicons name="navigate-sharp" size={18} color="gray" />
                                <Text style={{ marginLeft: 5, color: "gray", fontSize: 14 }}>
                                    {item.direccion}
                                </Text>
                            </View>

                            <Text style={{ marginLeft: 5, color: "gray", fontSize: 14 }}>
                                Lun-Sáb 8:00 am - 7:00 pm
                            </Text>

                            <View style={style.tagsRow}>
                                <Text style={style.tag}>Medicina General</Text>
                                <Text style={style.tag}>Dermatología</Text>
                            </View>
                        </Pressable>
                    );
                })}
            </ScrollView>

            <ButtonCitas
                label='Confirmar Hospital'
                onPress={() => navigation.navigate("HoraDia")}
                
            />
        </View>
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