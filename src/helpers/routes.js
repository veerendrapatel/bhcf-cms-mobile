import React, {Component} from 'react';
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import  Login from '../screens/auth/Login';
import Dashboard from '../screens/dashboard/Dashboard';
import People from '../screens/people/People';
import Person from '../screens/people/Person';
import PersonForm from '../screens/people/Form';
import AttendanceForm from '../screens/cellgroup/AttendanceForm';
import CellReports from '../screens/cellgroup/CellReports';
import SideMenu from '../components/SideMenu';
import ClassForm from '../screens/reports/form/ClassForm';
import EnrollmentForm from '../screens/reports/form/EnrollmentForm';
import LifeClass from '../screens/reports/lifeclass/LifeClass';


const DashboardStack = createStackNavigator({
        Home: Dashboard,
        People: People,
        Person: Person,
        PersonForm: PersonForm,
        AttendanceForm: AttendanceForm,
        CellReports: CellReports,
        ClassForm,
        EnrollmentForm,
        LifeClass
    }, {
    initialRouteName: 'Home',
});


export const SignedOut = createStackNavigator({ Login: Login});
const SignedIn = createDrawerNavigator(
    {
        Dashboard: DashboardStack
    }, 
    {
        contentComponent: SideMenu
    }
);




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