import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/home/HomeScreen';
import { CustomIonicons } from '../components/shared/Custom_Ionicons';
import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import { StyleSheet, View, Text } from 'react-native';
import { globalColors } from '../theme/theme';
import { MapaScreen } from '../screens/Tabs/Mapa/MapaScreen';
import { ResultadoScreen } from '../screens/Tabs/Resultados/ResultadoScreen';
import { MedicamentoScreen } from '../screens/Tabs/Medicamentos/MedicamentoScreen';


const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {

    const { colors } = useContext(ThemeContext);

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: {
                    marginBottom: 0
                },
                headerTitle: '',
                headerStyle: { elevation: 0 },
                tabBarActiveTintColor: colors.primary,
                tabBarStyle: [styles.tabBar],
                sceneStyle: {
                    backgroundColor: globalColors.light
                }
            }}
        >
            <Tab.Screen
                name="home" options={{ title: 'Inicio', tabBarIcon: ({ color }) => (<CustomIonicons name="home-outline" color={color} />) }} component={HomeScreen} />

            <Tab.Screen name="Calendario" options={{
                headerTitle: () =>
                (
                    <View style={{ marginRight: 10 }}>
                        <Text style={{ fontSize: 25, color: globalColors.primary, fontWeight: 'bold' }}>Resultados</Text>
                        <Text style={{ color: globalColors.gray, fontSize: 16 }}>Ver resultados de laboratorio</Text>
                    </View>
                ),
                title: 'Resultados',
                tabBarIcon: ({ color }) => (<CustomIonicons name='flask-outline' color={color}
                />)
            }} component={ResultadoScreen} />

            <Tab.Screen name="Medicamentos" options={{
                headerTitle: () =>
                (
                    <View style={{ marginRight: 10 }}>
                        <Text style={{ fontSize: 25, color: globalColors.primary, fontWeight: 'bold' }}>Medicamentos</Text>
                        <Text style={{ color: globalColors.gray, fontSize: 16 }}>Gestiona tus medicamentos</Text>
                    </View>
                ),
                title: 'Medicamentos',
                tabBarIcon: ({ color }) => (<CustomIonicons name='medkit-outline' color={color} />)
            }} component={MedicamentoScreen} />

            <Tab.Screen name="Mapa" options={{ title: 'Mapa', tabBarIcon: ({ color }) => (<CustomIonicons name='map-outline' color={color} />) }} component={MapaScreen} />
        </Tab.Navigator>
    );
}


//estilo de buttonTab

const styles = StyleSheet.create({
    tabBar: {
        borderRadius: 25,
        height: 70,
        marginHorizontal: 20,
        marginBottom: 50,
        elevation: 8,
        backgroundColor: globalColors.light
    }
})