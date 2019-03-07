import React, {Component} from 'react';
import { View, ScrollView, Text, Alert, TouchableOpacity } from 'react-native';
import { ThemeProvider, Button, Avatar, Header, Icon, Input, CheckBox  } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import {styles} from '../../services/styles';
import { AJAX } from '../../services/services';
import { getCurrentUser } from '../../services/auth';

class PeopleCreateEdit extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
        headerTitle: 'Create',
        headerRight: navigation.state.params && navigation.state.params.headerRight
        };
    };


    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            id: '',
            email: 'serg.casquejo1@gmail.com',
            first_name: 'John',
            last_name: 'Doe',
            middle_name: 'Smith',
            nick_name: 'Smith',
            birthdate: '2016-08-01',
            address: 'Colo, Camolinas, Poblacion, Cordova, Cebu',
            city: 'Cebu',
            contact_no: '09219945112',
            secondary_contact_no: '505-323-232',
            facebook_name: 'serg.casquejo',
            school_status_id: 1,
            leadership_level_id: 2,
            auxiliary_group_id: 3,
            status_id: 1,
            category_id: 2,
            gender: 'male',
            remarks: 'Lorem ipsum dolor sit amit',
            school_statuses: [],
            leadership_levels: [],
            auxiliary_groups: [],
            statuses: [],
            categories: [],
            ministries: [],
            my_ministries: [1, 2],
            ministry_ids: '',
            avatar: null,
            new_avatar: '',
            errorMessage: null,
            isFormSubmit: false,
            isEdit: false,
            loading: true,
        }

        this.save = this.save.bind(this);
    }

    componentDidMount() {
        this.props.navigation.setParams({
                headerRight: (<TouchableOpacity style={{ padding: 10, flex: 1, flexDirection: 'row', alignItems: 'center' }} onPress={this.save}><Text>Save</Text></TouchableOpacity>)
        })
        this._isMounted = true;
         getCurrentUser().then(_currentUser => {
            const currentUser = JSON.parse(_currentUser);
            this.setState({'currentUser':  currentUser}, () => {
                AJAX(
                    `members/dropdown-options`, 
                    'GET',
                    null, 
                    {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization':  `Bearer ${currentUser.api_token}`
                    }
                    ).then(res => {
                    console.log(res);
                    this.setState({
                        auxiliary_groups: res.auxiliary_groups,
                        categories: res.categories,
                        ministries: res.ministries,
                        statuses: res.statuses,
                        school_statuses: res.school_statuses,
                        leadership_levels: res.leadership_levels
                    });

                }, err => {
                    Alert.alert(err.message);
                });



                 if (this.props.navigation.state.params != undefined) {
                    const id = this.props.navigation.state.params.id;
                    console.log('hello' + id);

                    AJAX(
                        `members/${id}`, 
                        'GET',
                        null, 
                        {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':  `Bearer ${currentUser.api_token}`
                        }
                        ).then(res => {
                        this.setState(Object.assign(this.state, res.data));

                    }, err => {
                        Alert.alert(err.message);
                    });
                }
            });
        
            
        });
   
       
    
    }

    componentWillUnmount() {
        this._isMounted = false;
         
    }

    onPressCheckbox(name, value) {
        let arr = this.state[name];
        const index = this.state[name].indexOf(value);
        if (index !== -1) {
            arr.splice(index, 1);
        } else {
            arr.push(value);
        }

        this.setState({ [name]:  arr});
    }

    save() {

        const {
            id,
            currentUser,
            email,
            first_name,
            last_name,
            middle_name,
            nick_name,
            birthdate,
            address,
            city,
            gender,
            contact_no,
            secondary_contact_no,
            facebook_name,
            school_status_id,
            leadership_level_id,
            auxiliary_group_id,
            status,
            category_id,
            remarks,
            my_ministries,
            ministry_ids,
            avatar,
            new_avatar,
            isFormSubmit,
            isEdit,
        } = this.state;

        const method = id > 0 ? 'PUT' : 'POST';
        const route = id > 0 ? `members/${id}` : `members`;

        console.log(route);

        AJAX(route, method, {
            email: email,
            first_name: first_name,
            last_name: last_name,
            middle_name: middle_name,
            nick_name: nick_name,
            birthdate: birthdate,
            gender: gender,
            address: address,
            city: city,
            contact_no: contact_no,
            secondary_contact_no: secondary_contact_no,
            facebook_name: facebook_name,
            school_status_id: school_status_id,
            leadership_level_id: leadership_level_id,
            auxiliary_group_id: auxiliary_group_id,
            status: status,
            category_id: category_id,
            remarks: remarks,
            my_ministries: my_ministries,
            ministry_ids: ministry_ids,
            new_avatar: new_avatar,
        }, 
        {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization':  `Bearer ${currentUser.api_token}`
        }
        ).then(res => {
            console.group(res);
            if (res.ok) {
                if (res.data) {
                    this.setState(Object.assign(this.state, res.data));
                }
                Alert.alert('Success', 'Successfully Saved!');
                
                // this.props.navigation.navigate('PeopleCreateEdit', {id: res.data.id});
            }
        }, err => {
            Alert.alert('Error', err.message);
        })
    }

    render() {
        const {avatar, full_name} = this.state;
        const {goBack} = this.props.navigation;
        return (
            <ThemeProvider>
            <View style={styles.container}>
                    <ScrollView style={{ width: '100%' }}>
                    <Avatar rounded size="xlarge" source={{ 
                                    source: avatar && avatar.thumbnail ?  {uri: avatar.thumbnail} : require('../../../assets/default.png'), title: full_name }} showEditButton />

                        <Input 
                            placeholder='First Name'
                            defaultValue={this.state.first_name}
                            onChangeText={(text) => this.setState({ first_name: text })}
                            leftIcon={
                                <Icon
                                name='ios-person' 
                                type='ionicon'
                                size={24}
                                color='black'
                                />
                            }
                        />
                        <Input 
                            placeholder='Last Name'
                            defaultValue={this.state.last_name}
                            onChangeText={(text) => this.setState({ last_name: text })}
                            leftIcon={
                                <Icon
                                name='ios-person'
                                type='ionicon'
                                size={24}
                                color='black'
                                />
                            }
                        />
                        <Input 
                            placeholder='Middle Name'
                            defaultValue={this.state.middle_name}
                            onChangeText={(text) => this.setState({ middle_name: text })}
                            leftIcon={
                                <Icon
                                name='ios-person'
                                type='ionicon'
                                size={24}
                                color='black'
                                />
                            }
                        />
                        <Input 
                            placeholder='Nick Name'
                            defaultValue={this.state.nick_name}
                            onChangeText={(text) => this.setState({ nick_name: text })}
                            leftIcon={
                                <Icon
                                name='ios-person'
                                type='ionicon'
                                size={24}
                                color='black'
                                />
                            }
                        />
                        <DatePicker
                            style={{width: 200}}
                            date={this.state.birthdate}
                            
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2016-05-01"
                            maxDate="2016-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => {this.setState({birthdate: date})}}
                        />
                        <Input 
                            placeholder='Birth Date'
                            defaultValue={this.state.birthdate}
                            onChangeText={(text) => this.setState({ birthdate: text })}
                            leftIcon={
                                <Icon
                                name='ios-person'
                                type='ionicon'
                                size={24}
                                color='black'
                                />
                            }
                        />
                        <Input 
                            placeholder='City'
                            defaultValue={this.state.city}
                            onChangeText={(text) => this.setState({ city: text })}
                            leftIcon={
                                <Icon
                                name='ios-person'
                                type='ionicon'
                                size={24}
                                color='black'
                                />
                            }
                        />
                        <Input 
                            multiline={true}
                            placeholder='Address'
                            defaultValue={this.state.address}
                            onChangeText={(text) => this.setState({ address: text })}
                            leftIcon={
                                <Icon
                                name='ios-person'
                                type='ionicon'
                                size={24}
                                color='black'
                                />
                            }
                        />
                        <Input 
                            placeholder='Contact No'
                            defaultValue={this.state.contact_no}
                            onChangeText={(text) => this.setState({ contact_no: text })}
                            leftIcon={
                                <Icon
                                name='ios-call'
                                type='ionicon'
                                size={24}
                                color='black'
                                />
                            }
                        />
                        <Input 
                            placeholder='Secondary Contact No'
                            defaultValue={this.state.secondary_contact_no}
                            onChangeText={(text) => this.setState({ secondary_contact_no: text })}
                            leftIcon={
                                <Icon
                                name='ios-phone-portrait'
                                type='ionicon'
                                size={24}
                                color='black'
                                />
                            }
                        />
                        <Input 
                            placeholder='Facebook Name'
                            defaultValue={this.state.facebook_name}
                            onChangeText={(text) => this.setState({ facebook_name: text })}
                            leftIcon={
                                <Icon
                                name='ios-person'
                                type='ionicon'
                                size={24}
                                color='black'
                                />
                            }
                        />
                        <Input 
                            placeholder='Remarks' 
                            defaultValue={this.state.remarks}
                            onChangeText={(text) => this.setState({ remarks: text })}
                            multiline={true}
                            leftIcon={
                                <Icon
                                name='ios-person'
                                type='ionicon'
                                size={24}
                                color='black'
                                />
                            }
                        />
                        <View>
                            <Text>Gender</Text>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                            <CheckBox
                                title='Male'
                                checkedIcon={<Icon name="ios-checkmark-circle" type="ionicon"/>}
                                uncheckedIcon={<Icon name="ios-checkmark-circle-outline" type="ionicon"/>}
                                checked={this.state.gender == 'male'}
                                onPress={() => this.setState({gender: 'male'})}
                                />
                            <CheckBox
                                title='Female'
                                checkedIcon={<Icon name="ios-checkmark-circle" type="ionicon"/>}
                                uncheckedIcon={<Icon name="ios-checkmark-circle-outline" type="ionicon"/>}
                                checked={this.state.gender == 'female'}
                                onPress={() => this.setState({gender: 'female'})}
                                />
                            </View>
                        </View>
                        <View>
                            <Text>Ministry</Text>
                            { this.state.ministries &&
                            this.state.ministries.map((item, i) => {
                                return (<CheckBox key={item.id}
                                    title={item.name} 
                                    checked={ this.state.my_ministries.indexOf(item.id) !== -1 }
                                    onPress={() => this.onPressCheckbox( 'my_ministries', item.id )}
                                    checkedIcon={<Icon name="ios-checkmark-circle" type="ionicon"/>}
                                    uncheckedIcon={<Icon name="ios-checkmark-circle-outline" type="ionicon"/>}
                                    />)
                                })
                            }
                        </View>
                        <View>
                            <Text>Leadership Level</Text>
                            { this.state.leadership_levels &&
                            this.state.leadership_levels.map((item, i) => {
                                return (<CheckBox key={item.id}
                                    title={item.name}
                                    checkedIcon={<Icon name="ios-checkmark-circle" type="ionicon"/>}
                                    uncheckedIcon={<Icon name="ios-checkmark-circle-outline" type="ionicon"/>}
                                    checked={ this.state.leadership_level_id == item.id }
                                    onPress={() =>  this.setState({'leadership_level_id': item.id}) }
                                    />)
                                })
                            }
                        </View>
                        <View>
                            <Text>Auxiliary Group</Text>
                            { this.state.auxiliary_groups &&
                            this.state.auxiliary_groups.map((item, i) => {
                                return (<CheckBox key={item.id}
                                    title={item.name}
                                    checkedIcon={<Icon name="ios-checkmark-circle" type="ionicon"/>}
                                    uncheckedIcon={<Icon name="ios-checkmark-circle-outline" type="ionicon"/>}
                                    checked={ this.state.auxiliary_group_id == item.id }
                                    onPress={() =>  this.setState({'auxiliary_group_id': item.id}) }
                                    />)
                                })
                            }
                        </View>
                        <View>
                            <Text>School Status</Text>
                            { this.state.school_statuses &&
                            this.state.school_statuses.map((item, i) => {
                                return (<CheckBox key={item.id}
                                    title={item.name}
                                    checkedIcon={<Icon name="ios-checkmark-circle" type="ionicon"/>}
                                    uncheckedIcon={<Icon name="ios-checkmark-circle-outline" type="ionicon"/>}
                                    checked={ this.state.school_status_id == item.id }
                                    onPress={() =>  this.setState({'school_status_id': item.id}) }
                                    />)
                                })
                            }
                        </View>
                        <View>
                            <Text>Categories</Text>
                            { this.state.categories &&
                            this.state.categories.map((item, i) => {
                                return (<CheckBox key={item.id}
                                    title={item.name}
                                    checkedIcon={<Icon name="ios-checkmark-circle" type="ionicon"/>}
                                    uncheckedIcon={<Icon name="ios-checkmark-circle-outline" type="ionicon"/>} 
                                    checked={ this.state.category_id == item.id }
                                    onPress={() =>  this.setState({'category_id': item.id}) }
                                    />)
                                })
                            }
                        </View>
                    </ScrollView>
            </View>

            </ThemeProvider>
        )
    }
}

export default PeopleCreateEdit