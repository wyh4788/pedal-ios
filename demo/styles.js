const React = require('react-native')
const {StyleSheet} = React
const constants = {
  actionColor: '#24CE84'
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
    paddingTop: 40,
  },
  listview: {
    flex: 1,
    padding: 15,
  },
  li: {
    backgroundColor: '#9bd09a',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 5,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 3,
    paddingRight: 3,
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
  liTitle: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 2,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 3,
    fontSize: 20,
    fontFamily: 'QuicksandBold-Regular',

  },
  liDeal :{
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 20,
    fontSize: 15,
    fontFamily: 'QuicksandBook-Regular',
  },
  liEvent :{
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 24,
    marginRight: 4,
    fontSize: 15,
    fontFamily: 'QuicksandBook-Regular',
  },
  liTime :{
    paddingTop: 3,
    paddingBottom: 3,
    marginRight: 0,
    fontSize: 15,
    fontFamily: 'QuicksandBook-Regular',
  },
  containerOutside :{
    backgroundColor: '#fee371',
    borderRadius: 5,
    marginBottom: 13,
    paddingBottom: 5,
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
    flexDirection: 'row'
  },
  navbarTitle: {
    color: '#444',
    fontSize: 16,
    fontWeight: "500"
  },
  dateLabel: {
    backgroundColor: '#fff',
    height: 30,
    textAlign: 'center',
    fontSize:20,
    paddingTop: 5,
    fontFamily: 'QuicksandLight-Regular',
  },
  center: {
    textAlign: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  action: {
    backgroundColor: constants.actionColor,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  oxfordImage: {
    height:180,
    width:null,
  },
  nav: {
    height: 50,
    backgroundColor: '#efefef',
  },
  navTitle: {
    marginTop:4,
    fontSize:16,
  },
  leftNavButtonText: {
    fontSize: 15,
    marginLeft:13,
    marginTop: 2
  },
  businessContainer: {
    flex: 1,
    marginTop: 50,
  },
  businessNameStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 50,
  },
  businessInfoStyle: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 15,
  },
  homeIcon: {
    height: 20,
    width: 20,
  },
  searchBar: {
    marginTop: 0,
    height: 50,
    width: null,
    borderRadius: 5,
  },
  deliveryTitle: {
    fontSize: 40,
    fontFamily: 'QuicksandLight-Regular',
    margin: 5,
    textAlign: 'center',
  },
  deliveryBackground: {
    backgroundColor: '#9ba1cd',
    borderRadius: 5,
    marginBottom: 13,
    paddingBottom: 5,
  },
})

module.exports = styles
module.exports.constants = constants;
