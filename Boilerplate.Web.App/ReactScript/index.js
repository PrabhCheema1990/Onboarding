

import React, { Component } from 'react';
import {render} from 'react-dom';
import App from './Component/App.jsx';
import 'semantic-ui-css/semantic.min.css';
import './style/myStyle.css';
import { Table, Modal, Button, Checkbox, Icon, Form, Header, Image } from 'semantic-ui-react';


function renderApp() {
    render(
        <App/>,
        document.getElementById("root")
    );
}
renderApp();

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept();
    //module.hot.accept('./routes', () => { const NextApp = require('./routes').default; renderApp(); });
}