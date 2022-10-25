
import React from 'react'
import { useState, useRef } from 'react'
import Header from '../components/header'
import ReactCodeInput from 'react-verification-code-input';
import ProfilePageButton from '../components/profile-page-button';
import { useRouter } from 'next/router'
import NumberFormat from 'react-number-format';

/// settings


function Setting() {


    const router = useRouter();
    async function exit() {
        await localStorage.removeItem('GZIToken');
        router.push("/login");
    }


    return (
        <>
            <Header />

            <div className='main-content '>
                <div className='main-container'>
                    {/*}   <div className='main-card-global'>
                        <div className='main-card '>

                            <div className='main-card-header'>
                                Hesap
                            </div>

                            <div className='content-in content-input-padding'>
                                <div className='content-input-row'>
                                    <input type="text" placeholder='İsim'></input>

                                    <span className='content-input-space'>

                                    </span>

                                    <input type="text" placeholder='Soyisim'></input>


                                </div>
                                <div className='content-input-row'>
                                    <div className='content-input-item '>


                                    </div>
                                    <span className='content-input-space'>

                                    </span>
                                    <div className='content-input-item '>

                                    </div>

                                </div>
                                <div className='content-input'>
                                    <div className='date-input'><NumberFormat format="##.##.####" placeholder="Doğum Tarihi" mask={['G', 'G', 'M', 'M', 'Y', 'Y', 'Y', 'Y']} /></div>

                                    <select>

                                        <option>Cinsiyetinizi Seçiniz</option>
                                        <option>Erkek</option>
                                        <option>Kadın</option>

                                    </select>

                                    <input type="text" placeholder='E-Posta'></input>


                                </div>

                            </div>
                            <div className='profile-save-button-global'>
                                <button className='profile-save-button'>
                                    Değişiklikleri kaydet
                                </button>
                            </div>


                        </div>
                    </div>*/}
                    <div className='main-card-global'>
                        <div className='main-ads-card-mini'>
                            <div className='main-ads-left'>

                                <div className='main-ads-header'>
                                    Hibrit Card Pro
                                </div>
                                <div className='main-ads-text'>
                                    Şimdi gel Hibrit Card Pro’lu ol, avantajların keyfine bak. </div>
                            </div>
                            <div className='main-ads-offer'>
                                <p>İlk aya özel</p>

                                <p>%20 indirimli</p>
                            </div>
                            <div className='main-ads-offer-circle'></div>


                        </div>


                    </div>
                    {/*     <div className='main-card-global'>
                        <div className='main-card '>

                            <div className='main-card-header'>
                                Güvenlik
                            </div>
                            <div className='content-in content-input-padding'>

                                <div className='content-input'>

                                    <input type="text" placeholder='Eski Şifre'></input>
                                    <input type="text" placeholder='Şifre'></input>
                                    <input type="text" placeholder='Şifrenizi Doğrulayın'></input>

                                </div>

                            </div>

                            <div className='verification'>
                                <div className='verification-left'>
                                    <div className='verification-header'>
                                        İki Faktörlü Doğrulama
                                    </div>
                                    <div className='verification-text'>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    </div>
                                </div>
                                <div className='switch-button '>
                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>

                            <div className='sms-area'>
                                <div className='phone-number'>
                                    +90 000 000 00 00
                                </div>
                                <div className='sms-button'>
                                    <span>SMS gönder</span>
                                    <img src='icons/Send-gray.png'></img>
                                </div>

                            </div>
                            <div className='sms-code-area'>*/}
                    {/** https://www.npmjs.com/package/react-verification-code-input */}
                    {/*   <ReactCodeInput
                                    type='text'
                                    className="box"
                                    autoFocus={false}
                                />

                            </div>

                            <div className='sms-desciription-text'>
                                Lütfen cep telefonunuza gelen kodu giriniz.
                            </div>

                            <button className="profile-save-button-global">
                                <div className='profile-save-button'>

                                    Değişiklikleri kaydet

                                </div>
                            </button>
                        </div>
                    </div>
                    <div className='main-card-global'>
                        <div className='account-buttons'>
                            <div className='global-button account-delete-button'>
                                Hesabı sil
                            </div>
                            <div className='button-space '></div>
                            <div onClick={() => exit()} className='global-button account-exit-button'>
                                Çıkış yap
                            </div>
                        </div>

                    </div>*/}
                </div>
            </div>

            <ProfilePageButton />

        </>
    )
}

export default Setting