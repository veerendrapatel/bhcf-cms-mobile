import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { connect } from 'react-redux';
import { dimensions, colors, padding, fonts, container } from '../../../styles/base';
import { Icon, Avatar, Divider, Badge, Button } from 'react-native-elements';
import { peopleActions } from '../../../store/actions';

class PersonalInformation extends Component {
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

    componentDidMount() {
        const { dispatch } = this.props;
        if (this.props.navigation.state.params != undefined) {
            const person = this.props.navigation.state.params.person;

            const didBlurSubscription = this.props.navigation.addListener(
                'willFocus',
                payload => {
                    //Todo
                    dispatch(peopleActions.findPeopleById( person.id ));
                }
            );
            
            
            // this.setState({ person: person });
            this.props.navigation.setParams({
                    headerTitle: person.full_name,
                    headerRight: (
                    <TouchableOpacity 
                        style={{ padding: 10, flex: 1, flexDirection: 'row', alignItems: 'center' }} 
                        onPress={() => this.props.navigation.navigate('PersonForm', { person: person })}>
                        <Text>Edit</Text>
                    </TouchableOpacity>
                    )
            });
        }
    }

    render() {
        const { person } = this.props;
        return (
            <View style={styles.container}>
                {
                    person ? (
                        <ScrollView style={{ width: '100%' }}>
                            <View>
                                <Button
                                    title="Edit"
                                    type="clear" 
                                    onPress={() => this.props.navigation.navigate('PersonForm', { person: person })}
                                />
                            </View>
                            <View style={styles.avatarContainer}>
                            {
                                person.avatar ?
                                (
                                    <Avatar rounded size="xlarge" source={{ uri:  person.avatar.thumbnail  }}/>
                                ) : (
                                    <Avatar rounded size="xlarge" icon={{name: 'user', type: 'font-awesome'}}/>
                                
                                )
                                
                            }
                            <Text style={styles.heading}>{ person.full_name }({ person.nick_name })</Text>
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
                                    person.status &&
                                    <View style={styles.txtGroup}>
                                        <View style={styles.txtWrapperFull}>
                                            <Text style={styles.txtLabel}>Status</Text>
                                            <Text style={styles.txtValue}>{ person.status.name }</Text>
                                        </View>
                                    </View>
                                }
                                <Divider style={styles.divider} />
                                {
                                    person.leader &&
                                    <View style={styles.txtGroup}>
                                        <View style={styles.txtWrapperFull}>
                                            <Text style={styles.txtLabel}>Cell Leader</Text>
                                            <Text style={styles.txtValue}>{ person.leader.nick_name }</Text>
                                        </View>
                                    </View>
                                }
                            </View>
                            <View style={styles.viewContainer}>
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
        color: colors.grey,
        marginBottom: 5,
        textAlign: 'left',
        alignSelf: 'stretch'
    },
    txtValue: {
        fontSize: 18,
        textAlign: 'left',
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
        borderRightColor: colors.grey
    },
    iconWrapper: { 
        display: 'flex',
        flexDirection: 'row'
    }
});

const mapStateToProps = ( state ) => {

    const {person} = state.people;
    return {
        person
    }
    
}

export default connect(mapStateToProps)(PersonalInformation);