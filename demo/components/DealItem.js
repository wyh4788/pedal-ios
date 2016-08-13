import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { Text, View } = ReactNative;

class DealItem extends Component {
  render() {

    var dealItems = this.props.deals
    var arr = [];
    dealItems.forEach((item, k) => {
      arr.push(
        <Text key={k} style={styles.liDeal}>{item}</Text>
      )
    });

    return (
      <View>
        {arr}
      </View>
    );
  }
}

module.exports = DealItem;
