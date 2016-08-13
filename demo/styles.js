const React = require('react-native')
const {StyleSheet} = React
const constants = {
  actionColor: '#24CE84'
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  listview: {
    flex: 1,
    padding: 13,
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
    fontFamily: "Times New Roman",

  },
  liDeal :{
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 20,
    fontSize: 15,
  },
  liEvent :{
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 24,
    fontSize: 15,
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
})

module.exports = styles
module.exports.constants = constants;
