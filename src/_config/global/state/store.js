import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../../../_examples/global_state/counterSlice';
import formReducer from '../../../_examples/global_state/formSlice';
import authReducer from '../../../modules/authentication/authSlice'

export const store = configureStore({
    reducer:{
        counter: counterReducer,
        formLogin: formReducer,
        auth: authReducer,
    }
})
