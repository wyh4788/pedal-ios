import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { Text, View } = ReactNative;

class EventItem extends Component {
  render() {

    var eventItems = this.props.events
    var arr = [];
    eventItems.forEach((item, k) => {
      arr.push(
        <Text key={k} style={styles.liEvent}>{item}</Text>
      )
    });

    return (
      <View>
        {arr}
      </View>
    );
  }
}

module.exports = EventItem;
