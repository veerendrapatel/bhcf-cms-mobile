
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import { View, Text, ScrollView, Image, ActivityIndicator,StyleSheet, Alert } from 'react-native';
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
                          headerIconSize={26}
                          headerIconColor={colors.grey}
                          headerTextStyle={styles.headerTextStyle}
                      >
                          <View style={styles.collapsViewStyle}>
                            <View  style={styles.navItem}>
                              <Icon                                   
                                iconStyle={styles.iconStyle} 
                                name='users'
                                type='font-awesome'  
                              />
                              <Text style={styles.navItemText} onPress={this.navigateToScreen('Person', { person: user.member })}>Profile</Text>
                            </View>
                            <View  style={styles.navItem}>
                              <Icon                                   
                                iconStyle={styles.iconStyle} 
                                name='users'
                                type='font-awesome'  
                              />
                              <Text style={styles.navItemText} onPress={this.navigateToScreen('Person', { person: user.member })}>Account Information</Text>
                            </View>
                            <View  style={styles.navItem}>
                              <Icon                                   
                                iconStyle={styles.iconStyle} 
                                name='users'
                                type='font-awesome'  
                              />
                              <Text style={styles.navItemText} onPress={this.navigateToScreen('Person', { person: user.member })}>Settings</Text>
                            </View>
                              
                          </View>
                      </CollapsibleView>
                    </View>
                    
                  </View>
                  
                    <View style={styles.navSection}>
                        <View style={styles.navItem}>
                          <Icon                                   
                            iconStyle={styles.iconStyle} 
                            name='home'
                            type='font-awesome'  
                          />
                          <Text style={styles.navItemText} onPress={this.navigateToScreen('Home')}>Dashboard</Text>
                        </View>
                        <View  style={styles.navItem}>
                          <Icon                                   
                            iconStyle={styles.iconStyle} 
                            name='users'
                            type='font-awesome'  
                          />
                          <Text style={styles.navItemText} onPress={this.navigateToScreen('People')}>People</Text>
                        </View>
                        <View  style={styles.navItem}>
                          <Icon                                   
                            iconStyle={styles.iconStyle} 
                            name='calendar'
                            type='font-awesome'  
                          />
                          <Text style={styles.navItemText} onPress={this.navigateToScreen('People')}>Registrations</Text>
                        </View>
                        <View  style={styles.navItem}>
                          <Icon                                   
                            iconStyle={styles.iconStyle} 
                            name='calendar'
                            type='font-awesome'  
                          />
                          <Text style={styles.navItemText} onPress={this.navigateToScreen('People')}>Events</Text>
                        </View>
                        <View  style={styles.navItem}>
                          <Icon 
                            iconStyle={styles.iconStyle} 
                            name='calendar'
                            type='font-awesome'  
                          />
                          <Text style={styles.navItemText} onPress={this.navigateToScreen('People')}>Services</Text>
                        </View>
                        
                        <View  style={styles.navItem}>
                          <Icon                                   
                            iconStyle={styles.iconStyle} 
                            name='calendar'
                            type='font-awesome'
                            
                          />
                          <Text style={styles.navItemText} onPress={this.navigateToScreen('People')}>Booking</Text>
                        </View>
                    </View>
                    <View style={styles.navSection}>
                      <View style={styles.collapseableContainer}>
                        <CollapsibleView
                            title='Reports'
                            collapsed={false}
                            headerStyle={styles.headerStyle}
                            headerIconSize={26}
                            headerIconColor={colors.grey}
                            headerTextStyle={styles.headerTextStyle}
                        >
                            <View style={styles.collapsViewStyle}>
                                <View  style={styles.navItem}>
                                  <Icon                                   
                                    iconStyle={styles.iconStyle} 
                                    name='users'
                                    type='font-awesome'  
                                  />
                                  <Text style={styles.navItemText} onPress={this.navigateToScreen('CellReports')}>Cell Group</Text>
                                </View>
                                <View  style={styles.navItem}>
                                  <Icon                                   
                                    iconStyle={styles.iconStyle} 
                                    name='users'
                                    type='font-awesome'  
                                  />
                                  <Text style={styles.navItemText} onPress={this.navigateToScreen('LifeClass')}>Life Class</Text>
                                </View>
                                <View style={styles.navItem}>
                                  <Icon                                   
                                    iconStyle={styles.iconStyle} 
                                    name='user'
                                    type='font-awesome'  
                                  />
                                  <Text style={styles.navItemText} onPress={this.navigateToScreen('People')}>SUYNL</Text>
                                </View>
                                <View  style={styles.navItem}>
                                  <Icon                                   
                                    iconStyle={styles.iconStyle} 
                                    name='calendar'
                                    type='font-awesome'  
                                  />
                                  <Text style={styles.navItemText} onPress={this.navigateToScreen('People')}>SOL</Text>
                                </View>
                                <View  style={styles.navItem}>
                                  <Icon                                   
                                    iconStyle={styles.iconStyle} 
                                    name='calendar'
                                    type='font-awesome'  
                                  />
                                  <Text style={styles.navItemText} onPress={this.navigateToScreen('People')}>Finance</Text>
                                </View>
                            </View>
                        </CollapsibleView>
                      </View>
                    </View>
                    <View style={styles.navSection}>
                      <View  style={styles.navItem}>
                        <Icon 
                          iconStyle={styles.iconStyle}  
                          name='cogs' 
                          type='font-awesome'  
                        />
                        <Text style={styles.navItemText} onPress={this.navigateToScreen('People')}>Settings</Text>
                      </View>
                      <View  style={styles.navItem}>
                        <Icon                                   
                          iconStyle={styles.iconStyle}  
                          name='sign-out' 
                          type='font-awesome'
                        />
                          <Text 
                            style={styles.navItemText}  
                            onPress={ () => 
                              {
                                const { signOut } = this.props;
                                // Works on both iOS and Android
                                Alert.alert(
                                  'Sign Out',
                                  'Your data have unsynced changes. If you sign out now, you`ll lose those changes',
                                  [
                                    {
                                      text: 'No',
                                      onPress: () => console.log('Cancel Pressed'),
                                      style: 'cancel',
                                    },
                                    {text: 'Yes', onPress: () => signOut()},
                                  ],
                                  {cancelable: false},
                                );
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
    iconStyle: {
      fontSize: 18,
      color:colors.grey
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
        marginLeft:padding.sm,
        padding: 5,
        fontSize: 16,
        fontWeight: "500"
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
        fontWeight: "500"
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

const mapPropsToDispatch = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
    }
}


export default connect(mapStateToProps, mapPropsToDispatch)(SideMenu);