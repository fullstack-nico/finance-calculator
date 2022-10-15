import {createAsyncThunk} from '@reduxjs/toolkit';
import {
    KEY_MASTER_APP,
    URL_GET_USER_DATA_BASIC,
    URL_ADD_USER_EXPENSE_CATEGORY,
    URL_GET_USER_EXPENSE_CATEGORY, ADD_SUB_CATEGORY, ADD_CATEGORY,
} from '../../_config/global/constants';
import {saveData, removeDataAll,  serverPost} from '../../_config/global/functions';

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

export const get_expense_category = createAsyncThunk(
    'user/getExpenseCategory',  async(payload, { rejectWithValue, getState}) => {

        const { uuid } = getState().auth;

        const URL = URL_GET_USER_EXPENSE_CATEGORY;

        var req = {
            keyMasterApp: KEY_MASTER_APP,
            uuid,
            categoryType: payload.categoryType,
            subcategoryValue: payload.subcategoryValue,
        };

        //	What to do with the received data
        const processDataFromServer = (response) => {

            if (response.status.status === 'success') {
                let responseData  = response.data.data;

                if(payload.categoryType === "subcategory") {

                    if(!payload.editing) responseData.push({"key": 2, label: "add sub category", value: ADD_SUB_CATEGORY})
                    return {category: "", subCategory: responseData}
                }

                if(!payload.editing) responseData.push({"key": 1, label: "add category", value: ADD_CATEGORY})

                return {category: responseData, subCategory: ""}
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

export const add_expense_category = createAsyncThunk(
    'user/addExpenseCategory',  async(payload, { rejectWithValue, getState, dispatch}) => {

        const { uuid } = getState().auth;

        const URL = URL_ADD_USER_EXPENSE_CATEGORY;

        var req = {
            keyMasterApp: KEY_MASTER_APP,
            uuid,
            category: payload.item,
        };

        //	What to do with the received data
        const processDataFromServer = (response) => {

            if (response.status.status === 'success') {
                dispatch(get_expense_category({categoryType: 'category'}))
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
