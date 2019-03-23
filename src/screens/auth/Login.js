import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeProvider, Button, Avatar, Icon, Input } from 'react-native-elements';
import { signOut, signIn } from '../../store/actions/auth.actions';
import { dimensions, colors, padding, fonts } from '../../styles/base';
import { connect } from 'react-redux';
import { alertActions } from '../../store/actions';


class Login extends Component {
    constructor(props) {
        super(props);

        this.props.dispatch(signOut());
        this.state = {
            username: '',
            password: '',
            submitted: false
        }
        this.onPressLogin = this.onPressLogin.bind(this);
    }
    
    componentDidUpdate() {
        const { isLoggedIn, alert } = this.props;
        if(isLoggedIn === true) {
            this.props.navigation.navigate('Home');
        }
   
      
    };

    onPressLogin() {
        const { username, password } = this.state;
        const { dispatch } = this.props;

        this.setState({ submitted: true });
        if (username && password) {
            dispatch(signIn(username, password));
        } else {
            dispatch(alertActions.error('Username and password is required'));
        }
    }

    render() {
        const { loggingIn, isLoggedIn, navigation } = this.props;
        return ( 
            <ThemeProvider>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Avatar 
                        source={require('../../../assets/logo.png')} 
                        size="xlarge" 
                    />
                </View>
                 <Input
                    placeholder='Username'
                    leftIcon={
                        <Icon
                            
                            name='ios-contact'
                            type='ionicon'
                            size={24}
                            color='black'
                            iconStyle={styles.txtIcon}
                        />
                    }

                    autoCapitalize = 'none'
                    onChangeText={(text) => this.setState({ username: text })}
                    inputContainerStyle={styles.txtInputWrapper}
                    inputStyle={styles.txtInput}
                    shake={true}
                />
                <Input
                    placeholder='Password'
                    secureTextEntry
                    leftIcon={
                        <Icon
                        name='ios-lock'
                        type='ionicon'
                        size={24}
                        color='black'
                        iconStyle={styles.txtIcon}
                        />
                    }
                    autoCapitalize = 'none'
                    onChangeText={(text) => this.setState({ password: text })}
                    inputContainerStyle={styles.txtInputWrapper}
                    inputStyle={styles.txtInput}
                    
                />
                <View style={styles.btnContainer}>
                    <Button
                        title="Login"
                        loading={ loggingIn  }
                        onPress={this.onPressLogin} 
                        buttonStyle={styles.btn}
                    />
                </View>
            </View>
            </ThemeProvider>
        );
    }
}


const mapStateToProps = (state) => {
    
    const { loggingIn, isLoggedIn } = state.auth;
    const {alert} = state;
    
    return {
        alert,
        loggingIn,
        isLoggedIn
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
    txtInputWrapper: {
        padding: 3,
        borderRadius: 30,
        borderWidth: 0.5,
        borderColor: colors.primary,
        marginTop: 5,
        
    },
    txtInput: {
        fontSize: fonts.md,
    },
    txtIcon: {
        marginRight: padding.sm
    },
    btnContainer: {
        display: 'flex',
        width: '100%',
        padding: padding.sm
    },
    btn: {
        backgroundColor: colors.primary,
        borderRadius: 30,
        padding: padding.sm
    }
});

export default connect(mapStateToProps)(Login);