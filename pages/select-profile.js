import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { useSelector, useDispatch } from 'react-redux';
import userSlice, { deleteProfileAsync, getUserAsync, selectedProfile, newProfileAddAsync, updateOrderProfileAsync } from '../stores/userSlice';
import Loading from '../components/loading';
import { useRouter } from 'next/router';
import ImageLoader from 'react-imageloader';

import {
    SortableContainer,
    SortableElement,
    SortableHandle
} from "react-sortable-hoc";
import { arrayMoveImmutable } from 'array-move';



function preloader() {
    return <img className='loader' src="/images/Spin-1s-200px.svg" />;
}

const Handle = SortableHandle(({ tabIndex }) => (
    <div className='profile-handle' tabIndex={tabIndex}>
        {/*} <i class="fa-solid fa-bars"></i>*/}
    </div>
));

const SortableItem = SortableElement((props) => {
    const [selectedEditProfile, setSelectedEditProfile] = useState({});
    const [deletePopup, setDeletePopup] = useState(false);

    const [deleteTagController, setDeleteTagController] = useState({ value: "", error: false });

    const dispatch = useDispatch();
    const { value: item } = props;
    console.log(props);
    async function profileDelete() {
        if (deleteTagController.value == selectedEditProfile.profileTag) {
            await dispatch(deleteProfileAsync(selectedEditProfile.profileId));
            await dispatch(getUserAsync());
            setDeletePopup(false);
            setDeleteTagController({ value: "", error: false });
        }
        else {
            setDeleteTagController(v => ({ ...v, error: true }));
        }


    }

    const [profileTagEditEditText, setProfileTagEditEditText] = useState("");

    const [profileTagEditInput, setProfileTagEditInput] = useState(false)

    return (
        <>
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
                            Profil etiketini yazınız  "{selectedEditProfile && <span style={{ color: "red" }}>{selectedEditProfile.profileTag}</span>}"
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



            <div
                style={{
                    float: "left",


                }}
            >
                <div className='select-profile-item' >
                    <div className='select-profile-item-in' key={item.profileId} onClick={() => dispatch(selectedProfile(item.profileId))}>


                        <div className='select-profile-image'>
                            <div className='select-profile-item-top'></div>

                            <ImageLoader
                                src={item.profileUrl}
                                wrapper={React.createFactory('div')}
                                preloader={preloader}>
                                Image load failed!
                            </ImageLoader>
                            <Handle />
                        </div>
                        <div className='select-profile-text'  >
                            {profileTagEditInput ? <input type="text"></input> : item.profileTag}
                        </div>


                        <div className='profile-edit-icons'>


                            <div onClick={() => { setDeletePopup(true); setSelectedEditProfile(item) }} className='delete-profile'>
                                <i class="fa-solid fa-xmark"></i>
                            </div>

                        </div>
                    </div>


                </div>
            </div>
        </>
    );
});

const SortableList = SortableContainer((props) => {

    const { items, ...restProps } = props;
    return (
        <div
            style={{
                flex: "1",
                display: "grid",
                gridTemplateColumns: "33.3% 33.3% 33.3%",



            }}
        >
            {items.map((item, index) => (
                <SortableItem
                    key={`item-${item.id}`}
                    index={index}
                    value={item}
                    {...restProps}
                />
            ))}
        </div>
    );
});



