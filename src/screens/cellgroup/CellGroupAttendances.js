import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions, Alert, TouchableOpacity, ActivityIndicator, TouchableHighlight } from 'react-native';
import { ListItem, CheckBox, Icon, Avatar, SearchBar } from 'react-native-elements';
import Moment from 'moment';
import { connect } from 'react-redux';
import { cellGroupActions } from '../../store/actions';
import { SwipeListView } from 'react-native-swipe-list-view';
import { dimensions, colors, padding, fonts } from '../../styles/base';

const today = Moment();

class CellGroupAttendances extends Component {
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
            selectedYear: today.format('YYYY')
        }
    }


    componentDidMount() {
        const year = this.state.selectedYear;
        const { dispatch, user } = this.props;
        const leaderID = this.props.personID ? this.props.personID : user.member.id;
        this.setState({ personID: leaderID });
        dispatch( cellGroupActions.getLeaderAttendancesByYear( leaderID, year ) );

        this.props.navigation.setParams(
            {
                headerTitle: `${year}`
                
            }
        );


    }

    render() {
        const { loading, items } = this.props.cellgroup;
        const keyword = '';
        const selectedYear = this.state.selectedYear;
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
                                            onPress={() => this.props.navigation.navigate('CreateCellGroupAttendance', { 
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
                        onPress={() => this.props.navigation.navigate('CreateCellGroupAttendance')}
                    />
                </View>
            </View> 
        );
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
  
  const { cellgroup, auth } = state;
  return {
    cellgroup: cellgroup,
    user: auth.user
  }
}

export default connect(mapStatetoProps)(CellGroupAttendances);