import { 
    createStackNavigator, 
    createDrawerNavigator,
    createSwitchNavigator,
    createAppContainer
} from 'react-navigation';
import { Button, Icon } from 'react-native-elements';
import  Login  from '../screens/Login';
import  Dashboard from '../screens/Dashboard';
import  People  from '../screens/people/People';
import PeopleCreateEdit from '../screens/people/PeopleCreateEdit';
import SideMenu from '../components/SideMenu';
import React, {Component} from 'react';


const drawerButton = navigation => (
    <Button title="Menu" clear icon={<Icon name="menu" type="ios-menu" />}  onPress={() => navigation.navigate('DrawerToggle')} />
)


const DashboardStack = createStackNavigator({
        Home: Dashboard,
        People: People,
        PeopleCreateEdit: PeopleCreateEdit
    }, {
    initialRouteName: 'Home',
});


export const SignedOut = createStackNavigator({ SignedIn: Login});


const SignedIn = createDrawerNavigator({
  Dashboard: DashboardStack
}, {
  contentComponent: SideMenu
})




export const createRootNavigator = (signedIn = false) => {
    return createAppContainer(createSwitchNavigator(
        {
            SignedIn: {
                screen: SignedIn
            },
            SignedOut: {
                screen: SignedOut
            }
        }, 
        {
            initialRouteName: signedIn ? "SignedIn" : "SignedOut"
        }
    ))
}