'use strict'

var React = require('react');

var Nav = require('react-bootstrap').Nav;
var Navbar = require('react-bootstrap').Navbar;
var NavItem = require('react-bootstrap').NavItem;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Tooltip = require('react-bootstrap').Tooltip;

var ComicStore = require('./ComicStore');
var AddComic = require('./AddComic.js');
var ComicInventory = require('./ComicInventory.js');


var ComicRecorderApp = React.createClass({
	getInitialState: function() {
		var app = this;

		ComicStore.addConsumer('addComic', function(comicData) {
			app.replaceState({items: ComicStore.getComics()});
		});
		return {activeKey: 1};
	},
	componentWillMount: function() {

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
				<h3><div className="header">Comic Recorder</div></h3>
				<Navbar staticTop fluid>
					<Nav>
						<OverlayTrigger placement="left" overlay={<Tooltip>Enter Comics</Tooltip>}>
							<NavItem className={this.state.activeKey == 1 ? "active" : ""}
								eventKey={1}
								onClick={this.selectRecordComicTab}>
								Record Comic
							</NavItem >
						</OverlayTrigger>
						<OverlayTrigger placement="right" overlay={<Tooltip>View Current Collection</Tooltip>}>
							<NavItem className={this.state.activeKey == 2 ? "active" : ""}
								eventKey={2}
								onClick={this.selectComicInventoryTab}>
								Comic Inventory
							</NavItem>
						</OverlayTrigger>
					</Nav>
				</Navbar>
				{cbContent}
			</div>
		)
	}
});

var mountNode = document.getElementById('app');
React.render(<ComicRecorderApp />, mountNode)
