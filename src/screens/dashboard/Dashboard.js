import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { Dimensions, ScrollView } from 'react-native';
import {  Icon, ThemeProvider } from 'react-native-elements';
import {connect} from 'react-redux';
import { dimensions, colors, padding, fonts } from '../../styles/base';
import { peopleActions } from '../../store/actions';
import Spinner from 'react-native-loading-spinner-overlay';

const screenWidth = Dimensions.get('window').width
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit';

class Dashboard extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
        headerTitle: 'Dashboard',
        headerRight: (
            <View style={{flex: 1, flexDirection: 'row', padding: 10 }}>
                <Icon name="menu" type="ios-menu" onPress={() => navigation.openDrawer()} />
            </View>
        ),
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
        }
    }

    runSyncer = () => {
        
        this.setState({ spinner: true });

        const { fetchPeople, people, fetchPeopleDropdownOptions } = this.props;
        let flag = true;
        let limit = 1000;
        let offset = 0;
        let refreshId = setInterval( function( ) {
            const query = `offset=${offset}&limit=${limit}`;

            
            fetchPeople(query);
            if (people.totalSize !== null && people.people !== null && people.totalSize === people.people.length + 1) {
                flag = false;
                clearInterval(refreshId);
            }
            offset++;
            // offset += limit;
        }, 2000);
        fetchPeopleDropdownOptions();


        // this.setState({ spinner: false });
    }

    componentDidMount() {
        // this.runSyncer();
    }

    render() {
        const { spinner } = this.state;
        return (
            <View style={styles.container}>
                <Spinner
                    visible={spinner}
                    textContent={'Please wait while syncing data...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <ScrollView>
                    <View>
                        <View style={styles.row}>
                            <View style={styles.box1}>
                                <Text style={styles.boxLabel}>1,320</Text>
                                <Text style={styles.boxSubLabel}>Total Guest/VIP</Text>
                            </View>
                            <View style={styles.box2}>
                                
                                <Text style={styles.boxLabel}>1,320</Text>
                                <Text style={styles.boxSubLabel}>Total People</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.box3}>
                                <Text style={styles.boxLabel}>1,320</Text>
                                <Text style={styles.boxSubLabel}>Total Regular</Text>
                            </View>
                            <View style={styles.box4}>
                                <Text style={styles.boxLabel}>2,908</Text>
                                <Text style={styles.boxSubLabel}>Total Cell</Text>
                            </View>
                        </View>
                        <LineChart
                            data={{
                                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                                datasets: [{
                                    data: [
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100
                                    ]
                                }]
                            }}
                            width={screenWidth - 30} // from react-native
                            height={220}
                            chartConfig={chartConfig}
                            bezier
                            style={{
                                marginVertical: 8
                            }}
                        />
                        <Text style={styles.titleText}>
                            Recent activities
                        </Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}



const box = {
    width: dimensions.fullWidth / 2, 
    height: 100, 
    flex: 1,  
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5
}

const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
}

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: colors.tertiary
    },
    container: {
        padding: padding.sm,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.tertiary
    },
    row: {
        flex: 1, 
        flexDirection: 'row', 
        marginVertical: 5
    },
    box1: {
        ...box,
        backgroundColor: colors.primary,
    },
    box2: {
        ...box,
        backgroundColor: '#7095d2', 
    },
    box3: {
        ...box,
        backgroundColor: '#c29cc2',
    },
    box4: {
        ...box,
        backgroundColor: '#FF5722', 
    },
    boxLabel: { 
        fontSize: fonts.lg, 
        fontWeight: "bold", 
        marginVertical: 10, 
        color: colors.tertiary 
    },
    boxSubLabel: {
        color: colors.tertiary 
    }
});



const mapStateToProps = (state) => {
  const { auth, people } = state;
  return {
    auth,
    people
  }
}

const mapPropsToDispatch = (dispatch) => {
    return {
       fetchPeople: ( q ) => dispatch(peopleActions.fetchAll(q)),
       fetchPeopleDropdownOptions: () => dispatch(peopleActions.getOptions())
    }
}


export default connect(mapStateToProps, mapPropsToDispatch)(Dashboard);
