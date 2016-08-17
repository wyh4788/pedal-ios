'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';
const firebase = require('firebase');
const ListItem = require('./ListItem');
const DateLabel = require('./DateLabel')
const styles = require('../styles.js')

const { AppRegistry, ListView, StyleSheet, Text, View, TouchableHighlight, Image, TextInput} = ReactNative;

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA-FPbX1XaZpynBlOE9xNaQWKr5AYKqQWU",
  authDomain: "pedal-business.firebaseapp.com",
  databaseURL: "https://pedal-business.firebaseio.com",
  storageBucket: "pedal-business.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

var tempItem = [];

class HomePage extends Component {

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
        var business_info = child.val().profile_info;
        var businessId = child.key;
        var eventArray = [];
        var dealArray = [];

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
            business_info: business_info,
            uid: businessId,
            deals: dealArray,
            events: eventArray,
          });
        }
      });

      tempItem = items;
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  setSearchText(event) {
    let searchText = event.nativeEvent.text;
    this.setState({searchText});
    var newItems = [];

    tempItem.forEach((child) => {
      if (child.business_info.business_name.search(searchText) != -1){
        newItems.push(child);
      }

    });

    console.log(newItems);
    this.setState({
       dataSource: this.state.dataSource.cloneWithRows(newItems)
     });

  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          value={this.state.searchText}
          onChange={this.setSearchText.bind(this)}
          placeholder='”Search”' />
        <Image
          style={styles.oxfordImage}
          source={require('../images/Oxford-Home-Image.png')}
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
      <ListItem item={item} navigator={this.props.navigator} firebaseApp={firebaseApp} />
    );
  }

}

module.exports = HomePage;
