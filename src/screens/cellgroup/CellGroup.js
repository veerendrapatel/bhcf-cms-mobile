import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ListItem, CheckBox, Icon } from 'react-native-elements';
import Moment from 'moment';
import { connect } from 'react-redux';
import { cellGroupActions } from '../../store/actions';
var Device_Width = Dimensions.get('window').width ;


class CellGroup extends Component {
    static navigationOptions = ({ navigation }) => {
      const today = Moment();
      const from_date = today.startOf('week').format('MMM D YYYY');
      const to_date = today.endOf('week').format('MMM D YYYY');
 

        return {
          headerTitle: `${from_date} - ${to_date}`,
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
            attendances: [],
            loading: true,
        }
    }

    componentDidMount() {
      const { dispatch, user } = this.props;


      dispatch( cellGroupActions.getCellGroupAttendance( user.member.id ) );
     
    }

    updateAttendance(data) {
      const { dispatch, user } = this.props;
      const attendance = {
          id: data['id'],
          member_id: data['member_id'],
          attended: data['attended'],
      }
      dispatch( cellGroupActions.createCellGroupAttendance( user.member.id, attendance ) );
    }

    render() {
        const {cellgroup} = this.props;
        const attendances = cellgroup.attendaces;
        const loading = cellgroup.loading;
        return (

            <View style={styles.MainContainer}>
                {
                  loading ? (
                    <View style={styles.container}>
                      <ActivityIndicator size="large" />
                    </View>
                  ): (

                    
                  <ScrollView 
                    horizontal = { true } 
                    showsHorizontalScrollIndicator = {false}
                    pagingEnabled = { true }>
                    {
                      attendances && Object.keys(attendances).map((key, i) => {
                        return (
                          <View key={key} index={i}>
                            <Text style={{flex: 1, alignItems: 'center'}}>{ key }</Text>
                            <View style={ styles.FirstBlockStyle }>
                              <ScrollView style={{ width: '100%' }}>
                                {
                                  attendances[key].map((data, x) => {
                                    const avatar = data.avatar ? JSON.parse(data.avatar) : null;
                                    return (
                                      <ListItem 
                                        key={x}
                                        roundAvatar
                                        title={`${data.first_name} ${data.last_name}`} 
                                        subtitle={
                                            data.attendance_date && 
                                            <Text style={{ marginLeft: 5, color: 'rgba(34,34,34,0.5)' }}> 
                                              {Moment(data.attendance_date).format('MMM Do YYYY')}
                                            </Text> 
                                        }
                                        leftAvatar={
                                          { 
                                            source: avatar && avatar.small ?  {uri: avatar.small} : null, title: data.first_name.charAt(0) }
                                        } 
                                        titleStyle={{ fontWeight: 'bold' }}
                                        containerStyle={{ borderBottomWidth: 1, borderBottomColor: '#c1c1c1' }} 
                                        rightIcon={
                                          <Icon 
                                            color={ data.attended ? '#3cea8d': '#FF5722'} 
                                            size={50} 
                                            name={ data.attended ? `ios-checkmark-circle` : `ios-close-circle`} 
                                            type="ionicon"   
                                          />
                                        }
                                        onPress={
                                          () => {
                                            data.attended = data.attended ? 0 : 1;
                                            attendances[key][x] = data;
                                            this.setState({ attendances: attendances });
                                            this.updateAttendance(data);
                                          }
                                        }
                                      />
                                    )
                                  })
                                }
                              </ScrollView>
                            </View>
                          </View>
                        )
                      })
                    }
                  </ScrollView>
                )
                  
              }
            </View> 
        );
    }
}

const styles = StyleSheet.create({

  MainContainer :{

    flex:1,
    justifyContent: 'center',
    alignItems: 'center'

  },

  FirstBlockStyle:{

    backgroundColor: '#00BCD4',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: Device_Width 

  },

  SecondBlockStyle:{
    
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: Device_Width 
    
  },

  ThirdBlockStyle:{
    
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: Device_Width 
    
  },

  TextStyle:{

    fontSize : 30,
    color: '#fff',
    textAlign : 'center',
    fontWeight: 'bold'
  }

});

const mapStatetoProps = (state) => {
  
  const { cellgroup, auth } = state;
  
  return {
    cellgroup: cellgroup,
    user: auth.user
  }
}

export default connect(mapStatetoProps)(CellGroup);