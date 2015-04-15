'use strict'

var React = require('react/addons');

var Button = require('react-bootstrap').Button;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Input = require('react-bootstrap').Input;
var Panel = require('react-bootstrap').Panel;
var Table = require('react-bootstrap').Table;

var ComicStore = require('./ComicStore');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var ComicInventory = React.createClass({
	getInitialState: function() {
		var app = this;

		ComicStore.setConsumer('loadComic', function(comicData) {
			app.setState({comics: comicData});
		});

		ComicStore.setConsumer('deleteComic', function(comicDeleted) {
			app.setState({comics: comicDeleted});
		});
		return {comics: []};
	},

	handleDelete: function(deleteComic) {
		ComicStore.deleteComic(deleteComic);
		var index = -1;
		for (var i = 0; i < this.state.comics.length; i++) {
			if (this.state.comics[i].key === deleteComic.key) {
				index = i;
			}
		}
		if (index > -1) {
			this.state.comics.splice(index, 1);
		}
		this.setState({comics: this.state.comics});
	},

	componentWillMount: function() {
		ComicStore.loadComic();
	},

	render: function() {
		var comicNodes = this.state.comics.map(function(comic, rank) {
			return (
					<tr key={rank} className="trow">
							<td className="text-font">{comic.publisher}</td>
							<td className="text-font">{comic.artist}</td>
							<td className="text-font">{comic.writer}</td>
							<td className="text-font">{comic.title}</td>
							<td className="text-font">{comic.booknum}</td>
							<td className="text-font">{comic.misc}</td>
							<td className="text-font">{comic.comicType}</td>
							<td className="text-font">{comic.date}</td>
							<td>
								<Button bsStyle="primary" onClick={this.handleDelete.bind(this, comic)}>Delete</Button>
							</td>
					</tr>
			)
		}.bind(this));

		return (
			<div>
				<Table className="ctable table-striped">
					<tbody>
						<tr className="trow">
							<th className="text-header">Publisher</th>
							<th className="text-header">Artist</th>
							<th className="text-header">Writer</th>
							<th className="text-header">Title</th>
							<th className="text-header">Book #</th>
							<th className="text-header">Misc</th>
							<th className="text-header">Comic Type</th>
							<th className="text-header">Date</th>
							<th className="text-header">Delete</th>
						</tr>
						{comicNodes}
					</tbody>
				</Table>
			</div>
		)
	}
});

module.exports = ComicInventory;
