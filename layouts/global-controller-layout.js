import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/loading';
import { getUserAsync, selectedProfile } from '../stores/userSlice';
import { useRouter } from "next/router";
import Header from '../components/header';

function GlobalControllerLayout({ children }) {

    const router = useRouter();
    const dispatch = useDispatch();
    const userStatus = useSelector(state => state.userSlice.status);
    const user = useSelector(state => state.userSlice.user);
    const profiles = useSelector(state => state.userSlice.profiles);
    const selectProfileId = useSelector(state => state.userSlice.selectProfileId);



    useEffect(() => {
        if (localStorage.getItem("GZIToken")) {
            if (!user) {
                dispatch(getUserAsync());
                console.log("******************************variables update");
            }
            if (!localStorage.getItem("selectedProfileId")) {
                router.push("/select-profile");
            }
            if (selectProfileId == "") {

                dispatch(selectedProfile(localStorage.getItem("selectedProfileId")));

            }
        } else {
            router.push("/login");
        }






    }, []);





    return (
        <div>
            <Header />
            {userStatus == "loading" ? <Loading /> : ""}
            {children}

        </div>
    )
}

export default GlobalControllerLayout