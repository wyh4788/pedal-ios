'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';
const DeliveryItem = require('./DeliveryItem');
const DateLabel = require('./DateLabel')
const styles = require('../styles.js')

const { AppRegistry, ListView, StyleSheet, Text, View, TouchableHighlight, Image, TextInput, InteractionManager, TabBarIOS} = ReactNative;

// Initialize Firebase


class DeliveryPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
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


        if (business_info){
          if (business_info.delivery){
            items.push({
              business_info: business_info,
            });
          }
        }
      });

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
        <Text style={styles.deliveryTitle}>Delivery</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.listview}/>
      </View>
    );
  }


  _renderItem(item) {
    return (
      <DeliveryItem item={item}/>
    );
  }

}

module.exports = DeliveryPage;
