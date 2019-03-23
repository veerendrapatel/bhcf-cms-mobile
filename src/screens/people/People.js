import React, { Component } from 'react';
import { Text, View, ActivityIndicator, FlatList, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, ThemeProvider, Badge, SearchBar, Avatar } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import { peopleActions, alertActions } from '../../store/actions';
import Moment from 'moment';
import { connect } from 'react-redux';
import { dimensions, colors, padding, fonts } from '../../styles/base';
import call from 'react-native-phone-call';


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
            searching: false,
            leaderID: 0
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
        const leaderID = this.props.personID ? this.props.personID : user.member.id;
        const didBlurSubscription = this.props.navigation.addListener(
            'willFocus',
            payload => {
                this.setState({ loading: true, 'leaderID': leaderID }, () => this.fetchPeople(leaderID));
            }
        );
        this.setState({ leaderID: leaderID })
        // Remove the listener when you are done
        // didBlurSubscription.remove();
        this.fetchPeople(leaderID);
        
        
    }

    fetchPeople = (leaderID) => {
        const { dispatch } = this.props;
        dispatch(peopleActions.getAll( leaderID ));  
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.people.items !== this.props.people.items){
            this._data = nextProps.people.items;
            this.setState({ people: [], page: 1, search: false, loading: nextProps.people.loading }, () => this.loadMore());
        }
    }

    

    loadMore() {
        if (!this.state.searching && this._data.length >= this.state.page ) {
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
        const { navigation, dispatch } = this.props;
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
                                                this.props.navigation.navigate(
                                                    {
                                                        key: person.id, 
                                                        routeName: 'Person',
                                                        params: { person: person }
                                                    }
                                                );
                                            }}
                                            style={styles.rowFront}
                                            underlayColor={colors.tertiary}>
                                            <View style={styles.row}>
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
                                     <View style={styles.rowBack}>
                                        <Icon 
                                            onPress={() => navigation.navigate('PeopleCreateEdit', { person: data.item })}
                                            size={30}
                                            name="ios-create"
                                            type="ionicon"
                                            color={ colors.tertiary }
                                        />
                                        <TouchableOpacity style={[
                                            styles.backRightBtn, 
                                            styles.backRightBtnRight,
                                            {
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center'
                                            }
                                            ]}>
                                            <Icon 
                                                size={30}
                                                name="ios-call"
                                                type="ionicon"
                                                color={ colors.tertiary }
                                                onPress ={() => {
                                                    const args = {
                                                        number: data.item.contact_no,
                                                        prompt: false,
                                                    };
                                                    
                                                    call(args).catch(err => {
                                                        dispatch(alertActions.error(err.message));
                                                    });
                                                }}
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
                <View style={styles.btnNew}>
                    <Avatar 
                        size="medium"
                        rounded 
                        icon={{ name: 'add', color: colors.tertiary }} 
                        overlayContainerStyle={{backgroundColor: colors.primary}}
                        onPress={() => this.props.navigation.navigate('PeopleCreateEdit', { leaderID: this.state.leaderID })}
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
        marginVertical: 5,
        padding: 5,
    },
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
		backgroundColor: '#FF5722',
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
		backgroundColor: colors.primary,
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
		width: dimensions.fullWidth / 4,
	},
	trash: {
		height: 25,
		width: 25,
	},
    btnNew: { 
        position: 'absolute', 
        bottom: 35, 
        right: 35 
    }
});

export default connect(mapStateToProps)(People);