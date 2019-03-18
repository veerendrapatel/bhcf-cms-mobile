import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ThemeProvider, Icon, Input, CheckBox  } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import ImageUploader from '../../components/ImageUploader';
import { peopleActions } from '../../store/actions';
import { styles } from '../../styles/styles';


class PeopleCreateEdit extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: navigation.state.params && navigation.state.params.headerTitle ? navigation.state.params.headerTitle : 'Create',
            headerRight: navigation.state.params && navigation.state.params.headerRight ? navigation.state.params.headerRight : null
        };
    };

    state = {
        submitted: false,
        person: {
            id: 0,
            email: 'serg.casquejo1@gmail.com',
            first_name: 'John',
            last_name: 'Doe',
            middle_name: 'Smith',
            nick_name: 'John',
            birthdate: '2016-08-01',
            address: 'Lorem ipsum dolor',
            city: 'dolor',
            contact_no: '09121244343',
            secondary_contact_no: '342-341-1223',
            facebook_name: 'serg.casquejo',
            school_status_id: null,
            leadership_level_id: null,
            auxiliary_group_id: null,
            status: null,
            category_id: 1,
            gender: 'male',
            remarks: '',
            avatar: null,
            new_avatar: '',
            ministries: null,
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps.person);

        // if(nextProps.person !== this.props.person){
        //     console.log('hello', nextProps.person);
        //     const person = Object.assign(this.state.person, nextProps.person);
        //     this.setState({ person: person });
        // }
    // }

    

    componentDidMount = () => {
        const { dispatch } = this.props;
        const { person } = this.state;

        if (this.props.navigation.state.params && this.props.navigation.state.params.person) {
            const p = this.props.navigation.state.params.person;
            this.setState({ person:  p});
            this.props.navigation.setParams({
                headerTitle: `${p.first_name} ${p.last_name}`,
            });
        }
        this.props.navigation.setParams(
            {
                headerRight: (
                    <TouchableOpacity 
                        style={{ padding: 10, flex: 1, flexDirection: 'row', alignItems: 'center' }} 
                        onPress={this.save.bind(this)}>
                        <Text>Save</Text>
                    </TouchableOpacity>
                )
            }
        );

        dispatch( peopleActions.getOptions() );
    }


    onToggleMinistry = (ministryID) => {
        const { ministries } = this.state.person;
        let arr = ministries ? ministries : [];
        const index = arr.indexOf(ministryID);
        if (index !== -1) {
            arr.splice(index, 1);
        } else {
            arr.push(ministryID);
        }
        this.onChange('ministries', arr);
    }

    save = () => {
        const { dispatch } = this.props;
        const { person } = this.state;
        this.setState({ submitted: true });
        
        if (person.id) {
            person._method = 'PUT';
            dispatch(peopleActions.updatePerson(person.id, person));
        } else {
            person._method = 'POST';
            dispatch(peopleActions.createPerson(person));
        }
    }

    onChange = (name, value) => {
        this.setState(
            prevState => ({ 
                person: {
                    ...prevState.person,
                    [name]: value
                }
            })
        );
    }

    render() {
        const {person} = this.state;
        const { options } = this.props;
        
        return (
            <ThemeProvider>
                <View style={styles.container}>
                { person ? 
                    (
                        <ScrollView style={{ width: '100%' }}>
                            <ImageUploader 
                                source={person.avatar ? person.avatar.thumbnail : null} 
                                onSelectedImage={image => this.onChange('new_avatar', image)}
                            />
                            <Input 
                                placeholder='First Name'
                                defaultValue={person.first_name}
                                onChangeText={text => this.onChange('first_name', text )}
                                autoCorrect={false}
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
                                defaultValue={person.last_name}
                                onChangeText={text => this.onChange('last_name', text )}
                                autoCorrect={false}
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
                                defaultValue={person.middle_name}
                                onChangeText={text => this.onChange('middle_name', text )}
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
                                defaultValue={person.nick_name}
                                onChangeText={text => this.onChange('nick_name', text )}
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
                                date={person.birthdate}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                onDateChange={(date) => {this.setState({birthdate: date})}}
                            />
                            <Input 
                                placeholder='City'
                                defaultValue={person.city}
                                onChangeText={text => this.onChange('city', text )}
                                autoCorrect={false}
                                leftIcon={
                                    <Icon
                                        name='location-city'
                                        type='fontawesome'
                                        size={24}
                                        color='black'
                                    />
                                }
                            />
                            <Input 
                                multiline={true}
                                placeholder='Address'
                                defaultValue={person.address}
                                onChangeText={text => this.onChange('address', text )}
                                autoCorrect={false}
                                leftIcon={
                                    <Icon
                                        name='add-location'
                                        type='fontawesome'
                                        size={24}
                                        color='black'
                                    />
                                }
                            />
                            <Input 
                                placeholder='Contact No'
                                defaultValue={person.contact_no}
                                onChangeText={text => this.onChange('contact_no', text )}
                                autoCorrect={false}
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
                                defaultValue={person.secondary_contact_no}
                                onChangeText={text => this.onChange('secondary_contact_no', text )}
                                autoCorrect={false}
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
                                defaultValue={person.facebook_name}
                                onChangeText={text => this.onChange('facebook_name', text )}
                                autoCorrect={false}
                                autoCapitalize="none"
                                leftIcon={
                                    <Icon
                                        name='logo-facebook'
                                        type='ionicon'
                                        size={24}
                                        color='black'
                                    />
                                }
                            
                            />
                            <Input 
                                placeholder='Remarks' 
                                defaultValue={person.remarks}
                                onChangeText={text => this.onChange('remarks', text )}
                                multiline={true}
                                autoCorrect={false}
                                leftIcon={
                                    <Icon
                                        name='ios-paper'
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
                                    checkedIcon={
                                        <Icon 
                                            name="ios-checkmark-circle" 
                                            type="ionicon"    
                                        />
                                    }
                                    uncheckedIcon={
                                        <Icon 
                                            name="ios-checkmark-circle-outline" 
                                            type="ionicon"    
                                        />
                                    }
                                    checked={person.gender == 'male'}
                                    onPress={() => this.onChange('gender', 'male')}
                                    />
                                <CheckBox
                                    title='Female'
                                    checkedIcon={
                                        <Icon 
                                            name="ios-checkmark-circle" 
                                            type="ionicon"
                                        />
                                    }
                                    uncheckedIcon={
                                        <Icon 
                                            name="ios-checkmark-circle-outline" 
                                            type="ionicon"
                                        />
                                    }
                                    checked={person.gender == 'female'}
                                    onPress={() => this.onChage('gender', 'female')}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text>Ministry</Text>
                                { 
                                    options &&
                                    options.ministries && options.ministries.map((item, i) => {
                                        return (
                                                <CheckBox key={item.id}
                                                    title={item.name} 
                                                    checked={ person.ministries && person.ministries.indexOf(item.id) !== -1 }
                                                    onPress={() => this.onToggleMinistry( item.id )}
                                                    checkedIcon={
                                                        <Icon 
                                                            name="ios-checkmark-circle" 
                                                            type="ionicon"
                                                        />
                                                    }
                                                    uncheckedIcon={
                                                        <Icon 
                                                            name="ios-checkmark-circle-outline" 
                                                            type="ionicon"
                                                        />
                                                    }
                                                />
                                            )
                                        }   
                                    )
                                }
                            </View>
                            <View>
                                <Text>Leadership Level</Text>
                                { 
                                    options &&
                                    options.leadership_levels && options.leadership_levels.map((item, i) => {
                                        return (
                                                <CheckBox key={item.id}
                                                    title={item.name}
                                                    checkedIcon={
                                                        <Icon 
                                                            name="ios-checkmark-circle" 
                                                            type="ionicon"
                                                        />
                                                    }
                                                    uncheckedIcon={
                                                        <Icon 
                                                            name="ios-checkmark-circle-outline" 
                                                            type="ionicon"/>
                                                    }
                                                    checked={ person.leadership_level_id == item.id }
                                                    onPress={() =>  this.onChange('leadership_level_id', item.id) }
                                                />
                                            )
                                        }
                                    )
                                }
                            </View>
                            <View>
                                <Text>Auxiliary Group</Text>
                                { 
                                    options &&
                                    options.auxiliary_groups && options.auxiliary_groups.map((item, i) => {
                                        return (
                                                <CheckBox key={item.id}
                                                    title={item.name}
                                                    checkedIcon={
                                                        <Icon 
                                                            name="ios-checkmark-circle" 
                                                            type="ionicon"
                                                        />
                                                    }
                                                    uncheckedIcon={
                                                        <Icon 
                                                            name="ios-checkmark-circle-outline" 
                                                            type="ionicon"
                                                        />
                                                    }
                                                    checked={ person.auxiliary_group_id == item.id }
                                                    onPress={() =>  this.onChange('auxiliary_group_id', item.id) }
                                                />
                                            )
                                        }
                                    )
                                }
                            </View>
                            <View>
                                <Text>Status</Text>
                                { 
                                    options &&
                                    options.statuses && options.statuses.map((item, i) => {
                                        return (
                                                <CheckBox key={item.id}
                                                    title={item.name}
                                                    checkedIcon={
                                                        <Icon 
                                                            name="ios-checkmark-circle" 
                                                            type="ionicon"
                                                        />
                                                    }
                                                    uncheckedIcon={
                                                        <Icon 
                                                            name="ios-checkmark-circle-outline" 
                                                            type="ionicon"
                                                        />
                                                    }
                                                    checked={ person.status == item.id }
                                                    onPress={() =>  this.onChange('status', item.id) }
                                                />
                                            )
                                        }
                                    )
                                }
                            </View>
                            <View>
                                <Text>School Status</Text>
                                { 
                                    options &&
                                    options.school_statuses && options.school_statuses.map((item, i) => {
                                        return (
                                                <CheckBox key={item.id}
                                                    title={item.name}
                                                    checkedIcon={
                                                        <Icon 
                                                            name="ios-checkmark-circle" 
                                                            type="ionicon"
                                                        />
                                                    }
                                                    uncheckedIcon={
                                                        <Icon 
                                                            name="ios-checkmark-circle-outline" 
                                                            type="ionicon"
                                                        />
                                                    }
                                                    checked={ person.school_status_id == item.id }
                                                    onPress={() =>  this.onChange('school_status_id', item.id) }
                                                />
                                            )
                                        }
                                    )
                                }
                            </View>
                            <View>
                                <Text>Categories</Text>
                                { 
                                    options &&
                                    options.categories && options.categories.map((item, i) => {
                                        return (
                                                <CheckBox key={item.id}
                                                    title={item.name}
                                                    checkedIcon={
                                                        <Icon 
                                                            name="ios-checkmark-circle" 
                                                            type="ionicon"
                                                        />
                                                    }
                                                    uncheckedIcon={
                                                        <Icon 
                                                            name="ios-checkmark-circle-outline" 
                                                            type="ionicon"
                                                        />
                                                    } 
                                                    checked={ person.category_id == item.id }
                                                    onPress={() =>  this.onChange('category_id', item.id) }
                                                />
                                            )
                                        }
                                    )
                                }
                            </View>
                        </ScrollView>
                    ) :(
                         <View style={styles.container}>
                            <ActivityIndicator size="large" />
                        </View>
                    ) 
                    }
                </View>
            </ThemeProvider>
        )
    }
}


const mapStateToProps = (state) => {
    const { options, person } =  state.people;
    
    return {
        options,
        person
    }
}

export default connect(mapStateToProps)(PeopleCreateEdit)