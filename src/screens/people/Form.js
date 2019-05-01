import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text, Alert, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { ThemeProvider, Icon, Input, CheckBox, Divider } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import ImageUploader from '../../components/ImageUploader';
import { peopleActions } from '../../store/actions';
import { dimensions, colors, padding, fonts, container } from '../../styles/base';
import CollapsibleView from '../../components/CollapseableView';
import Validate from '../../helpers/validations';
import FloatingLabel from 'react-native-floating-labels';

const labelInput = (isError) => {
    return isError ? styles.labelInputError : styles.labelInput;
}
const validations = {
    first_name: 'required',
    last_name: 'required',
    middle_name: 'required',
    birthdate: 'required',
    address: 'required',
    city: 'required',
    contact_no: 'required',
    civil_status: 'required'
};

    
class PersonForm extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: navigation.state.params && navigation.state.params.headerTitle ? navigation.state.params.headerTitle : 'Create',
            headerRight: navigation.state.params && navigation.state.params.headerRight ? navigation.state.params.headerRight : null
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            errors: [],
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
                parent_id : this.props.user.member.id,
                secondary_contact_no: '',
                facebook_name: '',
                school_status_id: null,
                leadership_level_id: null,
                auxiliary_group_id: null,
                civil_status: 'Single',
                status: null,
                category_id: 1,
                gender: 'male',
                remarks: '',
                avatar: null,
                new_avatar: '',
                ministries: null,
            }
        }
        
        this.onChange = this.onChange.bind(this);
        this.save = this.save.bind(this);
    }
    
    componentDidMount = () => {
        const { getDropdownSelections } = this.props;
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
                        onPress={this.save}>
                        <Text>Save</Text>
                    </TouchableOpacity>
                )
            }
        );

        getDropdownSelections();

        if (this.props.navigation.state.params && this.props.navigation.state.params.leaderID) {
            
            const newPersonState = Object.assign(this.state.person, { leader_id:  this.props.navigation.state.params.leaderID});
            this.setState({ person: newPersonState });
        }
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
        const errors = Validate(validations, this.state.person);
        if (Object.keys(errors).length !== 0) {
            this.setState({ errors: errors });
        } else {
            this.submitSuccess();
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

    submitSuccess() {
        const { update, create } = this.props;
        const { person } = this.state;
        this.setState({ submitted: true });
        const p = {
            email: person.email,
            full_name: `${person.first_name} ${person.middle_name.charAt(0)} ${person.first_name}`,
            first_name: person.first_name,
            last_name: person.last_name,
            middle_name: person.middle_name,
            nick_name: person.nick_name,
            birthdate: person.birthdate,
            address: person.address,
            parent_id: person.parent_id,
            city: person.city,
            contact_no: person.contact_no,
            secondary_contact_no: person.secondary_contact_no,
            facebook_name: person.facebook_name,
            school_status_id: person.school_status_id,
            leadership_level_id: person.leadership_level_id,
            auxiliary_group_id: person.auxiliary_group_id,
            // status_id: person.status_id,
            category_id: person.category_id,
            gender: person.gender,
            remarks: person.remarks,
            new_avatar: person.new_avatar,
            ministries: person.ministries,
        };

        if (person.id) {
            update(person.id, p);
        } else {
            create(p);
        }
    }

    render() {
        const {person, errors} = this.state;
        const { options, netInfo } = this.props;
        
        return (
            <ThemeProvider>
                <View style={styles.container}>
                { person ? 
                    (
                        <ScrollView style={{ width: '100%', display: 'flex' }}>
                            <View style={styles.avatarContainer}>
                                <ImageUploader 
                                    source={person.avatar ? person.avatar.thumbnail : null} 
                                    onSelectedImage={(image, url) => {
                                        this.onChange('new_avatar', image);
                                        this.onChange('new_avatar_url', url)
                                        }
                                    }
                                />
                            </View>
                            <View style={styles.viewContainer}>
                                

                                <View style={styles.txtGroup}>
                               
                                    <View style={styles.txtWrapperFull}>
                                        <FloatingLabel 
                                            labelStyle={labelInput(errors['first_name'] !== undefined)}
                                            inputStyle={styles.input}
                                            style={styles.formInput}
                                            value={ person.first_name }
                                            onChangeText={text => this.onChange('first_name', text )}
                                            onBlur={this.onBlur}
                                            autoCorrect={false}
                                        >First Name</FloatingLabel>
                                        {
                                            errors['first_name'] !== undefined &&
                                            (<Text style={ styles.errorStyle }>{ errors['first_name'] }</Text>)
                                        }

                                        <FloatingLabel 
                                            labelStyle={labelInput(errors['last_name'] !== undefined)}
                                            inputStyle={styles.input}
                                            style={styles.formInput}
                                            value={ person.last_name }
                                            onChangeText={text => this.onChange('last_name', text )}
                                            onBlur={this.onBlur}
                                            autoCorrect={false}
                                        >Last Name</FloatingLabel>
                                        {
                                            errors['last_name'] !== undefined &&
                                            (<Text style={ styles.errorStyle }>{ errors['last_name'] }</Text>)
                                        }

                                        <FloatingLabel 
                                            labelStyle={labelInput(errors['middle_name'] !== undefined)}
                                            inputStyle={styles.input}
                                            style={styles.formInput}
                                            value={ person.middle_name }
                                            onChangeText={text => this.onChange('middle_name', text )}
                                            onBlur={this.onBlur}
                                            autoCorrect={false}
                                        >Middle Name</FloatingLabel>
                                        {
                                            errors['middle_name'] !== undefined &&
                                            (<Text style={ styles.errorStyle }>{ errors['middle_name'] }</Text>)
                                        }

                                        <FloatingLabel 
                                            labelStyle={labelInput(errors['nick_name'] !== undefined)}
                                            inputStyle={styles.input}
                                            style={styles.formInput}
                                            value={ person.nick_name }
                                            onChangeText={text => this.onChange('nick_name', text )}
                                            onBlur={this.onBlur}
                                            autoCorrect={false}
                                        >Nick Name</FloatingLabel>
                                        {
                                            errors['nick_name'] !== undefined &&
                                            (<Text style={ styles.errorStyle }>{ errors['nick_name'] }</Text>)
                                        }
                                        
                                    </View>
                                </View>
                                <View style={styles.txtGroup}>
                                    <View style={styles.txtWrapperFull}>
                                        <Text style={styles.txtLabel}>Date of Birth</Text>
                                        <DatePicker
                                            style={{width: '100%', padding: 0,margin:0}}
                                            date={person.birthdate}
                                            mode="date"
                                            placeholder="select date"
                                            format="YYYY-MM-DD"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            showIcon={false}
                                            onDateChange={(date) => {this.onChange('birthdate', date)}}
                                            customStyles={{
                                                dateIcon: {
                                                    position: 'absolute',
                                                    left: 5,
                                                    top: 4,
                                                    marginLeft: 0
                                                },
                                                dateInput: {
                                                    borderWidth:0,
                                                    paddingLeft: padding.sm,
                                                    alignItems: 'flex-start',
                                                    height:30
                                                }
                                            }}
                                        />
                                    </View>
                                </View>
                                <Divider style={styles.divider} />
                                <View style={styles.txtGroup}>
                                    <View style={styles.txtWrapperFull}>
                                        <Text style={{...styles.txtLabel, marginTop: padding.sm}}>Gender</Text>
                                        {
                                            ['Male', 'Female'].map((item, i) => <CheckBox
                                            key={i}
                                            title={item}
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
                                            checked={person.gender == item.toLowerCase()}
                                            onPress={() => this.onChange('gender', item.toLowerCase())}
                                            containerStyle={{...styles.checkboxContainer, paddingLeft: padding.sm}}
                                            />)
                                        }
                                    </View>
                                </View>
                                <Divider style={styles.divider} />
                                <View style={styles.txtGroup}>
                                    <View style={styles.txtWrapperFull}>
                                        <Text style={{...styles.txtLabel, marginTop: padding.sm}}>Civil Status</Text>
                                        {
                                            ['Married', 'Widowed', 'Separated', 'Divorced', 'Single'].map((item, i) => <CheckBox
                                                key={i}
                                                title={item}
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
                                                checked={person.civil_status == item}
                                                onPress={() => this.onChange('civil_status', item)}
                                                containerStyle={{...styles.checkboxContainer, paddingLeft: padding.sm}}
                                                />)
                                    
                                        }
                                    </View>
                                </View>
                                <Divider style={styles.divider} />
                            </View>
                            <View style={styles.viewContainer}>
                                <View style={styles.txtGroup}>
                                    <View style={styles.txtWrapperFull}>
                                        <FloatingLabel 
                                            labelStyle={labelInput(errors['city'] !== undefined)}
                                            inputStyle={styles.input}
                                            style={styles.formInput}
                                            value={ person.city }
                                            onChangeText={text => this.onChange('city', text )}
                                            onBlur={this.onBlur}
                                            autoCorrect={false}
                                        >City</FloatingLabel>
                                        {
                                            errors['city'] !== undefined &&
                                            (<Text style={ styles.errorStyle }>{ errors['city'] }</Text>)
                                        }

                                        <FloatingLabel 
                                            labelStyle={labelInput(errors['address'] !== undefined)}
                                            inputStyle={styles.input}
                                            style={styles.formInput}
                                            value={ person.address }
                                            onChangeText={text => this.onChange('address', text )}
                                            onBlur={this.onBlur}
                                            autoCorrect={false}
                                        >Address</FloatingLabel>
                                        {
                                            errors['address'] !== undefined &&
                                            (<Text style={ styles.errorStyle }>{ errors['address'] }</Text>)
                                        }

                                        <FloatingLabel 
                                            labelStyle={labelInput(errors['contact_no'] !== undefined)}
                                            inputStyle={styles.input}
                                            style={styles.formInput}
                                            value={ person.contact_no }
                                            onChangeText={text => this.onChange('contact_no', text )}
                                            onBlur={this.onBlur}
                                            autoCorrect={false}
                                        >Contact No</FloatingLabel>
                                        {
                                            errors['contact_no'] !== undefined &&
                                            (<Text style={ styles.errorStyle }>{ errors['contact_no'] }</Text>)
                                        }
                                        <FloatingLabel 
                                            labelStyle={labelInput(errors['secondary_contact_no'] !== undefined)}
                                            inputStyle={styles.input}
                                            style={styles.formInput}
                                            value={ person.secondary_contact_no }
                                            onChangeText={text => this.onChange('secondary_contact_no', text )}
                                            onBlur={this.onBlur}
                                            autoCorrect={false}
                                        >Secondary Contact No</FloatingLabel>
                                        {
                                            errors['secondary_contact_no'] !== undefined &&
                                            (<Text style={ styles.errorStyle }>{ errors['secondary_contact_no'] }</Text>)
                                        }
                                        <FloatingLabel 
                                            labelStyle={labelInput(errors['facebook_name'] !== undefined)}
                                            inputStyle={styles.input}
                                            style={styles.formInput}
                                            value={ person.facebook_name }
                                            onChangeText={text => this.onChange('facebook_name', text )}
                                            onBlur={this.onBlur}
                                            autoCorrect={false}
                                        >Facebook Name</FloatingLabel>
                                        {
                                            errors['facebook_name'] !== undefined &&
                                            (<Text style={ styles.errorStyle }>{ errors['facebook_name'] }</Text>)
                                        }
                                        <FloatingLabel 
                                            labelStyle={labelInput(errors['remarks'] !== undefined)}
                                            inputStyle={{...styles.input, height: 100}}
                                            style={styles.formInput}
                                            value={ person.remarks }
                                            onChangeText={text => this.onChange('remarks', text )}
                                            onBlur={this.onBlur}
                                            multiline={true}
                                            autoCorrect={false}
                                        >Remarks</FloatingLabel>
                                        {
                                            errors['remarks'] !== undefined &&
                                            (<Text style={ styles.errorStyle }>{ errors['remarks'] }</Text>)
                                        }
                                    </View>
                                </View>
                            </View>
                            <View style={styles.viewContainer}>
                                <CollapsibleView
                                    title="Ministry"
                                    collapsed={false}
                                    style={{...styles.container, width: '100%' }}
                                    headerStyle={styles.headerStyle}
                                    headerIconSize={20}
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
                                <Divider style={styles.divider} />
                                <CollapsibleView
                                    title="Leadership Level"
                                    collapsed={false}
                                    style={{...styles.container, width: '100%' }}
                                    headerStyle={styles.headerStyle}
                                    headerIconSize={20}
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
                                <Divider style={styles.divider} />
                                <CollapsibleView
                                    title="Auxiliary Group"
                                    collapsed={false}
                                    style={{...styles.container, width: '100%' }}
                                    headerStyle={styles.headerStyle}
                                    headerIconSize={20}
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
                                <Divider style={styles.divider} />

                                <CollapsibleView
                                    style={{...styles.container, width: '100%' }}
                                    title="School Level"
                                    collapsed={false}
                                    headerStyle={styles.headerStyle}
                                    headerIconSize={20}
                                    headerIconColor="black"
                                    headerTextStyle={styles.headerTextStyle}
                                >
                                    <View style={styles.collapsViewStyle}>
                                    { 
                                        options &&
                                        options.class_categories && options.class_categories.map((item, i) => {
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
                                <Divider style={styles.divider} />
                                <CollapsibleView
                                    title="Categories"
                                    style={{...styles.container, width: '100%' }}
                                    collapsed={false}
                                    headerStyle={styles.headerStyle}
                                    headerIconSize={20}
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

    row: {
        flex: 1, 
        flexDirection: 'row', 
        marginVertical: 5,
    },
    container: {
        ...container,
        padding:0,
        backgroundColor: colors.grey
    },
    heading: {
        fontSize: 20,
    },
    avatarContainer: {
        ...container,
        alignItems: 'center',
        
    },
    divider: { 
        backgroundColor: colors.grey, 
        height: 1, 
        width: '100%',
        margin:0,
        padding:0,
    },
    viewContainer: {
        marginBottom: padding.sm,
        backgroundColor: colors.tertiary,
        // alignItems: 'flex-start',
    },
    txtGroup: {
        // ...container,
        // flexDirection: 'column',
        // width: '100%',
        display: 'flex'
    },
    txtWrapperFull: {
        width: '100%',
        marginBottom:padding.sm
        // flex: 1,
        // flexDirection: 'column',
        // alignItems: 'flex-start',
    },
    txtWrapperLeft: {
        width: '70%',
    },  
    txtWrapperRight: {
        width: '30%',
    },
    txtLabel: {
        fontSize:14,
        color: colors.grey2,
        marginBottom: 0,
        paddingLeft: padding.sm
        // alignSelf: 'stretch'
    },
    txtLabelError: {
        fontSize:14,
        marginBottom: 0,
        alignSelf: 'stretch',
        color: 'red'
    },
    txtValue: {
        fontSize: 18,
        alignSelf: 'stretch'
    },
    txtIcon: {
        padding: 0,
        paddingRight: padding.md,
        paddingLeft: padding.md
    },
    txtIconRightBordered: {
        padding: 0,
        paddingRight: padding.md,
        paddingLeft: padding.md,
        borderRightWidth: 1,
        borderRightColor: colors.grey2
    },
    iconWrapper: { 
        display: 'flex',
        flexDirection: 'row'
    },
    inputContainer: { 
        width: '100%',
        alignSelf: 'stretch',
        // borderBottomWidth: 0,
        padding:0,
        margin:0
    },
    txtInput: {
        fontSize: 16,
        height:30,
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
    headerStyle: {
        padding: padding.sm,
        paddingLeft: 0,
        paddingRight: 0,
        borderBottomWidth: 1,
        borderColor: colors.grey,
        backgroundColor: colors.tertiary
    },
    headerTextStyle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    collapsViewStyle: {
        width: '100%',
        borderWidth: 0,
        padding:padding.sm,
        backgroundColor: colors.tertiary
    },
    collapseableContainer: { 
        paddingLeft: padding.sm,
        paddingRight: padding.sm 
    },
    labelInput: {
        color: colors.grey2,
        fontSize: 14
    },
    labelInputError: {
        color: 'red',
        fontSize: 14
    },
    formInput: {    
        borderBottomWidth: 1, 
        marginLeft: 0,
        borderColor: colors.grey,       
    },
    input: {
        borderWidth: 0,
        fontSize: 14
    },
    errorStyle: { 
        color: 'red', 
        fontSize: 12,
        padding: padding.sm
    }
});


const mapStateToProps = (state) => {
    const { options, person } =  state.people;
    const { user } = state.auth;
    return {
        options,
        person,
        user
    }
}



const mapPropsToDispatch = (dispatch) => {
    return {
        getDropdownSelections: () => dispatch(peopleActions.getOptions()),
        create: (person) => dispatch(peopleActions.createPerson(person)),
        update: (id, person) => dispatch(peopleActions.updatePerson(id, Object.assign(person, { _method: 'PUT' })))
    }
}


export default connect(mapStateToProps, mapPropsToDispatch)(PersonForm)