import React, { Component } from 'react';
import { Text, View, ActivityIndicator, TouchableHighlight, TouchableOpacity, StyleSheet, NetInfo, AppState } from 'react-native';
import { Icon, Badge, SearchBar, Avatar } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import { peopleActions, alertActions, connectionState } from '../../store/actions';
import { paginate } from '../../helpers/misc';
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
        NetInfo.isConnected.fetch().then(this.props.handleConnectivityChange);
    }
    
    componentWillUnmount() {
 
        NetInfo.isConnected.removeEventListener(
            'connectionChange',
            this.props.handleConnectivityChange
    
        );
    
    }
    
    componentDidMount = () => {
        const { user } = this.props;

        const leaderID = this.props.personID ? this.props.personID : user.member.id;
        
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.props.handleConnectivityChange
        );
        this.setState({ leaderID: leaderID })
        this.fetchNetwork(leaderID);
        this.fetNetwork(this.props);
    }

    fetchNetwork = (leaderID) => {
        const { fetchNetwork } = this.props;
        fetchNetwork(leaderID);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.people.people !== this.props.people.people){
            this.fetNetwork(nextProps);
        }

    }

    fetNetwork = (props) => {
        const leaderID = props.personID ? props.personID : props.user.member.id;

        this._data = props.people.people ? props.people.people.filter(person => person.parent_id == leaderID): null;
        this.setState({ people: [], page: 1, search: false, loading: props.people.loading }, () => this.loadMore());
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
        const data = this._data.filter(person => person.full_name.indexOf(keyword) !== -1);
        this.setState({ people: data, page: 1, searching: true });

    }

    render() {
         

        const { keyword, people, loading } = this.state;
        const { navigation, dispatch, netInfo } = this.props;
        return (
            <View style={ styles.container }>
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
               { !loading ? 
                    (
                        <SwipeListView
                            useFlatList
                            onEndReachedThreshold={0.5}
                            leftOpenValue={75}
                            rightOpenValue={-75}
                            keyExtractor={(person, index) => index.toString()}
                            data={people}
                            ListEmptyComponent={
                                <View style={ styles.container }><Text>Oops! No data to display.</Text></View>
                            }
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
                                                    <View style={ styles.row }>
                                                        <Icon 
                                                            name="birthday-cake" 
                                                            type="font-awesome" 
                                                            iconStyle={{color: person.is_birthday_today ? colors.violet  :colors.grey}} size={10}
                                                        />
                                                        <Text 
                                                            style={{ marginLeft: 5, color: colors.grey }}>
                                                            {Moment(person.birthdate).format('MMM Do YYYY')}
                                                        </Text>
                                                    </View>
                                                    <View>
                                                        {
                                                            person.school_status &&
                                                            <Text>{ person.school_status.name }</Text>
                                                        }
                                                    </View>
                                                    { 
                                                        person.category.name &&
                                                        <View style={ styles.row }>
                                                            <Text>Category Level: </Text>
                                                            <Text>{ person.category.name }</Text>
                                                        </View>
                                                    }
                                                    {
                                                        person.my_ministries.length &&
                                                        <View style={ styles.row }>
                                                            <Text>Ministry: </Text>
                                                            <Text style={{ color: colors.grey }}>
                                                            {
                                                                person.my_ministries.map((item, i) =>  item.name  )
                                                            }
                                                            </Text>
                                                        </View>
                                                    }
                                                    {
                                                        person.auxiliary_group &&
                                                        <View>
                                                            <Text style={{ color: colors.grey }}>{ person.auxiliary_group.name }</Text>
                                                        </View>
                                                    }
                                                    {
                                                        person.active_status &&
                                                        <View>
                                                            <Text style={{ color: colors.grey }}>{ person.active_status }</Text>
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
                                            onPress={() => navigation.navigate('PersonForm', { person: data.item })}
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
                        onPress={() => this.props.navigation.navigate('PersonForm', { leaderID: this.state.leaderID })}
                    />
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
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


const mapStateToProps = (state) => {
    const {people, auth, netInfo} = state;
    console.log(people.people);
    return {
        people,
        netInfo,
        user: auth.user
    }
}

const mapPropsToDispatch = (dispatch) => {
    return {
        fetchNetwork: ( leaderID ) => dispatch(peopleActions.fetchNetwork( leaderID )),
        handleConnectivityChange: (isConnected) => dispatch(connectionState(isConnected))
    }
}

export default connect(mapStateToProps, mapPropsToDispatch)(People);