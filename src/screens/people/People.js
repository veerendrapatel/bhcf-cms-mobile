import React, { Component } from 'react';
import { Text, View, ActivityIndicator, FlatList, TouchableHighlight, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Icon, ThemeProvider, Badge, SearchBar, Avatar } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import { peopleActions } from '../../store/actions';
import Moment from 'moment';
import { connect } from 'react-redux';
import {styles} from '../../styles/styles';

class People extends Component {
  
    _data = [];
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'People',
            headerRight: (
                <View style={{flex: 1, flexDirection: 'row', padding: 10 }}>
                    <Icon name="menu" iconStyle={{ marginLeft: 10 }} onPress={() => navigation.openDrawer()} />
                </View>
            ),
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            keyword: null,
            people: [],
            loading: true,
            page: 1,
            searching: false
        }

        this.search = this.search.bind(this);
    }

    paginate = (items, page, per_page) => {
 
        var page = page || 1,
        per_page = per_page || 10,
        offset = (page - 1) * per_page,
        
        paginatedItems = items.slice(offset).slice(0, per_page),
        total_pages = Math.ceil(items.length / per_page);
        return {
            page: page,
            per_page: per_page,
            pre_page: page - 1 ? page - 1 : null,
            next_page: (total_pages > page) ? page + 1 : null,
            total: items.length,
            total_pages: total_pages,
            data: paginatedItems
        };
    }
    
    componentDidMount = () => {
        const { dispatch, user } = this.props;
        dispatch(peopleActions.getAll( user.id ));  
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.people !== this.props.people){
            this._data = nextProps.people.items;
            this.loadMore();
        }
    }

    loadMore() {
        if (!this.state.searching && this._data.length > this.state.page ) {
            const people = this.paginate(this._data, this.state.page, 12).data;
            if (people.length) {
                this.setState({ people: this.state.people.concat(people) });
            }
            this.setState({ loading: false });
        }
    }

    search = (keyword) => {
        const data = this._data.filter(person => person.full_name.indexOf(keyword) !== -1);
        this.setState({ people: data, page: 1, searching: true });

    }

    render() {
        const { keyword, people, loading } = this.state;
        const { navigation } = this.props;
        return (
            <ThemeProvider style={styles.container}>
               { !loading ? 
                    (
                        <SwipeListView
                            useFlatList
                            onEndReachedThreshold={0.5}
                            leftOpenValue={75}
                            rightOpenValue={-75}
                            keyExtractor={(person, index) => index.toString()}
                            data={people}
                            renderItem={
                                (row, rowMap) => {
                                    const person =  row.item;
                                    return (
                                        <TouchableHighlight
                                            onPress={() => {
                                            this.props.navigation.navigate('PeopleDetails', { person: person });
                                            }}
                                            style={_styles.rowFront}
                                            underlayColor={'#FFF'}>
                                            <View style={
                                                {  
                                                    flex: 1, 
                                                    flexDirection: 'row',
                                                    padding:10
                                                }
                                            }>
                                                <View>
                                                    { 
                                                        person.avatar ?
                                                        (
                                                            <Avatar 
                                                                rounded
                                                                size="large"
                                                                source={{ uri: person.avatar.small}}
                                                                title={person.full_name.charAt(0)} 
                                                            />
                                                        ) : (
                                                            <Avatar 
                                                                rounded
                                                                size="large"
                                                                title={person.full_name.charAt(0)} 
                                                            />
                                                        )
                                                    }
                                                </View>
                                                <View style={
                                                    {
                                                        marginLeft: 10,
                                                    }
                                                }>
                                                    <Text 
                                                        style={
                                                            {
                                                                fontWeight: 'bold',
                                                            }
                                                        }
                                                    >{ person.full_name } ({person.nick_name})</Text>
                                                    <View style={
                                                        { 
                                                            flex: 1, 
                                                            flexDirection: 'row', 
                                                            alignItems: 'center',
                                                        }
                                                    }>
                                                        <Icon 
                                                            name="birthday-cake" 
                                                            type="font-awesome" 
                                                            iconStyle={{color: person.is_birthday_today ? '#f15bf1'  :'rgba(34,34,34,0.5)'}} size={10}
                                                        />
                                                        <Text 
                                                            style={{ marginLeft: 5, color: 'rgba(34,34,34,0.5)' }}>
                                                            {Moment(person.birthdate).format('MMM Do YYYY')}
                                                        </Text>
                                                    </View>
                                                    <View style={
                                                        { 
                                                            flex: 1, 
                                                            flexDirection: 'row', 
                                                            alignItems: 'center'
                                                        }
                                                    }>
                                                        {
                                                            person.leadership_level &&
                                                            <Text>{ person.leadership_level.name } with </Text>
                                                        }
                                                        <Badge status="success" textStyle={{ fontSize: 8 }} value="1,000"/>
                                                    </View>
                                                    {
                                                        person.status &&
                                                        <View style={
                                                            { 
                                                                flex: 1, 
                                                                flexDirection: 'row', 
                                                                alignItems: 'center',
                                                                marginTop: 2,
                                                            }
                                                        }>
                                                            <Text style={{ color: '#222' }}>Status: </Text>
                                                            <Text style={{ color: '#222' }}>{ person.status.name }</Text>
                                                        </View>
                                                    }
                                                </View>
                                            </View>
                                        </TouchableHighlight>
                                    )
                            
                                }
                            }

                            renderHiddenItem={
                                (data, rowmap) => (
                                     <View style={_styles.rowBack}>
                                        <Text onPress={() => {
                                            
                                            navigation.navigate('PeopleCreateEdit', { person: data.item })}}>Edit</Text>
                                        <TouchableOpacity style={[_styles.backRightBtn, _styles.backRightBtnRight]}>
                                            <Icon 
                                                size={40}
                                                name="ios-call"
                                                type="ionicon"
                                                color="#FFF"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )
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
                    ): (
                        <View style={styles.container}>
                            <ActivityIndicator size="large" />
                        </View>
                    )
                }
                <View style={{ position: 'absolute', bottom: 35, right: 35, }}>
                    <Avatar 
                        size="medium"
                        rounded 
                        icon={{ name: 'add', color: '#FFF' }} 
                        overlayContainerStyle={{backgroundColor: '#08ce0e'}}
                        onPress={() => this.props.navigation.navigate('PeopleCreateEdit')}
                    />
                </View>
            </ThemeProvider>
        )
    }
}

const mapStateToProps = (state) => {
    const {people, auth} = state;
    return {
        people,
        user: auth.user
    }
}

const _styles = StyleSheet.create({
	backTextWhite: {
		color: '#FFF'
	},
	rowFront: {
		backgroundColor: '#FFF',
		borderBottomColor: '#c1c1c1',
		borderBottomWidth: 1,
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},
	backRightBtnLeft: {
		backgroundColor: 'blue',
		right: 75
	},
	backRightBtnRight: {
		backgroundColor: '#08ce0e',
		right: 0
	},
	controls: {
		alignItems: 'center',
		marginBottom: 30
	},
	switchContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 5
	},
	switch: {
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'black',
		paddingVertical: 10,
		width: Dimensions.get('window').width / 4,
	},
	trash: {
		height: 25,
		width: 25,
	}
});

export default connect(mapStateToProps)(People);