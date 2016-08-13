import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const DealItem = require('./DealItem')
const EventItem = require('./EventItem')
const { View, TouchableHighlight, Text } = ReactNative;

class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight>
        <View style={styles.containerOutside}>
          <View style={styles.li}>
            <Text style={styles.liTitle}>{this.props.item.name}</Text>
            <DealItem deals={this.props.item.deals} />
          </View>
          <EventItem events={this.props.item.events} />

        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;
