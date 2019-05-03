import React, {Component} from 'react';
import { View, ScrollView, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeProvider, Icon, Input, CheckBox, Avatar  } from 'react-native-elements';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { connect } from 'react-redux';
import { colors } from '../../styles/base';
import PersonalInformation from './details/PersonalInformation';
import Network from './details/Network';
import Reports from './details/Reports';
import AccountSettings from './details/AccountSettings';


const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let iconName = null;
    let iconType = 'ionicon';
    if (routeName === 'Information') {
        iconName = 'ios-contact';
    } else if(routeName === 'Network') {
        iconName = 'ios-git-network';
    } else if (routeName == 'Settings') {
        iconName = 'ios-finger-print';
    } else {
        iconName = 'ios-clipboard';
    }
    return <Icon name={iconName} type={iconType} size={25} color={tintColor}/>
}

export default createAppContainer(
    createBottomTabNavigator(
        {
            Information: { screen: PersonalInformation },
            Network: { screen: Network },
            Reports: { screen: Reports },
            Settings: { screen: AccountSettings }
        },
        {
            defaultNavigationOptions: ({ navigation }) => (
                {
                    tabBarIcon: ({ focused, tintColor }) => 
                    getTabBarIcon(navigation, focused, tintColor)
                }
            ),
            tabBarOptions: {
                activeTintColor: colors.primary,
                inactiveTintColor: colors.grey2,
            }
        }
    )
);