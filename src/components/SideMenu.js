
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import { View, Text, ScrollView, Image, ActivityIndicator,StyleSheet } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { signOut } from '../store/actions/auth.actions';
import CollapsibleView from './CollapseableView';
import { dimensions, colors, padding, fonts } from '../styles/base';

class SideMenu extends Component {

    navigateToScreen = (route, params) => () => {
        const navigateAction = NavigationActions.navigate({
          routeName: route,
          params: params
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
                    <View style={styles.collapseableContainer}>
                      <CollapsibleView
                          title={user.member ? user.member.first_name : user.username}
                          collapsed={false}
                          headerStyle={styles.headerStyle}
                          headerIconSize={30}
                          headerIconColor="black"
                          headerTextStyle={styles.headerTextStyle}
                      >
                          <View style={styles.collapsViewStyle}>
                              <Text 
                                style={styles.collapsTextStyle}
                                onPress={this.navigateToScreen('Person', { person: user.member })}
                              >Profile</Text>
                              <Text style={styles.collapsTextStyle}>Account Information</Text>
                              <Text style={styles.collapsTextStyle}>Settings</Text>
                          </View>
                      </CollapsibleView>
                    </View>
                    
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
                          <Text style={styles.navItemText} onPress={this.navigateToScreen('People')}>Booking</Text>
                        </View>
                    </View>
                    <View style={styles.navSection}>
                      <View style={styles.collapseableContainer}>
                        <CollapsibleView
                            title='Reports'
                            collapsed={false}
                            headerStyle={styles.headerStyle}
                            headerIconSize={30}
                            headerIconColor="black"
                            headerTextStyle={styles.headerTextStyle}
                        >
                            <View style={styles.collapsViewStyle}>
                                <View  style={styles.navItem}>
                                  <Icon
                                  name='users'
                                  type='font-awesome'/>
                                  <Text style={styles.navItemText} onPress={this.navigateToScreen('CellGroupAttendances')}>Cell Group</Text>
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
                                <View  style={styles.navItem}>
                                  <Icon
                                  name='calendar'
                                  type='font-awesome'/>
                                  <Text style={styles.navItemText} onPress={this.navigateToScreen('People')}>Finance</Text>
                                </View>
                            </View>
                        </CollapsibleView>
                      </View>
                    </View>
                    <View style={styles.navSection}>
                      <View  style={styles.navItem}>
                        <Icon name='cogs' type='font-awesome'/>
                        <Text style={styles.navItemText} onPress={this.navigateToScreen('People')}>Settings</Text>
                      </View>
                      <View  style={styles.navItem}>
                        <Icon name='sign-out' type='font-awesome'/>
                          <Text 
                            style={styles.navItemText}  
                            onPress={ () => 
                              {
                                const { navigate } = this.props.navigation;
                                this.props.dispatch(signOut());
                              } 
                            }
                          >Signout</Text>
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


const styles = StyleSheet.create({
    container: {
        padding: padding.sm,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fcfcfa'
    },
    sideMenuContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fcfcfa'
    },
    navSection: {
        width: '100%',
        paddingTop: 10,
        backgroundColor: colors.tertiary
    },
    navItem: {
        width:'100%',
        padding:10,
        fontSize: 16,
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center',
        borderBottomColor: '#f1f1f1',
        borderBottomWidth: 1
    },

    navItemText: {
        width:'100%',
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center',
        marginLeft:5
    },
    txtInputWrapper: {
        borderWidth: 0.5,
        borderColor: '#c3c3c3',
        marginTop: 5,
        borderColor: '#f9f9f9'
        
    },
    inputContainer: { 
        borderBottomColor: '#c1c1c1', 
        borderBottomWidth: 0.5 
    },
    txtInput: {
        paddingLeft: 0,
        margin: 3,
        borderColor: '#f9f9f9'
    },
    checkboxWrapper: { 
        padding: padding.sm,
        display: 'flex',
    },
    checkboxContainer: { 
        padding:3,
        paddingLeft: 0,
        marginLeft: 0,
        borderWidth:0,
        backgroundColor: colors.tertiary
        
    },
    inputLabel: {
        fontWeight: 'bold',
        paddingBottom: 10
    },
    headerStyle: {
        padding: padding.sm,
        paddingLeft: 0,
        paddingRight: 0,
        borderBottomWidth: 1,
        borderColor: '#c3c3c3',
        backgroundColor: colors.tertiary
    },
    headerTextStyle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    collapsViewStyle: {
      padding: padding.sm,
      backgroundColor: colors.tertiary,
      zIndex: 0
    },
    collapseableContainer: { 
      width: '100%',
    },
    collapsTextStyle: {
      paddingBottom: padding.sm
    }
});




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