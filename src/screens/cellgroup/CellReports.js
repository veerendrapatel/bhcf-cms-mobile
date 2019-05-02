import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions, Alert, TouchableOpacity, ActivityIndicator, TouchableHighlight } from 'react-native';
import { ListItem, CheckBox, Icon, Avatar, SearchBar } from 'react-native-elements';
import Moment from 'moment';
import { connect } from 'react-redux';
import { cellGroupActions, connectionState } from '../../store/actions';
import { SwipeListView } from 'react-native-swipe-list-view';
import { dimensions, colors, padding, fonts } from '../../styles/base';

const today = Moment();

class CellReports extends Component {
    static navigationOptions = ({ navigation }) => {
      return {
        headerTitle: navigation.state.params && navigation.state.params.headerTitle ? navigation.state.params.headerTitle : `${today.format('YYYY')}`,
        headerRight: (
            <View style={{flex: 1, flexDirection: 'row', padding: 10 }}>
                <Icon name="menu" type="ios-menu" onPress={() => navigation.openDrawer()} />
            </View>
          ),
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            personID: null,
            selectedYear: today.format('YYYY'),
            selectedWeek: today.format('ww') - 1,
        }
    }


    componentDidMount() {
        const selectedYear = this.state.selectedYear;
        const { dispatch, user, fetchYearlyAttendance } = this.props;
        const leaderID = this.props.personID ? this.props.personID : user.member.id;
        this.setState({ personID: leaderID });
        fetchYearlyAttendance( leaderID, selectedYear );

        this.props.navigation.setParams(
            {
                headerTitle: `${selectedYear}`
                
            }
        );


    }

    render() {
        const { loading, items } = this.props.cellReport;
        const {personID, selectedYear, selectedWeek} = this.state;
        if (items) {
            const data = items && typeof items[selectedYear] !== undefined ? items[selectedYear] : null;
            
            return (

                <View style={styles.container}>
                    { 
                        !loading ?
                        (
                            <ScrollView style={{ width: '100%' }}>
                            {
                                data ? (
                                    Object.keys(data).map((week, i) => {
                                        return (
                                            <ListItem
                                                key={ week }
                                                leftAvatar={{ title: week }}
                                                title={
                                                    <Text>
                                                    {
                                                        Moment(data[week].start_date).format('MMM Do') } - { Moment(data[week].end_date).format('MMM Do') 
                                                    }
                                                    </Text>
                                                }
                                                chevron
                                                bottomDivider={true}
                                                onPress={() => this.props.navigation.navigate('AttendanceForm', { 
                                                    personID: this.state.personID,
                                                    year: selectedYear, 
                                                    week: week
                                                })}
                                            />
                                        )
                                    })
                                ): (
                                    <Text>No data found!</Text>
                                )
                            }
                            </ScrollView>
                        ) : (
                            <View style={styles.container}>
                                <ActivityIndicator size="large" />
                            </View>
                        )
                    }
                    <View style={styles.btnNew}>
                        <Avatar 
                            size="medium"
                            rounded 
                            icon={{ name: 'add', color: colors.tertiary }} 
                            overlayContainerStyle={{backgroundColor: colors.primary}}
                            onPress={() => this.props.navigation.navigate('AttendanceForm', { 
                                personID: personID,
                                year: selectedYear,
                                week: selectedWeek
                            })}
                        />
                    </View>
                </View> 
            );
        } else {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container :{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    btnNew: { 
        position: 'absolute', 
        bottom: 35, 
        right: 35 
    }
});

const mapStatetoProps = (state) => {
  
  const { cellReport, auth } = state;
  return {
    cellReport,
    user: auth.user
  }
}

const mapPropsToDispatch = (dispatch) => {
    return {
        fetchYearlyAttendance: ( leaderID, selectedYear ) => dispatch( cellGroupActions.getLeaderAttendancesByYear( leaderID, selectedYear ) ),
        deletePerson: ( id ) => dispatch(peopleActions.deletePerson( id )),
        handleConnectivityChange: (isConnected) => dispatch(connectionState(isConnected))
    }
}

export default connect(mapStatetoProps, mapPropsToDispatch)(CellReports);