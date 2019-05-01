import React, {Component} from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import { createRootNavigator } from './src/helpers/routes';
import FlashMessage, { showMessage } from "react-native-flash-message";
import { alertActions } from './src/store/actions/alert.actions';



store.subscribe(() => {
  const {alert} = store.getState();

  if (alert.message) {
    showMessage({
      message: alert.message,
      type: alert.type,
    });
    store.dispatch(alertActions.clear());
  }
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { auth }  = store.getState();
    const isLoggedIn = auth.isLoggedIn && auth.user != null;
    const Layout = createRootNavigator(isLoggedIn);
  
    return <Provider store={store}>
            <Layout />
            <FlashMessage position="bottom" icon='auto'/>
        </Provider>
  }
}

export default App