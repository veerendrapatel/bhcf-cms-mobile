import React, { Component } from 'react';
import { Text, View, ScrollView, Dimensions, ListView, ActivityIndicator } from 'react-native';
import { getCurrentUser } from '../../services/auth';
import {styles} from '../../services/styles';
import { MenuBurger } from '../../components/Header';
import { Icon, ThemeProvider, Header, ListItem, SearchBar, Button, Avatar } from 'react-native-elements';
import { AJAX } from '../../services/services';

const limit = 12;
class People extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            dataSource: null,
            isLoadingMore: false,
            isLoading: true,
            _data: null,
            keywords: '',
            offset: 0,
            endOfRow: false
            
        }

        this.search = this.search.bind(this);
    }

    fetch = (callback) => {
        const { offset, keywords } = this.state;
        const currentUser = this.state.currentUser;
        console.log(`members/${currentUser.id}/people?offset=${offset}&limit=${limit}&keywords=${keywords}&sort=id&order=desc`);

        AJAX(
            `members/${currentUser.id}/people?offset=${offset}&limit=${limit}&keywords=${keywords}&sort=id&order=desc`,
            'GET',
            null,
            callback,
            {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${currentUser.api_token}`
            }
        );
        
    }

    fetchMore = () => {
         if (!this.state.endOfRow) {
            this.fetch(responseJSON => {
                if (this._isMounted) {
                    const data = this.state._data.concat(responseJSON.people);
                    // console.log(responseJSON);
                    this.setState((prevState, props) => ({
                        dataSource: this.state.dataSource.cloneWithRows(data),
                        isLoadingMore: false,
                        _data: data,
                        offset: prevState.offset + 1,
                        endOfRow: responseJSON || responseJSON.people.length == 0,
                    }));
                }
                
            })
        } else {
            this.setState({
                isLoadingMore: false
            });
        }
    }

    
    componentDidMount = () => {
        this._isMounted = true;
        getCurrentUser().then(res => {
            this.setState({'currentUser': JSON.parse(res) });
            this.fetch(responseJSON => {
                if (this._isMounted) {
                    let ds = new ListView.DataSource({
                        rowHasChanged: (r1, r2) => r1 !== r2,
                    });
                    const data = responseJSON.people;
                    this.setState((prevState, props) => ({
                        dataSource: ds.cloneWithRows(data),
                        isLoading: false,
                        _data: data,
                        offset: prevState.offset + 1,
                        // endOfRow: responseJSON.people.length === 0
                    }))
                }
            });
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }



    search = (search) => {
        // this.setState({ keywords: search, isLoadingMore: true });

        //passing the inserted text in textinput
        const newData = this.state._data.filter(function(item) {
            //applying filter for the inserted text in search bar
            const itemData = item.full_name ? item.full_name.toUpperCase() : ''.toUpperCase();
            const textData = search.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });

        
        this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            dataSource: this.state.dataSource.cloneWithRows(newData),
            keywords: search,
        });
    }



    render() {
        const { keywords } = this.state;
        return (
            <ThemeProvider style={styles.container}>
               <Header
                leftComponent={<MenuBurger {...this.props}/>}
                rightComponent={<Icon 
                            color="#FFF"
                            name='ios-add'
                            type='ionicon' onPress={() => this.props.navigation.navigate('PeopleCreateEdit')}/>}
                centerComponent={{ text: 'People', style: { color: '#fff' }  }}
                />
                <SearchBar
                    round={true}
                    platform="ios"
                    placeholder="Type Here..."
                    onChangeText={this.search} 
                    value={keywords}
                />
               {!this.state.isLoading && this.state.currentUser ? (
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={item => {
                        if (item) {
                            return (
                                <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderBottomColor: '#f1f1f1',
                                        borderBottomWidth: 1
                                    }}>
                                    <Avatar title={item.first_name.charAt(0)} size="large"/>
                                    <View>
                                        <Text>{item.birthdate}</Text>    
                                        <Text>{item.full_name}</Text>
                                        <Text>Leadership Level: {item.leadership_level.name}</Text>
                                        <Text>Auxilary Group: {item.auxiliary_group.name}</Text>
                                    </View>
                                </View>
                            )
                        } else {
                            return <Text>End</Text>
                        }
                    }} 
                    onEndReached={() => {
                        this.setState({ isLoadingMore: true }, () => this.fetchMore())
                    }}
                    renderFooter={() => {
                        return (
                            this.state.isLoadingMore && 
                            <View style={{ flex: 1, padding: 10 }}>
                                <ActivityIndicator size="small" />
                            </View>
                        )
                    }}
                >

                </ListView>
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