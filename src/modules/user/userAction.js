import {createAsyncThunk} from '@reduxjs/toolkit';
import {
    KEY_MASTER_APP,
    URL_GET_USER_DATA_BASIC,
} from '../../_config/global/constants';
import {serverPost} from '../../_config/global/functions';
export * from './userAction_expense';

export const getUserData_all = createAsyncThunk(
    'user/getUserData',  async(payload, { rejectWithValue, getState}) => {

        const { uuid } = getState().auth;

        const URL = URL_GET_USER_DATA_BASIC;

        var req = {
            keyMasterApp: KEY_MASTER_APP,
            uuid
        };

        //	What to do with the received data
        const processDataFromServer = (response) => {

            if (response.status.status === 'success') {
                return response.data.data;
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



