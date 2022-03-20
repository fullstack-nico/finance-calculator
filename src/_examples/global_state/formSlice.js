import { createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit'
import * as yup from 'yup';

const initialState = {
    username: null,
    password: null,
    errorUsername: "null",
    errorPassword: null,
}

/*const increment = createAction('counter/increment')*/
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
        return a;
       /* console.log("response rr")
        console.log(response)
        return response*/
    }
);

export const formValidation = createSlice({
    name: 'formLogin',
    initialState,
    reducers:{
        // Form Validation
        username: (state,action) => {state.username = validation_username(state, action)},
        errorUsername: (state,action) => {state.errorUsername = action.payload},
        /*password: (state,action) =>{state.password = action.payload}*/
        password: (state,action) => {state.password = validation_password(state,action)},
    },
    extraReducers: (builder) => {
        builder
            .addCase(incrementAsync.fulfilled, (state, action) => {
                state.errorUsername = action.payload.errorUsername
            })
    },
})

// yups
// Yup validation
let schema = yup.object().shape({
    /*name: yup.string().required(),*/
    age: yup.number().required().positive().integer(),
});


const validation_username = async (text) => {

    schema.validate({age: text})
        .catch(function (err) {
            console.log("validation_username")
            console.log(err);
            return err;
        });
        return {text: text, errorUsername: errr};
    //return action.payload.text
}

const validation_password = (state, action) => {
    return action.payload
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
/*export const incrementAsync = createAsyncThunk(
    'counter/fetchCount',
    async (amount) => {
        const response = await fetchCount(amount);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);*/

// Action creators are generated for each case reducer function
export const {
    username,
    errorUsername,
    password
} = formValidation.actions


export default formValidation.reducer
