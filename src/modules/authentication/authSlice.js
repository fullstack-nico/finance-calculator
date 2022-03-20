import { createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit'

// import actions
import {
    login,
} from './authAction';

const initialState = {
    username: null,
    password: null,
    loginError: false,
    loggedIn: false,
}

export const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers:{
        // Form Validation
        username: (state,action) => {state.username = validation_username(state, action)},
        errorUsername: (state,action) => {state.errorUsername = action.payload},
        /*password: (state,action) =>{state.password = action.payload}*/
        password: (state,action) => {state.password = validation_password(state,action)},
        loginError: (state,action) => {state.loginError = action.payload},
        loggedIn: (state,action) => {state.loggedIn = action.payload}
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.errorUsername = action.payload.errorUsername
            })
    },
})

const validation_username = async (text) => {

    /*schema.validate({age: text})
        .catch(function (err) {
            console.log("validation_username")
            console.log(err);
            return err;
        });
    return {text: text, errorUsername: errr};*/
    return action.payload.text
}

const validation_password = (state, action) => {
    return action.payload
}


// Action creators are generated for each case reducer function
export const {
    username,
    password,
    loginError,
    loggedIn,
} = authSlice.actions

export default authSlice.reducer
