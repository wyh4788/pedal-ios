'use strict';
import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { StyleSheet, Text, View} = ReactNative;

class DateLabel extends Component {
  render() {
    let dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr',
                     'Fri', 'Sat'];
    let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var d = new Date();
    var dateLabel = dayOfWeek[d.getDay()] + " " +
                    month[d.getMonth()] + " " +
                    d.getDate();

    return (
      <Text style={styles.dateLabel}>
        {dateLabel}
      </Text>
    );
  }
}

module.exports = DateLabel;
