import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const DealItem = require('./DealItem')
const EventItem = require('./EventItem')
const { View, TouchableHighlight, Text, Navigator} = ReactNative;
const BusinessDetail = require('./BusinessDetail');

class ListItem extends Component {

  _navigate(firebaseApp, businessRef, business_info) {
  	this.props.navigator.push({
    	name: 'BusinessDetail',
      passProps: {
      	firebaseRef: firebaseApp,
        businessRef: businessRef,
        business_info: business_info
      }
    })
  }

  render() {
    return (
      <TouchableHighlight underlayColor='#f2f2f2' onPress={ () => this._navigate(this.props.firebaseApp, this.props.item.uid, this.props.item.business_info)}>
        <View style={styles.containerOutside}>
          <View style={styles.li}>
            <Text style={styles.liTitle}>{this.props.item.business_info.business_name}</Text>
            <DealItem deals={this.props.item.deals} />
          </View>
          <EventItem events={this.props.item.events} />
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;
