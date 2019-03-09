import React, { Component } from 'react';
import { Text, View, ActivityIndicator, FlatList, Alert } from 'react-native';
import { getCurrentUser } from '../../services/auth';
import {styles} from '../../services/styles';
import { Icon, ThemeProvider, ListItem, SearchBar, Avatar } from 'react-native-elements';
import HttpService from '../../services/services';
import Moment from 'moment';

const PAGE_SIZE = 12;
class People extends React.Component {
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

    _isMounted = false;
    arrayholder = [];
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            people: null,
            isFetching: false,
            isLoading: true,
            keywords: '',
            offset: 0,
            endOfRow: false,
            searching: false,
            
        }
        this.props.navigation.addListener('willFocus', () => {
            this.arrayholder = [];
            this.setState({ offset: 0, people: null, keywords: '', endOfRow: false, search: false }, () => this.initFetch())
        })
        this.search = this.search.bind(this);
    }


    fetchPeople = () => {
        const {endOfRow, people, keywords, offset, currentUser} = this.state;
        if (!endOfRow) {
            HttpService
            .get(`members/${currentUser.id}/people?offset=${offset}&limit=${PAGE_SIZE}&keywords=${keywords}&sort=id&order=desc`).then(res => {
                if (this._isMounted && res.ok) {
                    
                    const data = people && keywords.length === 0 ? this.arrayholder.concat(res.people) : res.people;
                
                    this.setState({
                        people: data,
                        isLoading: false,
                        isFetching: false,
                        endOfRow: res && res.people.length == 0,
                    });
                    if (keywords.length === 0) {
                        this.arrayholder = data;
                    }
                
                }
                
            }, err =>{
                Alert.alert('Error', err.message);
            })
        }
    }

    handleLoadMore = () => {
        // if (!this.state.searching) {
            this.setState({
                offset: this.state.keywords.length === 0 ? this.state.offset + 1 : 0,
                isFetching: false,
            }, () => this.fetchPeople());
        // }
    }

    
    componentDidMount = () => {
        this._isMounted = true;
       
        this.initFetch();
    }

    initFetch = () => {
         getCurrentUser().then(res => {
            this.setState({'currentUser': JSON.parse(res) }, () => this.fetchPeople());
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }



    search = (keyword) => {
        this.setState({ keywords: keyword, offset: 0, endOfRow: false, isFetching: true, searching: true, isLoading: false }, () => {
            if (keyword.length > 2) { 
                this.arrayholder = [];
                this.fetchPeople()
            }
        }); 
    }

    handleRefresh = () => {
        this.setState({
            isFetching: true,
        }, () => {
            this.fetchMore();
        });
    }



    render() {
        const { keywords, isFetching, currentUser, people, isLoading } = this.state;
        return (
            <ThemeProvider style={styles.container}>
                
               { !isLoading && currentUser ? (
                <FlatList
                    extraData={this.props}
                    keyExtractor={(item, index) => index.toString()}
                    data={people}
                    onEndReachedThreshold={0.5}
                    renderItem={row => {
                        if (!row) {
                            return '';
                        }
                        const item = row.item;
                        return (
                            <ListItem 
                                key={item.id}
                                roundAvatar
                                title={item.full_name} 
                                subtitle={
                                <View>
                                    <View style={{
                                        flex: 1, 
                                        flexDirection:'row', 
                                        alignItems: 'center'
                                        }}>
                                        <Icon name="birthday-cake" type="font-awesome" iconStyle={{color: item.is_birthday_today ? '#f15bf1'  :'rgba(34,34,34,0.5)'}} size={10}/>
                                            <Text style={{ marginLeft: 5, color: 'rgba(34,34,34,0.5)' }}>{Moment(item.birthdate).format('MMM Do YYYY')}</Text>
                                    </View>
                                    <Text>{item.leadership_level.name}</Text>
                                </View>}
                                leftAvatar={{ 
                                    source: item.avatar && item.avatar.small ?  {uri: item.avatar.small} : null, title: item.full_name.charAt(0) } } 
                                titleStyle={{ fontWeight: 'bold' }}
                                containerStyle={{ borderBottomWidth: 1, borderBottomColor: '#c1c1c1' }} 
                                chevronColor="white" 
                                chevron
                                onPress={() => this.props.navigation.navigate('PeopleDetails', { member: item })}
                                badge={{ value: 3, textStyle: { color: '#fff' }, containerStyle: { marginTop: -20 } }}
                                editButton={<Icon name="edit" />}
                            />
                        )
                       
                    }} 
                    onEndReached={() => {
                        this.setState({ isFetching: true }, () => this.handleLoadMore())
                    }}
                    ListFooterComponent={() => {
                        return (
                            isFetching &&
                            <View style={{ flex: 1, padding: 10 }}>
                                <ActivityIndicator size="large" />
                            </View>
                        )
                    }}
                    
                    ListHeaderComponent={<SearchBar
                    round={true}
                    lightTheme
                    platform="ios"
                    placeholder="Type Here..."
                    onChangeText={text => this.search(text)} 
                    value={keywords}
                    autoCorrect={false}
                />}
                >

                </FlatList>
               ): (
                   <View style={styles.container}>
                       <ActivityIndicator size="large" />
                   </View>
               )
               }
               <View  style={{ position: 'absolute', bottom: 35, right: 35, }}>
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


export default People;