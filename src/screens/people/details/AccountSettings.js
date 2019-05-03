import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { dimensions, colors, padding, fonts, container } from '../../../styles/base';
import FloatingLabel from 'react-native-floating-labels';
import { ListItem, CheckBox, Icon, Avatar, SearchBar, Overlay, Button, Divider } from 'react-native-elements';



const labelInput = (isError) => {
    return isError ? styles.labelInputError : styles.labelInput;
}

class AccountSettings extends Component {
    
    constructor(props) {
        super(props);

        const { person } = this.props.navigation.state.params;
        this.state = {
            errors: [],
            submitted: false,
            account: Object.assign({
                username: '',
                password: '',
                confirm_password: '',
            }, person.account),
            person: person
        }
    }

    
    render() {
        const {errors, person, account} = this.state;
        console.log(account);
        return (
            <View style={styles.container}>
                <ScrollView style={{ width: '100%', display: 'flex' }}>
                    <View style={styles.viewContainer}>
                        <View style={styles.txtGroup}>
                        
                            <View style={styles.txtWrapperFull}>
                                <FloatingLabel 
                                    labelStyle={labelInput(errors['username'] !== undefined)}
                                    inputStyle={styles.input}
                                    style={styles.formInput}
                                    value={ account.username }
                                    // onChangeText={text => this.onChange('username', text )}
                                    onBlur={this.onBlur}
                                    autoCorrect={false}
                                >Username</FloatingLabel>
                                {
                                    errors['username'] !== undefined &&
                                    (<Text style={ styles.errorStyle }>{ errors['username'] }</Text>)
                                }

                                <FloatingLabel 
                                    labelStyle={labelInput(errors['password'] !== undefined)}
                                    inputStyle={styles.input}
                                    style={styles.formInput}
                                    secureTextEntry
                                    // value={ person.password }
                                    // onChangeText={text => this.onChange('password', text )}
                                    onBlur={this.onBlur}
                                    autoCorrect={false}
                                >Password</FloatingLabel>
                                {
                                    errors['password'] !== undefined &&
                                    (<Text style={ styles.errorStyle }>{ errors['password'] }</Text>)
                                }

                                <FloatingLabel 
                                    labelStyle={labelInput(errors['confirm_password'] !== undefined)}
                                    inputStyle={styles.input}
                                    style={styles.formInput}
                                    secureTextEntry
                                    // value={ person.confirm_password }
                                    // onChangeText={text => this.onChange('confirm_password', text )}
                                    onBlur={this.onBlur}
                                    autoCorrect={false}
                                >Confirm Password</FloatingLabel>
                                {
                                    errors['confirm_password'] !== undefined &&
                                    (<Text style={ styles.errorStyle }>{ errors['confirm_password'] }</Text>)
                                }
                                <Button 
                                style={{
                                    marginTop: padding.md
                                }}
                                title="Save" 
                                />
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        ...container
    },
});



const mapStateToProps = (state) => {
    return {
    }
}

const mapPropsToDispatch = (dispatch) => {
    return {
    }
}


export default connect(mapStateToProps, mapPropsToDispatch)(AccountSettings)


