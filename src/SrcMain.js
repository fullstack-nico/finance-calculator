import React, {Component} from 'react';

import { store } from './_config/global/state/store';
import { Provider } from 'react-redux';
import Navigator from './navigation'

function SrcMain() {
    return (
        <Provider store={store}>
        <Navigator />
        </Provider>
    )
}

export default SrcMain;
