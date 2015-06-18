'use strict';

var React = require('react/addons');

var Button = require('react-bootstrap').Button;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Input = require('react-bootstrap').Input;
var Panel = require('react-bootstrap').Panel;
var Table = require('react-bootstrap').Table;
var Modal = require('react-bootstrap').Modal;
var ModalTrigger = require('react-bootstrap').ModalTrigger;

var ComicStore = require('./ComicStore');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

if(typeof key === typeof undefined){
	alert('Please insert your marvel api key.');
}

var ComicModal = React.createClass({
	getInitialState: function() {
		return {
						cName: [],
						cCreators: [],
						cDescription: '',
						cImage: ''
					 };
	},
	makeApiCall: function() {
		var title = this.props.comicTitle;
		var issue = this.props.comicIssueNumber;
		var url = 'http://gateway.marvel.com:80/v1/public/comics?format=comic&formatType=comic&title='+ title +'&issueNumber='+ issue +'&limit=1&apikey='+key;
		var self = this;

		$.getJSON(url, function(data) {
			var names = [];
			var creators = [];
			var creator = [];
			var characters = [];
			var id = [];
			var role = [];
			var description;
			var image;
			var comicData = data.data.results;

			comicData.filter(function(obj) {
				names = obj.characters.items;
				creators = obj.creators.items;
				description = obj.description;
				image = obj.images[0].path;
			});

			creators.forEach(function(creatorObj) {
				creator.push(creatorObj.name + ': ' + creatorObj.role);
				// role.push(creatorObj.role);
			});

			names.forEach(function(nameObj, i) {
				characters.push(nameObj.name);
			});

			self.setState({
											cName: characters,
											cDescription: description,
											cImage: image,
											cCreators: creator
										});
		}.bind(self));
	},
  componentDidMount: function() {
    this.makeApiCall();
  },
	render: function() {
		var comicImage = this.state.cImage + '/portrait_medium.jpg';
		var characterName = this.state.cName;
		var comicCreators = this.state.cCreators;
		var character;
		var creators;

		if (comicCreators === undefined) {
			return;
		} else {
			creators = comicCreators;
		}

		if (characterName.length <= 0) {
			character = 'Not Avalible';
		} else {
			character = characterName;
		}

		var creatorNodes = creators.map(function(creator, rank) {
			return (
				<tr key={rank}>
					<td>{creator}</td>
				</tr>
			)
		}.bind(this));

		return(
			<Modal bsStyle="primary" title="Comic Details" animation={true}>
				<div className="modal-body">
					<p><strong>Characters: </strong>{character}</p>
					<p><strong>Description: </strong>{this.state.cDescription}</p>
					<strong>Image: <img src={comicImage}/></strong>
					<div className="creators">
						<p><strong>Creators:</strong> {creatorNodes}</p>
					</div>
				</div>
				<div className="modal-footer">
					<Button bsStyle="primary" onClick={this.props.onRequestHide}>Close</Button>
				</div>
			</Modal>
		);
	}
});

var ComicInventory = React.createClass({
	getInitialState: function() {
		var app = this;

		ComicStore.setConsumer('loadComic', function(comicData) {
			app.setState({comics: comicData});
		});

		ComicStore.setConsumer('deleteComic', function(comicDeleted) {
			app.setState({comics: comicDeleted});
		});
		return {filterText: '',comics: []};
	},
	handleInfo: function() {
	},

	handleUserInput: function(filterText) {
		this.setState({comic: filterText});
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
							<td className="text-font">{comic.publisher.toUpperCase()}</td>
							<td className="text-font">{comic.artist.toUpperCase()}</td>
							<td className="text-font">{comic.writer.toUpperCase()}</td>
							<td className="text-font">{comic.title.toUpperCase()}</td>
							<td className="text-font">{comic.booknum}</td>
							<td className="text-font">{comic.misc}</td>
							<td className="text-font">{comic.comicType}</td>
							<td className="text-font">{comic.date}</td>
							<td>
								<Button bsStyle="primary" onClick={this.handleDelete.bind(this, comic)}>Delete</Button>
							</td>
							<td>
								<ModalTrigger modal={<ComicModal comicTitle={comic.title} comicIssueNumber={comic.booknum}/>}>
									<Button bsStyle="primary" onClick={this.handleInfo}>Info</Button>
								</ModalTrigger>
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
							<th className="text-header">Comic Info</th>
						</tr>
						{comicNodes}
					</tbody>
				</Table>
			</div>
		)
	}
});

module.exports = ComicInventory;
