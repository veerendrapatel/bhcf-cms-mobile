import React, { Component } from 'react';
import { Text, View, ActivityIndicator, TouchableHighlight, TouchableOpacity, StyleSheet, NetInfo, AppState, Alert } from 'react-native';
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
        this.doDelete = this.doDelete.bind(this);
        NetInfo.isConnected.fetch().then(this.props.handleConnectivityChange);
    }

    doDelete = (id) => {
         const { deletePerson } = this.props;
        // Works on both iOS and Android
        Alert.alert(
            'Are you sure you want to continue?',
            'Your data have unsynced changes. If you delete now, you`ll lose those changes',
            [
            {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {text: 'Yes', onPress: () => deletePerson(id)},
            ],
            {cancelable: false},
        );
    }
    
    componentWillUnmount() {
 
        NetInfo.isConnected.removeEventListener(
            'connectionChange',
            this.props.handleConnectivityChange
    
        );
    
    }

    componentDidMount = () => {
        const { user, personID, navigation } = this.props;

        const leaderID = personID ? personID : (user ? user.member.id : null);
        
        this.setState({ leaderID: leaderID })
        
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.props.handleConnectivityChange
        );
        this.navigationListener = navigation.addListener('willFocus', payload => {
            this.setState({ loading: true }, () => this.fetchNetwork(leaderID))
            
        })

        
        this.fetchNetwork(leaderID);
        this.initNetwork(this.props);
    }

    fetchNetwork = (leaderID) => {
        const { fetchNetwork } = this.props;
        fetchNetwork(leaderID);
    }

    componentWillReceiveProps(nextProps){
        // if(nextProps.people.people !== this.props.people.people){
            this.initNetwork(nextProps);
        // }
        this.setState({ loading: false });

    }

    initNetwork = (props) => {
        const leaderID = props.personID ? props.personID : (props.user ? props.user.member.id : null);

        this._data = props.people.people ? props.people.people.filter(person => person.parent_id == leaderID): null;
        this.setState({ people: [], page: 1, search: false, leaderID: leaderID, loading: props.people.loading }, () => this.loadMore());
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
        
    }

    search = (keyword) => {
        const data = this._data.filter(person => person.full_name.indexOf(keyword) !== -1);
        this.setState({ people: data, page: 1, searching: true });

    }

    render() {
        const { keyword, people, loading } = this.state;
        const { navigation, dispatch, netInfo } = this.props;
        const _this = this;
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
        
                <SwipeListView
                    useFlatList
                    onEndReachedThreshold={0.5}
                    leftOpenValue={120}
                    rightOpenValue={-75}
                    keyExtractor={(person, index) => index.toString()}
                    data={people}
                    ListEmptyComponent={
                        <View style={{...styles.container, height: dimensions.fullHeight / 1.5 }}>
                        { 
                            loading ? (
                                <ActivityIndicator size="large"/>
                            ) :
                            (
                                <Text>Oops! No data to display.</Text>
                            )
                        }
                        </View>
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
                                        <View style={{ paddingLeft: padding.sm }}>
                                            { 
                                                person.avatar ?
                                                (
                                                    <Avatar 
                                                        rounded
                                                        size="medium"
                                                        source={{ uri: person.avatar.small}}
                                                        title={person.full_name.charAt(0)} 
                                                    />
                                                ) : (
                                                    <Avatar 
                                                        rounded
                                                        size="medium"
                                                        title={person.full_name.charAt(0)} 
                                                    />
                                                )
                                            }
                                        </View>
                                        <View style={
                                            {
                                                marginLeft: 10,
                                                width: '75%'
                                            }
                                        }>
                                            
                                            <View  style={ {...styles.row} }>
                                                {
                                                    person.is_birthday_today &&
                                                    <Icon 
                                                        name="birthday-cake" 
                                                        type="font-awesome" 
                                                        color={colors.violet} 
                                                        containerStyle={{ marginRight: 5 }}
                                                        size={13}
                                                    />
                                                }
                                                
                                                <Text 
                                                    style={
                                                        {
                                                            fontWeight: 'bold',
                                                        }
                                                    }
                                                >{ person.full_name }</Text>
                                            </View>
                                            <View style={ {...styles.row, marginTop: -5} }>
                                                {
                                                    person.class_category &&
                                                    (<View style={ styles.listContainer }>
                                                        <Icon 
                                                            name="ios-school" 
                                                            type="ionicon"
                                                            size={16}
                                                            color={colors.grey2}
                                                        /> 
                                                        <Text style={{ fontSize: 13, color: colors.grey2, marginLeft: 5 }}>{ person.class_category.label }</Text>
                                                    </View>)
                                                }
                                                {
                                                    person.category &&
                                                    (<View style={ styles.listContainer }>
                                                        <Icon 
                                                            name="ios-ribbon" 
                                                            type="ionicon"
                                                            size={16}
                                                            color={colors.grey2}
                                                        /> 
                                                        <Text style={{ fontSize: 13, color: colors.grey2, marginLeft: 5 }}>{ person.category.name }</Text>
                                                    </View>)
                                                }
                                            </View>
                                            <View style={ {...styles.row, marginTop: -10} }>
                                                {
                                                    person.auxiliary_group &&
                                                    (<View style={ styles.listContainer }>
                                                        <Icon 
                                                            name="ios-contacts" 
                                                            type="ionicon"
                                                            size={16}
                                                            color={colors.grey2}
                                                        /> 
                                                        <Text style={{ fontSize: 13, color: colors.grey2, marginLeft: 5 }}>{ person.auxiliary_group.name }</Text>
                                                    </View>)
                                                }
                                                {
                                                    person.my_ministries !== undefined && person.my_ministries.length !== 0 &&
                                                    (<View style={ styles.listContainer }>
                                                        <Icon 
                                                            name="ios-star-outline" 
                                                            type="ionicon"
                                                            size={16}
                                                            color={colors.grey2}
                                                        /> 
                                                        <Text style={{ fontSize: 13, color: colors.grey2, marginLeft: 5 }}>{ person.my_ministries[0].name }</Text>
                                                    </View>)
                                                }
                                            </View>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            )
                        
                            }
                        }

                        renderHiddenItem={
                            (data, rowmap) => (
                                <View style={styles.rowBack}>
                                    <TouchableOpacity style={[
                                        {
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }
                                    ]}>
                                        <Icon 
                                            onPress={() => navigation.navigate('PersonForm', { person: data.item })}
                                            size={30}
                                            name="ios-create"
                                            type="ionicon"
                                            color={ colors.tertiary }
                                            containerStyle={{ padding:padding.md, backgroundColor: colors.orange }}
                                        />
                                        <Icon 
                                            onPress={ () => _this.doDelete(data.item.id) }
                                            size={30}
                                            name="ios-trash"
                                            type="ionicon"
                                            color={ colors.tertiary }
                                            containerStyle={{padding:padding.md, backgroundColor: 'red' }}
                                        />
                                    </TouchableOpacity>
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
    },
    listContainer: {
        flex: 1, 
        flexDirection: 'row', 
        marginVertical: 5,
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
		flex: 1,
		flexDirection: 'row'
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
    
    return {
        people,
        netInfo,
        user: auth.user
    }
}

const mapPropsToDispatch = (dispatch) => {
    return {
        fetchNetwork: ( leaderID ) => dispatch(peopleActions.fetchNetwork( leaderID )),
        deletePerson: ( id ) => dispatch(peopleActions.deletePerson( id )),
        handleConnectivityChange: (isConnected) => dispatch(connectionState(isConnected))
    }
}

export default connect(mapStateToProps, mapPropsToDispatch)(People);