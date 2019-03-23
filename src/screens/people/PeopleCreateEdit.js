import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text, Alert, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { ThemeProvider, Icon, Input, CheckBox  } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import ImageUploader from '../../components/ImageUploader';
import { peopleActions } from '../../store/actions';
import { dimensions, colors, padding, fonts } from '../../styles/base';
import CollapsibleView from '../../components/CollapseableView';

class PeopleCreateEdit extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: navigation.state.params && navigation.state.params.headerTitle ? navigation.state.params.headerTitle : 'Create',
            headerRight: navigation.state.params && navigation.state.params.headerRight ? navigation.state.params.headerRight : null
        };
    };

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    state = {
        submitted: false,
        person: {
            id: 0,
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
            avatar: null,
            new_avatar: '',
            ministries: null,
        }
    }

    componentDidMount = () => {
        const { dispatch } = this.props;
        const { person } = this.state;

        if (this.props.navigation.state.params && this.props.navigation.state.params.person) {
            const p = this.props.navigation.state.params.person;
            let ministries = [];
            if (p.my_ministries) {
                p.my_ministries.map((item, i) => {
                    ministries.push(item.id);
                });
            }
            p.ministries = ministries;
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
        const p = {
            email: person.email,
            first_name: person.first_name,
            last_name: person.last_name,
            middle_name: person.middle_name,
            nick_name: person.nick_name,
            birthdate: person.birthdate,
            address: person.address,
            city: person.city,
            contact_no: person.contact_no,
            secondary_contact_no: person.secondary_contact_no,
            facebook_name: person.facebook_name,
            school_status_id: person.school_status_id,
            leadership_level_id: person.leadership_level_id,
            auxiliary_group_id: person.auxiliary_group_id,
            status_id: person.status_id,
            category_id: person.category_id,
            gender: person.gender,
            remarks: person.remarks,
            new_avatar: person.new_avatar,
            ministries: person.ministries,
        };

        if (person.id) {
            p._method = 'PUT';
            dispatch(peopleActions.updatePerson(person.id, p));
        } else {
            p._method = 'POST';
            dispatch(peopleActions.createPerson(p));
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
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '100%',
                            }}>
                                <View style={{ width: '20%' }}>
                                    <ImageUploader 
                                        source={person.avatar ? person.avatar.thumbnail : null} 
                                        onSelectedImage={image => this.onChange('new_avatar', image)}
                                    />
                                </View>
                                <View style={{ width: '80%' }}>
                                    <Input 
                                        placeholder='First Name'
                                        defaultValue={person.first_name}
                                        onChangeText={text => this.onChange('first_name', text )}
                                        autoCorrect={false}
                                        inputContainerStyle={styles.inputContainer}
                                        inputStyle={styles.txtInput}
                                    />
                                    <Input 
                                        placeholder='Last Name'
                                        defaultValue={person.last_name}
                                        onChangeText={text => this.onChange('last_name', text )}
                                        autoCorrect={false}
                                        inputContainerStyle={styles.inputContainer}
                                        inputStyle={styles.txtInput}
                                    />
                                </View>
                            </View>
                            <Input 
                                placeholder='Middle Name'
                                defaultValue={person.middle_name}
                                onChangeText={text => this.onChange('middle_name', text )}
                                autoCorrect={false}
                                inputContainerStyle={styles.inputContainer}
                                inputStyle={styles.txtInput}
                            />
                            <Input 
                                placeholder='Nick Name'
                                defaultValue={person.nick_name}
                                onChangeText={text => this.onChange('nick_name', text )}
                                autoCorrect={false}
                                inputContainerStyle={styles.inputContainer}
                                inputStyle={styles.txtInput}
                            />
                            <DatePicker
                                style={{width: '100%', padding: padding.sm}}
                                date={person.birthdate}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}
                                onDateChange={(date) => {this.setState({birthdate: date})}}
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 5,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        borderWidth: 0,
                                        borderBottomWidth: 0.5,
                                        borderBottomColor: '#c3c3c3',
                                        textAlign: 'left'
                                    }
                                }}
                            />
                            <Input 
                                placeholder='City'
                                defaultValue={person.city}
                                onChangeText={text => this.onChange('city', text )}
                                autoCorrect={false}
                                inputStyle={styles.txtInput}
                                inputContainerStyle={styles.inputContainer}
                            />
                            <Input 
                                multiline={true}
                                placeholder='Address'
                                defaultValue={person.address}
                                onChangeText={text => this.onChange('address', text )}
                                autoCorrect={false}
                                inputStyle={styles.txtInput}
                                inputContainerStyle={styles.inputContainer}
                            />
                            <Input 
                                placeholder='Contact No'
                                defaultValue={person.contact_no}
                                onChangeText={text => this.onChange('contact_no', text )}
                                autoCorrect={false}
                                inputStyle={styles.txtInput}
                                inputContainerStyle={styles.inputContainer}
                                
                            />
                            <Input 
                                placeholder='Secondary Contact No'
                                defaultValue={person.secondary_contact_no}
                                onChangeText={text => this.onChange('secondary_contact_no', text )}
                                autoCorrect={false}
                                inputStyle={styles.txtInput}
                                inputContainerStyle={styles.inputContainer}
                                
                            />
                            <Input 
                                placeholder='Facebook Name'
                                defaultValue={person.facebook_name}
                                onChangeText={text => this.onChange('facebook_name', text )}
                                autoCorrect={false}
                                autoCapitalize="none"
                                inputStyle={styles.txtInput}
                                inputContainerStyle={styles.inputContainer}
                            
                            />
                            <Input 
                                placeholder='Remarks' 
                                defaultValue={person.remarks}
                                onChangeText={text => this.onChange('remarks', text )}
                                multiline={true}
                                autoCorrect={false}
                                inputStyle={styles.txtInput}
                                inputContainerStyle={styles.inputContainer}
                                
                            />
                            <View style={styles.checkboxWrapper}>
                                <Text style={styles.inputLabel}>Gender</Text>
                                <View style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        width: '100%',
                                    }}>
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
                                    containerStyle={styles.checkboxContainer}
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
                                    onPress={() => this.onChange('gender', 'female')}
                                    containerStyle={styles.checkboxContainer}
                                    />
                                </View>
                            </View>
                            <View style={styles.collapseableContainer}>
                                <CollapsibleView
                                    title="Ministry"
                                    collapsed={false}
                                    headerStyle={styles.headerStyle}
                                    headerIconSize={30}
                                    headerIconColor="black"
                                    headerTextStyle={styles.headerTextStyle}
                                >
                                    <View style={styles.collapsViewStyle}>
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
                                                            containerStyle={styles.checkboxContainer}
                                                        />
                                                    )
                                                }   
                                            )
                                        }
                                    </View>
                                </CollapsibleView>
                            </View>
                            <View style={styles.collapseableContainer}>
                                <CollapsibleView
                                    title="Leadership Level"
                                    collapsed={false}
                                    headerStyle={styles.headerStyle}
                                    headerIconSize={30}
                                    headerIconColor="black"
                                    headerTextStyle={styles.headerTextStyle}
                                >
                                    <View style={styles.collapsViewStyle}>
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
                                                            containerStyle={styles.checkboxContainer}
                                                        />
                                                    )
                                                }
                                            )
                                        }
                                    </View>
                                </CollapsibleView>
                            </View>
                            <View style={styles.collapseableContainer}>
                                <CollapsibleView
                                    title="Auxiliary Group"
                                    collapsed={false}
                                    headerStyle={styles.headerStyle}
                                    headerIconSize={30}
                                    headerIconColor="black"
                                    headerTextStyle={styles.headerTextStyle}
                                >
                                    <View style={styles.collapsViewStyle}>
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
                                                            containerStyle={styles.checkboxContainer}
                                                        />
                                                    )
                                                }
                                            )
                                        }
                                    </View>
                                </CollapsibleView>
                            </View>
                            <View style={styles.collapseableContainer}>
                                <CollapsibleView
                                    title="Status"
                                    collapsed={false}
                                    headerStyle={styles.headerStyle}
                                    headerIconSize={30}
                                    headerIconColor="black"
                                    headerTextStyle={styles.headerTextStyle}
                                >
                                    <View style={styles.collapsViewStyle}>
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
                                                        containerStyle={styles.checkboxContainer}
                                                    />
                                                )
                                            }
                                        )
                                    }
                                    </View>
                                </CollapsibleView>
                            </View>
                            <View style={styles.collapseableContainer}>
                                <CollapsibleView
                                    title="School Level"
                                    collapsed={false}
                                    headerStyle={styles.headerStyle}
                                    headerIconSize={30}
                                    headerIconColor="black"
                                    headerTextStyle={styles.headerTextStyle}
                                >
                                    <View style={styles.collapsViewStyle}>
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
                                                        containerStyle={styles.checkboxContainer}
                                                    />
                                                )
                                            }
                                        )
                                    }
                                    </View>
                                </CollapsibleView>
                            </View>
                            <View style={styles.collapseableContainer}>
                                <CollapsibleView
                                    title="Categories"
                                    collapsed={false}
                                    headerStyle={styles.headerStyle}
                                    headerIconSize={30}
                                    headerIconColor={colors.black}
                                    headerTextStyle={styles.headerTextStyle}
                                >
                                    <View style={styles.collapsViewStyle}>
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
                                                        containerStyle={styles.checkboxContainer}
                                                    />
                                                )
                                            }
                                        )
                                    }
                                    </View>
                                </CollapsibleView>
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


