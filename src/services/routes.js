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
import PeopleDetails from '../screens/people/PeopleDetails';
import PeopleCreateEdit from '../screens/people/PeopleCreateEdit';
import CellGroup from '../screens/CellGroup';
import SideMenu from '../components/SideMenu';
import React, {Component} from 'react';



const DashboardStack = createStackNavigator({
        Home: Dashboard,
        People: People,
        PeopleDetails: PeopleDetails,
        PeopleCreateEdit: PeopleCreateEdit,
        CellGroup: CellGroup,
    }, {
    initialRouteName: 'Home',
});


export const SignedOut = createStackNavigator({ Login: Login});
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