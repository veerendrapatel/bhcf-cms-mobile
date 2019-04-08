import React, { Component } from 'react';
import { Text, View, ActivityIndicator, FlatList, TouchableHighlight, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { dimensions, colors, padding, fonts } from '../../../styles/base';
import { Input, Button, SearchBar } from 'react-native-elements';
import Moment from 'moment';
import { Icon, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import {  schoolStatusActions, schoolClassActions  } from '../../../store/actions';
import { SwipeListView } from 'react-native-swipe-list-view';

const CLASS_TYPE_ID = 2;

class LifeClass extends Component {
    _data = [];
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Life Class',
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
            keyword: null,
            classes: [],
            loading: true,
            page: 1,
            searching: false,
            leaderID: 0
        }

        this.search = this.search.bind(this);
       
    }

    paginate = (network, page, per_page) => {
 
        var page = page || 1,
        per_page = per_page || 10,
        offset = (page - 1) * per_page,
        
        paginatedItems = network.slice(offset).slice(0, per_page),
        total_pages = Math.ceil(network.length / per_page);
        return {
            page: page,
            per_page: per_page,
            pre_page: page - 1 ? page - 1 : null,
            next_page: (total_pages > page) ? page + 1 : null,
            total: network.length,
            total_pages: total_pages,
            data: paginatedItems
        };
    }


    componentDidMount() {
        this.fetchClass();
    }

    fetchClass = () => {
        const { dispatch } = this.props;
        dispatch( schoolClassActions.getByType(CLASS_TYPE_ID) );
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.classes && this.props.classes && nextProps.classes[CLASS_TYPE_ID] !== this.props.classes[CLASS_TYPE_ID]){
            this._data = nextProps.classes[CLASS_TYPE_ID];
            this.setState({ classes: [], page: 1, search: false, loading: nextProps.loading }, () => this.loadMore());
        }
    }

    

    loadMore() {
        if (this._data) {
            if (!this.state.searching && this._data.length >= this.state.page ) {
                const classes = this.paginate(this._data, this.state.page, 12).data;
                if (classes.length) {
                    this.setState({ classes: this.state.classes.concat(classes) });
                }
                
            }
        }
        this.setState({ loading: false });
    }

    search = (keyword) => {
        const data = this._data.filter(item => item.batch_name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1);
        this.setState({ classes: data, page: 1, searching: true });

    }


    render() {
        const { loading, navigation } = this.props;
        const { keyword, classes } = this.state;
        return (
            <View style={ styles.container }>
                {
                    loading ? (
                        <View style={styles.container}>
                            <ActivityIndicator size="large" />
                        </View>
                    ) :  (
                        <ScrollView>
                            {
                                classes && 
                                    <SwipeListView
                                        useFlatList
                                        onEndReachedThreshold={0.5}
                                        leftOpenValue={75}
                                        rightOpenValue={-75}
                                        keyExtractor={(item, index) => index.toString()}
                                        data={classes}
                                        renderItem={
                                            (row, rowMap) => {
                                                const item =  row.item;
                                                return (
                                                    <TouchableHighlight
                                                        style={styles.rowFront}
                                                        underlayColor={colors.tertiary}>
                                                        <View style={styles.row}>
                                                            <View>
                                                                <Avatar 
                                                                    rounded
                                                                    size="large"
                                                                    title={item.batch_name.charAt(0)} 
                                                                />
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
                                                                            fontSize: 18,
                                                                            marginBottom: 5
                                                                        }
                                                                    }
                                                                    >{ item.batch_name }
                                                                </Text>
                                                                <Text style={
                                                                    {
                                                                        marginBottom: 5
                                                                    }
                                                                }>Year: { item.school_year }</Text>
                                                                <Text>Students: { item.total_students }</Text>
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
                                                        onPress={() => navigation.navigate('ClassForm', { class: data.item })}
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
                                                        ]}
                                                        onPress={() => navigation.navigate('EnrollmentForm', { selected_batch_ID: data.item.id })}
                                                        >
                                                        <Icon 
                                                            size={30}
                                                            name="ios-contacts"
                                                            type="ionicon"
                                                            color={ colors.tertiary }
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
                            }
                        </ScrollView>
                    )
                }
                <View style={styles.btnNew}>
                    <Avatar 
                        size="medium"
                        rounded 
                        icon={{ name: 'add', color: colors.tertiary }} 
                        overlayContainerStyle={{backgroundColor: colors.primary}}
                        onPress={() => this.props.navigation.navigate('ClassForm', { classTypeID: CLASS_TYPE_ID })}
                    />
                </View>
            </View>
        )
    }
}

const mapsStateToProps = (state) => {
    const { classes, loading }  = state.schoolClass;
    return {
        loading,
        classes,
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
    btnNew: { 
        position: 'absolute', 
        bottom: 35, 
        right: 35 
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


export default connect(mapsStateToProps)(LifeClass);