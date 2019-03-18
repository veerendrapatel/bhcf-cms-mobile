import React, { Component } from 'react';
import { Text, View, Image, Alert } from 'react-native';
import { ThemeProvider, Button, Avatar, Icon, Input } from 'react-native-elements';
import { signOut, signIn } from '../../store/actions/auth.actions';
import { styles } from '../../styles/styles';
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
            console.log('asfasdf', this.props.isLoggedIn);
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
        // const { submitted, username } = this.state;

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
                        />
                    }

                    autoCapitalize = 'none'
                    onChangeText={(text) => this.setState({ username: text })}
                    // shake={ (submitted && !username) ? true : false }
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
                        />
                    }
                    autoCapitalize = 'none'
                    onChangeText={(text) => this.setState({ password: text })}
                    // shake={ (submitted && !password) ? true : false }
                />
                <Button
                    title="Login"
                    loading={ loggingIn  }
                    onPress={this.onPressLogin} 
                />
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

export default connect(mapStateToProps)(Login);