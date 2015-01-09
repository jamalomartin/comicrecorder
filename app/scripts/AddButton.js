/** @jsx React.DOM */

'use strict';

var React = require('react');
var Button = require('react-bootstrap/Button');
// var ComicTable = require('./ComicTable');
var OverlayMixin = require('react-bootstrap/OverlayMixin');
var Modal = require('react-bootstrap/Modal');

// var ComicStore = require('./stores/ComicStore');

// var SideButton = React.createClass({
//   addNewComic: function () {
//   	var mountNode = document.getElementById('table');
// 	React.renderComponent(<ComicTable />, mountNode);
//   },
//   render: function() {
//   	return (
//   		<Button onClick={this.addNewComic}>Add Comic</Button>
//   	);
//   }
// });
var ComicTable = React.createClass({
  mixins: [OverlayMixin],

  getInitialState: function () {
    return {
      isModalOpen: false
    };
  },

  handleToggle: function () {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  },

  render: function () {
    return (
      <Button onClick={this.handleToggle} bsStyle="primary">Add Comic</Button>
    );
  },

  // This is called by the `OverlayMixin` when this component
  // is mounted or updated and the return value is appended to the body.
  renderOverlay: function () {
    if (!this.state.isModalOpen) {
      return <span/>;
    }

    return (
        <Modal title="Modal heading" onRequestHide={this.handleToggle}>
          <div className="modal-body">
            This modal is controlled by our custom trigger component.
          </div>
          <div className="modal-footer">
            <Button onClick={this.handleToggle}>Close</Button>
          </div>
        </Modal>
      );
  }
});

var mountNode = document.getElementById('b1');
React.renderComponent(<ComicTable />, mountNode);