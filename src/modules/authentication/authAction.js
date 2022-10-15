import {createAsyncThunk} from '@reduxjs/toolkit';
import {
    KEY_MASTER_APP,
    URL_LOGIN,
    URL_REGISTER,
    USER_TOKEN,
    USER_TOKEN_DESC
} from '../../_config/global/constants';
import {saveData, removeDataAll,  serverPost} from '../../_config/global/functions';

export const logout = createAsyncThunk(
    'auth/logout',  async(payload, { rejectWithValue, dispatch}) => {
        removeDataAll().then((result)=>{
            if(result.success) {
                alert('Log out succesful');
                return true;
            }
            return rejectWithValue(result.value)
        })
    }
)

export const login = createAsyncThunk(
    'auth/login',  async(payload, { rejectWithValue, dispatch}) => {

        const URL = URL_LOGIN;

        var req = {
            keyMasterApp: KEY_MASTER_APP,
            email: payload.email,
            password: payload.password,
        };

        //	What to do with the received data
        const processDataFromServer = (response) => {
            if(response.type === 'validation_parameter'){
                if(response.message?.password) return rejectWithValue(response.message.password)
                if(response.message?.email) return rejectWithValue(response.message.email)
                return rejectWithValue(JSON.stringify(response))
            }
            else if (response.status.status === 'success') {
                // If token is saved succesfully, return true (set loggedIn = true)
                return saveData(USER_TOKEN, response.data.uuid, USER_TOKEN_DESC).then((result) => {
                    if(result.success) return response.data.uuid;
                    else return rejectWithValue(JSON.stringify(response.value))
                })
            }
            return rejectWithValue(JSON.stringify(response))
        };

        // 	If there is error, what to do
        const errorFunction = (error) => {
            console.log('error function')
            return rejectWithValue(error)
        };

        return await serverPost(URL, req, processDataFromServer, errorFunction, rejectWithValue);
});


export const register = createAsyncThunk(
    'auth/register',  async(payload, { rejectWithValue, dispatch}) => {

        const URL = URL_REGISTER;

        var req = {
            keyMasterApp: KEY_MASTER_APP,
            email: payload.email,
            password: payload.password,
        };

        //	What to do with the received data
        const processDataFromServer = (response) => {
            if(response.type === 'validation_parameter') return rejectWithValue(JSON.stringify(response))
            else if (response.status.status === 'success') {
                return saveData(USER_TOKEN, response.data.uuid, USER_TOKEN_DESC).then((result) => {
                    if(result) return response.data.uuid;
                    else return rejectWithValue(JSON.stringify(response))
                })
            }
        };

        // 	If there is error, what to do
        const errorFunction = (error) => {
            console.log('error function')
            return rejectWithValue(error)
        };

        return await serverPost(URL, req, processDataFromServer, errorFunction, rejectWithValue);
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
//         const processDataFromServer = (response) => {
//             // console.log("V  Login V");
//             // console.log(response);
//             if(response.type === 'validation_parameter'){
//                 if(response.message?.password) return rejectWithValue(response.message.password)
//                 if(response.message?.email) return rejectWithValue(response.message.email)
//                 return rejectWithValue(JSON.stringify(response))
//             }
//             else if (response.status.status === 'success') {
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
//         //     //     .then((response) => {
//         //     //        return  processDataFromServer(response);
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

