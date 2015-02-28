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
			app.setState({comics: comicData});
		});
		return {comics: []};
	},

	handleDelete: function(deleteComic) {
		var index = -1;
		var comicLength = this.state.comics.length;

		for (var i = 0; i < comicLength.length; i++) {
			if (this.state.comics[i].key === comic.key) {
				index = i;
				break;
			};
		};
		
		this.state.comics.splice(index, 1);
		this.setState({comics: this.state.comics});
		ComicStore.deleteComic(deleteComic);
	},

	componentWillMount: function() {
		ComicStore.loadComic();
	},

	render: function() {
		var app = this;
		var comicNodes = this.state.comics.map(function(comic) {
			var className = 'text-font';
			return (
				<tr key={Math.random()}>
					<td className="text-font">{comic.publisher}</td>
					<td className="text-font">{comic.artist}</td>
					<td className="text-font">{comic.writer}</td>
					<td className="text-font">{comic.title}</td>
					<td className="text-font">{comic.booknum}</td>
					<td className="text-font">{comic.misc}</td>
					<td>
						<Button bsStyle="primary" onClick={this.handleDelete.bind(this, comic)}>Delete</Button>
					</td>
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
						<th className="text-header">Delete</th>
					</tr>
					{comicNodes}
				</tbody>
			</Table>
		)
	}
});

module.exports = ComicInventory;
