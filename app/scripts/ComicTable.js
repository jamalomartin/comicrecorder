/** @jsx React.DOM */

'use strict';

var React = require('react');
// var PanelGroup = require('react-bootstrap/PanelGroup');
// var Panel = require('react-bootstrap/Panel');
var OverlayMixin = require('react-bootstrap/OverlayMixin');
var Button = require('react-bootstrap/Button');
var Modal = require('react-bootstrap/Modal');

// var ComicTable = React.createClass({
//   render: function() {
//     return(
//       <PanelGroup defaultActiveKey='2' accordion>
//         <Panel header="Panel 1" eventKey='1'>Panel 1 content</Panel>
//       </PanelGroup>
//     );
//   }
// })
// Our custom component is managing whether the Modal is visible
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
      <Button onClick={this.handleToggle} bsStyle="primary">Launch</Button>
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

module.exports = ComicTable;