import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ListItem, CheckBox, Icon } from 'react-native-elements';
import Moment from 'moment';
import { connect } from 'react-redux';
import { cellGroupActions } from '../../store/actions';
import { dimensions, colors, padding, fonts } from '../../styles/base';




const today = Moment();

class AttendanceForm extends Component {
    static navigationOptions = ({ navigation }) => {
      
      const headerTitle = today.startOf('week').add(1, 'day').format('MMM D') +' -  ' + today.endOf('week').add(1, 'day').format('D') + ' ' + today.format('YYYY');

      return {
        headerTitle: `${headerTitle}`,
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
            date: null,
            // personID: this.props.navigation.state.params ? this.props.navigation.state.params.personID : today.format('YYYY'),
            year: this.props.navigation.state.params ? this.props.navigation.state.params.year : today.format('YYYY'),
            week: this.props.navigation.state.params ? this.props.navigation.state.params.week : today.format('ww'),
            attendances: [],
            loading: true,
        }
    }


    componentDidMount() {
      const { dispatch, user } = this.props;
      const { year, week } = this.state;
      const leaderID = this.props.navigation.state.params && this.props.navigation.state.params.personID ? this.props.navigation.state.params.personID : user.member.id;
      dispatch( cellGroupActions.AttendanceForm( leaderID,  year, week ) );
     
    }

    updateAttendance(data, index) {
      const { dispatch, user } = this.props;
      const { year, week } = this.state;
      const attendance = {
          member_id: data['member_id'],
          attended: data['attended'],
          yearweek: data['yearweek']
      }

      

      dispatch( cellGroupActions.saveCellGroupAttendance( user.member.id, year, week, attendance, index ) );
    }

    render() {
        const { loading, items } = this.props.cellgroup;
        const { year, week } = this.state;
        const data = items !== undefined && items[year] !== undefined && items[year][week] !== undefined ? items[year][week] : null;
        return (
            <View style={styles.container}>
            { 
                !loading && data ?
                (
                    <ScrollView style={{ width: '100%' }}>
                    {
                        data !== undefined && data.attendances ? (
                            data.attendances.map((item, i) => {
                              const avatar = item.avatar ? JSON.parse(item.avatar) : null;
                              return (
                                <ListItem 
                                    key={i}
                                    roundAvatar
                                    title={`${item.full_name}`} 
                                    subtitle={
                                        item.date_attended && 
                                        <Text style={{ marginLeft: 5, color: colors.grey }}> 
                                          {Moment(item.date_attended).format('MMM Do YYYY')}
                                        </Text> 
                                    }
                                    leftAvatar={
                                      { 
                                        source: avatar && avatar.small ?  {uri: avatar.small} : null, title: item.full_name.charAt(0) }
                                    } 
                                    titleStyle={{ fontWeight: 'bold' }}
                                    containerStyle={{ borderBottomWidth: 1, borderBottomColor: colors.grey }} 
                                    rightIcon={
                                      <Icon 
                                        color={ item.attended ? colors.primary : colors.orange} 
                                        size={50} 
                                        name={ item.attended ? `ios-checkmark-circle` : `ios-close-circle`} 
                                        type="ionicon"   
                                      />
                                    }
                                    onPress={
                                      () => {
                                        item.attended = item.attended === 1 ? 0 : 1;
                                        this.updateAttendance(item, i);
                                      }
                                    }
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
            </View> 
        );
    }
}

const styles = StyleSheet.create({

  container :{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'

  }

});

const mapStatetoProps = (state) => {
  
  const { cellgroup, auth } = state;
  return {
    cellgroup: cellgroup,
    user: auth.user
  }
}

export default connect(mapStatetoProps)(AttendanceForm);