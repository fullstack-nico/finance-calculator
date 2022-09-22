import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {KEY_MASTER_APP, URL_LOGIN} from '../../_config/global/constants';
import {serverPost} from '../../_config/global/functions';
import {incrementAsync} from './formSlice';

const initialState = {
    countValue: 0,
    textValue: 'Please input text',
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers:{
        increment: (state) => {state.countValue +=1},
        incrementByAmount: (state, action) => {
            state.countValue += action.payload.add,
            state.textValue = action.payload.text
        },
        changeText: (state, action) => {state.textValue = action.payload},
        resetAmount: (state) => initialState,
        // extraReducers: (builder) => {
        //     builder
        //         .addCase(loginTest.fulfilled, (state, action) => {
        //             console.log("builder for login test succesful")
        //             // state.errorUsername = action.payload.errorUsername
        //         })
        // },
    },
})

// thunk template
// export const logintest = createAsyncThunk(
//     'auth/loginTest',  async(payload, { rejectWithValue, dispatch}) => {
//
//         const URL = URL_LOGIN;
//
//         var req = {
//             keyMasterApp: KEY_MASTER_APP,
//             email: payload.email,
//             password: payload.password,
//         };
//
// //	What to do with the received data
//         const processDataFromServer = (response) => {
//             if(response.type === 'fail'){
//
//                 return rejectWithValue(JSON.stringify(response))
//             }
//             else if (response.status.status === 'success') {
//                 return 'success'
//             }
//             return rejectWithValue(JSON.stringify(response))
//         };
//
//         // 	If there is error, what to do
//         const errorFunction = (error) => {
//             console.log('error function')
//             return rejectWithValue(error)
//         };
//
//         return await serverPost(URL, req, processDataFromServer, errorFunction, rejectWithValue);
// });

// Action creators are generated for each case reducer function
export const {
    increment,
    resetAmount,
    incrementByAmount,
    changeText
} = counterSlice.actions

export default counterSlice.reducer
