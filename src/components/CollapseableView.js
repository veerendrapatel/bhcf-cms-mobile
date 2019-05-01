import React, { Component } from "react";
import {Icon} from 'react-native-elements';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";

const DROPUPICON = "chevron-up";
const DROPDOWNICON = "chevron-down";

export default class CollapsibleView extends Component {
  animationObject = {
    height: new Animated.Value(),
    collapsed: false,
    contentHeight: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      toggleIcon: props.collapsed ? DROPUPICON : DROPDOWNICON,
      border: this.props.bottomBorder
    };
    this.initialHeight = this.initialHeight.bind(this);
    this.toggle = this.toggle.bind(this);
    this.animationObject.collapsed = props.collapsed;
  }

  initialHeight(evt) {
    if (this.animationObject.contentHeight > 0) return;
    this.animationObject.contentHeight = evt.nativeEvent.layout.height;
    this.animationObject.height.setValue(
      this.animationObject.collapsed ? this.getMaxHeight() : this.getMinHeight()
    );
  }

  getMaxHeight() {
    return this.animationObject.contentHeight;
  }

  getMinHeight() {
    return 0;
  }

  toggle() {
    this.setState({ toggleIcon: this.state.toggleIcon == DROPDOWNICON ? DROPUPICON : DROPDOWNICON });
    Animated.timing(this.animationObject.height, {
      toValue: this.animationObject.collapsed
        ? this.getMinHeight()
        : this.getMaxHeight(),
      duration: 250
    }).start();
    this.animationObject.collapsed = !this.animationObject.collapsed;
  }

  render() {
    return (
      <View style={styles.borderView}>
        <TouchableOpacity
          style={[
            this.props.headerStyle,
            { alignItems: "center", justifyContent: "center" }
          ]}
          activeOpacity={1}
          onPress={this.toggle}
        >
          <View style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
            <Text style={this.props.headerTextStyle}>{this.props.title}</Text>
          </View>
          <View style={styles.iconPosition}>
            <Icon 
                name={this.state.toggleIcon}
                type="feather"
                size={ this.props.headerIconSize }
                color={ this.props.headerIconColor }
            />
          </View>
        </TouchableOpacity>

        <Animated.View
          style={{ width: '100%', height: this.animationObject.height, overflow: 'hidden' }}
          onLayout={this.initialHeight}
        >
          {this.props.children}
        </Animated.View>
      </View>
    );
  }
}

CollapsibleView.propTypes = {
  title: PropTypes.string.isRequired,
  collapsed: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  borderView: {
    width: '100%'
  },
  iconPosition: {
    position: "absolute",
    right: 10,
    alignItems: "center",
    width: "9%"
  }
});
