import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { StackNavigator } from './StackNavigator';
import { SettingScreen } from '../settings/SettingScreen';
import { globalColors } from '../theme/theme';
import { useWindowDimensions, View } from 'react-native';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { CustomIonicons } from '../components/shared/Custom_Ionicons';

const Drawer = createDrawerNavigator();

export const SideMenu = () => {


    return (
        <Drawer.Navigator

            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                // drawerType: (dimensions.width >= 758) ? 'permanent' : 'front',
                drawerType: 'front',
                drawerActiveBackgroundColor: globalColors.light,
                drawerActiveTintColor: globalColors.dark,
                // drawerInactiveBackgroundColor:globalColors.tertiary
                // drawerItemStyle:{
                //     borderRadius:100,
                //     paddingHorizontal:20
                // }
            }}
        >
            <Drawer.Screen options={{
                drawerIcon: ({ color }) => (<CustomIonicons
                    name='home-outline' color={color}
                />)
            }} name="Inicio" component={StackNavigator} />
            <Drawer.Screen
                options={{
                    drawerIcon: ({ color }) => (<CustomIonicons
                        name='person-outline' color={color}
                    />)
                }}
                name='Perfil' component={ProfileScreen} />
            <Drawer.Screen
                options={{
                    drawerIcon: ({ color }) => (<CustomIonicons
                        name='settings-outline' color={color}
                    />)
                }}
                name="Ajuste" component={SettingScreen} />
        </Drawer.Navigator>
    );
}

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    return (

        <DrawerContentScrollView>
            <View
                style={{
                    height: 50,
                    width: 50,
                    backgroundColor: globalColors.gray,
                    margin: 20,
                    borderRadius: 50
                }}
            />
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}