import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import Home from '../Screens/Home/Home';

const Tab = createBottomTabNavigator();

class TabNav extends Component {
    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    options={{ headerShown: false, tabBarIcon: () => <FontAwesome name="newspaper-o" size={24} color="black" /> }}
                    name='Home' component={Home} />
            </Tab.Navigator>
        );
    }
}

export default TabNav;