import React, { Component } from 'react';
import { Text, View, ActivityIndicator, FlatList, TouchableHighlight, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { dimensions, colors, padding, fonts, container } from '../../../styles/base';
import { Input, Button, Avatar, Icon } from 'react-native-elements';
import Moment from 'moment';
import { connect } from 'react-redux';
import {  schoolStatusActions, schoolClassActions  } from '../../../store/actions';


class EnrollmentForm extends Component {
    state = {
        selected_batch_ID: null
    }
    componentDidMount() {
        if (this.props.navigation.state.params && this.props.navigation.state.params.selected_batch_ID) {
            const selected_batch_ID = this.props.navigation.state.params.selected_batch_ID;
            this.setState({ selected_batch_ID: selected_batch_ID });

            schoolClassActions.getPeopleWithEnrolledStudents( selected_batch_ID );
        }
    }

    _onPress = (personID, flag) => {
        const selected_batch_ID = this.state.selected_batch_ID;
        schoolClassActions.enroll(selected_batch_ID, personID, {  flag: !flag });
    }

    render() {
        const { loading, people } = this.props;
        return (
            <View style={ styles.container }>
                {
                    !loading ?
                    (
                        <ScrollView style={ styles.container }>
                            {
                                people &&
                                <View>
                                    <FlatList
                                        data={people}
                                        renderItem={({item, separators}) => {
                                                return (
                                                    <TouchableHighlight
                                                        onPress={this._onPress(item.id, item.exist)}
                                                        onShowUnderlay={separators.highlight}
                                                        onHideUnderlay={separators.unhighlight}
                                                        style={ styles.itemContainer }>
                                                        <View>
                                                            {
                                                                item.avatar ? 
                                                                (
                                                                    <Avatar
                                                                        rounded
                                                                        source={{
                                                                            uri: item.avatar,
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <Avatar 
                                                                        rounded
                                                                        size="large"
                                                                        title={item.full_name.charAt(0)} 
                                                                    />
                                                                )
                                                            }
                                                        </View>
                                                        <View style={{backgroundColor: 'white'}}>
                                                            <Text>{item.full_name}</Text>
                                                        </View>
                                                        <View>
                                                            <Icon 
                                                                color={ item.exist ? colors.primary : colors.orange} 
                                                                size={50} 
                                                                name={ item.exist ? `ios-checkmark-circle` : `ios-close-circle`} 
                                                                type="ionicon"   
                                                            />
                                                        </View>
                                                    </TouchableHighlight>
                    
                                                )
                                            }
                                        }
                                    />
                                </View>
                            }
                        </ScrollView>
                    ): (
                        <View style={styles.container}>
                            <ActivityIndicator size="large" />
                        </View>
                    )
                }
            </View>
        )
    }
}

const mapsStateToProps = (state) => {
    const { people, loading } = state.schoolClass
    return {
        loading,
        people
    }
}

const styles = StyleSheet.create({
    container: {
        ...container,
        backgroundColor: '#fcfcfa'
    },
    itemContainer: {
        ...container,
    }
});


export default connect(mapsStateToProps)(EnrollmentForm);