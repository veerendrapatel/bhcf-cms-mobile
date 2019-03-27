import React, { Component } from 'react';
import { Text, View, ActivityIndicator, FlatList, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import { dimensions, colors, padding, fonts, container } from '../../../styles/base';
import { Input, Button, Divider } from 'react-native-elements';
import Moment from 'moment';
import { connect } from 'react-redux';
import {  schoolStatusActions, schoolClassActions  } from '../../../store/actions';

class ClassForm extends React.Component{
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            headerTitle: params && params.headerTitle ? params.headerTitle : 'Create Class',
            headerRight: params && params.headerRight ? params.headerRight : null
        };
    };

    

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
            school_class: {
                id: 0,
                batch_name: null,
                school_year: Moment().format('YYYY'),
                remarks: null,
                school_type: params && params.classTypeID
            }
        }

        
        this.save = this.save.bind(this);
        this.onChange = this.onChange.bind(this);
        
    }

    onChange = (name, value) => {
        this.setState(
            prevState => ({ 
                school_class: {
                    ...prevState.school_class,
                    [name]: value
                }
            })
        );
    }

    save = () => {
        const { dispatch } = this.props;
        const { school_class } = this.state;
        if (school_class.id) {
            school_class._method = 'PUT';
            dispatch( schoolClassActions.update( school_class.id, school_class ) );
        } else {
            school_class._method = 'POST';
            dispatch( schoolClassActions.save( school_class ) );
        }
    }

    componentWillReceiveProps(newProps) {
        if(newProps.selected_batch_ID && this.props.selected_batch_ID && newProps.selected_batch_ID !== this.props.selected_batch_ID) {
            this.props.navigate('EnrollmentForm', { selected_batch_ID: selected_batch_ID });
        }
    }

    componentDidMount = () => {
        const { params } = this.props.navigation.state;
        if (params != undefined) {
            const data = params.class;
            if (data !== undefined) {
                this.setState({ school_class: {
                    id: data.id,
                    batch_name: data.batch_name,
                    school_year: data.school_year,
                    remarks: data.remarks,
                    school_type: data.school_type,
                }  });
            }
        }

        this.props.navigation.setParams(
            {
                headerTitle: 'Create Batch',
                headerRight: (
                    <TouchableOpacity 
                        style={{ padding: 10, flex: 1, flexDirection: 'row', alignItems: 'center' }} 
                        onPress={this.save.bind(this)}>
                        <Text>Save</Text>
                    </TouchableOpacity>
                )
            }
        );
    }

    render() {
        const {school_class} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.viewContainer}>
                    <View style={styles.txtGroup}>
                        <View style={styles.txtWrapperFull}>
                            <Text style={styles.txtLabel}>Batch Name</Text>
                            <Input 
                                defaultValue={school_class.batch_name}
                                onChangeText={text => this.onChange('batch_name', text )}
                                autoCorrect={false}
                                inputContainerStyle={styles.txtValue}
                            />
                        </View>
                    </View>
                    <View style={styles.txtGroup}>
                        <View style={styles.txtWrapperFull}>
                            <Text style={styles.txtLabel}>Year</Text>
                            <Input 
                                defaultValue={school_class.school_year.toString()}
                                onChangeText={text => this.onChange('school_year', text )}
                                autoCorrect={false}
                                inputContainerStyle={styles.txtValue}
                            />
                        </View>
                    </View>
                    <View style={styles.txtGroup}>
                        <View style={styles.txtWrapperFull}>
                            <Text style={styles.txtLabel}>Remarks</Text>
                            <Input 
                                defaultValue={school_class.remarks}
                                onChangeText={text => this.onChange('remarks', text )}
                                autoCorrect={false}
                                multiline={true}
                                inputContainerStyle={styles.txtValue}
                            />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        ...container,
        backgroundColor: '#fcfcfa'
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
        flexDirection: 'row',
        width: '100%'
    },
    txtWrapperFull: {
        width: '100%',
        flex: 1
    },
    txtLabel: {
        fontSize:14,
        color: colors.grey,
        marginBottom: 5,
        alignSelf: 'stretch'
    },
    txtValue: {
        alignSelf: 'stretch',
        width: '100%'
    },
})

const mapStateToProps = (state) => {
    const { success, school_classes, loading, selected_batch_ID } =  state.schoolClass;
    
    return {
        selected_batch_ID,
        loading,
        school_classes,
        success
    }
}


export default connect(mapStateToProps)(ClassForm);