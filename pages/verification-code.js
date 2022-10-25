import Link from 'next/link';
import React from 'react'
import GlobalLayout from '../layouts/global-layout';
import StartPageLayout from '../layouts/start-page-layout';
import ReactCodeInput from 'react-verification-code-input';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loginWithCardUrlAsync } from '../stores/userSlice';
import { useState } from 'react';
import { useRouter } from 'next/router';



function VerificationCode() {
    const router = useRouter();
    const dispatch = useDispatch();

    const verificationCodeError = useSelector(state => state.userSlice.verificationCodeError);
    const verificationCodeSuccess = useSelector(state => state.userSlice.verificationCodeSuccess);

    useEffect(() => {

    }, [verificationCodeError])

    useEffect(() => {
        if (verificationCodeSuccess) {
            localStorage.removeItem("cardUrlLinksId");
            router.push("/select-profile");
        }

    }, [verificationCodeSuccess])



    const [code, setCode] = useState([])

    function verification() {
        let codeValue = "";
        for (let i = 0; i < code.length; i++) {
            codeValue += code[i];

        }
        console.log(codeValue);
        const data = {
            secretKod: localStorage.getItem("cardUrlLinksId"),
            verificationCode: codeValue

        }

        dispatch(loginWithCardUrlAsync(data));
    }

    return (
        <>
            <GlobalLayout>
                <StartPageLayout imagePath={'/images/hibritcard-white-logo.svg'} headerTitle="Kartınızı Doğrulayın">

                    <div>Lütfen kartınız ile birlikte gelen 6 haneli doğrulama kodunu giriniz.</div>

                    <div className='sms-code-area'>
                        <ReactCodeInput
                            onChange={(e) => setCode(e)}
                            onComplete={() => { verification() }}
                            values={code}
                            type='text'
                            className="box"
                            autoFocus={true}
                            fieldWidth="35px"
                            fieldHeight="50px"
                        />


                    </div>
                    {verificationCodeError && <div className='error-text'>Girdiğiniz kod hatalı tekrar giriniz.</div>}
                    {verificationCodeSuccess && <div className='success-text'>Kartınız ile profiliniz başarılı bir şekilde eşleştirildi.</div>}



                    <div className='content-buttons-row'>


                        <div onClick={() => verification()} className='global-button content-buttons-item primary-button'>
                            Doğrula ve devam et
                        </div>

                    </div>


                </StartPageLayout>
            </GlobalLayout></>
    )
}

export default VerificationCode