import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { ControlParentalNavigator, RootStackParams, StackNavigator } from './StackNavigator';
import { globalColors } from '../theme/theme';
import { CustomFontIcon, CustomIonicons } from '../components/shared/Custom_Ionicons';
import { View, Text, Image } from 'react-native';
import { ExpedienteScreen } from '../screens/Drawers/Expedientes/ExpedienteScreen';
import { HistorialScreen } from '../screens/Drawers/Historial/HistorialScreen';
import { DrawerActions, NavigationProp, useNavigation } from '@react-navigation/native';


export type DrawerParamList = {
    inicio: undefined;
    InicioControlParental: undefined;
    Expediente: undefined;
    Ajuste: undefined;
    Profile: undefined;
    Historial: undefined;
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
                    width: 270 
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

            }} name='inicio' component={StackNavigator} />
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
                    drawerIcon: ({ color }) => (<CustomFontIcon
                        name='file-table-box-multiple-outline' color={color} size={25}
                    />),
                    title: 'Ver expediente medico'
                }}

                name="Expediente" component={ExpedienteScreen} />

            <Drawer.Screen
                options={{
                    drawerIcon: ({ color }) => (<CustomFontIcon
                        name='rotate-right' color={color} size={25}
                    />),
                    title: 'Historial'
                }}
                name="Historial" component={HistorialScreen} />


        </Drawer.Navigator>
    );
}

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    return (
        <DrawerContentScrollView
            {...props}

        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    padding: 20,
                    gap: 21
                }}
            >
                <CustomIonicons 
                name='arrow-back-outline'
                onPress={() => navigation.dispatch(DrawerActions.closeDrawer)}
                
                />

                {/* Nombre y link */}
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Melanie Arias</Text>
                    <Text style={{ fontWeight: '400', textDecorationLine: 'underline' }}
                        onPress={() => navigation.navigate("Profile")}
                    >
                        Ver Perfil
                    </Text>
                </View>

                {/* Imagen de perfil */}
                <Image
                    source={require('../assets/profile.png')}
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        marginRight: 15
                    }}
                />


            </View>

            {/* Items del Drawer */}
            <View style={{ gap: 12 }}>
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
    )
}