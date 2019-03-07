import React, { Component } from 'react';
import { Text, View, Image, Alert } from 'react-native';
import { ThemeProvider, Button, Avatar, Icon, Input } from 'react-native-elements';
import { signIn, onSignIn } from '../services/auth';
import _asyncStorage from '../services/services';
import { styles } from '../services/styles';

class Login extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            btnPress: false
        }
        this.onPressLogin = this.onPressLogin.bind(this);
    }
    
    onChange(e) {
        this.setState({[e.target.name]: e.target.value });
        
    }

    onPressLogin() {
        const { navigate } = this.props.navigation;
        const { username, password } = this.state;
        this.setState({ btnPress: true });
        if (username === '') {
            Alert.alert('Warning', 'Please enter username');
        } else if (password === '') {
            Alert.alert('Warning', 'Please enter password');
        } else {
        
            signIn(username, password).then(res => {
                console.log(res.data);
                if (res.ok) {
                    onSignIn(res.data).then(() =>  navigate('Home'));
                } else if(res.data) {
                    Alert.alert(res.data);
                }
            }, err =>{
                Alert.alert(err.message);
            });
            
            
        }
        let _this = this;
        setTimeout(() => {_this.setState({ btnPress: false }), 1000});
        
        
    }

    render() {
        return ( 
            <ThemeProvider>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Avatar 
                    rounded 
                    source={require('../../assets/logo.png')} 
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
                    onChangeText={(username) => this.setState({ username: username })}
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
                    onChangeText={(password) => this.setState({ password: password })}
                    />
                    <Button
                    title="Login"
                    loading={ this.state.btnPress ? true : false }
                    onPress={this.onPressLogin} 
                    />
            </View>
            </ThemeProvider>
        );
    }
}




export default Login;