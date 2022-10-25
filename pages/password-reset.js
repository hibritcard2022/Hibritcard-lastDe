import React from 'react'
import GlobalLayout from '../layouts/global-layout'
import StartPageLayout from '../layouts/start-page-layout'

function PasswordReset() {
    return (
        <GlobalLayout>
            <StartPageLayout imagePath={'/images/hibritcard-white-logo.svg'} headerTitle="Şifre Sıfırlama">



                <div className='content-input'>

                    <div className='input-header-text'>Lüstfen, kayıtlı e-posta adresinizi giriniz.</div>
                    <input type="text" placeholder='E-Posta'></input>


                </div>

                <div className='content-buttons'>
                    <div className='global-button content-buttons-item mail-button'>
                        <i className="fa-solid fa-envelope"></i>
                        ŞİFREMİ SIFIRLA
                    </div>

                </div>
            </StartPageLayout>
        </GlobalLayout>
    )
}

export default PasswordReset