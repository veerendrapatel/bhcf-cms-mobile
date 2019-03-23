import React, {Component} from 'react';
import { View, ActivityIndicator } from 'react-native';
import { container } from '../styles/base'
export const Loader = () => (
    <View style={container}>
        <ActivityIndicator size="large" />
    </View>
)