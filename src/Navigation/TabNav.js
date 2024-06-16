import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import Home from '../Screens/Home/Home';
import Perfil from '../Screens/Perfil/Perfil';


const Tab = createBottomTabNavigator();

class TabNav extends Component {
    render() {
        return (
            <Tab.Navigator>
                <Stack.Screen
                    options={{ headerShown: false, tabBarIcon: () => <FontAwesome name="newspaper-o" size={24} color="black" /> }}
                    name='Home' component={Home} />

            <Stack.Screen
                name="Mi perfil"component ={Perfil}
                options = {{headerShown:true}}/> 
            </Tab.Navigator>

        );
    }
}

export default TabNav;
