import React, { Component } from 'react';
import { Text, View, ScrollView, Dimensions, ListView, ActivityIndicator, FlatList } from 'react-native';
import { getCurrentUser } from '../../services/auth';
import {styles} from '../../services/styles';
import { MenuBurger } from '../../components/Header';
import { Icon, ThemeProvider, Header, ListItem, SearchBar, Button, Avatar, Badge } from 'react-native-elements';
import { AJAX } from '../../services/services';
import Moment from 'moment';

const PAGE_SIZE = 12;
class People extends React.Component {
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

        this.search = this.search.bind(this);
    }

    fetch = () => {
        const { offset, keywords, currentUser } = this.state;
        console.log(`members/${currentUser.id}/people?offset=${offset}&limit=${PAGE_SIZE}&keywords=${keywords}&sort=id&order=desc`);

        return AJAX(
                `members/${currentUser.id}/people?offset=${offset}&limit=${PAGE_SIZE}&keywords=${keywords}&sort=id&order=desc`,
                'GET',
                null,
                {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':  `Bearer ${currentUser.api_token}`
                }
            );
        
    }

    fetchPeople = () => {
        const {endOfRow, people, keywords, searching} = this.state;
        if (!endOfRow) {
            this.fetch().then(res => {
                if (this._isMounted && res.ok) {
                    const data = people && keywords.length === 0 ? this.arrayholder.concat(res.people) : res.people;
                
                    this.setState({
                        people: data,
                        // isLoading: false,
                        isFetching: false,
                        endOfRow: res && res.people.length == 0,
                    });
                    if (keywords.length === 0) {
                        this.arrayholder = data;
                    }
                
                }
                
            }, err =>{
                Alert.alert(err.message);
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
        getCurrentUser().then(res => {
            this.setState({'currentUser': JSON.parse(res) }, () => this.fetchPeople());
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }



    search = (keyword) => {
        // const newData = this.arrayholder.filter(item => {      
        //     const itemData = `${item.full_name.toUpperCase()}`;
        //     const textData = keyword.toUpperCase();
        //     return itemData.indexOf(textData) > -1;    
        // });    
        // this.setState({ keywords: keyword, people: newData, searching: true });

        this.setState({ keywords: keyword, offset: 0, endOfRow: false, isFetching: true, searching: true }, () => {
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
        const { keywords, isFetching, currentUser, people } = this.state;
        return (
            <ThemeProvider style={styles.container}>
               <Header
                leftComponent={<MenuBurger {...this.props}/>}
                rightComponent={
                    <Icon 
                            color="#FFF"
                            name='ios-add'
                            type='ionicon' 
                            onPress={() => this.props.navigation.navigate('PeopleCreateEdit')}/>}
                centerComponent={{ text: 'People', style: { color: '#fff' }  }}
                />
                
               { currentUser ? (
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    onRefresh={this.handleRefresh}
                    // refreshing={isFetching}
                    // enableEmptySections={true}
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
                                    source: item.avatar && item.avatar.thumbnail ?  {uri: item.avatar.thumbnail} : require('../../../assets/default.png'), title: item.full_name } } 
                                titleStyle={{ fontWeight: 'bold' }}
                                containerStyle={{ borderBottomWidth: 1, borderBottomColor: '#c1c1c1' }} 
                                chevronColor="white" 
                                chevron
                                onPress={() => this.props.navigation.navigate('PeopleCreateEdit', { id: item.id })}
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
                
            </ThemeProvider>
        )
    }
}


export default People;