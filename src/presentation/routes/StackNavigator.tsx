import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/Stacks/Login/LoginScreen";
import { RegisterScreen } from "../screens/Stacks/Register/RegisterScreen";
import { BottomTabNavigator } from "./ButtomTabsNavigator";
import { InitialScreen } from "../screens/Stacks/Inicio/InitialScreen";
import { RegisterScreen2 } from "../screens/Stacks/Register/RegisterScreen2";
import { RegisterScreen4 } from "../screens/Stacks/Register/RegisterScreen4";
import { RegisterScreen3 } from "../screens/Stacks/Register/RegisterScreen3";

export type RootStackParams = {
    Initial: undefined;
    Login: undefined;
    Register: undefined;
    Register2: undefined;
    Register3: undefined;
    Register4: undefined;
    Home: undefined;
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
                    headerShown: false,
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
                    headerTitleAlign: 'center',
                    headerShown: false
                }}
                name="Register" component={RegisterScreen} />
            <Stack.Screen
                options={{
                    headerShown: false
                }}
                name="Register2"
                component={RegisterScreen2}
            />
            <Stack.Screen
                options={{
                    headerShown: false
                }}
                name='Register3'
                component={RegisterScreen3}
            />
            <Stack.Screen
                options={{
                    headerShown: false 
                }}
                name="Register4"
                component={RegisterScreen4}
            />
        </Stack.Navigator>
    );
}