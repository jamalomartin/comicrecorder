/** @jsx React.DOM */

'use strict';

var React = require('react');

var Button = require('react-bootstrap/Button');
var ButtonToolbar = require('react-bootstrap/ButtonToolbar');
var Input = require('react-bootstrap/Input');
var Panel = require('react-bootstrap/Panel');
var Table = require('react-bootstrap/Table');

var ComicStore = require('./ComicStore');

var ComicInventory = React.createClass({
	getInitialState: function() {
		var app = this;

		ComicStore.setConsumer('loadComic', function(comicData) {
			console.log("ComicInventory", comicData);
			app.setState({comics: comicData});
		});
		return {comics: []};
	},

	componentWillMount: function() {
		ComicStore.loadComic();
	},

	render: function() {
		var app = this;
		var comicNodes = this.state.comics.map(function(comic) {
			var className = 'text-font';
			return (
				<tr>
					<td className="text-font">{comic.publisher}</td>
					<td className="text-font">{comic.artist}</td>
					<td className="text-font">{comic.writer}</td>
					<td className="text-font">{comic.title}</td>
					<td className="text-font">{comic.booknum}</td>
					<td className="text-font">{comic.misc}</td>
				</tr>
			)
		}.bind(this));

		return (
			<Table className="ctable table-bordered table-striped">
				<tbody>
					<tr>
						<th className="text-header">Publisher</th>
						<th className="text-header">Artist</th>
						<th className="text-header">Writer</th>
						<th className="text-header">Title</th>
						<th className="text-header">Book #</th>
						<th className="text-header">Misc</th>
					</tr>
					{comicNodes}
				</tbody>
			</Table>
		)
	}
});

module.exports = ComicInventory;
