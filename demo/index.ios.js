/**
 * Sample Firebase & React Native App
 * https://github.com/davideast/firebase-react-native-sample
 */
'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';
const HomePage = require('./components/HomePage');
const BusinessDetail = require('./components/BusinessDetail');
const styles = require('./styles.js')

const { AppRegistry, Navigator, Text, TouchableHighlight, Image} = ReactNative;

class demo extends Component {
  renderScene(route, navigator) {
    if (route.name == 'HomePage') {
      return <HomePage navigator={navigator} {...route.passProps}/>
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
        <Navigator
          initialRoute={{ name: 'HomePage' }}
          renderScene={ this.renderScene }
          navigationBar={
            <Navigator.NavigationBar
              style={ styles.nav }
              routeMapper={ NavigationBarRouteMapper } />
          }
          />
      )
    }
  }


AppRegistry.registerComponent('demo', () => demo);
