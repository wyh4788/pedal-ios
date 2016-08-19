import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { Text, View, TouchableHighlight } = ReactNative;

class DeliveryItem extends Component {
  render() {

    var deliveryItems = this.props.item;
    console.log(deliveryItems);
    var arr = [];
    for (var k in deliveryItems){
      arr.push(
        <View key={k} style={styles.deliveryBackground}>
            <Text style={styles.liTitle}>{deliveryItems[k].business_name}</Text>
            <Text style={styles.liDeal}>{deliveryItems[k].phone}</Text>
        </View>
      )
    };

    return (
      <View>
        {arr}
      </View>
    );
  }
}

module.exports = DeliveryItem;
