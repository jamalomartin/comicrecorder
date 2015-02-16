/** @jsx React.DOM */

'use strict';

var React = require('react');

var AddComic = require('./AddComic.js');
var ComicInventory = require('./ComicInventory.js');
var Nav = require('react-bootstrap/Nav');
var Navbar = require('react-bootstrap/Navbar');
var NavItem = require('react-bootstrap/NavItem');

// var ComicStore = require('./ComicStore');

var ComicRecorderApp = React.createClass({
	getInitialState: function() {
		var app = this;

		// ComicStore.addConsumer('addComic', function(comicData) {
		// 	app.replaceState({items: ComicStore.getComics()});
		// });
		return {activeKey: 1};
	},
	selectRecordComicTab: function() {
		this.setState({activeKey: 1});
	},
	selectComicInventoryTab: function() {
		this.setState({activeKey: 2});
	},
	render: function() {
		var cbContent = <AddComic/>;
		if (this.state.activeKey === 2) {
			cbContent = <ComicInventory/>;
		}
		return (
			<div>
				<h3><div>Comic Recorder</div></h3>
				<Navbar staticTop fluid>
					<Nav>
						<NavItem className={this.state.activeKey == 1 ? "active" : ""}
							eventKey={1}
							onClick={this.selectRecordComicTab}>
							Record Comic
						</NavItem >

						<NavItem className={this.state.activeKey == 2 ? "active" : ""}
							eventKey={2}
							onClick={this.selectComicInventoryTab}>
							Comic Inventory
						</NavItem>
					</Nav>
				</Navbar>
				{cbContent}
			</div>
		)
	}
});

var mountNode = document.getElementById('app');
React.renderComponent(<ComicRecorderApp />, mountNode)
