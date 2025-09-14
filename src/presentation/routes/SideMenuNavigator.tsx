import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { StackNavigator } from './StackNavigator';
import { SettingScreen } from '../settings/SettingScreen';
import { globalColors } from '../theme/theme';
import { CustomIonicons } from '../components/shared/Custom_Ionicons';
import { Text, View } from 'react-native';
import { ExpedienteScreen } from '../screens/Drawers/Expedientes/ExpedienteScreen';
import { ProfileScreen } from '../screens/Drawers/Profile/ProfileScreen';

const Drawer = createDrawerNavigator();

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
                drawerIcon: ({ color }) => (<CustomIonicons
                    name='man-outline' color={color} size={25}
                />),
                title: 'Control Parental'

            }} name="ControlParental" component={StackNavigator} />
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