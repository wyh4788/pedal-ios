/**
 * Sample Firebase & React Native App
 * https://github.com/davideast/firebase-react-native-sample
 */
'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';
const firebase = require('firebase');
const HomePage = require('./components/HomePage');
const BusinessDetail = require('./components/BusinessDetail');
const DeliveryPage = require('./components/DeliveryPage');
const styles = require('./styles.js');

const { AppRegistry, Navigator, Text, TouchableHighlight, Image, TabBarIOS} = ReactNative;

const firebaseConfig = {
  apiKey: "AIzaSyA-FPbX1XaZpynBlOE9xNaQWKr5AYKqQWU",
  authDomain: "pedal-business.firebaseapp.com",
  databaseURL: "https://pedal-business.firebaseio.com",
  storageBucket: "pedal-business.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

class demo extends Component {
  constructor(){
    super();
    this.state = {selectedTab: 'tabOne'}
  }
  setTab(tabId){
    this.setState({selectedTab: tabId})
  }

  renderScene(route, navigator) {
    if (route.name == 'HomePage') {
      return <HomePage navigator={navigator} {...route.passProps} firebaseApp={firebaseApp}/>
    }
    if (route.name == 'BusinessDetail') {
      return <BusinessDetail navigator={navigator} {...route.passProps}/>
    }
  }

  render() {
    var NavigationBarRouteMapper = {
      LeftButton(route, navigator, index, navState) {
        if(index > 0) {
          return (
            <TouchableHighlight
            	 underlayColor="transparent"
               onPress={() => { if (index > 0) { navigator.pop() } }}>
              <Text style={ styles.leftNavButtonText }>Back</Text>
            </TouchableHighlight>
      	)}
      	else { return null }
      },
      RightButton(route, navigator, index, navState) {},
      Title(route, navigator, index, navState) {
        if (index == 0){
          return (
            <Image
              style={styles.homeIcon}
              source={require('./images/homeIcon.png')}
            />
          )
        }
      }
    }

      return (
        <TabBarIOS>
          <TabBarIOS.Item
            systemIcon='history'
            selected={this.state.selectedTab === 'tabOne'}
            onPress={() => this.setTab('tabOne')}>
            <Navigator
              initialRoute={{ name: 'HomePage' }}
              renderScene={ this.renderScene }
              navigationBar={
                <Navigator.NavigationBar
                  style={ styles.nav }
                  routeMapper={ NavigationBarRouteMapper } />
              }
            />
          </TabBarIOS.Item>
          <TabBarIOS.Item
            systemIcon='more'
            selected={this.state.selectedTab === 'tabTwo'}
            onPress={() => this.setTab('tabTwo')}>
            <DeliveryPage firebaseApp={firebaseApp}/>
          </TabBarIOS.Item>
        </TabBarIOS>
      )
    }
  }


AppRegistry.registerComponent('demo', () => demo);
