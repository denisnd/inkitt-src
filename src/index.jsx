import 'raf/polyfill'; // requestAnimationFrame polyfill for React 16

import React from 'react';
import ReactDOM from 'react-dom';

import './sass/index.scss';

import AutoSuggest from './AutoSuggest';
import DataProvider from './DataProvider';

const dataProvider1 = new DataProvider(
    ['Apple', 'Pineapple', 'Orange', 'Tomato', 'Grapefruit', 'Cherry', 'Blueberry', 'Cranberry', 'Strawberry'],
    700
);

const dataProvider2 = new DataProvider(
    ['Toyota', 'Ford', 'Chrysler', 'Dodge', 'Nissan', 'Renault', 'Mitsubishi', 'Lexus', 'Infiniti', 'Honda', 'Ferrari'],
    700
);

ReactDOM.render(
    <div className="page-container">
        <header>
            <div className="wrapper">
                <h1>Autosuggest Demo</h1>
            </div>
        </header>

        <section className="main">
            <div className="wrapper">
                <h2>The form</h2>

                <p>To proceed, please fill the form, it won't take much time:</p>

                <form onSubmit={(e) => {e.preventDefault()}} className="the-form">

                    <div className="input-container">
                        <input type="text" placeholder="Your name"/>
                    </div>

                    <div className="input-container">
                        <AutoSuggest maxItems={5} dataProvider={dataProvider2} placeholder="Preferable car"/>
                    </div>

                    <div className="input-container">
                        <AutoSuggest maxItems={5} dataProvider={dataProvider1} placeholder="Favourite fruit"/>
                    </div>

                    <input type="submit" value="Finish" onClick={() => alert('Well done!')}/>

                </form>


            </div>
        </section>

        <footer>
            <div className="wrapper">
                Copyright &copy; 2018. Credits
            </div>
        </footer>
    </div>,
    document.getElementById('root')
);
