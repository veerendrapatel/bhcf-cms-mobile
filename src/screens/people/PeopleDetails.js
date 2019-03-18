import React, {Component} from 'react';
import { View, ScrollView, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeProvider, Icon, Input, CheckBox, Avatar  } from 'react-native-elements';
import { connect } from 'react-redux';
import {styles} from '../../styles/styles';

class PeopleDetails extends Component {
    static navigationOptions = ({ navigation }) => {
        const {headerTitle,  headerRight} = navigation.state.params;

        return {
            headerTitle: headerTitle,
            headerRight: headerRight
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            person: null
        }
    }


    componentDidMount = () => {

        if (this.props.navigation.state.params != undefined) {
            const person = this.props.navigation.state.params.person;
            this.setState({ person: person });
            this.props.navigation.setParams({
                    headerTitle: person.full_name,
                    headerRight: (
                    <TouchableOpacity 
                        style={{ padding: 10, flex: 1, flexDirection: 'row', alignItems: 'center' }} 
                        onPress={() => this.props.navigation.navigate('PeopleCreateEdit', { person: person })}>
                        <Text>Edit</Text>
                    </TouchableOpacity>
                    )
            });
         }
         
    }

    render() {
        const { person } = this.state;
        
        return (
            <ThemeProvider>
            <View style={styles.container}>
                {person &&
                <ScrollView style={{ width: '100%' }}>
                {
                    person.avatar ?
                    (
                        <Avatar rounded size="xlarge" source={{ uri:  person.avatar.thumbnail  }}/>
                    ) : (
                        <Avatar rounded size="xlarge" icon={{name: 'user', type: 'font-awesome'}}/>
                    
                    )
                    
                }
                    <View style={_style.view}>
                        <Text>First Name:</Text>
                        <Text>{ person.first_name }</Text>
                    </View>
                    <View style={_style.view}>
                        <Text>Last Name:</Text>
                        <Text>{ person.last_name }</Text>
                    </View>
                    <View style={_style.view}>
                        <Text>Middle Name:</Text>
                        <Text>{ person.middle_name }</Text>
                    </View>
                    <View style={_style.view}>
                        <Text>Nick Name:</Text>
                        <Text>{ person.nick_name }</Text>
                    </View>
                    <View style={_style.view}>
                        <Text>Birth Date:</Text>
                        <Text>{ person.birthdate }</Text>
                    </View>
                    <View style={_style.view}>
                        <Text>Gender:</Text>
                        <Text>{ person.gender }</Text>
                    </View>
                    <View style={_style.view}>
                        <Text>City:</Text>
                        <Text>{ person.city }</Text>
                    </View>
                    <View style={_style.view}>
                        <Text>Address:</Text>
                        <Text>{ person.address }</Text>
                    </View>
                    <View style={_style.view}>
                        <Text>Contact #:</Text>
                        <Text>{ person.contact_no }</Text>
                    </View>
                    <View style={_style.view}>
                        <Text>Secondary Contact #:</Text>
                        <Text>{ person.secondary_contact_no }</Text>
                    </View>
                    <View style={_style.view}>
                        <Text>Facebook Name:</Text>
                        <Text>{ person.facebook_name }</Text>
                    </View>
                    <View style={_style.view}>
                        <Text>Remarks:</Text>
                        <Text>{ person.remarks }</Text>
                    </View>
                    {
                        person.status &&
                        <View style={_style.view}>
                            <Text>Status:</Text>
                            <Text>{ person.status.name }</Text>
                        </View>
                    }
                    <View style={_style.view}>
                        <Text>Ministries:</Text>
                        { person.my_ministries.map((item, i) => {
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
                    {
                        person.leadership_level &&
                        <View style={_style.view}>
                            <Text>Leadership Level:</Text>
                            <Text>{ person.leadership_level.name }</Text>
                        </View>
                    }
                    {
                        person.auxiliary_group &&
                        <View style={_style.view}>
                            <Text>Auxiliary Group:</Text>
                            <Text>{ person.auxiliary_group.name }</Text>
                        </View>
                    }
                    
                    {
                        person.school_status &&
                        <View style={_style.view}>
                            <Text>School Status:</Text>
                            <Text>{ person.school_status.name }</Text>
                        </View>
                    }
                    {
                        person.category &&
                        <View style={_style.view}>
                            <Text>Category:</Text>
                            <Text>{ person.category.name }</Text>
                        </View>
                    }
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
});

const mapStateToProps = (state) => {
    const { options } =  state.people;
    return {
        options
    }
}

export default connect(mapStateToProps)(PeopleDetails)