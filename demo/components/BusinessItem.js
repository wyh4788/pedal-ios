import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const DealItem = require('./DealItem')
const EventItem = require('./EventItem')
const { View, TouchableHighlight, Text} = ReactNative;

class ListItem extends Component {

  render() {
    return (
      <TouchableHighlight>
        <View style={styles.containerOutside}>
          <View style={styles.li}>
            <Text style={styles.liTitle}>{this.props.card.day}</Text>
            <DealItem deals={this.props.card.deals} />
          </View>
          <EventItem events={this.props.card.events} />
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;
