'use strict';

var React = require('react');
var BarChart = require('react-chartjs').Bar;
var LineChart = require('react-chartjs').Line;
var PieChart = require('react-chartjs').Pie;



var ComicGraphs = React.createClass({
  getInitialState: function() {
    return {
            comicPublisher: [],
            comicDate: [],
            comicTitle: [],
            comcicTitleCounts: []
           };
  },

  fetchState: function() {
    var url = '/py/retrieve_comics';
    var self = this;

    $.getJSON(url, function(result) {
      var counts = {};
      var count = [];
      var date = [];
      var publishers = [];
      var title = [];
      var titleCounts = {};
      var titleCount = [];

      result.forEach(function(comicObj, i) {
        if (publishers.indexOf(comicObj.publisher) === -1) {
          publishers.push(comicObj.publisher);
        }
        if (date.indexOf(comicObj.date) === -1) {
          date.push(comicObj.date);
        }
        if (title.indexOf(comicObj.title) === -1) {
          title.push(comicObj.title);
        }
        counts[comicObj.publisher] = (counts[comicObj.publisher] || 0)+1;
        titleCounts[comicObj.title] = (titleCounts[comicObj.title] || 0)+1;
      });

      for (var c in counts) {
        if (counts.hasOwnProperty(c)) {
          count.push(counts[c]);
        }
      }

      for (var t in titleCounts) {
        if (titleCounts.hasOwnProperty(t)) {
          titleCount.push(titleCounts[t]);
        }
      }

      self.setState({
                      comicPublisher: publishers,
                      publisherCounts: count,
                      comicDate: date,
                      comicTitle: title,
                      comcicTitleCounts: titleCount
                    });
    });
  },

  componentDidMount: function() {
    this.fetchState();
  },

  render: function() {
    var publisherData = this.state.comicPublisher;
    var publisherCounts = this.state.publisherCounts;
    var dates = this.state.comicDate;
    var titles = this.state.comicTitle;
    var titleCounts = this.state.comcicTitleCounts;

    if (publisherData.length >= 0 && publisherCounts !== undefined) {
      var barData = {
          labels: publisherData,
          datasets: [
              {
                label: 'Number of comics by publisher',
                fillColor: ' rgba(215,40,40,0.5)',
                strokeColor: 'rgba(215,40,40,0.8)',
                highlightFill: 'rgba(215,40,40,0.75)',
                highlightStroke: 'rgba(215,40,40,1)',
                data: publisherCounts
              }
          ]
      };
      var lineData = {
          labels: dates,
          datasets: [
              {
                label: 'Number of comics by date',
                fillColor: ' rgba(215,40,40,0.2)',
                strokeColor: 'rgba(215,40,40,1)',
                pointColor: 'rgba(215,40,40,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                data: publisherCounts
              }
          ]
      };
    } else {
      return null;
    }

    var data = this.state.comcicTitleCounts.map(function(count, i) {
      var color = '#'+Math.floor(Math.random()*16777215).toString(16);
      return (
            {
              value: count,
              color: color,
              highlight: color,
              label: titles[i]
            }
      );
    }.bind(this));
    return (
      <div>
        <div>
          <h3 className="chart-title">Number of comics by publisher</h3>
          <BarChart data={barData}
                    width={400}
                    height={400}
                    className="chart-background-color"
          />
      </div>
      <div className="chart-spacing">
        <h3 className="chart-title">Number of comics by year</h3>
          <LineChart data={lineData}
                      width={400}
                      height={400}
                      className="chart-background-color line-chart"
          />
      </div>
        <div className="chart-spacing">
          <h3 className="chart-title">Number of comics by title</h3>
          <PieChart data={data}
                    width={400}
                    height={400}
                    className="chart-background-color"
            />
        </div>f
      </div>
    );
  }
});

module.exports = ComicGraphs;
