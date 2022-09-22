import { createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit'

// import actions
import {
    loginTest,
    login,
    register,
    logout,
} from './authAction';

const initialState = {
    initialState_isLoading: true,
    email: "",
    password: "",
    loginError: "abcdefg login error",
    loggedIn: false,

    logout_loading: false,
    logout_message: "Logging out"
}

export const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers:{
        // Form Validation
        email: (state,action) => {state.email = validation_email(state, action)},
        errorUsername: (state,action) => {state.errorUsername = action.payload},
        /*password: (state,action) =>{state.password = action.payload}*/
        password: (state,action) => {state.password = validation_password(state,action)},
        loginError: (state,action) => {state.loginError = action.payload},
        loggedIn: (state,action) => {
            state.loggedIn = action.payload,
            state.initialState_isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder
            // LOGIN
            .addCase(login.pending, (state, action) => {
                console.log("builder " + action.payload + " pending")
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log("builder succesful", action.payload)
                state.loggedIn = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                // wont run if builder is fulfilled
                console.log("builder REJECTED : ", action.payload)
                alert(action.payload)
            })
            // REGISTER
            .addCase(register.pending, (state, action) => {
                console.log("builder " + action.payload + " pending")
            })
            .addCase(register.fulfilled, (state, action) => {
                console.log("builder succesful", action.payload)
                state.loggedIn = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                // wont run if builder is fulfilled
                console.log("builder REJECTED : ", action.payload)
                alert(action.payload)
            })
            // logout
            .addCase(logout.pending, (state, action) => {
                state.logout_loading = true,
                state.initialState_isLoading = true
            })
            .addCase(logout.fulfilled, (state, action) => {
                console.log("builder succesful", action.payload)
                state.loggedIn = false,
                state.logout_loading = false,
                state.initialState_isLoading = false
            })
            .addCase(logout.rejected, (state, action) => {
                // wont run if builder is fulfilled
                console.log("builder REJECTED : ", action.payload)
                alert(action.payload)
                state.logout_loading = false,
                state.initialState_isLoading = false
            })
    },
})

const validation_email= async (text) => {

    /*schema.validate({age: text})
        .catch(function (err) {
            console.log("validation_username")
            console.log(err);
            return err;
        });
    return {text: text, errorUsername: errr};*/
    // return action.payload.text
    return {text: text};
}

const validation_password = (text) => {
    return {text: text};
}

// const validation_password = (state, action) => {
//     return action.payload
// }


// Action creators are generated for each case reducer function
export const {
    email,
    password,
    loginError,
    loggedIn,

} = authSlice.actions

export default authSlice.reducer
