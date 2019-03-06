
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import { View, Text, ScrollView, Image } from 'react-native';
import { onSignOut } from '../services/auth';
import { styles } from '../services/styles';
import { Icon, Avatar } from 'react-native-elements';
import { getCurrentUser } from '../services/auth';

class SideMenu extends Component {
    constructor(props) {
      super(props);
      this.state = {
          currentUser: {},
          userLoaded: false,
        }

    }
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
          routeName: route
        });
        
        this.props.navigation.dispatch(navigateAction);
    }

    componentDidMount() {
      getCurrentUser().then(res => {
            this.setState({
              currentUser: JSON.parse(res),
              userLoaded: true,
            });
      });
    }
    


    render() {
        return (
            <View style={styles.sideMenuContainer}>
                <ScrollView>
                <View>
                  {this.state.userLoaded &&
                  <View  style={{ 
                      display: 'flex', 
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center', width: '100%' }}>
                    <Avatar
                      rounded
                      source={{
                        uri:
                          'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                      }}
                      size="large"
                    />
                    <Text>{ this.state.currentUser.full_name }</Text>
                  </View>
                  }
                    <View style={styles.navSection}>
                        <View style={styles.navItem}>
                          <Icon
                          name='home'
                          type='font-awesome'/>
                          <Text style={styles.navItemText} onPress={this.navigateToScreen('Home')}>Dashboard</Text>
                        </View>
                        <View  style={styles.navItem}>
                          <Icon
                          name='users'
                          type='font-awesome'/>
                          <Text style={styles.navItemText} onPress={this.navigateToScreen('People')}>People</Text>
                        </View>
                        <View  style={styles.navItem}>
                          <Icon
                          name='calendar'
                          type='font-awesome'/>
                          <Text style={styles.navItemText} onPress={this.navigateToScreen('People')}>Registrations</Text>
                        </View>
                        <View  style={styles.navItem}>
                          <Icon
                          name='calendar'
                          type='font-awesome'/>
                          <Text style={styles.navItemText} onPress={this.navigateToScreen('People')}>Ministries</Text>
                        </View>
                        <View  style={styles.navItem}>
                          <Icon
                          name='calendar'
                          type='font-awesome'/>
                          <Text style={styles.navItemText} onPress={this.navigateToScreen('People')}>Events</Text>
                        </View>
                        <View  style={styles.navItem}>
                          <Icon
                          name='calendar'
                          type='font-awesome'/>
                          <Text style={styles.navItemText} onPress={this.navigateToScreen('People')}>Services</Text>
                        </View>
                        <View  style={styles.navItem}>
                          <Icon
                          name='calendar'
                          type='font-awesome'/>
                          <Text style={styles.navItemText} onPress={this.navigateToScreen('People')}>Finance</Text>
                        </View>
                        <View  style={styles.navItem}>
                          <Icon
                          name='calendar'
                          type='font-awesome'/>
                          <Text style={styles.navItemText} onPress={this.navigateToScreen('People')}>Booking</Text>
                        </View>
                    </View>
                    <View style={styles.navSection}>
                      <Text style={styles.navItem} onPress={this.navigateToScreen('Home')}>Reports</Text>
                        <View  style={styles.navItem}>
                          <Icon
                          name='users'
                          type='font-awesome'/>
                          <Text style={styles.navItemText} onPress={this.navigateToScreen('Home')}>Cell Group</Text>
                        </View>
                        <View style={styles.navItem}>
                          <Icon
                          name='user'
                          type='font-awesome'/>
                          <Text style={styles.navItemText} onPress={this.navigateToScreen('People')}>SUYNL</Text>
                        </View>
                        <View  style={styles.navItem}>
                          <Icon
                          name='calendar'
                          type='font-awesome'/>
                          <Text style={styles.navItemText} onPress={this.navigateToScreen('People')}>SOL</Text>
                        </View>
                    </View>
                    <View style={styles.navSection}>
                      <View  style={styles.navItem}>
                        <Icon name='cogs' type='font-awesome'/>
                        <Text style={styles.navItemText} onPress={this.navigateToScreen('People')}>Settings</Text>
                      </View>
                      <View  style={styles.navItem}>
                        <Icon name='sign-out' type='font-awesome'/>
                          <Text style={styles.navItemText} onPress={ () => {
                              const { navigate } = this.props.navigation;
                              onSignOut().then(() => navigate('Login'));
                          } }>Signout</Text>
                      </View>
                    </View>
                </View>
                
                </ScrollView>
            </View>
        )
    }
}


SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;