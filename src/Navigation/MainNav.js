import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../Screens/Register/Register";
import TabNav from "./TabNav";
import Login from "../Screens/Login/Login";


const Stack = createNativeStackNavigator();


class MainNav extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>

                    <Stack.Screen
                        name="Register" component={Register}
                        options={{ headerShown: false }}
                    />

                    <Stack.Screen
                        name="Login" component={Login}
                        options={{ headerShown: false }}
                    />

                    <Stack.Screen
                        name="tabnav" component={TabNav}
                        options={{ headerShown: false }}
                    />

                </Stack.Navigator>
            </NavigationContainer>
        )
    }

}

export default MainNav;