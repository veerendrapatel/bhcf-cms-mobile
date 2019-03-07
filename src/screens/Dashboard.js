import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { Dimensions, ScrollView } from 'react-native';
import { Header, Icon, ThemeProvider } from 'react-native-elements';
import { MenuBurger } from '../components/Header';
import { styles } from '../services/styles';
const screenWidth = Dimensions.get('window').width
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit'


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

    render() {
        
        return (
            <ThemeProvider>
                <View style={styles.container}>
                
                <ScrollView>
                    <View>
                        <View style={{flex: 1, flexDirection: 'row', marginVertical: 5}}>
                            <View style={{
                                    width: Dimensions.get('window').width / 2, 
                                    height: 100, 
                                    backgroundColor: '#3cea8d',
                                    flex: 1,  
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 5
                                    }}>
                                <Text style={{ fontSize: 18, fontWeight: "bold", marginVertical: 10, color: '#FFF' }}>1,320</Text>
                                <Text style={{ color: '#FFF' }}>Total Guest/VIP</Text>
                            </View>
                            <View style={{
                                width: Dimensions.get('window').width / 2, 
                                height: 100, 
                                backgroundColor: '#7095d2', 
                                flex: 1,  
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 5,
                            }}>
                                
                                <Text style={{ fontSize: 18, fontWeight: "bold", marginVertical: 10, color: '#FFF' }}>1,320</Text>
                                <Text style={{ color: '#FFF' }}>Total People</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', marginVertical: 5}}>
                            <View style={{
                                    width: Dimensions.get('window').width / 2, 
                                    height: 100, 
                                    backgroundColor: '#c29cc2',
                                    flex: 1,  
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 5
                                    }}>
                                <Text style={{ fontSize: 18, fontWeight: "bold", marginVertical: 10, color: '#FFF' }}>1,320</Text>
                                <Text style={{ color: '#FFF' }}>Total Regular</Text>
                            </View>
                            <View style={{
                                width: Dimensions.get('window').width / 2, 
                                height: 100, 
                                backgroundColor: '#FF5722', 
                                flex: 1,  
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 5,
                            }}>
                                <Text style={{ fontSize: 18, fontWeight: "bold", marginVertical: 10, color: '#FFF' }}>2,908</Text>
                                <Text style={{ color: '#FFF' }}>Total Cell</Text>
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
                            width={Dimensions.get('window').width - 30} // from react-native
                            height={220}
                            chartConfig={{
                                backgroundColor: '#e26a00',
                                backgroundGradientFrom: '#fb8c00',
                                backgroundGradientTo: '#ffa726',
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
                            }}
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


export default Dashboard;