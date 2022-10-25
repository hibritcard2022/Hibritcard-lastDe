import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const loginUserAsync = createAsyncThunk("login/loginUserAsync", async (data) => {
    const res = await axios.post(`https://us-central1-hibritardpro.cloudfunctions.net/api/login`, data).then(res => {

        // fonksiyon olarak kullanılacak başka yere fonksiyon yaz
        const FBIdToken = `Bearer ${res.data.LoginToken}`
        localStorage.setItem("GZIToken", FBIdToken);

        axios.defaults.headers.common["Authorization"] = FBIdToken;

        return { status: res.status, data: res.data }
    }).catch(err => {
        console.log(err.response);
        return { status: err.response.status, data: err.response.data };
    });




    return res;

})



const loginSlice = createSlice({
    name: "login",
    initialState: {
        value: {},
        status: "",
        errors: null,
        authenticated: null
    },
    reducers: {
        statusReset(state) {
            state.status = "";
        }
    },
    extraReducers: {
        //loginUser
        [loginUserAsync.pending]: (state, action) => {

            state.status = "loading";
        },
        [loginUserAsync.fulfilled]: (state, action) => {
            //  console.log(action.payload.data);
            if (action.payload.status == 400 || action.payload.status == 500) {
                state.value = "";
                state.status = "error";
                state.errors = action.payload.data;


            } else {
                state.value = action.payload.data;
                state.status = "success";
            }

        },
        [loginUserAsync.rejected]: (state, action) => {
            console.log("error");
            state.status = "error";
        }

    }
})
export const { statusReset } = loginSlice.actions
export default loginSlice.reducer;