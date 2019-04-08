import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { Dimensions, ScrollView } from 'react-native';
import {  Icon, ThemeProvider } from 'react-native-elements';
import {connect} from 'react-redux';
import { dimensions, colors, padding, fonts } from '../../styles/base';


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

    componentDidMount() {
    }

    render() {
        return (
            <ThemeProvider>
                <View style={styles.container}>
                
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
            </ThemeProvider>
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
    container: {
        padding: padding.sm,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fcfcfa'
    },
    row: {
        flex: 1, 
        flexDirection: 'row', 
        marginVertical: 5
    },
    box1: {
        ...box,
        backgroundColor: '#3cea8d',
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
  const { user } = state.auth;
  return {
    user
  }
}

const mapPropsToDispatch = (dispatch) => {
    return {
       
    }
}


export default connect(mapStateToProps, mapPropsToDispatch)(Dashboard);
