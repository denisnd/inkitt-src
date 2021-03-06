import React from 'react';
import PropTypes from 'prop-types';
import {CSSTransitionGroup} from 'react-transition-group';

import AutoSuggestItem from './AutoSuggestItem';

import './sass/AutoSuggest.scss';

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
            cachedSearches: {},
            loading: false
        };
    }

    onChange(value) {
        const { dataProvider, maxItems } = this.props;

        const { dropdownShown, cachedSearches } = this.state;

        this.setState({ value });

        if (!value.trim() && dropdownShown) {
            this.hideDropdown();
            return;
        }

        if (cachedSearches[value]) {
            this.setState({
                dropdownItems: cachedSearches[value],
                dropdownShown: cachedSearches[value].length > 0
            });

            return;
        }

        this.setState({
            dropdownShown: true,
            loading: true,
        });

        dataProvider.search(value, maxItems)
            .then((items) =>
                this.setState({
                    dropdownItems: items,
                    cachedSearches: { ...cachedSearches, [value]: items },
                    dropdownShown: items.length > 0,
                    loading: false
                })
            )
            .catch(error =>
                this.setState({
                    error,
                    loading: false,
                    dropdownShown: false
                })
            );
    }

    selectItem(name) {
        this.setState({
            value: name,
        });

        this.hideDropdown();
    }

    hideDropdown() {
        this.setState({
            dropdownItems: [],
            dropdownShown: false,
            itemSelected: undefined
        });
    }

    onKeyDown(event) {
        const keyCode = event.keyCode;

        const { dropdownItems, dropdownShown, itemSelected } = this.state;

        switch(keyCode) {
            case KC_DOWN:
            case KC_UP:
                if (!dropdownItems.length) return;

                let newItemSelected = typeof itemSelected != 'undefined' ? itemSelected : -1;

                if (keyCode === KC_DOWN) {
                    if (newItemSelected + 1 < dropdownItems.length) newItemSelected++;
                    else newItemSelected = 0;
                } else if (keyCode === KC_UP) {
                    if (newItemSelected > 0) newItemSelected--;
                    else newItemSelected = dropdownItems.length - 1;
                }

                this.setState({ itemSelected: newItemSelected });
                break;
            case KC_ENTER:
                event.preventDefault();

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

    onBlur() {
        this.hideDropdown();
    }

    render() {
        const {
            value,
            dropdownShown,
            dropdownItems,
            itemSelected,
            loading
        } = this.state;

        let {placeholder} = this.props;

        return (
            <div className="autosuggest">
                <input
                    type="text"
                    value={value}
                    onChange={e => this.onChange(e.target.value)}
                    onKeyDown={e => this.onKeyDown(e)}
                    onBlur={e => this.onBlur(e)}
                    ref={ref => this.input = ref}
                    placeholder={placeholder || 'Search fruits'}
                    className="autosuggest__input"
                    autoComplete="off"
                />
                <CSSTransitionGroup
                    transitionName="dropdown"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {dropdownShown &&
                        <div className={'autosuggest__dropdown' + (loading ? ' loading' : '')} key="0">
                            {dropdownItems.map((item, index) =>
                                <AutoSuggestItem
                                    name={item}
                                    onSelect={name => this.selectItem(name)}
                                    key={index}
                                    selected={itemSelected === index}
                                />
                            )}
                        </div>
                    }
                </CSSTransitionGroup>
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
