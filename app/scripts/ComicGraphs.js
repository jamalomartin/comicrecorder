'use strict';

var React = require('react');
var BarChart = require('react-chartjs').Bar;

// var ComicStore = require('./ComicStore');



var ComicGraphs = React.createClass({
  getInitialState: function() {
    return {comicArtist: []};
  },

  fetchState: function() {
    var url = '/py/retrieve_comics';
    var self = this;

    $.getJSON(url, function(result) {
      var artists = [];
      var comics = result;
      var counts = {};
      var count = [];

      comics.forEach(function(comicObj, i) {
        if (artists.indexOf(comicObj.artist) == -1) {
          artists.push(comicObj.artist);
        }
        counts[comicObj.artist] = (counts[comicObj.artist] || 0)+1;
      });

      for (var c in counts) {
        if (counts.hasOwnProperty(c)) {
          count.push(counts[c])
        }
      }
      
      self.setState({comicArtist: artists});
      self.setState({artistCounts: count});
    });
  },

  componentDidMount: function() {
    this.fetchState();
  },

  render: function() {
    var artistData = this.state.comicArtist;
    var comicCounts = this.state.artistCounts;

    if (artistData.length >= 0 && comicCounts !== undefined) {
      var data = {
          labels: artistData,
          datasets: [
              {
                label: "test1",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: comicCounts
              }
          ]
      };
    } else {
      return null;
    };

    return (
      <div>
            <BarChart data={data}
                      width={400}
                      height={400}
                      />
      </div>
    );
  }
});

module.exports = ComicGraphs;
