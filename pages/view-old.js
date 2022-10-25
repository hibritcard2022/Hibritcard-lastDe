
import React, { useEffect } from 'react'
import { useState } from 'react';
import Header from '../components/header'
import ProfilePageButton from '../components/profile-page-button'
import { List, arrayMove } from 'react-movable';
import { useSelector, useDispatch } from 'react-redux';



function ViewOld() {

    const count = useSelector(state => state.registerSlice.value);


    const [socialEdit, setSocialEdit] = useState(false);
    const [socialAdd, setSocialAdd] = useState(false);

    const [light, setLight] = useState(true);
    const [socialItems, setSocialItems] = React.useState([
        {
            id: 0,
            socialName: "instagram",
        },
        {
            id: 0,
            socialName: "facebook",
        }
    ]);



    return (
        <>
            <Header />
            {socialEdit ?
                <div className='popup-global'>
                    <div onClick={() => setSocialEdit(false)} className='popup-top'></div>
                    <div className='popup'>
                        <div onClick={() => setSocialEdit(false)} className='close-button'>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                        <div className='header-text'>
                            İnstagram hesabını düzenle
                        </div>
                        <div className='description-text'>
                            İnstagram hesabının URL adresini
                            alt kısıma eklemelisin.
                        </div>
                        <div className='popup-input '>
                            <div className="content-input"><input type="text" placeholder="https://www.instagram.com/örnek" /></div>
                        </div>
                        <div className='popup-button'>
                            <div className='profile-save-button'>Değişiklikleri kaydet</div>
                        </div>

                    </div>
                </div>
                : ""}
            {socialAdd ?
                <div className='popup-global'>
                    <div onClick={() => setSocialAdd(false)} className='popup-top'></div>
                    <div className='popup'>
                        <div onClick={() => setSocialAdd(false)} className='close-button'>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                        <div className='header-text'>
                            Yeni hesap ekle
                        </div>
                        <div className='description-text'>
                            Dilediğin sosyal medya hesaplarını buradan profiline ekleyebilirsin.
                        </div>
                        <div className='social-types'>
                            <div className='social-type-item'>
                                <div className='type-icon'><i className="fa-brands fa-facebook-f"></i></div>
                                <div className='type-text'>Facebook</div>
                                <div className='type-add'><i className="fa-solid fa-angle-right"></i></div>

                            </div>
                            <div className='social-type-item'>
                                <div className='type-icon'><i className="fa-brands fa-facebook-f"></i></div>
                                <div className='type-text'>Facebook</div>
                                <div className='type-add'><i className="fa-solid fa-angle-right"></i></div>

                            </div>
                            <div className='social-type-item'>
                                <div className='type-icon'><i className="fa-brands fa-facebook-f"></i></div>
                                <div className='type-text'>Facebook</div>
                                <div className='type-add'><i className="fa-solid fa-angle-right"></i></div>

                            </div>
                            <div className='social-type-item'>
                                <div className='type-icon'><i className="fa-brands fa-facebook-f"></i></div>
                                <div className='type-text'>Facebook</div>
                                <div className='type-add'><i className="fa-solid fa-angle-right"></i></div>

                            </div>

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
                                Profil
                            </div>
                            <div className='background-image-area'>
                                <img className='headerImage' src='/images/headerimage.png' />

                                <label htmlFor="profile-bg-image" className='edit-icon'>
                                    <input id='profile-bg-image' type="file" />
                                    <img src='/icons/Edit_circle-AEAEB4.svg' />

                                </label>
                            </div>
                            <div className='profile-image-area'>
                                <div className='profile-image'>
                                    <img src='/images/profile-default.jpg' />
                                </div>
                            </div>
                            <div className='profile-image-add'>
                                <label htmlFor="profile-image">
                                    <input id='profile-image' type="file" />
                                    <div className='image-add-button'>Profil fotoğrafı ekle</div>
                                </label>

                            </div>
                            <div className='profile-input'>
                                <div className='input-item' >
                                    <input type="text" placeholder='Unvan' />

                                    <textarea></textarea>
                                </div>
                            </div>
                            <div className='profile-save-button'>
                                Değişiklikleri kaydet
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
                                    <div onClick={() => setLight(true)} className={!light ? 'light-button' : 'dark-button'}>
                                        Açık
                                    </div>
                                    <div onClick={() => setLight(false)} className={light ? 'light-button' : 'dark-button'}>
                                        Koyu
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='main-card-global'>
                        <div className='main-card'>
                            <div className='main-card-header'>
                                Sosyal Medya
                            </div>
                            <div className='main-card-text'>
                                Sosyal medya hesaplarınızı profilinize ayrıca buradan da ekleyebilirsiniz.
                            </div>
                            <div onClick={() => setSocialAdd(true)} className='social-link-add-button'>
                                Hesap Ekle
                            </div>
                            <div className='social-items-area'>
                                <List
                                    values={socialItems}
                                    onChange={({ oldIndex, newIndex }) =>
                                        setSocialItems(arrayMove(socialItems, oldIndex, newIndex))
                                    }
                                    renderList={({ children, props }) => <div {...props}>{children}</div>}
                                    renderItem={({ value, props }) => <div {...props}> <div className='social-item'>
                                        <div className='scroll-button'>
                                            <i className="fa-solid fa-ellipsis-vertical"></i>
                                        </div>
                                        <button className='right'>
                                            <div className='social-icon'>
                                                <i className="fa-brands fa-instagram"></i>
                                            </div>
                                            <div className='social-text '>
                                                {value.socialName}
                                            </div>
                                            <div onClick={() => setSocialEdit(true)} className='social-edit-button'>
                                                <img src='/icons/Edit.svg' />
                                            </div>
                                            <div className='switch-button '>
                                                <label className="switch">
                                                    <input type="checkbox" />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>

                                        </button>
                                    </div>
                                    </div>}
                                />


                                <div className='info'>
                                    Hesapları tekrardan sıralayabilirsin.
                                </div>
                                <div className='position-header-text'>
                                    Pozisyon
                                </div>
                                <div className='position-desciription-text'>
                                    İkonların konumu:
                                </div>
                                <div className='position-radio-buttons'>
                                    <div className='content-radio'>

                                        <label htmlFor='r1' className="radio-label">
                                            <input id="r1" type="radio" name='r1' />
                                            <span className="text">Üstte</span>
                                            <span className="checkmark"><i className="fa-solid fa-circle"></i></span>
                                        </label>
                                        <label htmlFor='r2' className="radio-label">
                                            <input id="r2" type="radio" name='r1' />
                                            <span className="text">Altta</span>
                                            <div className="checkmark"><i className="fa-solid fa-circle"></i></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                </div>
            </div>
            <ProfilePageButton />
        </>
    )
}

export default ViewOld