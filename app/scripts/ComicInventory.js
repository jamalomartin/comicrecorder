/** @jsx React.DOM */

'use strict';

var React = require('react');

var Button = require('react-bootstrap/Button');
var ButtonToolbar = require('react-bootstrap/ButtonToolbar');
var Input = require('react-bootstrap/Input');
var Panel = require('react-bootstrap/Panel');
var Table = require('react-bootstrap/Table');

// var ComicStore = require('./ComicStore');

var ComicInventory = React.createClass({
	getInitialState: function() {
		var app = this;

		// ComicStore.addConsumer('addComic', function(comicData) {
		// 	app.setState({comics: comicData.comics});
		// });
		return {comics: []};
	},

	render: function() {
		return (
			<div>
				<Table striped bordered condensed>
					<tbody>
						<tr>
							<th className="text-header">Artist</th>
							<th className="text-header">Writer</th>
							<th className="text-header">Publisher</th>
						</tr>
					</tbody>
				</Table>
			</div>
		)
	}
});

module.exports = ComicInventory;
