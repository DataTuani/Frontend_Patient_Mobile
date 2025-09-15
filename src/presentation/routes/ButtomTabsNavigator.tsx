import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/home/HomeScreen';
import { CalendarScreen } from '../screens/Tabs/calendar/CalendarScreen';
import { VirtualScreen } from '../screens/Tabs/virtualLine/VirtualScreen';
import { CustomIonicons } from '../components/shared/Custom_Ionicons';
import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { globalColors } from '../theme/theme';
import { MapaScreen } from '../screens/Tabs/Mapa/MapaScreen';


const Tab = createBottomTabNavigator();
const { height } = Dimensions.get('window');
const bottomOffset = height < 700 ? 10 : 20;

export const BottomTabNavigator = () => {

    const { colors } = useContext(ThemeContext);

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: {
                    marginBottom: 0
                },
                headerTitle: '',
                headerStyle: { elevation: 0},
                tabBarActiveTintColor: colors.primary,
                tabBarStyle: [styles.tabBar],
                sceneStyle:{
                    backgroundColor:globalColors.light
                }
            }}
        >
            <Tab.Screen
                name="home" options={{ title: 'Inicio', tabBarIcon: ({ color }) => (<CustomIonicons name="home-outline" color={color} />) }} component={HomeScreen} />
            <Tab.Screen name="Calendario" options={{ title: 'Resultados', tabBarIcon: ({ color }) => (<CustomIonicons name='flask-outline' color={color} />) }} component={CalendarScreen} />
            <Tab.Screen name="Fila Virtual" options={{ title: 'Medicamentos', tabBarIcon: ({ color }) => (<CustomIonicons name='medkit-outline' color={color} />) }} component={VirtualScreen} />
            <Tab.Screen name="Mapa" options={{ title: 'Mapa', tabBarIcon: ({ color }) => (<CustomIonicons name='map-outline' color={color} />) }} component={MapaScreen} />
        </Tab.Navigator>
    );
} 


//estilo de buttonTab

const styles = StyleSheet.create({
    tabBar : {
        borderRadius:25,
        height:70,
        marginHorizontal:20,
        marginBottom:50,
        elevation:8,
        backgroundColor: globalColors.light
    }
})