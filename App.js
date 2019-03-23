import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './src/store';
import { Loader } from './src/components/Loader';
import { createRootNavigator } from './src/helpers/routes';
import { getCurrentUser } from './src/helpers/async-storage';
import { signOut, signIn } from './src/store/actions/auth.actions';
import { Text, View, Image, Alert } from 'react-native';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import { alertActions } from './src/store/actions/alert.actions';



store.subscribe(() => {
  const {alert} = store.getState();
  // console.log(.alert);
  if (alert.message) {
    showMessage({
      message: alert.message,
      type: alert.type,
    });
    store.dispatch(alertActions.clear());
  }

  
});


persistStore(store);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      checkedSignIn: false
    }
  }


  componentWillMount() {
    const { dispatch } = store;
    getCurrentUser().then(
      res => {
        const currentUser = JSON.parse(res);
        
        if (currentUser) {
          
          dispatch({ type: 'SET_CURRENT_USER', user: currentUser, isLoggedIn: true });
        }
        
        this.setState({
          signedIn: currentUser ? true : false,
          checkedSignIn: true,
        });
      
      }, 
      err => {
        this.setState({
            signedIn: false,
            checkedSignIn: false,
          });
      }
    )
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;
    
    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }

    const {alert}  = this.props;
    
            
    const Layout = createRootNavigator(signedIn);

    return <Provider store={store}>
            <PersistGate loading={<Loader />} persistor={persistor}>
              <Layout />
               <FlashMessage position="bottom"/>
            </PersistGate>
        </Provider>
  }
}

export default App