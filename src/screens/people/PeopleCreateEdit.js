import React, {Component} from 'react';
import { View, ScrollView, Text, Alert, TouchableOpacity } from 'react-native';
import { ThemeProvider, Icon, Input, CheckBox  } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import {styles} from '../../services/styles';
import HttpService from '../../services/services';

import ImageUploader from '../../components/ImageUploader';

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
            email: '',
            first_name: '',
            last_name: '',
            middle_name: '',
            nick_name: '',
            birthdate: '2016-08-01',
            address: '',
            city: '',
            contact_no: '',
            secondary_contact_no: '',
            facebook_name: '',
            school_status_id: null,
            leadership_level_id: null,
            auxiliary_group_id: null,
            status_id: null,
            category_id: 1,
            gender: 'male',
            remarks: '',
            school_statuses_options: [],
            leadership_levels_options: [],
            auxiliary_groups_options: [],
            statuses_options: [],
            categories_options: [],
            ministries_options: [],
            ministries: [],
            ministry_ids: '',
            avatar: null,
            new_avatar: '',
        }

        this.save = this.save.bind(this);
        
    }


    componentDidMount = () => {
         if (this.props.navigation.state.params != undefined) {
                const member = this.props.navigation.state.params.member;
                let newState = Object.assign(this.state, member);
                let ministries = [];
                member.my_ministries.map((item, i) => {
                    ministries.push(item.id);
                });
                newState['ministries'] = ministries;
                this.setState(newState);
         }
        this.props.navigation.setParams({
                headerRight: (<TouchableOpacity style={{ padding: 10, flex: 1, flexDirection: 'row', alignItems: 'center' }} onPress={this.save}><Text>Save</Text></TouchableOpacity>)
        });

        this._isMounted = true;
        HttpService.get(`members/dropdown-options`).then(res => {
            if (this._isMounted) {
                this.setState({
                    auxiliary_groups_options: res.auxiliary_groups,
                    categories_options: res.categories,
                    ministries_options: res.ministries,
                    statuses_options: res.statuses,
                    school_statuses_options: res.school_statuses,
                    leadership_levels_options: res.leadership_levels
                });
            }

        }, err => {
            Alert.alert(err.message);
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
            ministries,
            ministry_ids,
            new_avatar,
        } = this.state;

        
        HttpService.post(`members${id > 0 ? `/${id}`: `` }`, 
            {
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
                ministries: ministries,
                ministry_ids: ministry_ids,
                new_avatar: new_avatar,
                _method:  id > 0 ? 'PUT' : 'POST'
            }
        ).then(res => {
            if (this._isMounted) {
                if (res.ok) {
                    if (res.data) {
                        this.setState(Object.assign(this.state, res.data));
                    }
                    Alert.alert('Success', 'Successfully Saved!');
                } else {
                    Alert.alert('Error', res.data);
                }
            }
        }, err => {
            Alert.alert('Error', err.message);
        })
    }

    render() {
        const {avatar} = this.state;
        return (
            <ThemeProvider>
            <View style={styles.container}>
                    <ScrollView style={{ width: '100%' }}>
                    

                    <ImageUploader source={avatar ? avatar.thumbnail : null} onSelectedImage={(image) => {
                        this.setState({ new_avatar: image });
                    }}/>
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
                            autoCorrect={false}
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
                            autoCorrect={false}
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
                            autoCorrect={false}
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
                            autoCorrect={false}
                        />
                        <DatePicker
                            style={{width: 200}}
                            date={this.state.birthdate}
                            
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={(date) => {this.setState({birthdate: date})}}
                        />
                        <Input 
                            placeholder='City'
                            defaultValue={this.state.city}
                            onChangeText={(text) => this.setState({ city: text })}
                            leftIcon={
                                 <Icon
                                name='location-city'
                                type='fontawesome'
                                size={24}
                                color='black'
                                />
                            }
                            autoCorrect={false}
                        />
                        <Input 
                            multiline={true}
                            placeholder='Address'
                            defaultValue={this.state.address}
                            onChangeText={(text) => this.setState({ address: text })}
                            leftIcon={
                                <Icon
                                name='add-location'
                                type='fontawesome'
                                size={24}
                                color='black'
                                />
                            }
                            autoCorrect={false}
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
                            autoCorrect={false}
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
                            autoCorrect={false}
                        />
                        <Input 
                            placeholder='Facebook Name'
                            defaultValue={this.state.facebook_name}
                            onChangeText={(text) => this.setState({ facebook_name: text })}
                            leftIcon={
                                <Icon
                                name='logo-facebook'
                                type='ionicon'
                                size={24}
                                color='black'
                                />
                            }
                            autoCorrect={false}
                            autoCapitalize="none"
                        />
                        <Input 
                            placeholder='Remarks' 
                            defaultValue={this.state.remarks}
                            onChangeText={(text) => this.setState({ remarks: text })}
                            multiline={true}
                            leftIcon={
                                <Icon
                                name='ios-paper'
                                type='ionicon'
                                size={24}
                                color='black'
                                />
                            }
                            autoCorrect={false}
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
                            { this.state.ministries_options &&
                            this.state.ministries_options.map((item, i) => {
                                return (<CheckBox key={item.id}
                                    title={item.name} 
                                    checked={ this.state.ministries.indexOf(item.id) !== -1 }
                                    onPress={() => this.onPressCheckbox( 'ministries', item.id )}
                                    checkedIcon={<Icon name="ios-checkmark-circle" type="ionicon"/>}
                                    uncheckedIcon={<Icon name="ios-checkmark-circle-outline" type="ionicon"/>}
                                    />)
                                })
                            }
                        </View>
                        <View>
                            <Text>Leadership Level</Text>
                            { this.state.leadership_levels_options &&
                            this.state.leadership_levels_options.map((item, i) => {
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
                            { this.state.auxiliary_groups_options &&
                            this.state.auxiliary_groups_options.map((item, i) => {
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
                            { this.state.school_statuses_options &&
                            this.state.school_statuses_options.map((item, i) => {
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
                            { this.state.categories_options &&
                            this.state.categories_options.map((item, i) => {
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