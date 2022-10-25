import { configureStore } from '@reduxjs/toolkit'
import registerSlice from './registerSlice'
import loginSlice from './loginSlice'
import tokenSlice from './tokenSlice'
import userSlice from './userSlice'
import socialSlice from './socialSlice'
import analysisSlice from './analysisSlice'
import publicProfileSlice from './publicProfileSlice'

export default configureStore({

    reducer: {
        registerSlice: registerSlice,
        loginSlice: loginSlice,
        tokenSlice: tokenSlice,
        userSlice: userSlice,
        socialSlice: socialSlice,
        analysisSlice: analysisSlice,
        publicProfileSlice: publicProfileSlice
    },

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

})