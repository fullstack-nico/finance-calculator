import React from 'react';

// redux hook
import { useSelector } from 'react-redux'

import Counter from '../_examples/global_state/module/Counter';
import FormValidation from '../_examples/global_state/module/FormValidation';
import NavAuthentication from '../navigation/NavAuthentication';
import NavMain from '../navigation/NavMain';

export default function navigator(){
    const loggedIn = useSelector((state) => state.auth.loggedIn)

    if(loggedIn) return <NavMain />
    if(!loggedIn) return <NavAuthentication />
}
