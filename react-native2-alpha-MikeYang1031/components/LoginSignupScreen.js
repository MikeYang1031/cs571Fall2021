import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './LoginScreen'

const TabNavigation = createBottomTabNavigator();

export default class LoginSignupTab extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }
    login(username, token) {
        this.props.login(username, token);
    }
    render() {
        return (
            <TabNavigation.Navigator tabBarOptions={{
                style: { height: 0 }
            }}>
                <TabNavigation.Screen name="Login" component={LoginScreen} initialParams={{ login: this.login }} />
            </TabNavigation.Navigator>
        );
    }
}