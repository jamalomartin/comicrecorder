/** @jsx React.DOM */

'use strict';

var React = require('react');

var Button = require('react-bootstrap/Button');
var ButtonToolbar = require('react-bootstrap/ButtonToolbar');
var Input = require('react-bootstrap/Input');
var Panel = require('react-bootstrap/Panel');
var Table = require('react-bootstrap/Table');

var ComicStore = require('./ComicStore');

var AddComic = React.createClass({

	getInitialState: function() {
		return {artist: '',
				writer: '',
				publisher: ''
			};
	},

	onSync: function() {
		var newComic = {
			artist: this.state.artist,
			writer: this.state.writer,
			publisher: this.state.publisher
		};
		console.log(newComic);
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

	render: function() {
		return (
			<Panel header='Add New Comic' className="panel-primary">
				<ButtonToolbar>
					<Button bsStyle="primary" onClick={this.onSync}>Sync</Button>
					<Button bsStyle="primary">Edit</Button>
				</ButtonToolbar>
				<form>
					<Table>
						<tbody>
							<tr>
								<th>Artist</th>
								<td><Input type="text" ref='artist' id='artist' onChange={this.onArtistChanged}/></td>
							</tr>
							<tr>
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
							</tr>
						</tbody>
					</Table>
				</form>
			</Panel>
		)
	}
});

// React.renderComponent(<ComicApp comicData={comicData} />, document.getElementById('app'));
module.exports = AddComic;
