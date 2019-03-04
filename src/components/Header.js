import React, { Component } from 'react';
import {Icon} from 'react-native-elements';

export const MenuBurger = (props) => (
    <Icon name="menu" color="#FFF" onPress={() => props.navigation.openDrawer()}/>
)