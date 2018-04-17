import 'raf/polyfill'; // requestAnimationFrame polyfill for React 16

import React from 'react';
import ReactDOM from 'react-dom';

import AutoSuggest from './AutoSuggest';
import DataProvider from './DataProvider';

const dataProvider = new DataProvider(
    ['Apple', 'Pineapple', 'Orange', 'Tomato', 'Grapefruit', 'Cherry', 'Blueberry', 'Cranberry', 'Strawberry'],
    700
);

ReactDOM.render(
    <div>
        <h1>Autosuggest (React), Inkitt test</h1>
        <AutoSuggest maxItems={5} dataProvider={dataProvider} />
    </div>,
    document.getElementById('root')
);
