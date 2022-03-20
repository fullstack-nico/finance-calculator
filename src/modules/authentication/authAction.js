import { createAsyncThunk} from '@reduxjs/toolkit'

export const login = createAsyncThunk(
    'auth/login', async (payload) => {
        return payload
    }
);



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

