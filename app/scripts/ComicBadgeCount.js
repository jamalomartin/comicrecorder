'use strict';

var React = require('react');

var Badge = require('react-bootstrap').Badge;

var ComicBadgeCount = React.createClass({
  getInitialState: function() {
		return {comics: []};
	},

  fetchState: function() {
    var url = '/py/retrieve_comics';
    var self = this;

    $.getJSON(url, function(result) {
      self.setState({comics: result});
    });
  },

  componentDidMount: function() {
    this.fetchState();
  },
  render: function() {
    if (this.state.comics.length) {
      var totalComics = this.state.comics.length;
    }
    return (
      <p> Total Comics: <Badge>{totalComics}</Badge></p>
    );
  }
});

module.exports = ComicBadgeCount;
