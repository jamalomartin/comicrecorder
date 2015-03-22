/** @jsx React.DOM */

'use strict';

var React = require('react');

var Button = require('react-bootstrap/Button');
var ButtonToolbar = require('react-bootstrap/ButtonToolbar');
var Input = require('react-bootstrap/Input');
var OverlayTrigger = require('react-bootstrap/OverlayTrigger');
var Panel = require('react-bootstrap/Panel');
var Table = require('react-bootstrap/Table');
var Tooltip = require('react-bootstrap/Tooltip');

var ComicStore = require('./ComicStore');
var ComicData = require('./ComicData');

var AddComic = React.createClass({

	getInitialState: function() {
		return {artist: '',
				writer: '',
				publisher: '',
				booknum: '',
				misc: '',
				title: '',
				comicType: ''
			};
	},

	onSync: function() {
		var newComic = {
			artist: this.state.artist,
			writer: this.state.writer,
			publisher: this.state.publisher,
			booknum: this.state.booknum,
			title: this.state.title,
			misc: this.state.misc,
			comicType: this.state.comicType
		};
		ComicStore.addComic(newComic);
	},

	onArtistChanged: function(e) {
		this.setState({artist: e.target.value});
	},
	onWriterChanged: function(e) {
		this.setState({writer: e.target.value});
	},
	onPublisherChanged: function(e) {
		this.setState({publisher: e.target.value});
	},
	onBooknumChanged: function(e) {
		var x = this.setState({booknum: e.target.value});
	},
	onTitleChanged: function(e) {
		this.setState({title: e.target.value});
	},
	onMiscChanged: function(e) {
		this.setState({misc: e.target.value});
	},
	onComicTypeChanged: function(e) {
		this.setState({comicType: e.target.value});
	},

	render: function() {

		var comicTypeNodes = ComicData.getComicType().map(function (type) {
			return (
				<option value={type}>{type}</option>
			);
		}.bind(this));

		return (
			<Panel header='Add New Comic' className="panel-primary">
				<ButtonToolbar>
					<OverlayTrigger placement="left" overlay={<Tooltip>Save comic to inventory</Tooltip>}>
						<Button bsStyle="primary" onClick={this.onSync}>Sync</Button>
					</OverlayTrigger>
				</ButtonToolbar>
				<form>
					<Table>
						<tbody>
							<tr>
								<th>Artist</th>
								<td><Input type="text" ref='artist' id='artist' onChange={this.onArtistChanged}/></td>
								<th>
									Writer
								</th>
								<td><Input type="text" ref='writer' id='writer' onChange={this.onWriterChanged}/></td>
							</tr>
							<tr>
								<th>
									Publisher
								</th>
								<td><Input type="text" ref='publisher' id='publisher' onChange={this.onPublisherChanged}/></td>
								<th>
									Title
								</th>
								<td><Input type="text" ref='title' id='title' onChange={this.onTitleChanged}/></td>
							</tr>
							<tr>
								<th>
									Book #
								</th>
								<td><Input type="number" ref='booknum' id='booknum' onChange={this.onBooknumChanged}/></td>
								<th>
									Comic Type
								</th>
								<td><select ref='comicType' id='comicType' onChange={this.onComicTypeChanged}>{comicTypeNodes}</select></td>
							</tr>
							<tr>	
								<th>
									Date
								</th>
								<td><Input type="month" ref='Date' id='Date' /></td>
								<th>
									Misc
								</th>
								<td><Input type="text" ref='misc' id='misc' onChange={this.onMiscChanged}/></td>
							</tr>
						</tbody>
					</Table>
				</form>
			</Panel>
		)
	}
});

module.exports = AddComic;
