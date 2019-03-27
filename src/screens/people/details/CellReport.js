import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { dimensions, colors, padding, fonts, container } from '../../../styles/base';
import CellGroupAttendance from '../../cellgroup/CellReports';
class CellReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            person: this.props.navigation.state.params.person
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <CellGroupAttendance personID={ this.state.person.id } {...this.props}/>
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
    return {

    }
}

export default connect(mapStateToProps)(CellReport);