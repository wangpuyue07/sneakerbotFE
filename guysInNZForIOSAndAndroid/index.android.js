/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native';

var DEFAULT_URL = 'http://192.168.0.111:9000/';
//var DEFAULT_URL = 'https://www.baidu.com/';
class guysInNZForIOSAndAndroid extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <WebView
                    source={{uri: DEFAULT_URL}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={true}
                >
                </WebView>
            </View>
        );
    }
}

AppRegistry.registerComponent('guysInNZForIOSAndAndroid', () => guysInNZForIOSAndAndroid);
