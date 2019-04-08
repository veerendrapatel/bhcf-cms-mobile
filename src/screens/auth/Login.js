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
        
        this.state = {
            username: '',
            password: '',
            submitted: false
        }
        this.onPressLogin = this.onPressLogin.bind(this);
    }
    
    componentDidUpdate() {
        const { auth} = this.props;
        if(auth.isLoggedIn && auth.user) {
            this.props.navigation.navigate('Home');
        }
   
      
    };

    onPressLogin() {
        const { username, password } = this.state;
        const { login, notifyError } = this.props;

        this.setState({ submitted: true });
        if (username && password) {
            login(username, password);
        } else {
            notifyError('Username and password is required');
        }
    }

    render() {
        const { auth } = this.props;
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
                        loading={ auth.loggingIn  }
                        onPress={this.onPressLogin} 
                        buttonStyle={styles.btn}
                    />
                </View>
            </View>
            </ThemeProvider>
        );
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
        padding: padding.sm,
        width: '100%'
    }
});


const mapStateToProps = (state) => {
    
    const { auth, alert } = state;
    
    return {
        alert,
        auth
    }
}

const mapPropsToDispatch = (dispatch) => {
    return {
        login: (username, password) => dispatch(signIn(username, password)),
        notifyError: (message) => dispatch(alertActions.error(message))
    }
}

export default connect(mapStateToProps, mapPropsToDispatch)(Login);