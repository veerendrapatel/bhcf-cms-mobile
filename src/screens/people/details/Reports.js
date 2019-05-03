import React, { Component } from 'react';
import { View, Text, StyleSheet, NetInfo } from 'react-native';
import { connect } from 'react-redux';
import { dimensions, colors, padding, fonts, container } from '../../../styles/base';
import CellReports from '../../cellgroup/CellReports';
import SundayReports from '../../sundayservice/SundayReports';
import { ButtonGroup, Button, Input, SearchBar } from 'react-native-elements';
import { peopleActions, alertActions, connectionState } from '../../../store/actions';
import Moment from 'moment';
const today = Moment();

class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: today.format('YYYY'),
            person: this.props.navigation.state.params.person,
            selectedIndex: 0
        }
        this.updateIndex = this.updateIndex.bind(this);
        NetInfo.isConnected.fetch().then(this.props.handleConnectivityChange);
    }

    componentWillUnmount() {
 
        NetInfo.isConnected.removeEventListener(
            'connectionChange',
            this.props.handleConnectivityChange
    
        );
    
    }
    

    updateIndex = (selectedIndex) => {
        this.setState({ selectedIndex });
    }

    render() {
        const buttons = ['CellGroup', 'Sunday Celebration'];
        const { selectedIndex, search } = this.state
        const { netInfo } = this.props;
        console.log(selectedIndex);
        return (
            <View style={styles.container}>
                {  
                    !netInfo.isConnected &&
                    <View style={{
                        width: '100%',
                        backgroundColor: colors.danger,
                        alignItems: 'center',
                        padding: 3
                    }}>
                        <Text style={{ color: colors.tertiary }}>No Internet Connection</Text>
                    </View>

                }
                <View>
                    <SearchBar
                        round={true}
                        lightTheme
                        platform="ios"
                        autoCorrect={false} 
                        placeholder="Type Year Here..."
                        onChangeText={(year) => this.setState({ search: year })}
                        value={search}
                    />
                </View>
                <View>
                    <ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={selectedIndex}
                        buttons={buttons}
                        containerStyle={{height: 40}}
                    />
                </View>
                {
                    selectedIndex == 0 ? 
                    (
                        <CellReports personID={ this.state.person.id } {...this.props}/>
                    ) : 
                    (
                        <SundayReports personID={ this.state.person.id } {...this.props}/>
                    )
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        ...container
    },
});

const mapStateToProps = ( state ) => {
    const {netInfo} = state;
    return {
        netInfo
    }
}

const mapPropsToDispatch = (dispatch) => {
    return {
        handleConnectivityChange: (isConnected) => dispatch(connectionState(isConnected))
    }
}

export default connect(mapStateToProps, mapPropsToDispatch)(Reports);