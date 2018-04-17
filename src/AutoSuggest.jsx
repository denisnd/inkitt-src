import React from 'react';
import PropTypes from 'prop-types';

import './AutoSuggest.scss';

export default class AutoSuggest extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			value: '',
			dropdownItems: [],
			dropdownShown: false,
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

	onSelect(name) {
		this.setState({
			value: name,
			dropdownShown: false
		});
	}

	render() {
		const {
			value,
			dropdownShown,
			dropdownItems
		} = this.state;

		return (
			<div className="autosuggest">
				<input
					type="text"
					value={value}
					onChange={(e) => this.onChange(e.target.value)}
					placeholder="Search through our records"
					className="autosuggest__input"
				/>
				{dropdownShown && 
					<div className="autosuggest__dropdown">
						{dropdownItems.map((item, index) =>
							<AutoSuggestItem name={item} onSelect={(name) => this.onSelect(name)} key={index}/>
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
		const {name, onSelect = NOOP} = this.props;

		return (
			<div className="autosuggest__item" onClick={() => onSelect(name)}>
				{name}
			</div>
		)
	}
}