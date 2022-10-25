import React from 'react'
import GlobalLayout from '../layouts/global-layout'
import StartPageLayout from '../layouts/start-page-layout'

function PasswordCreate() {
    return (
        <GlobalLayout>
            <StartPageLayout imagePath={'/images/hibritcard-white-logo.svg'} headerTitle="Şifre Sıfırlama">


                <div className='content-input'>

                    <div className='input-header-text'>Lüstfen, kayıtlı e-posta adresinizi giriniz.</div>
                    <input type="password" placeholder='Şifre'></input>
                    <input type="password" placeholder='Şifrenizi Doğrulayın'></input>


                </div>

                <div className='content-buttons'>
                    <div className='global-button content-buttons-item check-button'>
                        <i className="fa-solid fa-check"></i>
                        Şifremi Oluştur
                    </div>

                </div>
            </StartPageLayout>
        </GlobalLayout>
    )
}

export default PasswordCreate