import React, { Component } from 'react';
import { Text, View, ScrollView, ListView, Image } from 'react-native';
import { getCurrentUser } from '../../services/auth';
import {styles} from '../../services/styles';
import { Icon, ThemeProvider, Header, ListItem, SearchBar } from 'react-native-elements';

const Row = (props) => (
  <View style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#f1f1f1',
        borderBottomWidth: 1
    }}>
    <View>
        <Text>{`${props.birthdate}`}</Text>    
        <Text>Leadership Level: {`${props.leadership_level.name}`}</Text>
        <Text>Auxilary Group: {`${props.auxiliary_group.name}`}</Text>
    </View>
  </View>
);


class People extends React.Component {
    static navigationOptions = {
        Title: 'People'
    }

    constructor(props) {
        super(props);
        this.state = {
            people: null,
            keywords: '',
            limit: 12,
            offset: 0
        }

        this.updateSearch = this.updateSearch.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }
    componentDidMount() {
        this.fetchPeople();
    }

    handleScroll(e) {
        alert(e.nativeEvent.contentOffset.y);
    }

    async fetchPeople() {
        getCurrentUser().then(res => {
            const _res = JSON.parse(res);
            const URI = 'http://127.0.0.1:8000/api/v1/';
            const { keywords, limit, offset } = this.state;

            fetch(`${URI}members/${_res.id}/people?offset=${offset}&limit=${limit}&keywords=${keywords}&sort=id&order=desc`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                        Authorization: `Bearer ${_res.api_token}`,  
                }
            })
            .then(res => res.json())
            .then(responseJSON => {
                console.log(responseJSON);
                // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                // this.setState({ people: ds.cloneWithRows(responseJSON.people) });
                this.setState({ people: responseJSON.people });
            });
            
        })
        
    }

    updateSearch(search) {
        this.setState({ keywords: search });
        this.fetchPeople();
    }

    render() {
        const { keywords } = this.state;
        return (
            <ThemeProvider>
               <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'People', color: '#fff' }}
                />
                <SearchBar
                    round={true}
                    platform="ios"
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch} 
                    value={keywords}
                />
                <View style={{
                        position: 'absolute',
                        bottom: 10,
                        right:10,
                        zIndex: 999
                    }}>
                        <Icon 
                            raised
                            name='plus'
                            type='font-awesome' onPress={() => this.props.navigation.navigate('PeopleCreateEdit')}/>
                    </View>
                <ScrollView style={{ width: '100%' }} 
                onScroll={this.handleScroll} 
                >
                    {
                        this.state.people &&
                        this.state.people.map((l, i) => (
                        <ListItem
                            key={i}
                            leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' } }}
                            title={l.full_name}
                            subtitle={<Row {...l}></Row>} 
                            rightIcon={<Icon name="ios-more" type="ionicon"/>}
                        />
                        ))
                    }
                </ScrollView>
                
            </ThemeProvider>
        )
    }
}


export default People;