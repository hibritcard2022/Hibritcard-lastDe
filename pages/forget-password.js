import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/loading';
import GlobalLayout from '../layouts/global-layout';
import StartPageLayout from '../layouts/start-page-layout';
import { forgetEMailSuccessReset, resetPasswordForgetAsync } from '../stores/userSlice';



function ForgetPassword() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [eMail, setEMail] = useState("")

    const passwordForgetErrors = useSelector(state => state.userSlice.forgetEMailError);
    const passwordForgetSuccess = useSelector(state => state.userSlice.forgetEMailSuccess);
    const passwordForgetStatus = useSelector(state => state.userSlice.status);


    function SentMail() {
        dispatch(resetPasswordForgetAsync({ eMail: eMail }))
    }

    useEffect(() => {
        passwordForgetSuccess == true && router.push("/forget-password-success");
        dispatch(forgetEMailSuccessReset());
    }, [passwordForgetSuccess])


    return (
        <GlobalLayout>
            <StartPageLayout imagePath={'/images/hibritcard-white-logo.svg'} headerTitle="Şifre Sıfırlama">
                {passwordForgetStatus == "loading" ? <Loading /> : ""}
                <div className='content-input'>
                    <input value={eMail} onChange={(e) => setEMail(e.target.value)} type="text" placeholder='E-posta' />
                    {passwordForgetErrors && passwordForgetErrors.eMailEmpty ? <div className='error-text'>eMailEmpty</div> : ""}

                    {passwordForgetErrors && passwordForgetErrors.invalidEmail ? <div className='error-text'>invalidEmail</div> : ""}

                    {passwordForgetErrors && passwordForgetErrors.userNotFound ? <div className='error-text'>userNotFound</div> : ""}



                </div>
                <div className='content-buttons-row'>
                    <button onClick={() => { SentMail() }} className='global-button content-buttons-item black-icon-button'>
                        <img src='/icons/mail-White.svg' />
                        <span>Şifremi Sıfırla</span>
                    </button>

                </div>
                <div className='content-or'>
                    <span className='content-bar'></span>
                    <div className='content-text'>VEYA</div>
                    <span className='content-bar'></span>
                </div>

                <div className='content-link'>
                    Giriş sayfasına dönmek için <Link href="/login"><a>tıklatınız</a></Link>.
                </div>

            </StartPageLayout>
        </GlobalLayout>
    )
}

export default ForgetPassword