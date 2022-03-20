import { createSlice } from '@reduxjs/toolkit'

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
    },
})

// Action creators are generated for each case reducer function
export const {
    increment,
    resetAmount,
    incrementByAmount,
    changeText
} = counterSlice.actions

export default counterSlice.reducer
