import {createAsyncThunk} from '@reduxjs/toolkit';
import {
    ADD_CATEGORY,
    ADD_SUB_CATEGORY,
    KEY_MASTER_APP, MODE_CATEGORY,
    MODE_SUBCATEGORY, URL_ADD_EXPENSE, URL_ADD_USER_EXPENSE_CATEGORY,
    URL_GET_USER_EXPENSE_CATEGORY, URL_UPDATE_USER_EXPENSE_CATEGORY,
} from '../../_config/global/constants';
import {serverPost} from '../../_config/global/functions';

export const get_expense_category = createAsyncThunk(
    'user/getExpenseCategory',  async(payload, { rejectWithValue, getState}) => {

        const { uuid } = getState().auth;
        const { subCategoryList, categoryList} = getState().user;

        const URL = URL_GET_USER_EXPENSE_CATEGORY;

        var req = {
            keyMasterApp: KEY_MASTER_APP,
            uuid,
            categoryType: payload.categoryType,
            subcategoryValue: payload.subcategoryValue,
        };

        console.log("---> req")
        console.log(req)

        //	What to do with the received data
        const processDataFromServer = (response) => {

            if (response.status.status === 'success') {
                let responseData  = response.data.data;

                if(payload.categoryType === MODE_SUBCATEGORY) {

                    // if sub category is in editing mode
                    if(payload.editing) {

                        // if there is no sub category for the selected category exist
                        if(responseData.length === 0){
                            return {categoryList, subCategoryList: [{"key": 1, label: "add sub category", value: ADD_SUB_CATEGORY}]}
                        }
                        responseData.push({"key": 1, label: "add sub category", value: ADD_SUB_CATEGORY})
                        return { categoryList, subCategoryList: responseData}
                    }

                    // if sub category is not in editing mode
                    responseData.push({"key": 1, label: "add sub category", value: ADD_SUB_CATEGORY})
                    return {categoryList, subCategoryList: responseData}
                }

                if(!payload.editing) {
                    responseData.push({"key": 1, label: "add category", value: ADD_CATEGORY})
                    return {categoryList: responseData, subCategoryList: subCategoryList}
                }
                return {categoryList: responseData, subCategoryList: subCategoryList}

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
            mode: payload.mode,
            categoryName: payload.categoryName, // if mode is subcategory
            item: payload.item
        };

        //	What to do with the received data
        const processDataFromServer = (response) => {

            if (response.status.status === 'success') {
                // dispatch(get_expense_category({categoryType: payload.mode, editing: false, subcategoryValue: payload.categoryName}))
                // dispatch(get_expense_category({categoryType: 'category'}))
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

export const update_expense_category = createAsyncThunk(
    'user/updateExpenseCategory',  async(payload, { rejectWithValue, getState, dispatch}) => {

        const { uuid } = getState().auth;

        const URL = URL_UPDATE_USER_EXPENSE_CATEGORY;

        var req = {
            keyMasterApp: KEY_MASTER_APP,
            uuid,
            categoryType: payload.categoryType,
            categoryKey_label:  payload.categoryKey_label,
            subCategoryKey_label: payload?.subCategoryKey_label,
            value: payload.value
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

export const expense_category_key = createAsyncThunk(
    'user/expenseCategoryKey',  async(payload, { rejectWithValue, getState, dispatch}) => {
        const { categoryList, subCategoryList, categoryKey, subCategoryKey } = getState().user;

        let { mode, value } = payload;

        if(mode === MODE_CATEGORY){
            console.log("categoryList", value)
            console.log(categoryList)


            let returnObject;
            categoryList.find((item) => {

                if(item.value === value){
                    console.log("find")
                    console.log(item)
                    returnObject = {categoryKey: item.key, subCategoryKey: null}
                }
            })
            return returnObject
        }
        else if(mode === MODE_SUBCATEGORY){
            console.log("subCategoryList", value)
            console.log(subCategoryList)

            let returnObject;
            subCategoryList.find((item) => {

                if(item.value === value){
                    console.log("find")
                    console.log(item)
                    returnObject = {subCategoryKey: item.key, categoryKey}
                }
            })
            return returnObject
        }
        // return rejectWithValue("error on setting key for category or sub category")

    });

export const add_expense = createAsyncThunk(
    'user/addExpense',  async(payload, { rejectWithValue, getState, dispatch}) => {

        const { uuid } = getState().auth;
        const { categoryKey, subCategoryKey} = getState().user;

        const URL = URL_ADD_EXPENSE;

        var req = {
            keyMasterApp: KEY_MASTER_APP,
            uuid,
            expenseName: payload.expenseName,
            expensePrice: payload.expensePrice,
            expenseCategoryKey: categoryKey,
            expenseSubcategoryKey: subCategoryKey,
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
