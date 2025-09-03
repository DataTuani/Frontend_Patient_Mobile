import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/home/HomeScreen';
import { CalendarScreen } from '../screens/Tabs/calendar/CalendarScreen';
import { VirtualScreen } from '../screens/Tabs/virtualLine/VirtualScreen';
import { Text } from 'react-native';
import { CustomIonicons } from '../components/shared/Custom_Ionicons';
import { globalColors } from '../theme/theme';
import { MapsScreen } from '../screens/Tabs/maps/MapsView';


const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                // headerShown: false
                tabBarLabelStyle: {
                    marginBottom: 5
                },
                headerStyle: {
                    elevation: 0
                },
                tabBarActiveTintColor: globalColors.primary
            }}
        >
            <Tab.Screen
                name="home" options={{ title: 'Inicio', tabBarIcon: ({ color }) => (<CustomIonicons name="home-outline" color={color} />) }} component={HomeScreen} />
            <Tab.Screen name="Calendario" options={{ title: 'Agendar cita', tabBarIcon: ({ color }) => (<CustomIonicons name='calendar-outline' color={color} />) }} component={CalendarScreen} />
            <Tab.Screen name="Fila Virtual" options={{ title: 'Fila virtual', tabBarIcon: ({ color }) => (<CustomIonicons name='time-outline' color={color} />) }} component={VirtualScreen} />
            <Tab.Screen name="Mapa" options={{ title: 'Mapa', tabBarIcon: ({ color }) => (<CustomIonicons name='map' color={color} />) }} component={MapsScreen} />
        </Tab.Navigator>
    );
}