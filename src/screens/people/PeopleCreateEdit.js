import React, {Component} from 'react';
import { View, ScrollView, Text, Alert, TouchableOpacity } from 'react-native';
import { ThemeProvider, Icon, Input, CheckBox  } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import {styles} from '../../services/styles';
import { AJAX } from '../../services/services';
import { getCurrentUser } from '../../services/auth';
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
            school_statuses_options: [],
            leadership_levels_options: [],
            auxiliary_groups_options: [],
            statuses_options: [],
            categories_options: [],
            ministries_options: [],
            ministries: [1, 2],
            ministry_ids: '',
            avatar: null,
            new_avatar: '',
            errorMessage: null,
            isFormSubmit: false,
            isEdit: false,
            loading: true,
            uploading: false
        }

        this.save = this.save.bind(this);
        
    }


    componentDidMount = () => {
         if (this.props.navigation.state.params != undefined) {
                const id = this.props.navigation.state.params.id;
                this.setState({id:  id || 0})
         }

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
                    
                    this.setState({
                        auxiliary_groups_options: res.auxiliary_groups,
                        categories_options: res.categories,
                        ministries_options: res.ministries,
                        statuses_options: res.statuses,
                        school_statuses_options: res.school_statuses,
                        leadership_levels_options: res.leadership_levels
                    });

                }, err => {
                    Alert.alert(err.message);
                });


                const {id} = this.state;
                 if (id != 0) {
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
                            console.log(res.data);
                            let newState = Object.assign(this.state, res.data);
                            let ministries = [];
                            res.data.my_ministries.map((item, i) => {
                                ministries.push(item.id);
                            });
                            newState['ministries'] = ministries;
                            this.setState(newState);

                        }, err => {
                            Alert.alert(err.message);
                        }
                    );
                }
            });
        
            
        });
   
       
    
    }

     async  uploadImageAsync(result) {
       
        // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = result.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        // Upload the image using the fetch and FormData APIs
        let formData = new FormData();
        // Assume "photo" is the name of the form field the server expects
        formData.append('avatar', { localUri, name: filename, type: type });
       
        const {id} = this.state;
        return getCurrentUser().then(async(_currentUser) => {
            const currentUser = JSON.parse(_currentUser);

            return await fetch(`member/${id}/avatar-mobile`, {
                method: 'POST',
                body: formData,
                header: {
                Accept: 'application/json',
                'Authorization':  `Bearer ${currentUser.api_token}`,
                'content-type': 'multipart/form-data',
                },
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
            ministries,
            ministry_ids,
            avatar,
            new_avatar,
            isFormSubmit,
            isEdit,
        } = this.state;


        console.log(ministries);
        

        AJAX(
            id > 0 ? `members/${id}` : `members`, 
            id > 0 ? 'PUT' : 'POST', 
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
            }, 
            {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${currentUser.api_token}`
            }
        ).then(res => {
            
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