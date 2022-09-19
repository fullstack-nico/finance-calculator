import { createAsyncThunk} from '@reduxjs/toolkit'
import {KEY_MASTER_APP, URL_LOGIN} from '../../_config/global/constants';
import {serverPost} from '../../_config/global/functions';
import {loggedIn} from './authSlice';

export const loginTest = createAsyncThunk(
    'auth/login',  (payload) => {
        console.log("login thunked")
        return payload
    }
);

export const login = createAsyncThunk(
    'auth/logintest',  async(payload, { rejectWithValue, dispatch}) => {

        const URL = URL_LOGIN;

        var req = {
            keyMasterApp: KEY_MASTER_APP,
            email: payload.username,
            password: payload.password,
        };

//	What to do with the received data
        const processDataFromServer = (responseData) => {
            if(responseData.type === 'validation_parameter'){
                if(responseData.message?.password) return rejectWithValue(responseData.message.password)
                if(responseData.message?.email) return rejectWithValue(responseData.message.email)
                return rejectWithValue(JSON.stringify(responseData))
            }
            else if (responseData.status.status === 'success') {
                console.log("SUCCESS")
                dispatch(loggedIn(true))
            }
            else{
                console.log("no response")
            }

        };

        // 	If there is error, what to do
        const errorFunction = (error) => {
            console.log('error function')
            // alert(error);
            // return rejectWithValue('aaaa');
            return rejectWithValue("err")

        };

        const response = await serverPost(URL, req, processDataFromServer, errorFunction, rejectWithValue)
        return response

});



export const incrementAsync = createAsyncThunk(
    'counter/fetchCount', async (payload) => {
        /*const response = validation_username(payload.text);*/
        // The value we return becomes the `fulfilled` action payload
        let a =await schema.validate({age: payload.text})
            .catch(function (err) {
                console.log("validation_username")
                console.log(err);
                return {text: payload.text, errorUsername: err.toString()}
            });
        console.log("aaa")
        console.log(a)
        return a;
    }
);



// export const login = createAsyncThunk(
//     'auth/logintest',  async(payload, { rejectWithValue, dispatch}) => {
//
//         const URL = URL_LOGIN;
//
//         var req = {
//             keyMasterApp: KEY_MASTER_APP,
//             email: payload.username,
//             password: payload.password,
//         };
//
// //	What to do with the received data
//         const processDataFromServer = (responseData) => {
//             // console.log("V  Login V");
//             // console.log(responseData);
//             if(responseData.type === 'validation_parameter'){
//                 if(responseData.message?.password) return rejectWithValue(responseData.message.password)
//                 if(responseData.message?.email) return rejectWithValue(responseData.message.email)
//                 return rejectWithValue(JSON.stringify(responseData))
//             }
//             else if (responseData.status.status === 'success') {
//                 console.log("SUCCESS")
//             }
//             else{
//                 console.log("no response")
//             }
//
//
//
//         };
//
//         // 	If there is error, what to do
//         const errorFunction = (error) => {
//             console.log('error function')
//             // alert(error);
//             // return rejectWithValue('aaaa');
//             return rejectWithValue("err")
//
//         };
//
//         const response = await serverPost(URL, req, processDataFromServer, errorFunction, rejectWithValue)
//         return response
//
//         // try {
//         //     // const response = await fetch(URL,
//         //     //     {
//         //     //         method: 'POST',
//         //     //         headers:
//         //     //             {
//         //     //                 'Accept': 'application/json',
//         //     //                 'Content-Type': 'application/json',
//         //     //             },
//         //     //         body: JSON.stringify(req)
//         //     //     })
//         //     //     .then((response) => response.json())
//         //     //     .then((responseData) => {
//         //     //        return  processDataFromServer(responseData);
//         //     //     })
//         //     //     .catch((error) => {
//         //     //         console.log(error);
//         //     //         return errorFunction(error);
//         //     //     })
//         //
//         // const response = await serverPost(URL, req, processDataFromServer, errorFunction, rejectWithValue)
//         // return response
//         // } catch (err) {
//         //     // Use `err.response.data` as `action.payload` for a `rejected` action,
//         //     // by explicitly returning it using the `rejectWithValue()` utility
//         //     console.log(err)
//         //     return rejectWithValue("err")
//         // }
//     });

