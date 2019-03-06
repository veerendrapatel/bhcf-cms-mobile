import React, {Component} from 'react';
import { View, ScrollView, Text } from 'react-native';
import { ThemeProvider, Button, Avatar, Header, Icon, Input, CheckBox } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import {styles} from '../../services/styles';
import { AJAX } from '../../services/services';

class PeopleCreateEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            school_status_id: 0,
            leadership_level_id: 0,
            auxiliary_group_id: 0,
            status_id: 0,
            category_id: 0,
            remarks: '',
            school_statuses: [],
            leadership_levels: [],
            auxiliary_groups: [],
            statuses: [],
            categories: [],
            ministries: [],
            my_ministries: [],
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
        // this._isMounted = true;
        // if (this.props.match.params.id) {
        //     const memberID = this.props.match.params.id;
        //     api.get(`members/${memberID}`).then(res => {
        //         if (this._isMounted) {
        //             const response = res.data;
        //             if (response) {
        //                 const newState = Object.assign(this.state, response.data);
        //                 newState.loading = false;
        //                 this.setState(newState);
        //             }
        //         }
        //     });
        // }

        
        
    
        this.fetchDropdownOptions();
    }

    async fetchDropdownOptions() {
        const res = AJAX(`members/dropdown-options`, 'GET');
        
        response = res.data;
        this.setState({
            auxiliary_groups: response.auxiliary_groups,
            categories: response.categories,
            ministries: response.ministries,
            statuses: response.statuses,
            school_statuses: response.school_statuses,
            leadership_levels: response.leadership_levels
        });
    }

    save() {

    }

    render() {
        return (
            <ThemeProvider>
            <Header
            leftComponent={<Icon name="ios-arrow-back" type="ionicon" color="#FFF" onPress={() => this.props.navigation.navigate('People') }/>}
            centerComponent={{ text: 'People', style: { color: '#fff' } }}
            rightComponent={<View><Icon name="ios-save" type="ionicon" color="#FFF" onPress={ this.save }/><Text>Save</Text></View>}
            />
            <View style={styles.container}>
                    <ScrollView style={{ width: '100%' }}>
                    <Avatar rounded size="xlarge" source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' }} showEditButton />
                        <Input 
                            placeholder='First Name'
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
                            leftIcon={
                                <Icon
                                name='ios-phone'
                                type='ionicon'
                                size={24}
                                color='black'
                                />
                            }
                        />
                        <Input 
                            placeholder='Secondary Contact No'
                            leftIcon={
                                <Icon
                                name='ios-phone'
                                type='ionicon'
                                size={24}
                                color='black'
                                />
                            }
                        />
                        <Input 
                            placeholder='Facebook Name'
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
                            <CheckBox
                                title='Male'
                                checkedIcon={<Icon name="ios-checkmark-circle" type="ionicon"/>}
                                uncheckedIcon={<Icon name="ios-checkmark-circle-outline" type="ionicon"/>}
                                checked={this.state.gender == 'male'}
                                onPress={() => this.setState({gender: this.state.gender == 'female' ? 'male' : 'female'})}
                                />
                            <CheckBox
                                title='Female'
                                checkedIcon={<Icon name="ios-checkmark-circle" type="ionicon"/>}
                                uncheckedIcon={<Icon name="ios-checkmark-circle-outline" type="ionicon"/>}
                                checked={this.state.gender == 'female'}
                                onPress={() => this.setState({gender: this.state.gender == 'female' ? 'male' : 'female'})}
                                />
                        </View>
                        <View>
                            <Text>Ministry</Text>
                            { this.state.ministries &&
                            this.state.ministries.map((item, i) => {
                                <CheckBox
                                    title={item.name}
                                    checkedIcon={<Icon name="ios-checkmark-circle" type="ionicon"/>}
                                    uncheckedIcon={<Icon name="ios-checkmark-circle-outline" type="ionicon"/>}
                                    />
                                })
                            }
                        </View>
                        <View>
                            <Text>Leadership Level</Text>
                            { this.state.leadership_levels &&
                            this.state.leadership_levels.map((item, i) => {
                                <CheckBox
                                    title={item.name}
                                    checkedIcon={<Icon name="ios-checkmark-circle" type="ionicon"/>}
                                    uncheckedIcon={<Icon name="ios-checkmark-circle-outline" type="ionicon"/>}
                                    />
                                })
                            }
                        </View>
                        <View>
                            <Text>Auxiliary Group</Text>
                            { this.state.auxiliary_groups &&
                            this.state.auxiliary_groups.map((item, i) => {
                                <CheckBox
                                    title={item.name}
                                    checkedIcon={<Icon name="ios-checkmark-circle" type="ionicon"/>}
                                    uncheckedIcon={<Icon name="ios-checkmark-circle-outline" type="ionicon"/>}
                                    />
                                })
                            }
                        </View>
                        <View>
                            <Text>School Status</Text>
                            { this.state.school_statuses &&
                            this.state.school_statuses.map((item, i) => {
                                <CheckBox
                                    title={item.name}
                                    checkedIcon={<Icon name="ios-checkmark-circle" type="ionicon"/>}
                                    uncheckedIcon={<Icon name="ios-checkmark-circle-outline" type="ionicon"/>}
                                    />
                                })
                            }
                        </View>
                        <View>
                            <Text>Categories</Text>
                            { this.state.categories &&
                            this.state.categories.map((item, i) => {
                                <CheckBox
                                    title={item.name}
                                    checkedIcon={<Icon name="ios-checkmark-circle" type="ionicon"/>}
                                    uncheckedIcon={<Icon name="ios-checkmark-circle-outline" type="ionicon"/>}
                                    />
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