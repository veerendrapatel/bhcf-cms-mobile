import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { dimensions, colors, padding, fonts, container } from '../../../styles/base';
import CellReports from '../../cellgroup/CellReports';
import { ButtonGroup } from 'react-native-elements';
class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            person: this.props.navigation.state.params.person,
            selectedIndex
        }
        this.updateIndex = this.updateIndex.bind(this);
    }

    updateIndex = (selectedIndex) => {
        this.setState({ selectedIndex });
    }

    render() {
        const buttons = ['CellGroup', 'Sunday Celebration'];
        const { selectedIndex } = this.state
        return (
            <View style={styles.container}>
                <View>
                    <ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={selectedIndex}
                        buttons={buttons}
                        containerStyle={{height: 100}}
                    />
                </View>
                <CellReports personID={ this.state.person.id } {...this.props}/>
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

export default connect(mapStateToProps)(Reports);