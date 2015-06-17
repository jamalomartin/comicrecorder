'use strict';

var React = require('react');
var BarChart = require('react-chartjs').Bar;



var ComicGraphs = React.createClass({
  getInitialState: function() {
    return {comicPublisher: []};
  },

  fetchState: function() {
    var url = '/py/retrieve_comics';
    var self = this;

    $.getJSON(url, function(result) {
      var publishers = [];
      var counts = {};
      var count = [];

      result.forEach(function(comicObj, i) {
        if (publishers.indexOf(comicObj.publisher) === -1) {
          publishers.push(comicObj.publisher);
        }
        counts[comicObj.publisher] = (counts[comicObj.publisher] || 0)+1;
      });

      for (var c in counts) {
        if (counts.hasOwnProperty(c)) {
          count.push(counts[c]);
        }
      }

      self.setState({comicPublisher: publishers});
      self.setState({publisherCounts: count});
    });
  },

  componentDidMount: function() {
    this.fetchState();
  },

  render: function() {
    var publisherData = this.state.comicPublisher;
    var publisherCounts = this.state.publisherCounts;

    if (publisherData.length >= 0 && publisherCounts !== undefined) {
      var data = {
          labels: publisherData,
          datasets: [
              {
                label: 'test1',
                fillColor: 'rgba(220,220,220,0.5)',
                strokeColor: 'rgba(220,220,220,0.8)',
                highlightFill: 'rgba(220,220,220,0.75)',
                highlightStroke: 'rgba(220,220,220,1)',
                data: publisherCounts
              }
          ]
      };
    } else {
      return null;
    }

    return (
      <div>
            <BarChart data={data}
                      width={400}
                      height={400}
                      className="chart-backgroung-color"
                      />
      </div>
    );
  }
});

module.exports = ComicGraphs;
