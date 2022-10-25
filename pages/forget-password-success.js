import Link from 'next/link'
import React from 'react'
import GlobalLayout from '../layouts/global-layout'
import StartPageLayout from '../layouts/start-page-layout'

function ForgetPasswordSuccess() {
    return (
        <GlobalLayout>
            <StartPageLayout imagePath={'/images/hibritcard-white-logo.svg'} headerTitle="Şifre Sıfırlama">
                <div className='content-link'>
                    Şifre sıfırlama bağlantısı e postanıza gönderildi.E postanızı Kontrol Ediniz.
                </div>

                <div className='content-link'>
                    Giriş sayfasına dönmek için <Link href="/login"><a>tıklatınız</a></Link>.
                </div>

            </StartPageLayout>
        </GlobalLayout>
    )
}

export default ForgetPasswordSuccess