import React, { Component } from 'react';
import { Text, View, ActivityIndicator, FlatList, TouchableHighlight, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { dimensions, colors, padding, fonts, container } from '../../../styles/base';
import { Input, Button, Avatar, Icon, ListItem, SearchBar } from 'react-native-elements';
import Moment from 'moment';
import { connect } from 'react-redux';
import {  schoolStatusActions, schoolClassActions  } from '../../../store/actions';
import { paginate } from '../../../helpers/misc';



class EnrollmentForm extends Component {
    _data = [];
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Enroll Students',
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
            selected_batch_ID: null,
            keyword: null,
            people: [],
            loading: true,
            page: 1,
            searching: false
        }

        this.search = this.search.bind(this);
       
    }


    componentDidMount() {
        const { dispatch } = this.props;
        const { params } = this.props.navigation.state;
        if (params && params.selected_batch_ID) {
            const selected_batch_ID = params.selected_batch_ID;
            this.setState({ selected_batch_ID: selected_batch_ID }, () => this.fetchPeople());
        }
        
    }

    fetchPeople = () => {
        const { dispatch } = this.props;
        const { selected_batch_ID } = this.state;
        dispatch(schoolClassActions.getPeopleWithEnrolledStudents( selected_batch_ID ));
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.people !== this.props.people){
            this._data = nextProps.people;
            this.setState({ people: [], page: 1, search: false, loading: nextProps.loading }, () => this.loadMore());
        }
    }

    

    loadMore() {
        if (this._data) {
            if (!this.state.searching && this._data.length >= this.state.page ) {
                const people = paginate(this._data, this.state.page, 12).data;
                if (people.length) {
                    this.setState({ people: this.state.people.concat(people) });
                }
                
            }
        }
        this.setState({ loading: false });
    }

    search = (keyword) => {
        const data = this._data.filter(item => item.full_name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1);
        this.setState({ people: data, page: 1, searching: true });

    }



    _onPress = (personID, flag) => {
        const selected_batch_ID = this.state.selected_batch_ID;
        const { dispatch } = this.props;
        flag = !flag || flag == undefined ? 1 : 0;
        dispatch(schoolClassActions.enroll(selected_batch_ID, personID, {  flag: flag }));
    }

    render() {
        // const { loading, people } = this.props;
        const { keyword, people, loading } = this.state;
        return (
            <View style={ styles.container }>
                {
                    !loading ?
                    (
                        <ScrollView style={ styles.container }>
                            {
                                people &&
                                <View>
                                    <FlatList
                                        data={people}
                                        keyExtractor={(person, index) => index.toString()}
                                        renderItem={({item, i}) => {
                                                return (
                                                    <ListItem 
                                                        key={item.id}
                                                        roundAvatar
                                                        title={`${item.full_name}`}
                                                        leftAvatar={
                                                        { 
                                                            source: item && item.avatar ?  {uri: item.avatar} : null, title: item.full_name.charAt(0).toUpperCase() }
                                                        } 
                                                        titleStyle={{ fontWeight: 'bold' }}
                                                        containerStyle={{ borderBottomWidth: 1, borderBottomColor: colors.grey }} 
                                                        rightIcon={
                                                            <Icon 
                                                                color={ item.is_exist ? colors.primary : colors.orange} 
                                                                size={50} 
                                                                name={ item.is_exist ? `ios-checkmark-circle` : `ios-close-circle`} 
                                                                type="ionicon"   
                                                            />
                                                        }
                                                        onPress={() => this._onPress(item.id, item.is_exist)}
                                                    />
                                                    
                    
                                                )
                                            }
                                        }

                                        ListHeaderComponent={
                                            <SearchBar
                                                round={true}
                                                lightTheme
                                                platform="ios"
                                                placeholder="Type Here..."
                                                onChangeText={text => this.search(text)} 
                                                value={keyword}
                                                autoCorrect={false} 
                                                onClear={
                                                    () => {
                                                        this.setState({ page: 1, searching: false }, () => this.loadMore())
                                                    }
                                                }

                                                onCancel={
                                                    () => {
                                                        this.setState({ page: 1, searching: false }, () => this.loadMore())
                                                    }
                                                }
                                            />
                                        }

                                        onEndReached={
                                            () => {
                                                this.setState((prevState, props) => (
                                                    { 
                                                        page: prevState.page + 1 
                                                    }), () => this.loadMore() );
                                            }
                                        }
                                    />
                                </View>
                            }
                        </ScrollView>
                    ): (
                        <View style={styles.container}>
                            <ActivityIndicator size="large" />
                        </View>
                    )
                }
            </View>
        )
    }
}

const mapsStateToProps = (state) => {
    const { people, loading } = state.schoolClass;
    
    return {
        loading,
        people
    }
}

const styles = StyleSheet.create({
    container: {
        ...container,
        backgroundColor: '#fcfcfa'
    },
    itemContainer: {
        ...container,
        flexDirection: 'row'
    }
});


export default connect(mapsStateToProps)(EnrollmentForm);