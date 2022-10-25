

import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const getAllDateofProfileClickAsync = createAsyncThunk("analysis/getAllDateofProfileClickAsync", async (profileId) => {

    const res = await axios.get(`https://us-central1-hibritardpro.cloudfunctions.net/api/getAllDateofProfileClick/${profileId}`, {
        headers: {
            'Authorization': localStorage.getItem("GZIToken")
        }
    })
        .then(res => {
            console.log("get analiz success");
            return res;
        })


        .catch(err => {
            console.log("get analiz error");
            return err;
        });
    console.log(res);
    return res;

});


export const clickProfileAsync = createAsyncThunk("analysis/clickProfileAsync", async (profileId) => {

    const res = await axios.post(`https://us-central1-hibritardpro.cloudfunctions.net/api/clickProfile/${profileId}/add`)
        .then(res => {
            console.log("get analiz success");
            return res;
        })


        .catch(err => {
            console.log("get analiz error");
            return err;
        });
    console.log(res);
    return res;

});





const analysisSlice = createSlice({
    name: "analysis",
    initialState: {
        clickDateList: [],
        status: "",
        errors: null,
    },
    reducers: {
        /* selectedProfile: (state, action) => {
             console.log(action.payload);
             localStorage.setItem("selectedProfileId", action.payload);
             state.selectProfileId = action.payload;
         }*/
    },
    extraReducers: {
        //getAllSocialMedia
        [getAllDateofProfileClickAsync.pending]: (state, action) => {

            state.status = "loading";
        },
        [getAllDateofProfileClickAsync.fulfilled]: (state, action) => {
            if (localStorage.getItem("GZIToken")) {

                state.clickDateList = action.payload.data && action.payload.data.allUser && action.payload.data.allUser.clickDate;
                state.status = "success";
            }
        },
        //clickProfileAsync
        [clickProfileAsync.pending]: (state, action) => {

            state.status = "loading";
        },
        [clickProfileAsync.fulfilled]: (state, action) => {

            state.status = "success";

        },


    }
})
//export const { } = analysisSlice.actions
export default analysisSlice.reducer;