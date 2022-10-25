import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addUserAsync = createAsyncThunk("register/addUserAsync", async (data) => {

    const res = await axios.post(`https://us-central1-hibritardpro.cloudfunctions.net/api/register`, data).then(res => {



        const FBIdToken = `Bearer ${res.data.generalToken}`
        localStorage.setItem("GZIToken", FBIdToken);

        axios.defaults.headers.common["Authorization"] = FBIdToken;


        console.log(res.status);
        return { status: res.status, data: res.data }
    }).catch(err => {
        return { status: err.response.status, data: err.response.data };
    });

    const firstProfileData = {
        profileTag: data.userHandleName,
        orderOfProfile: 0,

    }
    const firstProfileRes = await axios.post(`https://us-central1-hibritardpro.cloudfunctions.net/api/addProfile`, firstProfileData).then(res => {


        const FBIdToken = localStorage.getItem("GZIToken");

        axios.defaults.headers.common["Authorization"] = FBIdToken;

        console.log("firstProfileRes");
        console.log(res);

        axios.post(`https://us-central1-hibritardpro.cloudfunctions.net/api/clickProfile/${res.data.newProfileId}/add`)
            .then(res => { })



        return res;
    }).catch(err => {
        console.log("firstProfileError");
        console.log(err);
        return err;
    });




    return res;

})



const registerSlice = createSlice({
    name: "register",
    initialState: {
        value: {},
        status: "",
        errors: null,
    },
    reducers: {
        statusReset(state) {
            state.status = "";
        }
    },
    extraReducers: {
        //addUser
        [addUserAsync.pending]: (state, action) => {

            state.status = "loading";
            state.errors = "";
        },
        [addUserAsync.fulfilled]: (state, action) => {
            if (action.payload.status == 400 || action.payload.status == 500) {
                state.value = "";
                state.status = "error";
                state.errors = { globalErrors: action.payload.data.allErrors, registeredEmail: action.payload.data.eMailAccountExist ? true : false };

                console.log(action.payload.data);
            } else {
                state.value = action.payload.data;
                state.status = "success";
                state.errors = "";
            }
        },
        [addUserAsync.rejected]: (state, action) => {


            state.status = "error";
        }
    }
})
export const { statusReset } = registerSlice.actions
export default registerSlice.reducer;