import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getAllSocialMediaAsync = createAsyncThunk("social/getAllSocialMediaAsync", async(profileId) => {

    const res = await axios.get(`https://us-central1-hibritardpro.cloudfunctions.net/api/getAllSocialMedia/${profileId}`, {


            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("get social success");
            return res;
        })


    .catch(err => {
        console.log("get social error");
        return err;
    });

    return res;

});



export const newSocialUrlAddAsync = createAsyncThunk("social/newSocialUrlAddAsync", async(data) => {


    const res = await axios.post(`https://us-central1-hibritardpro.cloudfunctions.net/api/newSocialUrlAdd/${data.profileId}`, data.value, {

            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }

        })
        .then(res => {



            console.log("get social success");

            console.log("NewAllo", res)

            return res;
        })


    .catch(err => {
        console.log("get social error");
        return err;
    });

    return res;

});


export const deleteSocialMediaofProfileAsync = createAsyncThunk("social/deleteSocialMediaofProfileAsync", async(socialId) => {
    console.log("z2" + socialId);
    const res = await axios.delete(`https://us-central1-hibritardpro.cloudfunctions.net/api/deleteSocialMediaofProfile/${socialId}`, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("get social success");
            return res;
        })


    .catch(err => {
        console.log("get social error");
        return err;
    });

    return res;

});


export const updateSocialMediaUrlAsync = createAsyncThunk("social/updateSocialMediaUrlAsync", async(data) => {


    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/updateSocialMediaUrl/${data.socialId}`, data.value, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("update social success");
            return res;
        })


    .catch(err => {
        console.log("update social error");

        return err;
    });

    return res;

});




const socialSlice = createSlice({
        name: "social",
        initialState: {

            socialList: [],
            status: "",
            errors: null,
            NewAddSocialMediaInfo: "",
            NewAddUrlsocialstatus: []
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
            [getAllSocialMediaAsync.pending]: (state, action) => {

                state.status = "loading";

            },
            [getAllSocialMediaAsync.fulfilled]: (state, action) => {

                if (localStorage.getItem("GZIToken")) {

                    state.socialList = action.payload.data && action.payload.data.allsocial;
                    state.status = "success";

                    console.log("allSociallll::", action.payload.data && action.payload.data.allsocial)
                }
            },
            //newSocialUrlAddAsync
            [newSocialUrlAddAsync.pending]: (state, action) => {

                state.NewAddUrlsocialstatus = "loading";
            },
            [newSocialUrlAddAsync.fulfilled]: (state, action) => {

                state.NewAddSocialMediaInfo = action.payload.data ? action.payload.data.socialMediaPanelId : "";
                state.NewAddUrlsocialstatus = "success";
            },
            //deleteSocialMediaofProfileAsync
            [deleteSocialMediaofProfileAsync.pending]: (state, action) => {

                state.status = "loading";
            },
            [deleteSocialMediaofProfileAsync.fulfilled]: (state, action) => {

                state.status = "success";
            },
            //updateSocialMediaUrlAsync
            [updateSocialMediaUrlAsync.pending]: (state, action) => {

                state.status = "loading";
            },
            [updateSocialMediaUrlAsync.fulfilled]: (state, action) => {

                state.status = "success";
            },
        }
    })
    //export const { } = socialSlice.actions
export default socialSlice.reducer;