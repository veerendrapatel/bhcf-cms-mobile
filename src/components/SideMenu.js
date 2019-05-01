
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import { View, Text, ScrollView, Image, ActivityIndicator,StyleSheet, Alert, TouchableHighlight } from 'react-native';
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
        return false;
      }

      const avatar = user.member.avatar ? JSON.parse(user.member.avatar) : null;
      
      return (
          <View style={styles.sideMenuContainer}>
              <ScrollView>
                <View>
                  <View  
                    style={{ 
                      ...styles.container,
                      padding:0,
                      paddingTop: 50,
                      backgroundColor: colors.primary}}>
                      { user.member && avatar ?
                        (
                          <Avatar
                            rounded
                            source={{ uri: avatar.thumbnail }}
                            size="xlarge"
                          />
                        ) : 
                        (
                          <Avatar 
                            size="xlarge" 
                            rounded 
                            title={user.member.first_name.charAt(0).toUpperCase()} />
                        )
                      }
                    <View 
                      style={{...styles.collapseableContainer, marginTop: padding.md, padding: 0}}>
                      <CollapsibleView
                          title={user.member ? `${user.member.first_name} ${ user.member.last_name }` : user.username}
                          collapsed={false}
                          headerStyle={styles.headerStyle}
                          headerIconSize={15}
                          headerIconColor={colors.grey2}
                          headerTextStyle={styles.headerTextStyle}
                      >
                          <View style={styles.collapsViewStyle}>
                            <TouchableHighlight underlayColor={colors.primary}   
                              onPress={this.navigateToScreen('Person', { person: user.member })}>
                              <View style={styles.navItem}>
                                <Icon                                   
                                  iconStyle={styles.iconStyle} 
                                  name='ios-contact'
                                  type='ionicon'  
                                />
                                <Text style={styles.navItemText}>Profile</Text>
                              </View>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor={colors.primary}  
                              onPress={this.navigateToScreen('Person', { person: user.member })}>
                              <View style={styles.navItem}>
                                <Icon                                   
                                  iconStyle={styles.iconStyle} 
                                  name='ios-options'
                                  type='ionicon'  
                                />
                                <Text style={styles.navItemText}>Account Information</Text>
                              </View>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor={colors.primary} 
                              onPress={this.navigateToScreen('People')}>
                              <View style={styles.navItem}>
                                <Icon 
                                  iconStyle={styles.iconStyle}  
                                  name='ios-cog' 
                                  type='ionicon'  
                                />
                                <Text style={styles.navItemText}>Settings</Text>
                              </View>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor={colors.primary} 
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
                            >
                              <View style={styles.navItem}>
                              <Icon                                   
                                iconStyle={styles.iconStyle}  
                                name='ios-power' 
                                type='ionicon'
                              />
                                <Text 
                                  style={styles.navItemText}>Signout</Text>
                              </View>
                            </TouchableHighlight>
                              
                          </View>
                      </CollapsibleView>
                    </View>
                    
                  </View>
                  
                  <View style={styles.navSection}>
                      <TouchableHighlight underlayColor={colors.primary} 
                        underlayColor={colors.primary}
                        onPress={this.navigateToScreen('Home')}>
                        <View style={styles.navItem}>
                          <Icon                                   
                            iconStyle={styles.iconStyle} 
                            name='ios-speedometer' 
                            type='ionicon'
                          />
                          <Text style={styles.navItemText}>Dashboard</Text>
                        </View>
                      </TouchableHighlight>
                      <TouchableHighlight underlayColor={colors.primary}
                        onPress={this.navigateToScreen('People')}>
                        <View style={styles.navItem}>
                          <Icon                                   
                            iconStyle={styles.iconStyle} 
                            name='ios-people' 
                            type='ionicon'
                          />
                          <Text style={styles.navItemText}>People</Text>
                        </View>
                      </TouchableHighlight>
                      <TouchableHighlight underlayColor={colors.primary}
                        onPress={this.navigateToScreen('People')}>
                        <View style={styles.navItem}>
                          <Icon                                   
                            iconStyle={styles.iconStyle} 
                            name='ios-list'
                            type='ionicon'  
                          />
                          <Text style={styles.navItemText}>Registrations</Text>
                        </View>
                      </TouchableHighlight>
                      <TouchableHighlight underlayColor={colors.primary} 
                        onPress={this.navigateToScreen('People')}>
                        <View style={styles.navItem}>
                          <Icon                                   
                            iconStyle={styles.iconStyle} 
                            name='ios-basketball'
                            type='ionicon' 
                          />
                          <Text style={styles.navItemText}>Events</Text>
                        </View>
                      </TouchableHighlight>
                      <TouchableHighlight underlayColor={colors.primary} 
                        onPress={this.navigateToScreen('People')}>
                        <View style={styles.navItem}>
                          <Icon 
                            iconStyle={styles.iconStyle} 
                            name='ios-paw'
                            type='ionicon'
                          />
                          <Text style={styles.navItemText}>Services</Text>
                        </View>
                      </TouchableHighlight>
                      
                      <TouchableHighlight underlayColor={colors.primary} 
                        onPress={this.navigateToScreen('People')}>
                        <View style={styles.navItem}>
                          <Icon                                   
                            iconStyle={styles.iconStyle} 
                            name='ios-cube'
                            type='ionicon'
                            
                          />
                          <Text style={styles.navItemText}>Booking</Text>
                        </View>
                      </TouchableHighlight>
                  </View>
                  <View style={styles.collapseableContainer}>
                    <CollapsibleView
                        title='Reports'
                        collapsed={false}
                        headerStyle={styles.headerStyle}
                        headerIconSize={15}
                        headerIconColor={colors.grey2}
                        headerTextStyle={styles.headerTextStyle}>
                        <View style={{...styles.collapsViewStyle}}>
                            <TouchableHighlight underlayColor={colors.primary} 
                              onPress={this.navigateToScreen('CellReports')}>
                              <View style={styles.navItem}>
                                <Icon                                   
                                  iconStyle={styles.iconStyle} 
                                  name='ios-git-network'
                                  type='ionicon'  
                                />
                                <Text 
                                  style={styles.navItemText}>Cell Group
                                </Text>
                              </View>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor={colors.primary} 
                              onPress={this.navigateToScreen('LifeClass')}>
                              <View style={styles.navItem}>
                                <Icon                                   
                                  iconStyle={styles.iconStyle} 
                                  name='ios-git-network'
                                  type='ionicon'  
                                />
                                <Text 
                                  style={styles.navItemText}>Life Class
                                </Text>
                              </View>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor={colors.primary} 
                              onPress={this.navigateToScreen('People')}>
                              <View style={styles.navItem}>
                                <Icon                                   
                                  iconStyle={styles.iconStyle} 
                                  name='ios-git-network'
                                  type='ionicon'  
                                />
                                <Text 
                                  style={styles.navItemText}>SUYNL
                                </Text>
                              </View>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor={colors.primary} 
                              onPress={this.navigateToScreen('People')}>
                              <View style={styles.navItem}>
                                <Icon                                   
                                  iconStyle={styles.iconStyle} 
                                  name='ios-git-network'
                                  type='ionicon'  
                                />
                                <Text 
                                  style={styles.navItemText}>SOL
                                </Text>
                              </View>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor={colors.primary} 
                              onPress={this.navigateToScreen('People')}>
                              <View style={styles.navItem}>
                                <Icon                                   
                                  iconStyle={styles.iconStyle} 
                                  name='ios-git-network'
                                  type='ionicon'  
                                />
                                <Text 
                                  style={styles.navItemText}>Finance
                                </Text>
                              </View>
                            </TouchableHighlight>
                        </View>
                    </CollapsibleView>
                  </View>
            </View>
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
      color:colors.grey2
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
        fontSize: 14,
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
        marginLeft:3,
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