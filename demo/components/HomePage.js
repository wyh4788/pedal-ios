'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';
const ListItem = require('./ListItem');
const DateLabel = require('./DateLabel')
const styles = require('../styles.js')

const { AppRegistry, ListView, StyleSheet, Text, View, TouchableHighlight, Image, TextInput, InteractionManager, TabBarIOS} = ReactNative;

// Initialize Firebase


var tempItem = [];

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      renderPlaceholderOnly: true,
    };
    this.itemsRef = this.getRef().child('users');
  }

  getRef() {
    console.log(this.props.name);
    return this.props.firebaseApp.database().ref();
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      // get children as an array
      var items = [];
      var d = new Date();
      var day = d.getDay();


      // each business(user)
      snap.forEach((child) => {
        //console.log(child.val());
        var tempSpecials = child.val().specials;
        var business_info = child.val().profile_info;
        var businessId = child.key;
        var eventArray = [];
        var dealArray = [];

        if (business_info){
          if (tempSpecials){
            var tempEvent = tempSpecials['event'];
            var tempDeal = tempSpecials['deal'];

            if (tempEvent){
              var tempDayEvent = tempEvent[day];
              if (tempDayEvent){
                for (var key in tempDayEvent){
                  eventArray.push({
                    title: tempDayEvent[key].title,
                    start: tempDayEvent[key].start,
                    end: tempDayEvent[key].end,
                  });
                }
              }
            }

            if (tempDeal){
              var tempDayDeal = tempDeal[day];
              if (tempDayDeal){
                for (var key in tempDayDeal){
                  var tempString = "";
                  tempString = tempDayDeal[key].item + ": $" + tempDayDeal[key].price;
                  dealArray.push({
                    title: tempString,
                    start: tempDayDeal[key].start,
                    end: tempDayDeal[key].end,
                  });
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
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false});
    });
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

    this.setState({
       dataSource: this.state.dataSource.cloneWithRows(newItems)
     });

  }

  render() {
    if (this.state.renderPlaceholderOnly) {
      return this._renderPlaceholderView();
    }

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
    );
  }

  _renderPlaceholderView() {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  _renderItem(item) {
    return (
      <ListItem item={item} navigator={this.props.navigator} firebaseApp={this.props.firebaseApp} />
    );
  }

}

module.exports = HomePage;
