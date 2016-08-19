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
        <View key={k} style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingRight: 4,
        }}>
          <Text style={styles.liEvent}>{item.title}</Text>
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

module.exports = EventItem;
