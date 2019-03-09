import React, {Component} from 'react';
import { View, ScrollView, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeProvider, Icon, Input, CheckBox, Avatar  } from 'react-native-elements';
import {styles} from '../../services/styles';

class PeopleDetails extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: navigation.state.params && navigation.state.params.headerTitle,
            headerRight: navigation.state.params && navigation.state.params.headerRight
        };
    };


    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            member: null
        }
        
    }


    componentDidMount = () => {
        

         if (this.props.navigation.state.params != undefined) {
                const member = this.props.navigation.state.params.member;
                this.setState({ member: member });
                this.props.navigation.setParams({
                     headerTitle: member.full_name,
                     headerRight: (
                        <TouchableOpacity 
                            style={{ padding: 10, flex: 1, flexDirection: 'row', alignItems: 'center' }} 
                            onPress={() => this.props.navigation.navigate('PeopleCreateEdit', { member: member })}>
                            <Text>Edit</Text>
                        </TouchableOpacity>
                        )
                    
                });

                
                
         }
         
    }


    componentWillUnmount() {
        this._isMounted = false;
         
    }

    

    render() {
        const { member } = this.state;

        
        return (
            <ThemeProvider>
            <View style={styles.container}>
                {member &&
                <ScrollView style={{ width: '100%' }}>
                {
                    member.avatar ?
                    (
                        <Avatar rounded size="xlarge" source={{ uri:  member.avatar.thumbnail  }}/>
                    ) : (
                        <Avatar rounded size="xlarge" icon={{name: 'user', type: 'font-awesome'}}/>
                    
                    )
                    
                }
                    <View style={_style.view}>
                        <Text>First Name:</Text>
                        <Text>{ member.first_name }</Text>
                    </View>
                    <View style={_style.view}>
                        <Text>Last Name:</Text>
                        <Text>{ member.last_name }</Text>
                    </View>
                    <View style={_style.view}>
                        <Text>Middle Name:</Text>
                        <Text>{ member.middle_name }</Text>
                    </View>
                    <View style={_style.view}>
                        <Text>Nick Name:</Text>
                        <Text>{ member.nick_name }</Text>
                    </View>
                    <View style={_style.view}>
                        <Text>Birth Date:</Text>
                        <Text>{ member.birthdate }</Text>
                    </View>
                    <View style={_style.view}>
                        <Text>Gender:</Text>
                        <Text>{ member.gender }</Text>
                    </View>
                    <View style={_style.view}>
                        <Text>City:</Text>
                        <Text>{ member.city }</Text>
                    </View>
                    <View style={_style.view}>
                        <Text>Address:</Text>
                        <Text>{ member.address }</Text>
                    </View>
                    <View style={_style.view}>
                        <Text>Contact #:</Text>
                        <Text>{ member.contact_no }</Text>
                    </View>
                    <View style={_style.view}>
                        <Text>Secondary Contact #:</Text>
                        <Text>{ member.secondary_contact_no }</Text>
                    </View>
                    <View style={_style.view}>
                        <Text>Facebook Name:</Text>
                        <Text>{ member.facebook_name }</Text>
                    </View>
                    <View style={_style.view}>
                        <Text>Remarks:</Text>
                        <Text>{ member.remarks }</Text>
                    </View>
                    <View style={_style.view}>
                        <Text>Ministries:</Text>
                        { member.my_ministries.map((item, i) => {
                            return (
                                <CheckBox key={item.id}
                                    title={item.name}
                                    checkedIcon={<Icon name="ios-checkmark-circle" type="ionicon"/>}
                                    uncheckedIcon={<Icon name="ios-checkmark-circle-outline" type="ionicon"/>}
                                    checked={true}
                                    />
                            )
                        }) }
                    </View>
                    <View style={_style.view}>
                        <Text>Leadership Level:</Text>
                        <Text>{ member.leadership_level.name }</Text>
                    </View>
                    <View style={_style.view}>
                        <Text>Auxiliary Group:</Text>
                        <Text>{ member.auxiliary_group.name }</Text>
                    </View>
                    <View style={_style.view}>
                        <Text>School Status:</Text>
                        <Text>{ member.school_status.name }</Text>
                    </View>
                    <View style={_style.view}>
                        <Text>Category:</Text>
                        <Text>{ member.category.name }</Text>
                    </View>
                </ScrollView>
                }
            </View>

            </ThemeProvider>
        )
    }
}
const _style = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1, 
        borderBottomColor: '#c1c1c1',
        padding: 10
    }
})
export default PeopleDetails