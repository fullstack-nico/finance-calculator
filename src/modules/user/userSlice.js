import { createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit'

// import actions
import {
    getUserData_all,

    // expense category
    get_expense_category,
    add_expense_category,
    update_expense_category,
    expense_category_key,

    // expense
    add_expense,
} from './userAction';
import {ADD_CATEGORY, ADD_SUB_CATEGORY, MODE_CATEGORY} from '../../_config/global/constants';


const initialState = {
    userData: null,

    category: null,
    categoryKey: null,
    subCategory: null,
    subCategoryKey: null,
    categoryError: null,
    subCategoryError: null,

    // category modal
    isOpen: false,
    onClose: null,
    title: "title",
    initialValues: null,
    handleSubmitModal: null,
    inputTitle: null,
    inputName: null,
    placeholder:  null,
    showModalSubCategory: false,
    mode: MODE_CATEGORY,

    expenseMode: 'simple',

    // getting category from server
    categoryList_isLoading: false,
    categoryList: [{"key": 0, label: "add category", value: ADD_CATEGORY}],
    subCategoryList_empty: [{"key": 0, label: "add sub category", value: ADD_SUB_CATEGORY}],
    subCategoryList: [{"key": 0, label: "add sub category", value: ADD_SUB_CATEGORY}],
    cat: "nyanners"
}

export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        // Form Validation
        // email: (state,action) => {state.email = validation_email(state, action)},
        // loggedIn: (state,action) => {
        //     console.log("loggedin" + action.payload)
        //     state.uuid = action.payload.value,
        //         state.loggedIn = action.payload.success,
        //         state.initialState_isLoading = false
        // }
        // Category and Subcategory
        category: (state, action) => {state.category = action.payload},
        subCategory: (state, action) => {state.subCategory = action.payload},
        categoryError: (state, action) => {state.categoryError = action.payload},
        subCategoryError: (state, action) => {state.subCategoryError = action.payload},
        setCategoriesModal_isOpen: (state, action)=>{ state.isOpen = action.payload.isOpen },
        setCategoriesModal: (state, action)=>{
            console.log("uwu", action.payload)
            state.isOpen = action.payload.isOpen,
            state.onClose = action.payload.onClose,
            state.title = action.payload.title,
            state.initialValues = action.payload.initialValues,
            state.handleSubmitModal = action.payload.handleSubmitModal,
            state.inputTitle = action.payload.inputTitle,
            state.inputName = action.payload.inputName,
            state.placeholder = action.payload.placeholder,
            state.mode= action.payload.mode

        },
        expenseMode: (state, action) => {state.expenseMode = action.payload}
    },
    extraReducers: (builder) => {
        builder
            // get user data
            .addCase(getUserData_all.pending, (state, action) => {
                console.log("builder getUserData_all pending", action.payload)
            })
            .addCase(getUserData_all.fulfilled, (state, action) => {
                state.userData = action.payload
            })
            .addCase(getUserData_all.rejected, (state, action) => {
                // wont run if builder is fulfilled
                console.log("builder getUserData_all REJECTED : ", action.payload)
                alert(action.payload)

            })
            // EXPENSES

            // add expenses
            // update category and subcategory key
            .addCase(add_expense.pending, (state, action) => {
            })
            .addCase(add_expense.fulfilled, (state, action) => {
                alert("Added new expense successfully")
            })
            .addCase(add_expense.rejected, (state, action) => {
                // wont run if builder is fulfilled
                console.log("builder add_expense REJECTED : ", action.payload)
                alert(action.payload)
            })

            // EXPENSE CATEGORY

            // add category
            .addCase(get_expense_category.pending, (state, action) => {
                console.log("builder get_expense_category pending", action.payload)
                state.categoryList_isLoading = true

            })
            .addCase(get_expense_category.fulfilled, (state, action) => {
                console.log("Category", action.payload)
                state.categoryList_isLoading = false
                state.categoryList = action.payload.categoryList
                state.subCategoryList = action.payload.subCategoryList
            })
            .addCase(get_expense_category.rejected, (state, action) => {
                // wont run if builder is fulfilled
                state.categoryList_isLoading = false
                console.log("builder get_expense_category REJECTED : ", action.payload)
                alert(action.payload)
            })

            // add category
            .addCase(add_expense_category.pending, (state, action) => {
            })
            .addCase(add_expense_category.fulfilled, (state, action) => {
                alert("New Category added successfully")
                state.userData = action.payload
                state.isOpen = false
                state.categoryList_isLoading = true
            })
            .addCase(add_expense_category.rejected, (state, action) => {
                // wont run if builder is fulfilled
                console.log("builder add_expense_category REJECTED : ", action.payload)
                alert(action.payload)
            })

             //update category
            .addCase(update_expense_category.pending, (state, action) => {
            })
            .addCase(update_expense_category.fulfilled, (state, action) => {
                alert("updated succesfully")
                // state.userData = action.payload
            })
            .addCase(update_expense_category.rejected, (state, action) => {
                // wont run if builder is fulfilled
                console.log("builder update_expense_category REJECTED : ", action.payload)
                alert(action.payload)
            })

            // update category and subcategory key
            .addCase(expense_category_key.pending, (state, action) => {
            })
            .addCase(expense_category_key.fulfilled, (state, action) => {
                state.categoryKey = action.payload.categoryKey
                state.subCategoryKey =  action.payload.subCategoryKey
            })
            .addCase(expense_category_key.rejected, (state, action) => {
                // wont run if builder is fulfilled
                console.log("builder expense_category_key REJECTED : ", action.payload)
                alert(action.payload)
            })
    },
})



// Action creators are generated for each case reducer function
export const {
    category,
    subCategory,
    categoryError,
    subCategoryError,
    setCategoriesModal,
    setCategoriesModal_isOpen,
    expenseMode
} = authSlice.actions

export default authSlice.reducer
