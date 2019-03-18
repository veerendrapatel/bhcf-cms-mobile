
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import { styles } from '../styles/styles';
import { Icon, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { signOut } from '../store/actions/auth.actions';


class SideMenu extends Component {

    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
          routeName: route
        });
        
        this.props.navigation.dispatch(navigateAction);
    }

    componentDidUpdate() {  
        if(this.props.user === null) {
            this.props.navigation.navigate('Login');
        }
    };

    render() {
      
      const { user } = this.props;
      if (!user) {
        return <Text>Loading...</Text>;
      }
      return (
          <View style={styles.sideMenuContainer}>
              <ScrollView>
              { user ?
              (
                <View>
                
                  <View  style={
                    { 
                      display: 'flex', 
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center', 
                      width: '100%',
                      paddingTop: 100
                    }
                  }>
                        { user.member && user.member.avatar ?
                        (
                          <Avatar
                            rounded
                            source={{ uri: user.member.avatar.thumbnail }}
                            size="xlarge"
                          />
                        ) : 
                        (
                          <Avatar size="xlarge" rounded title={ user.member ? user.member.first_name.charAt(0).toUpperCase() : user.username.charAt(0).toUpperCase() } />
                        )
                        }
                    <Text>{ user.member ? user.member.first_name : user.username }</Text>
                    
                  </View>
                  
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
                          <Text style={styles.navItemText} onPress={this.navigateToScreen('CellGroup')}>Cell Group</Text>
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
                          <Text style={styles.navItemText}  onPress={ () => {
                              const { navigate } = this.props.navigation;
                              this.props.dispatch(signOut());
                          } }>Signout</Text>
                      </View>
                    </View>
                </View>
              ) : (
                <View style={styles.container}>
                    <ActivityIndicator size="large" />
                </View>
              )
            }
              
          </ScrollView>
        </View>
      )
    }
}


SideMenu.propTypes = {
  navigation: PropTypes.object
};

const mapStateToProps = (state) => {
  const { user } = state.auth;
  

  return {
    user
  }
}

export default connect(mapStateToProps)(SideMenu);