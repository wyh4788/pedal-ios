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
        <View key={k} style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <Text style={styles.liDeal}>{item.title}</Text>
          <Text style={styles.liTime}>{item.start}--{item.end}</Text>
        </View>
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
