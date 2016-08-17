import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const firebase = require('firebase');
const BusinessItem = require('./BusinessItem');
const { View, Text, ListView } = ReactNative;


class BusinessDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
    var businessRef = this.props.businessRef;
    this.itemRef = this.getRef('users/' + businessRef);
  }

  getRef(reference) {
    var firebaseApp = this.props.firebaseRef;
    return firebaseApp.database().ref(reference);
  }

  listenForItems(itemRef) {
    var items = [];

    itemRef.on('value', (snap) => {
      //console.log(snap.val().specials);
      var events = snap.val().specials.event;
      var deals = snap.val().specials.deal;
      var dayMap = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
      }

      // find and push events and deals of the day
      var dayArray = [1, 2, 3, 4, 5, 6, 0];
      dayArray.forEach((i) => {
        var dayDeal = deals[i];
        var dayEvent = events[i];
        var dealArray = [];
        var eventArray = [];

        if (dayDeal){
          for (var key in dayDeal) {
            var tempString = "";
            tempString = dayDeal[key].item + ": $" + dayDeal[key].price;
            dealArray.push(tempString);
          }
        }
        if (dayEvent){
          for (var key in dayEvent) {
            eventArray.push(dayEvent[key].title);
          }
        }
        items.push({
          day: dayMap[i],
          deals: dealArray,
          events: eventArray,
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
    });
  }

  componentDidMount() {
    this.listenForItems(this.itemRef);
  }

  render() {
    return (
      <View style={styles.businessContainer}>
        <Text style={styles.businessNameStyle}>{this.props.business_info.business_name}</Text>
        <Text style={styles.businessInfoStyle}>{this.props.business_info.phone}</Text>
        <Text style={styles.businessInfoStyle}>{this.props.business_info.address}</Text>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.listview}/>
      </View>
    )
  }

  _renderItem(item) {
    return (
      <BusinessItem card={item}/>
    );
  }

}

module.exports = BusinessDetail;
