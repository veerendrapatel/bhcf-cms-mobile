import React, {Component} from 'react';
import { View, ActivityIndicator } from 'react-native';
import {styles} from '../styles/styles';
export const Loader = () => (
    <View style={styles.container}>
        <ActivityIndicator size="large" />
    </View>
)