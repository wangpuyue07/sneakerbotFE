/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React,{Component} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen'

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Button, WhiteSpace, WingBlank} from '@ant-design/react-native';


const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

class HomeScreen extends Component {
    componentDidMount() {
        SplashScreen.hide()
    }
    render() {
        return (
            <>
                <StatusBar barStyle="dark-content"/>
                <SafeAreaView>
                    <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}>
                        <Header/>
                        {global.HermesInternal == null ? null : (
                            <View style={styles.engine}>
                                <Text style={styles.footer}>Engine: Hermes</Text>
                            </View>
                        )}
                        <View style={styles.body}>
                            <View style={styles.sectionContainer}>
                                <Text style={styles.sectionTitle}>Step One</Text>
                                <Text style={styles.sectionDescription}>
                                    Edit <Text style={styles.highlight}>App.js</Text> to change this
                                    screen and then come back to see your edits.
                                </Text>
                            </View>
                            <View style={styles.sectionContainer}>
                                <Text style={styles.sectionTitle}>See Your Changes</Text>
                                <Text style={styles.sectionDescription}>
                                    <ReloadInstructions/>
                                </Text>
                            </View>
                            <View style={styles.sectionContainer}>
                                <Text style={styles.sectionTitle}>Debug</Text>
                                <Text style={styles.sectionDescription}>
                                    <DebugInstructions/>
                                </Text>
                            </View>
                            <View style={styles.sectionContainer}>
                                <Text style={styles.sectionTitle}>Learn More</Text>
                                <Text style={styles.sectionDescription}>
                                    Read the docs to discover what to do next:
                                </Text>
                            </View>
                            <LearnMoreLinks/>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </>
        );
    }

}

function Detail () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="DetailTab1"
                component={DetailTab1}
            />
            <Stack.Screen name="DetailTab2" component={DetailTab2}/>
        </Stack.Navigator>
    );
}

function DetailTab1 ({navigation}) {
    return (
        <View>
            <WingBlank size="lg">
                <WhiteSpace size="lg"/>
                <Button
                    type="primary"
                    onPress={() => navigation.navigate('DetailTab2')}>
                    jump to DetailTab2
                </Button>
            </WingBlank>
        </View>
    );
}

function DetailTab2 () {
    return (
        <WingBlank size="lg">
            <WhiteSpace size="lg"/>
            <View>
                <Button
                    type="primary"
                    onPress={() => {
                        alert(123);
                    }}>
                    primary
                </Button>
            </View>
        </WingBlank>
    );
}

const App: () => React$Node = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen}/>
                <Tab.Screen name="Detail" component={Detail}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter
    },
    engine: {
        position: 'absolute',
        right: 0
    },
    body: {
        backgroundColor: Colors.white
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark
    },
    highlight: {
        fontWeight: '700'
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right'
    }
});

export default App;
