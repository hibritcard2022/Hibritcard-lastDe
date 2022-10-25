import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import GlobalLayout from '../layouts/global-layout'
import StartPageLayout from '../layouts/start-page-layout'
import { useSelector, useDispatch } from 'react-redux';
import { addUserAsync, statusReset } from '../stores/registerSlice';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Loading from '../components/loading';



function Register() {
    const router = useRouter()
    const dispatch = useDispatch();
    const user = useSelector(state => state.registerSlice.value);
    const registerStatus = useSelector(state => state.registerSlice.status);
    const registerError = useSelector(state => state.registerSlice.errors);

    const [passwordView, setPasswordView] = useState(false);
    const [password2View, setPassword2View] = useState(false);

    const [userRegister, setUserRegister] = useState({
        eMail: "",
        publicName: "",
        publicSurName: "",
        userHandleName: "",
        password: "",
        confirmPassword: "",
        kvkk: false,
        uss: false,
    });

    const [registerErrors, setRegisterErrors] = useState([{}]);


    async function postUser() {
        await dispatch(addUserAsync({
            eMail: userRegister.eMail,
            publicName: userRegister.publicName,
            publicSurname: userRegister.publicSurName,
            userHandleName: userRegister.userHandleName,
            password: userRegister.password,
            confirmPassword: userRegister.confirmPassword,
        }));
    }

    useEffect(() => {
        if (registerStatus == "success") {
            const cardLogin = localStorage.getItem("cardUrlLinksId");
            if (!cardLogin) {
                //console.log(registerStatus)
                router.push("/select-profile");
                dispatch(statusReset());
            }
            else if (cardLogin) {
                router.push("/verification-code");
                dispatch(statusReset());
            }



        }
        else if (registerStatus == "error") {



        }

    }, [registerStatus]);

    useEffect(() => {
        if (registerError) {
            setRegisterErrors({
                requiredPublicName: registerError.globalErrors && registerError.globalErrors.publicName ? true : false,
                requiredPublicSurName: registerError.globalErrors && registerError.globalErrors.publicSurname ? true : false,
                requiredUserHandleName: registerError.globalErrors && registerError.globalErrors.userHandleName ? true : false,
                requiredEmail: registerError.globalErrors && registerError.globalErrors.eMail ? true : false,
                requiredPassword: registerError.globalErrors && registerError.globalErrors.password ? true : false,
                matchPassword: registerError.globalErrors && registerError.globalErrors.confirmPassword ? true : false,
                formatErorEmail: registerError.globalErrors && registerError.globalErrors.eMailFormat ? true : false,
                registeredEmail: registerError.registeredEmail,
                requiredKVKK: !userRegister.kvkk ? true : false,
                requiredUSS: !userRegister.uss ? true : false,
            });
        }


    }, [registerError]);




    function requiredPublicNameController() {
        setRegisterErrors(prevState => ({
            ...prevState,
            requiredPublicName: userRegister.publicName == "" ? true : false,
        }));
    }


    function requiredPublicSurNameController() {
        setRegisterErrors(prevState => ({
            ...prevState,
            requiredPublicSurName: userRegister.publicSurName == "" ? true : false,
        }));
    }

    function requiredUserHandleNameController() {
        setRegisterErrors(prevState => ({
            ...prevState,
            requiredUserHandleName: userRegister.userHandleName == "" ? true : false,
        }));
    }

    function requiredEmailController() {
        setRegisterErrors(prevState => ({
            ...prevState,
            requiredEmail: userRegister.eMail == "" ? true : false,
        }));
    }

    function registeredEmailChangeController() {
        setRegisterErrors(prevState => ({
            ...prevState,
            registeredEmail: false,
        }));
    }


    function requiredPasswordController() {
        setRegisterErrors(prevState => ({
            ...prevState,
            requiredPassword: userRegister.password == "" ? true : false,
        }));
    }

    function requiredConfirmPasswordController() {
        setRegisterErrors(prevState => ({
            ...prevState,
            matchPassword: userRegister.password != userRegister.confirmPassword ? true : false,
        }));
    }

    function requiredKVKKController() {
        setRegisterErrors(prevState => ({
            ...prevState,
            requiredKVKK: userRegister.kvkk ? true : false,
        }));
    }

    function requiredUSSController() {
        setRegisterErrors(prevState => ({
            ...prevState,
            requiredUSS: userRegister.uss ? true : false,
        }));
    }

    function emailFormatController() {
        const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        const result = pattern.test(userRegister.eMail);
        setRegisterErrors(prevState => ({
            ...prevState,
            formatErorEmail: !result ? true : false,
        }));
    }



    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />

            </Head>

            <GlobalLayout>
                <StartPageLayout imagePath={'/images/hibritcard-white-logo.svg'} headerTitle="Üye Ol">
                    {registerError ? registerError.publicName : ""}

                    <hr />
                    {registerStatus == "loading" || registerStatus == "success" ? <Loading /> : ""}

                    <div className='content-input-row'>
                        <input autocomplete="first-name" name="firstName" className={(registerErrors.requiredPublicName ? "error" : "")} onBlur={() => requiredPublicNameController()} value={userRegister.publicName} onChange={(x) => setUserRegister((e) => ({ ...e, publicName: x.target.value }))} type="text" placeholder='İsim'></input>
                        <span className='content-input-space'>

                        </span>
                        <input autocomplete="family-name" name="lastName" className={(registerErrors.requiredPublicSurName ? "error" : "")} onBlur={() => requiredPublicSurNameController()} value={userRegister.publicSurName} onChange={(x) => setUserRegister((e) => ({ ...e, publicSurName: x.target.value }))} type="text" placeholder='Soyisim'></input>
                    </div>
                    <div className='content-input-row'>
                        <div className='content-input-item '>
                            {registerErrors.requiredPublicName && <div className='error-text'>İsim alanını doldurmak zorunludur.</div>}
                        </div>
                        <span className='content-input-space'>

                        </span>
                        <div className='content-input-item '>
                            {registerErrors.requiredPublicSurName && <div className='error-text'>Soyisim alanını doldurmak zorunludur.</div>}
                        </div>

                    </div>
                    <div className='content-input'>

                        <input autocomplete="nickname" name='nickname' className={(registerErrors.requiredUserHandleName ? "error" : "")} onBlur={() => requiredUserHandleNameController()} value={userRegister.userHandleName} onChange={(x) => setUserRegister((e) => ({ ...e, userHandleName: x.target.value.replace(/[^a-z0-9]/gi, '') }))} type="text" placeholder='Kullanıcı İsmi (türkçe karakter kullanamazsınız)'></input>
                        {registerErrors.requiredUserHandleName && <div className='error-text'>Kullanıcı ismi alanını doldurmak zorunludur.</div>}
                        <input autocomplete="email" name='email' className={(registerErrors.requiredEmail || registerErrors.formatErorEmail || registerErrors.registeredEmail ? "error" : "")} onBlur={() => { requiredEmailController(); emailFormatController(); }} value={userRegister.eMail} onChange={(x) => { setUserRegister((e) => ({ ...e, eMail: x.target.value })); registeredEmailChangeController(); }} type="email" placeholder='E-Posta'></input>
                        {registerErrors.requiredEmail && <div className='error-text'>E Posta alanını doldurmak zorunludur.</div>}
                        {registerErrors.formatErorEmail && <div className='error-text'>E Postanızı, e posta formatına uygun biçimde yazınız.</div>}
                        {registerErrors.registeredEmail && <div className='error-text'>Bu e posta hesabı zaten kayıtlı.</div>}

                        <div className='input-password'>

                            <input autocomplete="password" name='password' className={(registerErrors.requiredPassword ? "error" : "")} onBlur={() => requiredPasswordController()} value={userRegister.password} onChange={(x) => setUserRegister((e) => ({ ...e, password: x.target.value }))} type={passwordView ? "text" : "password"} placeholder='Şifre'></input>

                            <div className='view-password' onClick={() => setPasswordView(e => !e)}><img src='icons/Eye-black.svg' /></div>

                        </div>
                        {registerErrors.requiredPassword && <div className='error-text'>Şifre alanını doldurmak zorunludur.</div>}

                        <div className='input-password'>

                            <input autocomplete="password" name='password' className={(registerErrors.matchPassword ? "error" : "")} onBlur={() => requiredConfirmPasswordController()} value={userRegister.confirmPassword} onChange={(x) => setUserRegister((e) => ({ ...e, confirmPassword: x.target.value }))} type={password2View ? "text" : "password"} placeholder='Şifrenizi Doğrulayın'></input>

                            <div className='view-password' onClick={() => setPassword2View(e => !e)}><img src='icons/Eye-black.svg' /></div>

                        </div>

                        {registerErrors.matchPassword && <div className='error-text'>Şifreler birbiri ile uyuşmuyor.</div>}

                    </div>
                    <div className='content-checkbox'>

                        <label className="checkbox-label">
                            <input type="checkbox" value={userRegister.kvkk} onChange={(x) => { setUserRegister((e) => ({ ...e, kvkk: x.target.checked })); requiredKVKKController(); }} />
                            <span className={"text " + (registerErrors.requiredKVKK ? "error-text" : "")}> <a href='https://www.hibritcard.com/kvkk' target="_blank" >  KVKK Aydınlatma Metnini</a> okudum, kabul ediyorum.</span>
                            <span className={"checkmark " + (registerErrors.requiredKVKK ? "error" : "")}><i className="fa-solid fa-check"></i></span>

                        </label>

                        <label className="checkbox-label">
                            <input type="checkbox" value={userRegister.uss} onChange={(x) => { setUserRegister((e) => ({ ...e, uss: x.target.checked })); requiredUSSController(); }} />
                            <span className={"text " + (registerErrors.requiredUSS ? "error-text" : "")}><a href='https://www.hibritcard.com/gizlilik-ve-cerez-politikasi' target="_blank" >Gizlilik sözleşmesini</a> okudum, kabul ediyorum.</span>
                            <span className={"checkmark " + (registerErrors.requiredUSS ? "error" : "")}><i className="fa-solid fa-check"></i></span>

                        </label>
                    </div>

                    <div className='content-buttons'>
                        <button onClick={() => postUser()} className='global-button content-buttons-item primary-button'>
                            KAYDOL
                        </button>

                    </div>
                    <div className='content-link'>
                        Hesabınız var ise, <Link href="/login"><a>Giriş Yapınız</a></Link>.
                    </div>
                </StartPageLayout>
            </GlobalLayout>
        </>
    )
}

export default Register