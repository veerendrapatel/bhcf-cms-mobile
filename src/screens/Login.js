import React, { Component } from 'react';
import { Text, View, Image, Alert } from 'react-native';
import { Button } from 'react-native-material-ui';
import TextInput from 'react-native-textinput-with-icons';
import { signIn, onSignIn } from '../services/auth';
import _asyncStorage from '../services/Storage';
import { styles } from '../services/styles';

class Login extends React.Component {
    // static navigationOptions = {
    //     header: null ,
    // };
    
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

    async onPressLogin() {
        const { navigate } = this.props.navigation;
        const { username, password } = this.state;
        this.setState({ btnPress: true });
        if (username === '') {
            Alert.alert('Please enter username');
        } else if (password === '') {
            Alert.alert('Please enter password');
        } else {
            let response = await signIn(username, password);
            if (response.success) {
                onSignIn(response.data).then(() =>  navigate('Home'));
            } else {
                Alert.alert(response.data);
            }
        }
        let _this = this;
        setTimeout(() => {_this.setState({ btnPress: false }), 1000});
        
        
    }

    render() {
        return ( 
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/logo.png')} style={{width: 200, height: 200, marginBottom: 30}}/>
                </View>
                <View >
                    <TextInput
                        label="Username"
                        leftIcon="person"
                        leftIconType="oct"
                        rippleColor="blue" 
                        autoCapitalize = 'none'
                        onChangeText={(username) => this.setState({ username: username })}
                    />
                </View>
                <View >
                    <TextInput
                        label="Password" 
                        secureTextEntry
                        leftIcon="lock"
                        leftIconType="oct"
                        rippleColor="blue" 
                        onChangeText={(password) => this.setState({ password: password })}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button 
                        raised 
                        primary 
                        text={ !this.state.btnPress ? 'Login' : 'Loading...' }
                        onPress={this.onPressLogin} 
                        />
                </View>
            </View>
        );
    }
}




export default Login;