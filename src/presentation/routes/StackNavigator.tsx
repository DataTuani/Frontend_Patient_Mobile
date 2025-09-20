import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/Stacks/Login/LoginScreen";
import { RegisterScreen } from "../screens/Stacks/Register/RegisterScreen";
import { BottomTabNavigator } from "./ButtomTabsNavigator";
import { RegisterScreen2 } from "../screens/Stacks/Register/RegisterScreen2";
import { RegisterScreen3 } from "../screens/Stacks/Register/RegisterScreen3";
import { ProfileScreen } from "../screens/Drawers/Profile/ProfileScreen";
import { WaitingRoomScreen } from "../screens/Stacks/TeleConsultas/WaitingRoomScreen";
import { ConnectingScreen } from "../screens/Stacks/TeleConsultas/ConnectingScreen";
import { TipoCitaScreen } from "../screens/Stacks/AgendarCitas/TipoCitaScreen";
import { HoraDiaScreen } from "../screens/Stacks/AgendarCitas/HoraDiaScreen";
import { ConfirmaScreen } from "../screens/Stacks/AgendarCitas/ConfirmaScreen";
import { HospitalScreen } from "../screens/Stacks/AgendarCitas/HospitalScreen";
import { MotivoScreen } from '../screens/Stacks/AgendarCitas/MotivoScreen';

export type RootStackParams = {

    Login: undefined;
    Register: undefined;
    Register2: undefined;
    Register3: undefined;

    Home: undefined;
    Profile: undefined;
    Waiting: undefined;
    Connecting: undefined;
    ConsultationScreen: undefined;
    TipoCita: undefined;
    SelectHospital: undefined;
    HoraDia: undefined;
    Confirma: undefined;
    Motivo: undefined;

    // product: { id: number, name: string };
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerTitle: '',
                headerStyle: {
                    elevation: 0,
                }
            }}
        >

            <Stack.Screen
                options={{
                    headerShown: false,
                    title: 'Login',
                    headerTitleAlign: 'center'
                }}
                name="Login" component={LoginScreen} />

            <Stack.Screen
                options={{
                    title: 'Register',
                    headerTitleAlign: 'center',

                }}
                name="Register" component={RegisterScreen} />
            <Stack.Screen
                options={{

                }}
                name="Register2"
                component={RegisterScreen2}
            />
            <Stack.Screen
                options={{

                }}
                name='Register3'
                component={RegisterScreen3}
            />

            <Stack.Screen options={{
                headerShown: false
            }} name="Home" component={BottomTabNavigator} />
            <Stack.Screen
                options={{
                    headerShown: false
                }}
                name="Profile" component={ProfileScreen}
            />
            <Stack.Screen
                options={{
                    headerTitle: 'TeleConsulta',
                    headerTitleStyle: {
                        color: '#003E6D',
                        fontSize: 25,
                        fontWeight: 'bold'
                    },
                    headerStyle: {
                        elevation: 0
                    }

                }}
                name="Waiting" component={WaitingRoomScreen}
            />
            <Stack.Screen
                options={{
                    headerTitle: 'TeleConsulta',
                    headerTitleStyle: {
                        color: '#003E6D',
                        fontSize: 25,
                        fontWeight: 'bold'
                    },
                    headerStyle: {
                        elevation: 0
                    }

                }}
                name="Connecting" component={ConnectingScreen}
            />
            <Stack.Screen
                options={{
                    headerTitle: 'Agendar Cita',
                    headerTitleStyle: {
                        color: '#003E6D',
                        fontSize: 25,
                        fontWeight: 'bold'
                    },
                    headerStyle: {
                        elevation: 0
                    }

                }}
                name="TipoCita" component={TipoCitaScreen}
            />
            <Stack.Screen
                options={{
                    headerTitle: 'Agendar Cita',
                    headerTitleStyle: {
                        color: '#003E6D',
                        fontSize: 25,
                        fontWeight: 'bold'
                    },
                    headerStyle: {
                        elevation: 0
                    }
                }}
                name="SelectHospital" component={HospitalScreen}
            />
            <Stack.Screen
                options={{
                    headerTitle: 'Agendar Cita',
                    headerTitleStyle: {
                        color: '#003E6D',
                        fontSize: 25,
                        fontWeight: 'bold'
                    },
                    headerStyle: {
                        elevation: 0
                    }
                }}
                name="HoraDia" component={HoraDiaScreen}
            />
            <Stack.Screen
                options={{
                    headerTitle: 'Agendar Cita',
                    headerTitleStyle: {
                        color: '#003E6D',
                        fontSize: 25,
                        fontWeight: 'bold'
                    },
                    headerStyle: {
                        elevation: 0
                    }
                }}
                name="Confirma" component={ConfirmaScreen}
            />
            <Stack.Screen
                options={{
                    headerTitle: 'Agendar Cita',
                    headerTitleStyle: {
                        color: '#003E6D',
                        fontSize: 25,
                        fontWeight: 'bold'
                    },
                    headerStyle: {
                        elevation: 0
                    }
                }}
                name="Motivo" component={MotivoScreen}
            />
        </Stack.Navigator>
    );
}