function SelectProfile() {





    const [profileEditActive, setProfileEditActive] = useState(false);




    const [newProfileError, setNewProfileError] = useState("");
    const [newProfile, setNewProfile] = useState({ profileTag: "", orderOfProfile: 0 });
    const [newProfilePopup, setNewProfilePopup] = useState(false);
    const dispatch = useDispatch();
    const userStatus = useSelector(state => state.userSlice.status);
    const userData = useSelector(state => state.userSlice.user);
    const allProfile = useSelector(state => state.userSlice.profiles);
    const router = useRouter();





    const [profileDataLocal, setProfileDataLocal] = React.useState([]);

    useEffect(() => {
        setProfileDataLocal([...allProfile].sort(((a, b) => a.orderOfProfile < b.orderOfProfile ? -1 : 1)));
        setNewProfile(v => ({ ...v, orderOfProfile: allProfile.length }));

    }, [allProfile])


    const onSortEnd = async ({ oldIndex, newIndex }) => {
        setProfileDataLocal(arrayMoveImmutable(profileDataLocal, oldIndex, newIndex));
        profileOrderUpdate(arrayMoveImmutable(profileDataLocal, oldIndex, newIndex));
    };




    useEffect(() => {
        console.log(userStatus);

        console.log(userData);

        console.log(allProfile);
    }, [userStatus]);



    useEffect(() => {
        if (localStorage.getItem("GZIToken")) {
            dispatch(getUserAsync());
        } else {
            router.push("/login");
        }




    }, [dispatch]);

    async function newProfileAdd() {
        setNewProfileError("");


        if (newProfile.profileTag != "") {
            console.log(newProfile);
            await dispatch(newProfileAddAsync(newProfile));

            await dispatch(getUserAsync());
            console.log("dizi uzunluğu = " + allProfile.length);
            setNewProfile(v => ({ ...v, profileTag: "", orderOfProfile: allProfile.length }));

            setNewProfilePopup(false);
        } else {
            setNewProfileError("Profil etiketi boş olamaz lütfen doldurunuz.")
        }

    }

    function editActiveChange() {
        setProfileEditActive(!profileEditActive);
    }


    function profileOrderUpdate(array) {
        array.map((v, i) => {


            dispatch(updateOrderProfileAsync({ ...v, orderOfProfile: i }));
        })



    }



    return (
        <>

            {userStatus == "loading" ? <Loading /> : ""}

            {newProfilePopup ?
                <div className='popup-global'>
                    <div onClick={() => { setNewProfilePopup(false); setNewProfileError() }} className='popup-top'></div>
                    <div className='popup'>
                        <div onClick={() => { setNewProfilePopup(false); setNewProfileError() }} className='close-button'>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                        <div className='header-text'>
                            Yeni Profile Ekle
                        </div>


                        <div className='popup-input '>
                            <div className="content-input"><input value={newProfile.profileTag} onChange={(e) => setNewProfile(v => ({ ...v, profileTag: e.target.value }))} type="text" placeholder="Porfil Etiketi" /></div>
                        </div>
                        <div className='error-text' >
                            {newProfileError}
                        </div>

                        <div className='popup-button' onClick={() => newProfileAdd()}>
                            <button className='profile-save-button'>Profil Ekle</button>
                        </div>

                    </div>
                </div>
                : ""
            }

            <div className='gradient-bg select-profile'>
                <div className='select-profile-header'>
                    <div className='select-profile-left'>

                    </div>
                    <div className='select-profile-center ' >
                        <img src='images/hibritcard-white-logo.svg' />
                    </div>
                    <div className='select-profile-right'>
                        <div className='select-profile-edit-icon' onClick={() => editActiveChange()}>
                            {!profileEditActive ? <img src='icons/Edit_circle-White.svg' /> : /*<div onClick={() => profileOrderUpdate()}> */ <img src='icons/folder_check.svg' />/*</div>*/}

                        </div>
                       
                        <Link href="/user-settings" >
                            <a  >
                                <img src='icons/Setting-white.svg'/>
                            </a>
                        </Link>
                    </div>


                </div>
                <div className='select-profile-content'>
                    <div className='select-profile-title'>
                        Profil Seç
                    </div>
                    <div className='select-profile-items'>

                        {profileEditActive &&

                            <SortableList
                                shouldUseDragHandle={true}
                                useDragHandle
                                axis="xy"
                                items={profileDataLocal}
                                onSortEnd={onSortEnd}
                            />}
                    </div>
                    {!profileEditActive &&
                        <div className='select-profile-items select-profile-items-noedit'>
                            {

                                profileDataLocal.map(v => (
                                    <div key={v.profileId} onClick={() => dispatch(selectedProfile(v.profileId))}>
                                        <Link href={`/panel/${v.profileId}`}>
                                            <a className='select-profile-item'>
                                                <div className='select-profile-item-in'>
                                                    <div className='select-profile-image-noedit'>
                                                        <div className='select-profile-item-top'></div>

                                                        <ImageLoader
                                                            src={v.profileUrl}
                                                            wrapper={React.createFactory('div')}
                                                            preloader={preloader}>
                                                            Image load failed!
                                                        </ImageLoader>
                                                    </div>
                                                    <div className='select-profile-text'>
                                                        {v.profileTag}
                                                    </div>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>




                                ))
                            }



                            {/*    <Link href="/panel">
                            <a className='select-profile-item'>

                                <div className='select-profile-image'>
                                    <div className='select-profile-item-top'></div>
                                    <img src='images/profile-example.png' />
                                </div>
                                <div className='select-profile-text'>
                                    aysylmz
                                </div>
                            </a>
                        </Link>
                        <div className='select-profile-item'>

                            <div className='select-profile-image'>
                                <div className='select-profile-item-top'></div>
                                <img src='images/profile-example.png' />
                            </div>
                            <div className='select-profile-text'>
                                aysylmz
                            </div>
                        </div>*/}
                            {allProfile.length < 6 && <div onClick={() => setNewProfilePopup(true)} className='select-profile-item-new'>
                                <div className='select-profile-add'>
                                    <i className="fa-solid fa-plus"></i>
                                </div>
                                <div className='select-profile-text'>
                                    Profil ekle
                                </div>
                            </div>
                            }
                        </div>}
                    {/*    <div className='select-profile-bar'></div>
                    <div className='select-profile-items'>
                        <div className='select-profile-item'>

                            <div className='select-profile-image'>
                                <div className='select-profile-item-top'></div>
                                <img src='images/profile-example.png' />
                            </div>
                            <div className='select-profile-text'>
                                Kurumsal Profil
                            </div>
                        </div>

                        <div className='select-profile-item-new'>
                            <div className='select-profile-add'>
                                <i className="fa-solid fa-plus"></i>
                            </div>
                            <div className='select-profile-text'>
                                Kurumsal
                                profil ekle
                            </div>
                        </div>

                    </div>
                    */}
                </div>

            </div>

        </>
    )
}

export default SelectProfile