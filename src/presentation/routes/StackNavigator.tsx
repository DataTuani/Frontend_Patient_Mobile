import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/Stacks/Login/LoginScreen";
import { RegisterScreen } from "../screens/Stacks/Register/RegisterScreen";
import { BottomTabNavigator } from "./ButtomTabsNavigator";
import { SettingScreen } from "../settings/SettingScreen";
import { InitialScreen } from "../screens/Stacks/Inicio/InitialScreen";

export type RootStackParams = {
    Home: undefined;
    // product: { id: number, name: string };
    Login: undefined;
    Register: undefined;
    Initial: undefined;
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerTitle: '',
                headerStyle: {
                    elevation: 0
                }
            }}
        >
            <Stack.Screen
                options={{
                    title: 'Initial',
                    headerTitleAlign: 'center'
                }}
                name="Initial" component={InitialScreen} />
            <Stack.Screen
                options={{
                    headerShown:false,
                    title: 'Login',
                    headerTitleAlign: 'center'
                }}
                name="Login" component={LoginScreen} />
            <Stack.Screen options={{
                headerShown: false
            }} name="Home" component={BottomTabNavigator} />

            <Stack.Screen
                options={{
                    title: 'Register',
                    headerTitleAlign: 'center'
                }}
                name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
}