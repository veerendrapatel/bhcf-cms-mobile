import React, { Component } from 'react';

import { StyleSheet, View, ScrollView, Text, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { ListItem, CheckBox, Icon } from 'react-native-elements';
import HttpService  from '../services/services';
import DatePicker from 'react-native-datepicker'
import { getCurrentUser } from '../services/auth';
var Device_Width = Dimensions.get('window').width ;

export default class CellGroup extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
          headerTitle: 'Cell Group Attendance',
          headerRight: navigation.state.params && navigation.state.params.headerRight
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            date: null,
            attendances: []
        }
    }

    componentDidMount() {
      this.props.navigation.setParams({
              headerRight: (<TouchableOpacity style={{ padding: 10, flex: 1, flexDirection: 'row', alignItems: 'center' }} onPress={this.save}><Text>Save</Text></TouchableOpacity>)
      });
      
      getCurrentUser().then(res => {
          let attendances = this.state.attendances;
          const a = this.state.attendances;
          const currentUser = JSON.parse(res);
          HttpService.get(`members/${currentUser.id}/attendance/cellgroup`)
          .then(res => {
            if (res.ok) {
              a[res.data[0].week] = res.data;
              this.setState({attendances: a});
            }
          }, err => Alert.alert('Error', err.message));
      });
        
    }

    save() {

    }

    updateAttendance(attendance, i) {
      attendance[i]['attended'] = attendance[i]['attended'] == 0 ? 1 : 0;
      console.log();
    }

    render() {
        const {date, attendances} = this.state;
        return (

            <View style={styles.MainContainer}>
                    <DatePicker
                                    style={{width: 200}}
                                    date={this.state.date}
                                    
                                    mode="date"
                                    placeholder="select date"
                                    format="YYYY-MM-DD"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    onDateChange={(date) => {this.setState({date: date})}}
                                />
                <ScrollView 
                    horizontal = { true } 
                    showsHorizontalScrollIndicator = {false}
                    pagingEnabled = { true } >
                        {
                          attendances &&
                          Object.keys(attendances).map((key, i) => {
                            return (<View key={key} index={i} style={ styles.FirstBlockStyle }>
                            <ScrollView style={{ width: '100%' }}>
                                {
                                  
                                  attendances[key].map((data, x) => {
                                    return (
                                      <ListItem 
                                        key={data.id}
                                        roundAvatar
                                        title={`${data.first_name} ${data.last_name}`} 
                                        leftAvatar={{ 
                                            source: data.avatar && data.avatar.small ?  {uri: data.avatar.small} : null, title: data.first_name.charAt(0) } } 
                                        titleStyle={{ fontWeight: 'bold' }}
                                        containerStyle={{ borderBottomWidth: 1, borderBottomColor: '#c1c1c1' }} 
                                        rightIcon={<Icon color={ data.attended ? '#3cea8d': '#FF5722'} size={50} name={ data.attended ? `ios-checkmark-circle` : `ios-close-circle`} type="ionicon" />}
                                        onPress={() => {
                                          attendances[key][x]['attended'] = data.attended == 0 ? 1 : 0;
                                          this.setState({ attendances: attendances });
                                        }}
                                    />
                                    )
                                  })
                                }
                                </ScrollView>
                            </View>)
                          })
                        }
            
                        <View style = { styles.SecondBlockStyle }>
                        
                            <Text style={styles.TextStyle}> This is View 2 </Text>

                            {/* Put All Your Components Here Which you Want to Show Inside This View. */}

                        </View>

            
                        <View style = { styles.ThirdBlockStyle }>
                        
                            <Text style={styles.TextStyle}> This is View 3 </Text>

                            {/* Put All Your Components Here Which you Want to Show Inside This View. */}

                        </View>
                
                </ScrollView>

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