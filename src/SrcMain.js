import React, {Component} from 'react';

import { store } from './_config/global/state/store';
import { Provider } from 'react-redux';
import Navigator from './navigation'
import {NativeBaseProvider} from 'native-base';

function SrcMain() {
    return (
        <NativeBaseProvider>
        <Provider store={store}>
        <Navigator />
        </Provider>
        </NativeBaseProvider>
    )
}

export default SrcMain;
