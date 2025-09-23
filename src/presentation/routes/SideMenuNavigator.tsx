import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { ControlParentalNavigator, StackNavigator } from './StackNavigator';
import { SettingScreen } from '../settings/SettingScreen';
import { globalColors } from '../theme/theme';
import { CustomFontIcon, CustomIonicons } from '../components/shared/Custom_Ionicons';
import { View } from 'react-native';
import { ExpedienteScreen } from '../screens/Drawers/Expedientes/ExpedienteScreen';
import { ProfileScreen } from '../screens/Drawers/Profile/ProfileScreen';
import { IniciarControlParentalScreen } from '../screens/Drawers/ControlParental/IniciarControlParentalScreen';

export type DrawerParamList = {
    Home: undefined;
    InicioControlParental: undefined;
    Expediente: undefined;
    Ajuste: undefined;
    Profile: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export const SideMenu = () => {
    return (
        <Drawer.Navigator

            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerPosition: 'right',
                drawerStyle: {
                    width: 280
                },
                drawerType: 'front',
                drawerActiveBackgroundColor: globalColors.light,
                drawerActiveTintColor: globalColors.dark,
            }}
        >

            <Drawer.Screen options={{

                drawerItemStyle: {
                    display: 'none'
                }

            }} name="Home" component={StackNavigator} />
            <Drawer.Screen
                options={{
                    drawerIcon: ({ color }) => (<CustomFontIcon
                        name='human-male-female-child' color={color} size={25}
                    />),
                    title: 'Control Parental'
                }}
                name="InicioControlParental" component={ControlParentalNavigator} />
            <Drawer.Screen
                options={{
                    drawerIcon: ({ color }) => (<CustomIonicons
                        name='reader-outline' color={color} size={25}
                    />),
                    title: 'Ver expediente medico'
                }}

                name="Expediente" component={ExpedienteScreen} />

            <Drawer.Screen
                options={{
                    drawerIcon: ({ color }) => (<CustomIonicons
                        name='settings-outline' color={color} size={25}
                    />),
                    title: 'Configuraciones'
                }}
                name="Ajuste" component={SettingScreen} />

            <Drawer.Screen
                options={{
                    drawerIcon: ({ color }) => (<CustomIonicons
                        name='person-circle-outline' color={color} size={25}
                    />),
                    title: 'Ver Perfil'
                }}
                name="Profile" component={ProfileScreen} />


        </Drawer.Navigator>
    );
}

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    return (
        <DrawerContentScrollView
            {...props}

        >
            <View
                style={{
                    height: 50,
                    width: 50,
                    backgroundColor: globalColors.gray,
                    margin: 20,
                    borderRadius: 50
                }}
            />
            <View style={{ gap: 12 }}>
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
    )
}