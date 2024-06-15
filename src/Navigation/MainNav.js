import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../Screens/Register/Register";
import Home from "./src/Screens/Home/Home";
import TabNav from "./TabNav";


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
                        name="tabnav" component={TabNav}
                        options={{ headerShown: false }}
                    />

                </Stack.Navigator>
            </NavigationContainer>
        )
    }

}

export default MainNav;