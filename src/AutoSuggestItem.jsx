import React from 'react';

const NOOP = function() {};

export default function AutoSuggestItem(props) {
    const { name, onSelect = NOOP, selected } = props;

    const onMouseDown = function(event) {
        event.stopPropagation();
        onSelect(name);

        return false;
    };

    return (
        <div className={'autosuggest__item' + (selected ? ' selected' : '')} onMouseDown={onMouseDown}>
            {name}
        </div>
    );
}