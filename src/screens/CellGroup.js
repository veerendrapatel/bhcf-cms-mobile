import React, { Component } from 'react';

import { StyleSheet, View, ScrollView, Text, Dimensions, Alert } from 'react-native';
import HttpService  from '../services/services';
import DatePicker from 'react-native-datepicker'
import { getCurrentUser } from '../services/auth';
var Device_Width = Dimensions.get('window').width ;

export default class CellGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            attendances: []
        }
    }

    componentDidMount() {
      getCurrentUser().then(res => {
          let attendances = this.state.attendances;
          const currentUser = JSON.parse(res);
          HttpService.get(`members/${currentUser.id}/attendance/cellgroup`)
          .then(res => {
            if (res.ok) {
              let obj = {};
              obj[res.data[0].week] = res.data;
              attendances = attendances.push(obj);

              console.log(obj);
              this.setState({attendances: attendances});
            }
          }, err => Alert.alert('Error', err.message));
      });
        
    }

    render() {
        const {date} = this.state;
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

                        <View style = { styles.FirstBlockStyle }>
                        
                            <Text style={styles.TextStyle}> This is View 1 </Text>

                            {/* Put All Your Components Here Which you Want to Show Inside This View. */}

                        </View>

            
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