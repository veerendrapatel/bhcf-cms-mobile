import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions, Alert, TouchableOpacity, ActivityIndicator, TouchableHighlight } from 'react-native';
import { ListItem, CheckBox, Icon, Avatar, SearchBar, Overlay, Button, Divider } from 'react-native-elements';
import Moment from 'moment';
import { connect } from 'react-redux';
import { cellGroupActions, connectionState } from '../../store/actions';
import { SwipeListView } from 'react-native-swipe-list-view';
import { dimensions, colors, padding, fonts } from '../../styles/base';
import { startOfWeek, endOfWeek } from '../../helpers/misc';
import DatePicker from 'react-native-datepicker';

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
            selectedDate: today.format('YYYY-MM-DD'),
            isOverlayVisible: false,
            personID: null,
            selectedYear: today.format('YYYY'),
            selectedWeek: today.format('ww'),
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

        const { navigation } = this.props;
        const didBlurSubscription = navigation.addListener(
            'willFocus',
            payload => {
                fetchYearlyAttendance( leaderID, selectedYear );
            
            }
        );

    }

    render() {
        const { loading, items } = this.props.cellReport;
        const {personID, selectedYear, selectedWeek, isOverlayVisible, selectedDate} = this.state;
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
                                                    <Text style={{ fontWeight: 'bold' }}>{startOfWeek(data[week].start_date)} - {endOfWeek(data[week].start_date)}</Text>
                                                }
                                                chevron
                                                bottomDivider={true}
                                                onPress={() => this.props.navigation.navigate('AttendanceForm', { 
                                                    personID: this.state.personID,
                                                    year: selectedYear, 
                                                    week: week,
                                                    startDate: data[week].start_date,
                                                    endDate: data[week].end_date,
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
                            onPress={() => this.setState({ isOverlayVisible: true })}
                        />
                    </View>

                    { 
                        isOverlayVisible &&
                        <Overlay isVisible={ isOverlayVisible }  height={300}>
                            <View style={
                            styles.container
                            }>
                            <Text style={{
                                fontSize: 16,
                                marginBottom: padding.sm,
                            }}>Select Date</Text>
                            <DatePicker
                                style={{width: '100%', padding: 0,marginBottom: padding.md}}
                                date={selectedDate}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}
                                maxDate={ Moment( today ).format('YYYY-MM-DD') }
                                onDateChange={(date) => this.setState({ selectedDate: date   })}
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 5,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        borderWidth:1,
                                        borderColor: colors.primary,
                                        paddingLeft: padding.md,
                                        alignItems: 'flex-start',
                                        height:40,
                                        borderRadius: 5,
                                    }
                                }}
                            />
                            <Button 
                                onPress={() => {
                                        this.setState({ isOverlayVisible: false });
                                        this.props.navigation.navigate('AttendanceForm', { 
                                            personID: personID,
                                            year: Moment(selectedDate).format('YYYY'),
                                            week: Moment(selectedDate).format('ww'),
                                            startDate: selectedDate,
                                            endDate: selectedDate,
                                        });

                                    }
                                } 
                                title="Filter" 
                                />

                            <Text style={{
                                margin:padding.md
                            }}>OR</Text>
                            
                            
                            <Button 
                                onPress={() => {
                                        this.setState({ isOverlayVisible: false });
                                        this.props.navigation.navigate('AttendanceForm', { 
                                            personID: personID,
                                            year: selectedYear,
                                            week: selectedWeek,
                                        });

                                    }
                                } 
                                title="CURRENT WEEK" />
                                
                                
                            
                            </View>
                        </Overlay>
                    }
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
    },
    divider: { 
        backgroundColor: colors.grey, 
        height: 1, 
        width: '100%',
        margin:0,
        padding:0,
    },
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