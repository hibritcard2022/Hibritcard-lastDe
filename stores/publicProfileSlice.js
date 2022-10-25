

import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const geturlcardRandomAsync = createAsyncThunk("publicProfile/geturlcardRandomAsync", async (cardId) => {

    const res = await axios.get(`https://us-central1-hibritardpro.cloudfunctions.net/api/geturlcardRandom/${cardId}`)
        .then(res => {
            console.log("get card success");
            return res;
        })


        .catch(err => {
            console.log("get card error");
            return err;
        });

    return res;

});



export const getUseridAsync = createAsyncThunk("publicProfile/getUseridAsync", async (userId) => {

    const res = await axios.get(`https://us-central1-hibritardpro.cloudfunctions.net/api/userid/${userId}`)
        .then(res => {
            console.log("get user success");
            return res;
        })


        .catch(err => {
            console.log("get user error");
            console.log(err);
            return err;
        });

    return res;

});




const publicProfileSlice = createSlice({
    name: "publicProfile",
    initialState: {
        allProfile: [{}],
        allSocial: [{}],
        allPanel: [{}],
        publicProfile: "",
        status: "",
        errors: null,
    },
    reducers: {

    },
    extraReducers: {
        //geturlcardRandomAsync
        [geturlcardRandomAsync.pending]: (state, action) => {

            state.status = "loading";
        },
        [geturlcardRandomAsync.fulfilled]: (state, action) => {
            console.log(action.payload.data);
            state.publicProfile = action.payload.data;
            state.status = "success";
        },
        //getUseridAsync
        [getUseridAsync.pending]: (state, action) => {

            state.status = "loading";
        },
        [getUseridAsync.fulfilled]: (state, action) => {
            console.log("all user profile");
            console.log(action.payload);
            state.allProfile = action.payload.data && action.payload.data.allSubProfileInfo;
            state.allSocial = action.payload.data && action.payload.data.allsocial;
            state.allPanel = action.payload.data && action.payload.data.allPanelInfo;
            state.status = "success";
        },
    }
})
//export const { } = socialSlice.actions
export default publicProfileSlice.reducer;