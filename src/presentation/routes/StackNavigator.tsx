import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/Stacks/Login/LoginScreen";
import { RegisterScreen } from "../screens/Stacks/Register/RegisterScreen";
import { BottomTabNavigator } from "./ButtomTabsNavigator";
import { SettingScreen } from "../settings/SettingScreen";

export type RootStackParams = {
    Home: undefined;
    // product: { id: number, name: string };
    Login: undefined;
    Register: undefined;
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    elevation: 0
                }
            }}
        >
            <Stack.Screen
                options={{
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