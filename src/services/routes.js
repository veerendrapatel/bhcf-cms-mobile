import { 
    createStackNavigator, 
    createDrawerNavigator,
    createSwitchNavigator,
    createAppContainer
} from 'react-navigation';
import { TouchableOpacity, Text, Dimensions, Button } from 'react-native';
import  Login  from '../screens/Login';
import  Dashboard from '../screens/Dashboard';
import  People  from '../screens/people/People';
import PeopleCreateEdit from '../screens/people/PeopleCreateEdit';
import SideMenu from '../components/SideMenu';

const DrawerNavigator = createDrawerNavigator(
    {
        Home: { 
            screen: Dashboard,
            navigationOptions: ({navigation}) => ({
                title: "Dashboard"
            })
        },
        People: { 
            screen: People,
            navigationOptions: ({navigation}) => ({
                title: "People"
            })
        },
        PeopleCreateEdit: { 
            screen: PeopleCreateEdit,
            navigationOptions: ({navigation}) => ({
                title: "Create People"
            })
        }
    },
    {
        initialRouteName: 'Home',
        contentComponent: SideMenu,
        drawerWidth: Dimensions.get('window').width - 120,  
    }
);


export const SignedOut = createStackNavigator({
    Login: { screen: Login }
});





export const SignedIn = createStackNavigator(
    {
        DrawerNavigator: {
            screen: DrawerNavigator,
            navigationOptions: ({ navigation }) => ({
                title: 'Welcome',  // Title to appear in status bar
            })
        }
        
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