import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ListItem, CheckBox, Icon, Overlay, Button } from 'react-native-elements';
import Moment from 'moment';
import { connect } from 'react-redux';
import { cellGroupActions } from '../../store/actions';
import { dimensions, colors, padding, fonts } from '../../styles/base';
import DatePicker from 'react-native-datepicker';


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
        const { params } = this.props.navigation.state;
        
        this.state = {
            date: null,
            selectedIndex: null,
            selectedItem: null,
            isOverlayVisible: false,
            // personID: this.props.navigation.state.params ? this.props.navigation.state.params.personID : today.format('YYYY'),
            year: params ? params.year : today.format('YYYY'),
            week: params ? params.week : today.format('ww'),
            attendances: [],
            loading: true,
        }
    }


    componentDidMount() {
      const { dispatch, user, initAttendanceForm } = this.props;
      const { year, week } = this.state;
      const leaderID = this.props.navigation.state.params && this.props.navigation.state.params.personID ? this.props.navigation.state.params.personID : user.member.id;
      initAttendanceForm( leaderID,  year, week );
     
    }

    updateAttendance(data, index) {
      const { dispatch, user, saveAttendance } = this.props;
      const { year, week } = this.state;
      const attendance = {
          member_id: data['member_id'],
          attended: data['attended'],
          yearweek: data['yearweek'],
          date_attended: data['date_attended']
      }
      // console.log(data);
      saveAttendance( user.member.id, year, week, attendance, index );
    }

    render() {

        const { isOverlayVisible, selectedIndex, selectedItem } = this.state;
        const { loading, items } = this.props.cellReport;
        
        const { year, week } = this.state;
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
                                    title={`${item.full_name}`} 
                                    subtitle={
                                        item.date_attended && 
                                        <Text style={{ marginLeft: 5, color: colors.grey2 }}> 
                                          {Moment(item.date_attended).format('MMM Do YYYY')}
                                        </Text> 
                                    }
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
                                        onPress={
                                            () => {
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
                                          disabled={ item.attended != 1 } 
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
              <Overlay isVisible={ isOverlayVisible }>
                <View>
                  <Text>Hello from Overlay!</Text>
                  <DatePicker
                    style={{width: '100%', padding: 0,margin:0}}
                    date={selectedItem.date_attended}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={false}
                    minDate={ Moment( selectedItem.date_attended ).startOf('week').add(1, 'day').format('YYYY-MM-DD') }
                    maxDate={ Moment( selectedItem.date_attended ).endOf('week').add(1, 'day').format('YYYY-MM-DD') }
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
                            borderWidth:0,
                            paddingLeft: padding.sm,
                            alignItems: 'flex-start',
                            height:30
                        }
                    }}
                />
                  <Button onPress={() =>  this.setState({ isOverlayVisible: false }) } title="Cancel" type="clear" />
                  <Button onPress={() =>  {
                      this.updateAttendance(this.state.selectedItem, selectedIndex);
                      this.setState({ isOverlayVisible: false });
                      }
                    } title="Save" />
                </View>
              </Overlay>
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