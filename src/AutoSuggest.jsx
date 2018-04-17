import React from 'react';
import PropTypes from 'prop-types';

import './AutoSuggest.scss';

const KC_UP = 38;
const KC_DOWN = 40;
const KC_ENTER = 13;
const KC_ESCAPE = 27;

export default class AutoSuggest extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			value: '',
			dropdownItems: [],
			dropdownShown: false,
			itemSelected: undefined,
			cachedSearches: {}
		};
	}

	onChange(value) {
		const {dataProvider, maxItems} = this.props;

		const {cachedSearches} = this.state;

		this.setState({
			value: value
		});

		if (cachedSearches[value]) {
			this.setState({
				dropdownItems: cachedSearches[value],
				dropdownShown: cachedSearches[value].length > 0
			});

			return;
		}

		dataProvider.search(value, maxItems)
			.then((items) =>
			 	this.setState({
			 		dropdownItems: items,
			 		cachedSearches: {...cachedSearches, [value]: items},
			 		dropdownShown: items.length > 0
			 	})
		 	)
			.catch((error) => this.setState({error: error}));

	}

	selectItem(name) {
		this.setState({
			value: name,
		});

		this.hideDropdown();
	}

	hideDropdown() {
		this.setState({
			dropdownShown: false,
			itemSelected: undefined
		});
	}

	onKeyDown(keyCode) {
		const {dropdownItems, dropdownShown, itemSelected} = this.state;

		switch(keyCode) {
			case KC_DOWN:
			case KC_UP:
				if (!dropdownItems.length) return;

				let newItemSelected = typeof itemSelected != 'undefined' ? itemSelected : -1;

				if (keyCode == KC_DOWN) {
					if (newItemSelected+1 < dropdownItems.length) newItemSelected++;
					else newItemSelected = 0;
				} else if (keyCode == KC_UP) {
					if (newItemSelected > 0) newItemSelected--;
					else newItemSelected = dropdownItems.length-1;
				}

				this.setState({itemSelected: newItemSelected});
				break;
			case KC_ENTER:
				if (dropdownShown && dropdownItems && dropdownItems[itemSelected]) {
					this.selectItem(dropdownItems[itemSelected]);
				}
				break;
			case KC_ESCAPE:
				if (dropdownShown) {
					this.hideDropdown();
				}
				break;
		}
	}

	render() {
		const {
			value,
			dropdownShown,
			dropdownItems,
			itemSelected
		} = this.state;

		return (
			<div className="autosuggest">
				<input
					type="text"
					value={value}
					onChange={(e) => this.onChange(e.target.value)}
					onKeyDown={(e) => this.onKeyDown(e.keyCode)}
					onBlur={() => this.hideDropdown()}
					ref={(ref) => this.input = ref}
					placeholder="Search fruits"
					className="autosuggest__input"
					autoComplete="off"
				/>
				{dropdownShown && 
					<div className="autosuggest__dropdown">
						{dropdownItems.map((item, index) =>
							<AutoSuggestItem
								name={item}
								selectItem={(name) => this.selectItem(name)}
								key={index}
								selected={itemSelected === index}
							/>
						)}
					</div>
				}
			</div>
		)
	}
}

AutoSuggest.propTypes = {
	dataProvider: PropTypes.object.isRequired,
	maxItems: PropTypes.number
};

AutoSuggest.defaultProps = {
	maxItems: 5
};

const NOOP = function() {};

class AutoSuggestItem extends React.Component {
	render() {
		const {name, selectItem = NOOP, selected} = this.props;

		return (
			<div className={'autosuggest__item' + (selected ? ' selected' : '')} onClick={() => selectItem(name)} ref={(ref) => this.ref = ref}>
				{name}
			</div>
		)
	}
}