const styles = StyleSheet.create({
    container: {
        padding: padding.sm,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fcfcfa'
    },
    txtInputWrapper: {
        borderWidth: 0.5,
        borderColor: '#c3c3c3',
        marginTop: 5,
        borderColor: '#f9f9f9'
        
    },
    inputContainer: { 
        borderBottomColor: '#c1c1c1', 
        borderBottomWidth: 0.5 
    },
    txtInput: {
        paddingLeft: 0,
        margin: 3,
        borderColor: '#f9f9f9'
    },
    checkboxWrapper: { 
        padding: padding.sm,
        display: 'flex',
    },
    checkboxContainer: { 
        padding:3,
        paddingLeft: 0,
        marginLeft: 0,
        borderWidth:0,
        backgroundColor: colors.tertiary
        
    },
    inputLabel: {
        fontWeight: 'bold',
        paddingBottom: 10
    },
    headerStyle: {
        padding: padding.sm,
        paddingLeft: 0,
        paddingRight: 0,
        borderBottomWidth: 1,
        borderColor: '#c3c3c3',
        backgroundColor: colors.tertiary
    },
    headerTextStyle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    collapsViewStyle: {
        backgroundColor: colors.tertiary
    },
    collapseableContainer: { 
        paddingLeft: padding.sm,
        paddingRight: padding.sm 
    }
});


const mapStateToProps = (state) => {
    const { options, person } =  state.people;
    
    return {
        options,
        person
    }
}


export default connect(mapStateToProps)(PeopleCreateEdit)