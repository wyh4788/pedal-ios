// import * as firebase from 'firebase';
// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   ListView,
//   ScrollView,
//   TouchableHighlight,
//   Image,
//   Navigator,
//   AlertIOS
// } from 'react-native';
//
// const styles = require('./styles.js')
//
// var testData = [{"firstName":"Black","lastName":"Garrett"},
// {"firstName":"Morales","lastName":"Duncan"},
// {"firstName":"Ramos","lastName":"King"},
// {"firstName":"Dunn","lastName":"Collins"},
// {"firstName":"Fernandez","lastName":"Montgomery"},
// {"firstName":"Burns","lastName":"Fox"},
// {"firstName":"Richardson","lastName":"Kim"},
// {"firstName":"Hanson","lastName":"Evans"},
// {"firstName":"Anderson","lastName":"Hunt"},
// {"firstName":"Carter","lastName":"Grant"},
// {"firstName":"Ray","lastName":"Ruiz"},
// {"firstName":"Hart","lastName":"Schmidt"},
// {"firstName":"White","lastName":"Andrews"},
// {"firstName":"Hall","lastName":"Holmes"},
// {"firstName":"Hawkins","lastName":"Gomez"},
// {"firstName":"Bowman","lastName":"Sullivan"},
// {"firstName":"Brooks","lastName":"Evans"},
// {"firstName":"Reyes","lastName":"Perez"}];
//
//
// class Item extends Component {
//   render() {
//     return (
//       <View>
//         <Text>wang</Text>
//       </View>
//     )
//   }
// }
//
// class List extends Component {
//   constructor(props) {
//     super(props);
//     var ds = new ListView.DataSource({
//       sectionHeaderHasChanged: (r1, r2) => r1 !== r2,
//       rowHasChanged: (r1, r2) => r1 !== r2
//     });
//     this.state = {
//       dataSource: ds.cloneWithRows(testData)
//     };
//
//     this.renderRow = this.renderRow.bind(this);
//   }
//
//   _navigate(){
//     this.props.navigator.push({
//       name: 'Item', // Matches route.name
//     })
//   }
//
//   renderRow(rowData) {
//     return (
//       <View style={styles.wrapper}>
//         <View>
//           <TouchableHighlight onPress={ () => this._navigate()}>
//             <Text style={styles.text}>{rowData.lastName}, {rowData.firstName}</Text>
//           </TouchableHighlight>
//         </View>
//       </View>
//     );
//   }
//
//   render() {
//     return (
//       <View style={{flex:1}}>
//         <View style={{flex:1}}>
//           <Image
//             style={styles.resizeMode}
//             source={require('./images/Oxford-Home-Image.png')}
//           />
//         </View>
//         <ListView
//           style={{flex:3}}
//           dataSource={this.state.dataSource}
//           renderRow={this.renderRow}
//         />
//       </View>
//     )
//   }
// }
//
// class demo extends Component {
//   renderScene(route, navigator) {
//     if (route.name == 'List') {
//       return <List navigator={navigator} />
//     }
//     if (route.name == 'Item') {
//       return <Item navigator={navigator} />
//     }
//   }
//
//   render() {
//     return (
//
//       <Navigator
//       	style={{ flex:1 }}
//         initialRoute={{ name: 'List' }}
//         renderScene={ this.renderScene } />
//     )
//   }
//
//
// }
//
// AppRegistry.registerComponent('demo', () => demo);






/**
 * Sample Firebase & React Native App
 * https://github.com/davideast/firebase-react-native-sample
 */
'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';
const firebase = require('firebase');
const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const ListItem = require('./components/ListItem');
const DateLabel = require('./components/DateLabel')
const styles = require('./styles.js')

const {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
  Image,
} = ReactNative;

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA-FPbX1XaZpynBlOE9xNaQWKr5AYKqQWU",
  authDomain: "pedal-business.firebaseapp.com",
  databaseURL: "https://pedal-business.firebaseio.com",
  storageBucket: "pedal-business.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
class demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child('users');
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  listenForItems(itemsRef) {
    //console.log(itemsRef);
    itemsRef.on('value', (snap) => {
      // get children as an array
      var items = [];
      var d = new Date();
      var day = d.getDay();

      // each business(user)
      snap.forEach((child) => {
        var tempSpecials = child.val().specials;
        var businessName = child.val().profile_info.business_name;
        var businessId = child.key;
        var eventArray = [];
        var dealArray = [];

        console.log(businessId);
        if (tempSpecials){
          var tempEvent = tempSpecials['event'];
          var tempDeal = tempSpecials['deal'];

          if (tempEvent){
            var tempDayEvent = tempEvent[day];
            if (tempDayEvent){
              for (var key in tempDayEvent){
                eventArray.push(tempDayEvent[key].title);
              }
            }
          }

          if (tempDeal){
            var tempDayDeal = tempDeal[day];
            if (tempDayDeal){
              for (var key in tempDayDeal){
                var tempString = "";
                tempString = tempDayDeal[key].item + ": $" + tempDayDeal[key].price;
                dealArray.push(tempString);
              }
            }
          }

          items.push({
            name: businessName,
            uid: businessId,
            deals: dealArray,
            events: eventArray
          });
        }
      });

      console.log(items);

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  render() {
    return (
      <View style={styles.container}>
      <Image
        style={styles.oxfordImage}
        source={require('./images/Oxford-Home-Image.png')}
      />

        <DateLabel/>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.listview}/>


      </View>
    )
  }


  _renderItem(item) {

    return (
      <ListItem item={item} />
    );
  }

}

AppRegistry.registerComponent('demo', () => demo);
