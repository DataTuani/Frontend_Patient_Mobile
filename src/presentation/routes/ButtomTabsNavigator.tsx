import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/home/HomeScreen';
import { CalendarScreen } from '../screens/Tabs/calendar/CalendarScreen';
import { VirtualScreen } from '../screens/Tabs/virtualLine/VirtualScreen';
import { CustomIonicons } from '../components/shared/Custom_Ionicons';
import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import { Dimensions } from 'react-native';


const Tab = createBottomTabNavigator();
const { height } = Dimensions.get('window');
const bottomOffset = height < 700 ? 10 : 20;

export const BottomTabNavigator = () => {

    const { colors } = useContext(ThemeContext);

    return (
        <Tab.Navigator
            screenOptions={{
                // headerShown: false
                tabBarLabelStyle: {
                    marginBottom: 0
                },
                headerTitle: '',
                headerStyle: {
                    elevation: 0
                },
                tabBarActiveTintColor: colors.primary,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: bottomOffset,
                    left: 20,
                    borderRadius: 25,
                    height: 70,
                    elevation: 5
                }
            }}
        >
            <Tab.Screen
                name="home" options={{ title: 'Inicio', tabBarIcon: ({ color }) => (<CustomIonicons name="home-outline" color={color} />) }} component={HomeScreen} />
            <Tab.Screen name="Calendario" options={{ title: 'Agendar cita', tabBarIcon: ({ color }) => (<CustomIonicons name='calendar-outline' color={color} />) }} component={CalendarScreen} />
            <Tab.Screen name="Fila Virtual" options={{ title: 'Fila virtual', tabBarIcon: ({ color }) => (<CustomIonicons name='time-outline' color={color} />) }} component={VirtualScreen} />
        </Tab.Navigator>
    );
}