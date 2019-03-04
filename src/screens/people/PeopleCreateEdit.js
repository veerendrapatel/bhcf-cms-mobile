import React, {Component} from 'react';
import { View, ScrollView } from 'react-native';
import { ThemeProvider, Button, Avatar, Header, Icon } from 'react-native-elements';
import TextInput from 'react-native-textinput-with-icons';
import {styles} from '../../services/styles';


class PeopleCreateEdit extends Component {
       render() {
           return (
               <ThemeProvider>
               <Header
                leftComponent={<Icon name="ios-arrow-back" type="ionicon" color="#FFF" onPress={() => this.props.navigation.navigate('People') }/>}
                centerComponent={{ text: 'People', style: { color: '#fff' } }}
                rightComponent={{ icon: 'save', color: '#fff' }}
                />
                <View style={styles.container}>
                        <ScrollView>
                        <Avatar rounded size="xlarge" source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' }} showEditButton />
                            <View style={styles.textInputWrapper}>
                                <TextInput
                                    label="First Name"
                                    leftIcon="person"
                                    leftIconType="oct"
                                    rippleColor="blue" 
                                    autoCapitalize = 'none'
                                />
                            </View>
                            <View style={styles.textInputWrapper}>
                                <TextInput
                                    label="Last Name"
                                    leftIcon="person"
                                    leftIconType="oct"
                                    rippleColor="blue" 
                                    autoCapitalize = 'none'
                                />
                            </View>
                            <View style={styles.textInputWrapper}>
                                <TextInput
                                    label="Middle Name"
                                    leftIcon="person"
                                    leftIconType="oct"
                                    rippleColor="blue" 
                                    autoCapitalize = 'none'
                                />
                            </View>
                            <View style={styles.textInputWrapper}>
                                <TextInput
                                    label="Nick Name"
                                    leftIcon="person"
                                    leftIconType="oct"
                                    rippleColor="blue" 
                                    autoCapitalize = 'none'
                                />
                            </View>
                            <View style={styles.textInputWrapper}>
                                <TextInput
                                    label="Birth Date"
                                    leftIcon="person"
                                    leftIconType="oct"
                                    rippleColor="blue" 
                                    autoCapitalize = 'none'
                                />
                            </View>
                            <View style={styles.textInputWrapper}>
                                <TextInput
                                    label="City"
                                    leftIcon="person"
                                    leftIconType="oct"
                                    rippleColor="blue" 
                                    autoCapitalize = 'none'
                                />
                            </View>
                            <View style={styles.textInputWrapper}>
                                <TextInput
                                    multiline={true}
                                    label="Address"
                                    leftIcon="person"
                                    leftIconType="oct"
                                    rippleColor="blue" 
                                    autoCapitalize = 'none'
                                />
                            </View>
                             <Button title="Hey!" />
                        </ScrollView>
                </View>

               </ThemeProvider>
           )
       }
}

export default PeopleCreateEdit