
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const tokenSlice = createSlice({
    name: "token",
    initialState: {
        userToken: "",
    },
    reducers: {
        tokenController: (state, action) => {

            state.userToken = localStorage.getItem('GZIToken');
            console.log(userToken);
            if (router.pathname != "/register" && router.pathname != "/login") {
                if (!localStorage.getItem('GZIToken') || localStorage.getItem('GZIToken') == "") {

                    return false;
                }
            }
            return true;


        },
    }
})
export const { tokenController } = tokenSlice.actions

export default tokenSlice.reducer;