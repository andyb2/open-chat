import { createSlice } from "@reduxjs/toolkit";

interface IState {
    dimension: number
}

const initialState: IState = {
    dimension: window.innerWidth
}

const viewPortSlice = createSlice({
    name: 'viewPort',
    initialState,
    reducers: {
        setDimension: (state, action) => {
            state.dimension = action.payload;
        }
    }
});

export const { setDimension } = viewPortSlice.actions;
export default viewPortSlice.reducer;