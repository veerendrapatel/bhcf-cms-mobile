import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { connect } from 'react-redux';
import { dimensions, colors, padding, fonts, container } from '../../../styles/base';
import { Icon, Avatar, Divider, Badge, Button } from 'react-native-elements';
import { peopleActions } from '../../../store/actions';
import { authConstants } from '../../../store/constants';


class PersonalInformation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            person: null
        }
    }

    componentDidMount() {
        const { findPersonById, navigation } = this.props;
        if (navigation.state.params != undefined) {
            const person = navigation.state.params.person;

            const didBlurSubscription = navigation.addListener(
                'willFocus',
                payload => {
                    // findPersonById( person.id );
                
                }
            );
            
            
            this.setState({ person: person });
        }
    }

    render() {
        const { person } = this.state;
        const { user } = this.props;
        return (
            <View style={styles.container}>
                {   person ? (
                        <ScrollView style={{ width: '100%' }}>
                            {
                                (user.id == person.id || user.id == person.parent_id) &&
                                <View>
                                    <Button
                                        title="Edit"
                                        type="clear" 
                                        onPress={() => this.props.navigation.navigate('PersonForm', { person: person })}
                                    />
                                </View>
                            }
                            <View style={styles.avatarContainer}>
                            {
                                person.avatar ?
                                (
                                    <Avatar rounded size="xlarge" source={{ uri:  person.avatar.thumbnail  }}/>
                                ) : (
                                    <Avatar rounded size="xlarge" icon={{name: 'user', type: 'font-awesome'}}/>
                                
                                )
                                
                            }
                            <View style={{
                                ...styles.row,
                                backgroundColor: colors.tertiary,
                                }}>
                                <Text style={styles.heading}>{ person.nick_name }</Text>
                                {
                                    person.is_birthday_today &&
                                    <Icon 
                                        name="birthday-cake" 
                                        type="font-awesome" 
                                        color={colors.violet} 
                                        containerStyle={{ marginLeft: 5, marginTop: 5 }}
                                        size={15}
                                    />
                                }
                            </View>
                            <Text >{ person.full_name }</Text>
                            </View>
                            <View style={styles.viewContainer}>
                                <View style={styles.txtGroup}>
                                    <View style={styles.txtWrapperLeft}>
                                        <Text style={styles.txtLabel}>Mobile</Text>
                                        <Text style={styles.txtValue}>{ person.contact_no }</Text>
                                    </View>
                                    <View style={styles.txtWrapperRight}>
                                        <View  style={styles.iconWrapper}>
                                            <Icon 
                                                size={30}
                                                name="ios-call"
                                                type="ionicon"
                                                color={ colors.primary }
                                                containerStyle={styles.txtIconRightBordered}
                                                onPress ={() => {
                                                    const args = {
                                                        number: person.contact_no,
                                                        prompt: false,
                                                    };
                                                    
                                                    call(args).catch(err => {
                                                        dispatch(alertActions.error(err.message));
                                                    });
                                                }}
                                            />
                                            <Icon 
                                                size={30}
                                                name="ios-mail"
                                                type="ionicon"
                                                color={ colors.orange }
                                                containerStyle={styles.txtIcon}
                                                onPress={() => {
                                                    Linking.openURL(`sms:?addresses=${person.contact_no}&body=`);
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <Divider style={styles.divider} />
                                <View style={styles.txtGroup}>
                                    <View style={styles.txtWrapperLeft}>
                                        <Text style={styles.txtLabel}>Home</Text>
                                        <Text style={styles.txtValue}>{ person.secondary_contact_no }</Text>
                                    </View>
                                    <View style={styles.txtWrapperRight}>
                                        <View style={styles.iconWrapper}>
                                            <Icon 
                                                size={30}
                                                name="ios-call"
                                                type="ionicon"
                                                color={ colors.primary }
                                                containerStyle={styles.txtIconRightBordered}
                                                onPress ={() => {
                                                    const args = {
                                                        number:person.contact_no,
                                                        prompt: false,
                                                    };
                                                    
                                                    call(args).catch(err => {
                                                        dispatch(alertActions.error(err.message));
                                                    });
                                                }}
                                            />
                                            <Icon 
                                                size={30}
                                                name="ios-mail"
                                                type="ionicon"
                                                color={ colors.orange }
                                                containerStyle={styles.txtIcon}
                                                onPress={() => {
                                                    Linking.openURL(`sms:?addresses=${person.contact_no}&body=`);
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <Divider style={styles.divider} />
                                {person.email &&
                                <View style={styles.txtGroup}>
                                    <View style={styles.txtWrapperLeft}>
                                        <Text style={styles.txtLabel}>Email</Text>
                                        <Text style={styles.txtValue}>{ person.email }</Text>
                                    </View>
                                    <View style={styles.txtWrapperRight}>
                                        <View style={styles.iconWrapper}>
                                            <Icon 
                                                size={30}
                                                name="ios-mail"
                                                type="ionicon"
                                                color={ colors.tertiary }
                                            />
                                        </View>
                                    </View>
                                </View>
                                }
                            </View>
                            <View style={styles.viewContainer}>
                                {
                                    person.birthdate &&
                                    <View style={styles.txtGroup}>
                                        <View style={styles.txtWrapperFull}>
                                            <Text style={styles.txtLabel}>Birthdate</Text>
                                            <Text style={styles.txtValue}>{ person.birthdate }</Text>
                                        </View>
                                    </View>
                                }
                                <Divider style={styles.divider} />
                                {
                                    person.gender &&
                                    <View style={styles.txtGroup}>
                                        <View style={styles.txtWrapperFull}>
                                            <Text style={styles.txtLabel}>Gender</Text>
                                            <Text style={styles.txtValue}>{ person.gender }</Text>
                                        </View>
                                    </View>
                                }
                                <Divider style={styles.divider} />
                                {
                                    person.civil_status &&
                                    <View style={styles.txtGroup}>
                                        <View style={styles.txtWrapperFull}>
                                            <Text style={styles.txtLabel}>Civil Status</Text>
                                            <Text style={styles.txtValue}>{ person.civil_status }</Text>
                                        </View>
                                    </View>
                                }
                                <Divider style={styles.divider} />
                                
                                {
                                    person.address &&
                                    <View style={styles.txtGroup}>
                                        <View style={styles.txtWrapperFull}>
                                            <Text style={styles.txtLabel}>Address</Text>
                                            <Text style={styles.txtValue}>{ person.address }</Text>
                                        </View>
                                    </View>
                                }
                                <Divider style={styles.divider} />
                                {
                                    person.city &&
                                    <View style={styles.txtGroup}>
                                        <View style={styles.txtWrapperFull}>
                                            <Text style={styles.txtLabel}>City</Text>
                                            <Text style={styles.txtValue}>{ person.city }</Text>
                                        </View>
                                    </View>
                                }
                                
                                <Divider style={styles.divider} />
                                {
                                    person.facebook_name &&
                                    <View style={styles.txtGroup}>
                                        <View style={styles.txtWrapperFull}>
                                            <Text style={styles.txtLabel}>Facebook Name</Text>
                                            <Text style={styles.txtValue}  
                                                onPress={() => {
                                                    Linking.openURL(`https://www.facebook.com/${person.facebook_name}`);
                                                }}>/{ person.facebook_name }</Text>
                                        </View>
                                    </View>
                                }
                                <Divider style={styles.divider} />

                                {
                                    person.status &&
                                    <View style={styles.txtGroup}>
                                        <View style={styles.txtWrapperFull}>
                                            <Text style={styles.txtLabel}>Status</Text>
                                            <Text style={styles.txtValue}>{ person.status }</Text>
                                        </View>
                                    </View>
                                }

                                {
                                    person.status &&
                                    <View style={styles.txtGroup}>
                                        <View style={styles.txtWrapperFull}>
                                            <Text style={styles.txtLabel}>Church Status</Text>
                                            <Text style={styles.txtValue}>{person.count_sg >= 4 && person.count_sc >= 4 ? `Regular` :`VIP - (${ person.count_sc } SC/${ person.count_sg } SG)`}</Text>
                                        </View>
                                    </View>
                                }
                                
                            </View>
                            <View style={styles.viewContainer}>
                                {
                                    person.leader &&
                                    <View style={styles.txtGroup}>
                                        <View style={styles.txtWrapperFull}>
                                            <Text style={styles.txtLabel}>Cell Leader</Text>
                                            <Text style={styles.txtValue}>{ person.leader.nick_name }</Text>
                                        </View>
                                    </View>
                                }
                                <Divider style={styles.divider} />
                                {
                                    person.school_status &&
                                    <View style={styles.txtGroup}>
                                        <View style={styles.txtWrapperFull}>
                                            <Text style={styles.txtLabel}>School Status</Text>
                                            <Text style={styles.txtValue}>{ person.school_status.name }</Text>
                                        </View>
                                    </View>
                                }
                                <Divider style={styles.divider} />
                                {
                                    person.leadership_level &&
                                    <View style={styles.txtGroup}>
                                        <View style={styles.txtWrapperFull}>
                                            <Text style={styles.txtLabel}>Leadership Level</Text>
                                            <Text style={styles.txtValue}>{ person.leadership_level.name }</Text>
                                        </View>
                                    </View>
                                }
                                <Divider style={styles.divider} />
                                {
                                    person.auxiliary_group &&
                                    <View style={styles.txtGroup}>
                                        <View style={styles.txtWrapperFull}>
                                            <Text style={styles.txtLabel}>Auxiliary Group</Text>
                                            <Text style={styles.txtValue}>{ person.auxiliary_group.name }</Text>
                                        </View>
                                    </View>
                                }
                                <Divider style={styles.divider} />
                                {
                                    person.category &&
                                    <View style={styles.txtGroup}>
                                        <View style={styles.txtWrapperFull}>
                                            <Text style={styles.txtLabel}>Category</Text>
                                            <Text style={styles.txtValue}>{ person.category.name }</Text>
                                        </View>
                                    </View>
                                }
                            </View>
                            <View style={styles.viewContainer}>
                                <View style={styles.txtGroup}>
                                    <View style={styles.txtWrapperFull}>
                                        <Text style={styles.txtLabel}>Remarks</Text>
                                        <Text style={styles.txtValue}>{ person.remarks }</Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    ) : (
                        <View style={styles.container}>
                            <ActivityIndicator size="large" />
                        </View>
                    )
                }
            </View>
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
        width: '100%' 
    },
    viewContainer: {
        marginBottom: padding.sm,
        backgroundColor: colors.tertiary,
        alignItems: 'flex-start',
    },
    txtGroup: {
        ...container,
        flexDirection: 'row',
        width: '100%'
    },
    txtWrapperFull: {
        width: '100%',
        flex: 1
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
        marginBottom: 5,
        alignSelf: 'stretch'
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
    }
});

const mapStateToProps = ( state ) => {

    const {people, auth} = state;
    return {
        user: auth.user,
        person: people.person
    }
    
}

const mapPropsToDispatch = ( dispatch ) => {
    return {
        findPersonById: (id) => dispatch(peopleActions.findPeopleById( id ))
    }
}

export default connect(mapStateToProps, mapPropsToDispatch)(PersonalInformation);