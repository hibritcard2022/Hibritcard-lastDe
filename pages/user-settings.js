import React, { useEffect, useState } from 'react'
import GlobalControllerLayout from '../layouts/global-controller-layout'
import Link from 'next/link'
import NumberFormat from 'react-number-format'
import { useSelector, useDispatch } from 'react-redux'
import { userUpdateAsync, getUserAsync, deleteUserAsync, changegePasswordAsync } from '../stores/userSlice'
import Loading from '../components/loading'
import { useRouter } from 'next/router'

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

function UserSettings() {

    const router = useRouter();

    const dispatch = useDispatch();
    const user = useSelector(state => state.userSlice.user);
    const userStatus = useSelector(state => state.userSlice.status);

    const [userValues, setUserValues] = useState(user);
    const passwordChangeError = useSelector(state => state.userSlice.passwordChangeError);
    const passwordSuccess = useSelector(state => state.userSlice.passwordSuccess);



    useEffect(() => {
        if (localStorage.getItem("GZIToken")) {
            if (!user) {
                dispatch(getUserAsync());
                console.log("******************************variables update");
            }
        } else {
            router.push("/login");
        }


    }, []);

    useEffect(() => {
        passwordSuccess == true && setPasswordChange(v => ({ newPassword: "", confirmNewpassword: "", oldpassword: "" }));

    }, [passwordSuccess])


    useEffect(() => {
        setUserValues(user);
    }, [user]);

    function exit() {
        localStorage.removeItem('GZIToken');
        router.push("/login");
    }
    const [passwordChange, setPasswordChange] = useState({
        oldpassword: "",
        newPassword: "",
        confirmNewpassword: "",

    })

    function changegePassword() {

        dispatch(changegePasswordAsync(passwordChange));


    }






    const [deletePopup, setDeletePopup] = useState(false);

    const [deleteTagController, setDeleteTagController] = useState({ value: "", error: false });

    function deleteUser() {
        if (deleteTagController.value == userValues.userHandleName) {
            dispatch(deleteUserAsync());
            exit();
        }
        else {
            setDeleteTagController(v => ({ ...v, error: true }));
        }


    }

    return (
        <>

            {userStatus == "loading" ? <Loading /> : ""}
            {deletePopup ?
                <div className='popup-global'>
                    <div onClick={() => setDeletePopup(false)} className='popup-top'></div>
                    <div className='popup'>
                        <div onClick={() => setDeletePopup(false)} className='close-button'>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                        <div className='header-text'>
                            Hesabı Sil
                        </div>
                        <div className='description-text'>
                            Kullanıcı adını yazınız  "{userValues && <span style={{ color: "red" }}>{userValues.userHandleName}</span>}"
                        </div>
                        <div className='popup-input '>
                            <div className="content-input"><input value={deleteTagController.value} onChange={(e) => setDeleteTagController(v => ({ ...v, value: e.target.value, error: false }))} type="text" placeholder="Porfil Etiketi" /></div>
                        </div>
                        <div className='description-text'>
                            {deleteTagController.error && <div style={{
                                marginBottom: "20px",
                                color: "red",
                            }} >Lütfen kullanıcı adını doğru giriniz.</div>}
                        </div>
                        <div className='popup-button' >
                            <button onClick={() => deleteUser()} className='profile-save-button'>Hesabı Sil</button>
                        </div>

                    </div>
                </div>
                : ""
            }
            <div className='main-content ' style={{ marginTop: "70px" }}>
                <div className='main-container'>
                    <div className='header-global'>
                        <div className='header'>

                            <div className='hibrit-profile'>
                                <Link href="/select-profile">
                                    <a>
                                        {/*} <div className='bg'></div>*/}
                                        <i className="fa-solid fa-angle-left"></i>
                                    </a>
                                </Link>
                            </div>
                            <div className='header-logo'>
                                <img src='/images/hibritcard-logo.svg' />
                            </div>
                            <div className='header-menu-area'>

                            </div>
                            <div className='header-icons'>
                                <div className='icon-item'>
                                    <img src='/icons/bell-black.svg' />
                                </div>
                                <div className='icon-item'>
                                    <img src='/icons/External link-black.svg' />
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className='main-card-global'>
                        <div className='main-card '>

                            <div className='main-card-header'>
                                Hesap
                            </div>

                            <div className='content-in content-input-padding'>
                                <div className='content-input'>
                                    <input value={userValues && userValues.userHandleName} onChange={(e) => setUserValues(v => ({ ...v, userHandleName: e.target.value.replace(/[^a-z0-9]/gi, '') }))} type="text" placeholder='Kullanıcı Adı' />

                                </div>
                                <div className='content-input-row'>
                                    <input value={userValues && userValues.publicName} onChange={(e) => setUserValues(v => ({ ...v, publicName: e.target.value }))} type="text" placeholder='İsim'></input>

                                    <span className='content-input-space'>

                                    </span>

                                    <input value={userValues && userValues.publicSurname} onChange={(e) => setUserValues(v => ({ ...v, publicSurname: e.target.value }))} type="text" placeholder='Soyisim'></input>


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

                                    <input value={userValues && userValues.eMail} onChange={(e) => setUserValues(v => ({ ...v, eMail: e.target.value }))} type="text" placeholder='E-Posta'></input>

                                    <PhoneInput
                                        country={'tr'}
                                        value={userValues && userValues.phoneNumber}
                                        onChange={(e) => setUserValues(v => ({ ...v, phoneNumber: e }))}
                                        placeholder='Telefon numarası'
                                    />


                                    <select value={userValues && userValues.gender} onChange={(e) => setUserValues(v => ({ ...v, gender: e.target.value }))}  >

                                        <option value={0}>Cinsiyetinizi Seçiniz</option>
                                        <option value={1}>Erkek</option>
                                        <option value={2}>Kadın</option>

                                    </select>
                                    <div className='date-input'><NumberFormat value={userValues && userValues.birthDate} onChange={(e) => setUserValues(v => ({ ...v, birthDate: e.target.value }))} format="##.##.####" placeholder="Doğum Tarihi" mask={['G', 'G', 'M', 'M', 'Y', 'Y', 'Y', 'Y']} /></div>





                                </div>

                            </div>
                            <div className='profile-save-button-global'>
                                <button onClick={() => dispatch(userUpdateAsync(userValues))} className='profile-save-button'>
                                    Değişiklikleri kaydet
                                </button>
                            </div>


                        </div>
                    </div>
                    <div className='main-card-global'>
                        <div className='main-card '>

                            <div className='main-card-header'>
                                Güvenlik
                            </div>
                            <div className='content-in content-input-padding'>

                                <div className='content-input'>
                                    <div className='success-text'>{passwordSuccess && "Şifre başarılı bir şekilde güncellendi."}</div>
                                    <input value={passwordChange.oldpassword} onChange={(e) => setPasswordChange((pv) => ({ ...pv, oldpassword: e.target.value }))} type="password" placeholder='Eski Şifre'></input>
                                    <div className='error-text'>{passwordChangeError && passwordChangeError.passwordError && "Şifre hatalı."}</div>

                                    <input value={passwordChange.newPassword} onChange={(e) => setPasswordChange((pv) => ({ ...pv, newPassword: e.target.value }))} type="password" placeholder='Şifre'></input>
                                    <input value={passwordChange.confirmNewpassword} onChange={(e) => setPasswordChange((pv) => ({ ...pv, confirmNewpassword: e.target.value }))} type="password" placeholder='Şifrenizi Doğrulayın'></input>
                                    <div className='error-text'>{passwordChangeError && passwordChangeError.passwordNotMatch && "Şifreler Eşleşmiyor."}</div>
                                    <div className='error-text'>{passwordChangeError && passwordChangeError.minCountCharacter && "Yeni olşturduğunuz şifre minimum 6 karakterden oluşmalı."}</div>

                                </div>

                            </div>

                            {/*}   <div className='verification'>
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
                            <div className='sms-code-area'>
                                {/** https://www.npmjs.com/package/react-verification-code-input */}
                            {/* <ReactCodeInput
                            type='text'
                            className="box"
                            autoFocus={false}
                        /> */}
                            {/*}
                            </div>

                            <div className='sms-desciription-text'>
                                Lütfen cep telefonunuza gelen kodu giriniz.
                            </div>
                    */}
                            <div className="profile-save-button-global">
                                <button onClick={() => changegePassword()} className='profile-save-button'>
                                    Değişiklikleri kaydet
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='main-card-global'>
                        <div className='account-buttons'>
                            <div onClick={() => setDeletePopup(true)} className='global-button account-delete-button'>
                                Hesabı sil
                            </div>
                            <div className='button-space '></div>
                            <div onClick={() => exit()} className='global-button account-exit-button'>
                                Çıkış yap
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default UserSettings