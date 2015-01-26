/** @jsx React.DOM */

'use strict';

var React = require('react');
var Button = require('react-bootstrap/Button');
var Input = require('react-bootstrap/Input');
var Table = require('react-bootstrap/Table');

// var ComicStore = require('./stores/ComicStore');

var ComicInput = React.createClass({
	getInitialState: function() {
		return {comic: []}
	},
	render: function() {
		return (
			<div className="right">
				<form className = "navbar-form navbar-left">
					<Input type="text" placeholder="Writer" value={this.state.comic.writer} />
					<Input type="text" placeholder="Artist" value={this.state.comic.artist} />
					<Input type="text" placeholder="Publisher" value={this.state.comic.publisher} />
					<Input type="text" placeholder="Book #" value={this.state.comic.book} />

					<Input type="submit" value={this.state.comic} add={this.add} />
				</form>
			</div>
		)
	},
	add: function(e) {
		var val = e.target.value;
		console.log(val);
	}
});

var mountNode = document.getElementById('addInput');
React.renderComponent(<ComicInput />, mountNode);

var ComicBookRow = React.createClass({
	render: function() {
		return (
			<tr>
				<td>
					{this.props.comic.writer}
				</td>
				<td>
					{this.props.comic.artist}
				</td>
				<td>
					{this.props.comic.publisher}
				</td>
				<td>
					{this.props.comic.book}
				</td>
			</tr>
		)
	}
});

var NewTableEntry = React.createClass({
	render: function() {
		var rows = this.props.comics.map(function(comic) {
			return (
				<div>
					<ComicBookRow key={comic} comic={comic} />
				</div>
			)
		});
		return (
			<div className="table">
				<Table>
					<thead>
						<tr>
							<th>Writer</th>
							<th>Artist</th>
							<th>Publisher</th>
							<th>Book #</th>
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</Table>
			</div>
		)
	}
});


var comics = [
				{
					writer : "Jamal",
					artist : "Martin",
					publisher : "Marvel",
					book : "1"
				},
				{
					writer : "Zoom",
					artist : "Martin",
					publisher : "Marvel",
					book : "2"
				},
				{
					writer : "Boom",
					artist : "Crud",
					publisher : "DC",
					book : "3"
				}
			];

React.renderComponent(<NewTableEntry comics={comics}/>, document.getElementById('newTableEntry'));
