import React, {Component} from 'react';


import { createRootNavigator } from './helpers/routes';
import { getCurrentUser } from './helpers/async-storage';
import { connect } from 'react-redux';

import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      checkedSignIn: false
    }
  }
  componentWillReceiveProps(nextProps) {
      if (nextProps.alert != this.props.alert) {
          showMessage({
              message: "Simple message",
              type: "info",
            });
      }
  }

  componentWillMount() {
    const { dispatch } = this.props;
    getCurrentUser().then(
      res => {
        const currentUser = JSON.parse(res);

        dispatch({ type: 'SET_CURRENT_USER', user: currentUser, isLoggedIn: true });
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
    return <Layout />
    
  }
}
const mapStateToProps = (state) => {
    const { alert } = state;
    return {
        alert
    }
}

export default connect(mapStateToProps)(Main)