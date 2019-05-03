import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ListItem, CheckBox, Icon, Overlay, Button } from 'react-native-elements';
import Moment from 'moment';
import { connect } from 'react-redux';
import { cellGroupActions } from '../../store/actions';
import { dimensions, colors, padding, fonts, container, row } from '../../styles/base';
import DatePicker from 'react-native-datepicker';
import { startOfWeek, endOfWeek } from '../../helpers/misc';




const today = Moment();

// const startOfWeek = ( date ) => {
//   return Moment(date).startOf('week').add(1, 'day').format('MMM D');
// }

// const endOfWeek = ( date ) => {
//   return Moment(date).endOf('week').add(1, 'day').format('MMM D');
// }

class AttendanceForm extends Component {
    static navigationOptions = ({ navigation }) => {

      const {headerTitle} = navigation.state.params;

      return {
        headerTitle: headerTitle ? headerTitle : startOfWeek(today) +' -  ' + endOfWeek(today) + ' ' + today.format('YYYY'),
        headerRight: (
            <View style={{flex: 1, flexDirection: 'row', padding: 10 }}>
                <Icon name="menu" type="ios-menu" onPress={() => navigation.openDrawer()} />
            </View>
          ),
        }
    };

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        const startDate = params.startDate != undefined ? Moment(params.startDate) : today;
        const endDate = params.endDate != undefined ? Moment(params.endDate) : today;

        this.state = {
            date: null,
            selectedIndex: null,
            selectedItem: null,
            isOverlayVisible: false,
            selectedDate: startDate,
            // personID: this.props.navigation.state.params ? this.props.navigation.state.params.personID : today.format('YYYY'),
            year: params ? params.year : today.format('YYYY'),
            week: params ? params.week : today.format('ww'),
            attendances: [],
            loading: true,
        }

        

        this.props.navigation.setParams({
          headerTitle: startOfWeek(startDate) +' -  ' + endOfWeek( endDate ) + ' ' +  endDate.format('YYYY'),
        });


    }


    componentDidMount() {
      const { dispatch, user, initAttendanceForm } = this.props;
      const { year, week, personID } = this.props.navigation.state.params;

      // const leaderID = this.props.navigation.state.params && this.props.navigation.state.params.personID ? this.props.navigation.state.params.personID : user.member.id;
      
      initAttendanceForm( personID,  year, week );
     
    }

    updateAttendance(data, index) {
      const { dispatch, user, saveAttendance } = this.props;
      const { year, week, selectedDate } = this.state;
      // check if current user is the leader
      if ( user.member.id == data.leader_id ) {
        const attendance = {
            member_id: data['member_id'],
            attended: data['attended'],
            yearweek: data['yearweek'],
            date_attended: data['date_attended'] == null ? Moment(selectedDate).format('YYYY-MM-DD HH:mm:ss') : data['date_attended']
        }
        console.log(data['date_attended']);
        saveAttendance( user.member.id, year, week, attendance, index );
      }
    }
    
    listTitle = (item) => {
      let icons = [];
      if ( item.count < 4 && item.count != 0 ) {
        for (let i = 0; i < item.count; i++) {
          icons.push(<Icon key={i} color={ colors.warning } size={15} name='ios-star' type="ionicon" />);
        }
      }else if ( item.count != 0 && item.count >=4 ) {
        icons.push(<Icon key={0} color={ colors.danger } size={15} name='ios-ribbon' type="ionicon" />);
      }

      return (
        <View>
          <Text style={{ fontWeight: 'bold' }}>{`${item.full_name}`}</Text>
          <View style={{ display: 'flex', flexDirection: 'row' } }>{icons}</View>
      </View>
      )
    }
    render() {

        const { isOverlayVisible, selectedIndex, selectedItem, year, week, selectedDate } = this.state;
        const { user, cellReport } = this.props;
        const { loading, items } = cellReport;
        
        const data = items !== undefined && items[year] !== undefined && items[year][week] !== undefined ? items[year][week] : null;
       
        

        return (
            <View style={styles.container}>
            { 
                !loading ?
                (
                    <ScrollView style={{ width: '100%' }}>
                    {
                        data && data !== undefined && data.attendances ? (
                            data.attendances.map((item, i) => {
                              const avatar = item.avatar ? JSON.parse(item.avatar) : null;
                              return (
                                <ListItem 
                                    key={i}
                                    roundAvatar
                                    title={this.listTitle(item)} 
                                    subtitle={item.date_attended &&<Text style={{ color: colors.grey2 }}>{Moment(item.date_attended).format('MMM Do YYYY')}</Text>}
                                    leftAvatar={
                                      { 
                                        source: avatar && avatar.small ?  {uri: avatar.small} : null, title: item.full_name.charAt(0) }
                                    } 
                                    titleStyle={{ fontWeight: 'bold' }}
                                    containerStyle={{ borderBottomWidth: 1, borderBottomColor: colors.grey }} 
                                    rightAvatar={
                                      <Icon 
                                        color={ item.attended == 1 ? colors.primary : colors.grey} 
                                        size={40} 
                                        name='ios-checkmark-circle'
                                        type="ionicon"   
                                        onPress={() => {
                                           
                                            item.attended = item.attended == 1 ? 0 : 1;
                                            
                                            this.updateAttendance(item, i);
                                          
                                          }
                                        }
                                      />
                                    }
                                    rightIcon={
                                        <Icon 
                                          color={ colors.grey } 
                                          size={30} 
                                          name='ios-more'
                                          type="ionicon"  
                                          disabled={ user.member.id === item.leader_id && item.attended != 1 } 
                                          disabledStyle={{ backgroundColor: colors.tertiary }}
                                          onPress={() => {
                                            this.setState({ isOverlayVisible: true, selectedIndex: i, selectedItem: item })}}
                                        />
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
            { 
              selectedItem &&
              <Overlay isVisible={ isOverlayVisible }  height={300}>
                <View style={
                  styles.container
                }>
                  <Text style={{
                    fontSize: 16,
                    marginBottom: padding.sm,
                  }}>{ selectedItem.full_name }</Text>
                  <DatePicker
                    style={{width: '100%', padding: 0,marginBottom: padding.md}}
                    date={Moment( selectedDate ).format('YYYY-MM-DD')}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={false}
                    minDate={ Moment( selectedDate ).startOf('week').add(1, 'day').format('YYYY-MM-DD') }
                    maxDate={ Moment( selectedDate ).endOf('week').add(1, 'day').format('YYYY-MM-DD') }
                    onDateChange={(date) => {
                      this.setState({ selectedItem: { ...selectedItem, date_attended: date  } })
                    }}
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
                    <Button onPress={() =>  {
                        this.updateAttendance(this.state.selectedItem, selectedIndex);
                        this.setState({ isOverlayVisible: false });
                        }
                      } title="Save" />
                    <Button onPress={() =>  this.setState({ isOverlayVisible: false }) } title="Cancel" type="clear" />
                    
                  
                </View>
              </Overlay>
            }
            </View> 
        );
    }
}

const styles = StyleSheet.create({

  container :{
    ...container,
    justifyContent: 'center',


  },
  row: {
    ...row,
    height: 50
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
        saveAttendance: ( memberID, year, week, attendance, index ) => dispatch( cellGroupActions.saveAttendance( memberID, year, week, attendance, index ) ),
        initAttendanceForm: ( leaderID,  year, week ) => dispatch( cellGroupActions.AttendanceForm( leaderID,  year, week ) ),
    }
}

export default connect(mapStatetoProps, mapPropsToDispatch)(AttendanceForm);