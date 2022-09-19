import React, {useEffect} from 'react';

// redux hook
import { useSelector, useDispatch } from 'react-redux'

import Counter from '../_examples/global_state/module/Counter';
import FormValidation from '../_examples/global_state/module/FormValidation';
import NavAuthentication from '../navigation/NavAuthentication';
import NavMain from '../navigation/NavMain';
import {USER_TOKEN, USER_TOKEN_DESC} from '../_config/global/constants';
import {loadData} from '../_config/global/functions';
import {loggedIn as funcLoggedIn} from '../modules/authentication/authSlice';

export default function navigator(){
    const stateAuth = useSelector((state) => state.auth)
    const loggedIn = useSelector((state) => state.auth.loggedIn)
    const dispatch = useDispatch()

    useEffect(()=>{
       loadData(USER_TOKEN, USER_TOKEN_DESC).then((result)=>{
           if(result.success) dispatch(funcLoggedIn(result))
           else dispatch(funcLoggedIn(null))
       })

    }, [stateAuth.initialState_isLoading]);


    if(stateAuth.initialState_isLoading) return <></>
    if(loggedIn) return <NavMain />
    if(!loggedIn) return <NavAuthentication />
}
