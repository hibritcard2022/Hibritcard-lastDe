
import React, { useEffect } from 'react'
import { useState } from 'react';

import ProfilePageButton from '../../components/profile-page-button'

import { useSelector, useDispatch } from 'react-redux';
import GlobalControllerLayout from '../../layouts/global-controller-layout';
import { useRouter } from 'next/router';
import { deleteProfileAsync, updateProfileAsync, profileImageUploadAsync, updateProfileBackgroundAsync, themeChangeAsync, getUserAsync, AddBillInfoDataAsync, changegePasswordAsync } from '../../stores/userSlice';

import ImageLoader from 'react-imageloader';

import NumberFormat from 'react-number-format';
import { tr } from 'faker/lib/locales';
import SocialMedia from '../../components/social_media';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

function View() {



    const [profileImage, setProfileImage] = useState(null);
    const [createProfileImageURL, setCreateProfileImageURL] = useState(null);

    const [profileBGImage, setProfileBGImage] = useState(null);
    const [createProfileBGImageURL, setCreateProfileBGImageURL] = useState(null);

    function preloader() {
        return <img className='loader' src="/images/Spin-1s-200px.svg" />;
    }

    const dispatch = useDispatch();

    const router = useRouter()
    const { id } = router.query;

    const count = useSelector(state => state.registerSlice.value);
    const profile = useSelector(state => state.userSlice.profiles);
    const selectedProfileId = useSelector(state => state.userSlice.selectProfileId);
    const selectedProfilData = profile != undefined && profile.length > 0  ? profile.find(s => s.profileId == selectedProfileId) : []

    console.log("propfileburada::", profile)


    const [profileData, setProfileData] = useState(selectedProfilData);
    const [profileTheme, setProfileTheme] = useState(null);

    const [imagaErorText, setImagaErorText] = useState("");

    useEffect(() => {
        setProfileTheme(selectedProfilData && selectedProfilData.profileTheme);
    }, [selectedProfilData]);





    useEffect(() => {
        dispatch(getUserAsync());
    }, [])


    useEffect(() => {

        setProfileData(selectedProfilData);

    }, [selectedProfilData]);

    /* profil image start */

    useEffect(() => {
        emailFormatController();
        emailFormatController2();


    }, [profileData])


    const uploadToClientProfile = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImagaErorText("");
            const image = event.target.files[0];
            if (image.size < 2097152) {
                setProfileImage(image);
                setCreateProfileImageURL(URL.createObjectURL(image));
            }
            else {
                setImagaErorText("Dosya boyutu çok yüksek lütfen yeni bir fotoğraf yükleyiniz.");
            }
        }
    };

    const profileImageUploadToServer = (event) => {
        const body = new FormData();
        body.append("file", profileImage);
        const data = { profileId: selectedProfileId, profileImage: body }

        dispatch(profileImageUploadAsync(data));

        /*  const response = await axios.post(`https://us-central1-hibritardpro.cloudfunctions.net/api/uploadProfile/${data.profileId}`, data.profileImage, {
              headers: {
                  'Authorization': localStorage.getItem("GZIToken")
              }
          });*/
    };
    /* profil image finish */


    /* profil bg image start */
    const uploadToClientProfileBG = (event) => {
        if (event.target.files && event.target.files[0]) {
            const image = event.target.files[0];
            setImagaErorText("");

            if (image.size < 2097152) {
                setProfileBGImage(image);
                setCreateProfileBGImageURL(URL.createObjectURL(image));

            }
            else {
                setImagaErorText("Dosya boyutu çok yüksek lütfen yeni bir fotoğraf yükleyiniz.");
            }

        }
    };

    const profileBGImageUploadToServer = async (event) => {
        const body = new FormData();
        body.append("file", profileBGImage);
        const data = { profileId: selectedProfileId, profileImage: body }

        dispatch(updateProfileBackgroundAsync(data));
        /*const response = await axios.post(`https://us-central1-hibritardpro.cloudfunctions.net/api/uploadProfile/${data.profileId}`, data.profileImage, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        });*/
    };
    /* profil bg image finish */



    function save() {

        if (!profileInputErrors.emailFormatError) {

            dispatch(updateProfileAsync(profileData));
            if (profileImage) {
                profileImageUploadToServer();

            }
            if (profileBGImage) {
                profileBGImageUploadToServer();

            }


        }

        //  console.log(profileData && profileData.placeOfSocialMediaPosition);


    }

    function billSave() {
        if (!profileInputErrors.emailFormatError) {
            const billValues = {
                taxNumber: profileData.taxNumber,
                taxAdministration: profileData.taxAdministration,
                companyStatus: profileData.companyStatus,
                officeEmail: profileData.officeEmail,
                officePhoneNumber: profileData.officePhoneNumber,
                location: profileData.location,
                selectedProfileId: selectedProfileId,
            }

            dispatch(AddBillInfoDataAsync(billValues));
            if (profileImage) {
                profileImageUploadToServer();

            }
            if (profileBGImage) {
                profileBGImageUploadToServer();

            }


        }

        //  console.log(profileData && profileData.placeOfSocialMediaPosition);


    }


    const [profileInputErrors, setProfileInputErrors] = useState([{}]);

    function emailFormatController() {
        if (profileData && profileData.profileEmail != "") {


            const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
            const result = pattern.test(profileData.profileEmail);
            setProfileInputErrors(prevState => ({
                ...prevState,
                emailFormatError: !result ? true : false,
            }));
        }
    }

    function emailFormatController2() {
        if (profileData && profileData.officeEmail != "") {
            const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
            const result = pattern.test(profileData.officeEmail);

            setProfileInputErrors(prevState => ({
                ...prevState,
                emailFormatError2: !result ? true : false,
            }));

        }
    }


    function variableUpdateController() {
        if (profileInputErrors.emailFormatError) {
            setProfileInputErrors(prevState => ({
                ...prevState,
                variableUpdateError: true,
            }));
        } else {
            setProfileInputErrors(prevState => ({
                ...prevState,
                variableUpdateError: false,
            }));
        }

    }

    useEffect(() => {
        variableUpdateController();
    }, [profileInputErrors.emailFormatError]);

    const [state, setState] = useState("")



    useEffect(() => {
        dispatch(themeChangeAsync({ profileId: selectedProfileId, profileTheme: profileTheme }));

    }, [profileTheme]);



    const themeChange = (e) => {

        setProfileTheme(e);

    }

    const [deletePopup, setDeletePopup] = useState(false);

    const [deleteTagController, setDeleteTagController] = useState({ value: "", error: false });

    function profileDelete() {
        if (deleteTagController.value == profileData.profileTag) {
            dispatch(deleteProfileAsync(selectedProfileId));
            localStorage.removeItem("selectedProfileId");
            router.push("/select-profile")
        }
        else {
            setDeleteTagController(v => ({ ...v, error: true }));
        }


    }



    return (
        <>
            <GlobalControllerLayout>


                {deletePopup ?
                    <div className='popup-global'>
                        <div onClick={() => setDeletePopup(false)} className='popup-top'></div>
                        <div className='popup'>
                            <div onClick={() => setDeletePopup(false)} className='close-button'>
                                <i className="fa-solid fa-xmark"></i>
                            </div>
                            <div className='header-text'>
                                Profili Sil
                            </div>
                            <div className='description-text'>
                                Profil etiketini yazınız  "{profileData && <span style={{ color: "red" }}>{profileData.profileTag}</span>}"
                            </div>
                            <div className='popup-input '>
                                <div className="content-input"><input value={deleteTagController.value} onChange={(e) => setDeleteTagController(v => ({ ...v, value: e.target.value, error: false }))} type="text" placeholder="Porfil Etiketi" /></div>
                            </div>
                            <div className='description-text'>
                                {deleteTagController.error && <div style={{
                                    marginBottom: "20px",
                                    color: "red",
                                }}>Lütfen profil etiketini doğru giriniz.</div>}
                            </div>
                            <div className='popup-button' >
                                <button onClick={() => profileDelete()} className='profile-save-button'>Profili Sil</button>
                            </div>

                        </div>
                    </div>
                    : ""
                }


                <div className='main-content '>
                    {/**   <div className='danger-area'>
                    <div className='alert-icon'>
                        <i className="fa-solid fa-triangle-exclamation"></i>
                    </div>
                    <div className='alert-text'>
                        Deneme hesabınızın kullanım süresi dolmuştur.
                    </div>
                    <div className='global-button alert-button'>
                        Hesabı Yükselt
                    </div>
                </div>*/}
                    <div className='main-container'>

                        <div className='main-card-global'>
                            <div className='main-card'>
                                <div className='main-card-header'>
                                    {
                                        profileData && profileData.profileTag
                                    }
                                </div>


                                <div className='background-image-area'>
                                    <div className='headerImage'>
                                        <ImageLoader

                                            src={createProfileBGImageURL ? createProfileBGImageURL : profileData && profileData.backgorundImage}
                                            wrapper={React.createFactory('div')}
                                            preloader={preloader}>
                                            Image load failed!
                                        </ImageLoader>
                                    </div>
                                    <label htmlFor="profile-bg-image" className='edit-icon'>
                                        <input id='profile-bg-image' accept="image/jpeg, image/png" type="file" onChange={(e) => uploadToClientProfileBG(e)} />
                                        <img src='/icons/Edit_circle-White.svg' />

                                    </label>
                                </div>

                                <div className='profile-image-area'>
                                    <div className='profile-image'>

                                        <ImageLoader
                                            src={createProfileImageURL ? createProfileImageURL : profileData && profileData.profileUrl}
                                            wrapper={React.createFactory('div')}
                                            preloader={preloader}>
                                            Image load failed!
                                        </ImageLoader>

                                    </div>
                                </div>


                                <div className='profile-image-add'>
                                    <label htmlFor="profile-image">

                                        <input id='profile-image' accept="image/jpeg, image/png" type="file" onChange={(e) => uploadToClientProfile(e)} />
                                        <div className='image-add-button'>Profil fotoğrafı ekle</div>
                                    </label>
                                    {imagaErorText != "" && <div className='error-text'>
                                        {imagaErorText}
                                    </div>}
                                </div>





                                <div className='content-in content-input-padding'>


                                    {/* <div className='content-input'>
                                        {profileInputErrors && profileInputErrors.variableUpdateError && <div className='error-text'>Hatalı alanları düzeltiniz.</div>}
                                    </div>  */}
                                    
                                    </div>
                                <div onClick={() => save()} className='profile-save-button'>
                                    Kaydet
                                </div>

                            </div>
                        </div>


                        <div className='main-card-global'>
                            <div className='main-card '>

                                <div className='main-card-header'>
                                    Profil Ayarları
                                </div>

                                <div className='content-in content-input-padding'>
                                    <div className='content-input'>
                                        <input value={profileData && profileData.profileTag} onChange={(e) => setProfileData((v) => ({ ...v, profileTag: e.target.value }))} type="text" placeholder='Profil Etiketi' />

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
                                        <input type="text" value={profileData && profileData.profileCompany} onChange={(e) => setProfileData((v) => ({ ...v, profileCompany: e.target.value }))} placeholder='Şirket İsmi'></input>

                                    </div>



                                    <div className='content-input-row'>
                                        <input autocomplete="first-name" name="firstName" type="text" value={profileData && profileData.publicName} onChange={(e) => setProfileData((v) => ({ ...v, publicName: e.target.value }))} placeholder='İsim' />

                                        <span className='content-input-space'>

                                        </span>

                                        <input autocomplete="family-name" name="lastName" type="text" value={profileData && profileData.publicSurName} onChange={(e) => setProfileData((v) => ({ ...v, publicSurName: e.target.value }))} placeholder='Soyisim' />


                                    </div>

                                    
                                <div className='content-input'>
                                   
                                        {profileData && <>
                                            <input autocomplete="position" name='position' type="text" value={profileData.position} onChange={(e) => setProfileData((v) => ({ ...v, position: e.target.value }))} placeholder='Profile unvanı'/>
                                            <textarea autocomplete="description" name='description' placeholder='Profil Açıklaması' value={profileData.profilDescription} onChange={(e) => setProfileData((v) => ({ ...v, profilDescription: e.target.value }))}></textarea>
                                        </>}  
                                </div>



                                </div>
                                <div className='profile-save-button-global'>
                                    <button onClick={() => save()} className='profile-save-button'>
                                        Güncelle
                                    </button>
                                </div>


                            </div>
                        </div>


                       



                        <div className='main-card-global'>
                            <div className='main-card'>
                                <div className='main-card-header'>
                                    Tema
                                </div>
                                <div className='theme-buttons-global'>
                                    <div className='theme-buttons'>
                                        <div onClick={() => { themeChange("light"); }} className={profileTheme && profileTheme == "light" ? 'dark-button' : 'light-button'}>
                                            Açık
                                        </div>
                                        <div onClick={() => { themeChange("dark"); }} className={profileTheme && profileTheme == "dark" ? 'dark-button' : 'light-button'}>
                                            Koyu
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <SocialMedia />
                        
                        <div className='main-card-global'>
                            <div className='main-card'>
                                <div className='logo-hidden-area'>
                                    <div className='logo-hidden-text'>Hibrit Card logosunu gizle</div>
                                    <div className='logo-hidden-lock'><div className='lock-text'>Yükselt</div> <div className='lock-icon'><i className="fa-solid fa-lock"></i></div></div>
                                    <div className='logo-hidden-checked'>
                                        <div className='switch-button '>
                                            <label className="switch">
                                                <input type="checkbox" />
                                                <span className="slider round"></span>
                                            </label>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className='main-card-global'>
                            <div className='main-ads-card'>

                                <div className='main-ads-header'>
                                    Hibrit Card Pro
                                </div>
                                <div className='main-ads-offer'>
                                    <p>İlk aya özel</p>
                                    <p className='main-ads-center'>%20</p>
                                    <p>indirimli</p>
                                </div>
                                <div className='main-ads-text'>
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
                                </div>

                            </div>


                        </div>
                        <div className='main-card-global'>
                            <div className='account-buttons'>
                                <div onClick={() => setDeletePopup(true)} className='global-button account-delete-button'>
                                    Profili sil
                                </div>
                                {/**   <div className='button-space '></div>
                            <div onClick={() => exit()} className='global-button account-exit-button'>
                                Çıkış yap
                            </div>*/}
                            </div>

                        </div>
                    </div>
                </div>
                <ProfilePageButton />
            </GlobalControllerLayout>
        </>
    )
}

export default View