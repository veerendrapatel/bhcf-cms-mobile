import React, {Component} from 'react';


import { createRootNavigator } from './helpers/routes';
import { connect } from 'react-redux';


class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { auth }  = this.props;
    const isLoggedIn = auth.loggingIn && auth.user != null;
    console.log('hello');
    const Layout = createRootNavigator(isLoggedIn);
    return <Layout />
    
  }
}
const mapStateToProps = (state) => {
    const { auth } = state;
    return {
      auth
    }
}

export default connect(mapStateToProps)(Main)