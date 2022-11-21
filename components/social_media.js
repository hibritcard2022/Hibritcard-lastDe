import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteSocialMediaofProfileAsync, getAllSocialMediaAsync, newSocialUrlAddAsync, updateSocialMediaUrlAsync } from '../stores/socialSlice';
import { List, arrayMove } from 'react-movable';
import { changesocialPositionAsync } from '../stores/userSlice';
import NumberFormat from 'react-number-format';
import { fa } from 'faker/lib/locales';
import { useRouter } from 'next/router';

function SocialMedia() {


    const router = useRouter();
    const dispatch = useDispatch();



    const profile = useSelector(state => state.userSlice.profiles);
    const selectedProfileId = useSelector(state => state.userSlice.selectProfileId);

    const selectedProfilData = profile !="" ? profile.find(s => s.profileId == selectedProfileId ) : ""
    

    const socialStatus = useSelector(state => state.socialSlice.status);


    const [placeOfSocialMediaPosition, setPlaceOfSocialMediaPosition] = useState(null);

    const [selectedSocialMedia, setSelectedSocialMedia] = useState({

        name: "",
        id: "",
        value: "",
        status: "",
        order: 0,
        

    });





    const [socialEdit, setSocialEdit] = useState(false);
    const [socialDelete, setSocialDelete] = useState(false);
    const [socialAdd, setSocialAdd] = useState(false);
    const [socialMediaAdd, setSocialMediaAdd] = useState(false);

    const [allSocialMedia, setAllSocialMedia] = useState();

    const [socialMediaFilterText, setSocialMediaFilterText] = useState("");

    const [allSocialMediaFilter, setAllSocialMediaFilter] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("GZIToken")) {
            dispatch(getAllSocialMediaAsync(localStorage.getItem("selectedProfileId")));
        }
        else {
            router.push("/login");
        }
    }, [dispatch]);

    useEffect(() => {

        setPlaceOfSocialMediaPosition(selectedProfilData && selectedProfilData.placeOfSocialMediaPosition);
    }, [selectedProfilData]);



    const socialMediaList = useSelector(state => state.socialSlice.socialList);

    const [socialMediaListSort, setSocialMediaListSort] = useState(socialMediaList != undefined ? [...socialMediaList].sort((a, b) => a.socialOrder - b.socialOrder) : [])



    useEffect(() => {
        console.log("*********** social list ****************");

        console.log("allbUneer",socialMediaListSort);

        setSocialMediaListSort(socialMediaList != undefined ? [...socialMediaList].sort((a, b) => a.socialOrder - b.socialOrder) : []);

        console.log(allSocialMedia);
        console.log("soyalmedya uzunluğu : " + socialMediaListSort.length)
    }, [socialMediaList]);

    useEffect(() => {
        setSocialMediaInput(e => ({ ...e, socialUrlLink: "", socialtype: "" }))
    }, [
        socialDelete,
        socialAdd])



    const socialPositonChange = (e) => {
        setPlaceOfSocialMediaPosition(e.target.value);

    }

    useEffect(() => {
        dispatch(changesocialPositionAsync({ profileId: selectedProfileId, placeOfSocialMediaPosition: placeOfSocialMediaPosition }));

    }, [placeOfSocialMediaPosition]);

    function socialMediaAddPopup(v) {
        if (!v.socialMediaAdded) {
            setSelectedSocialMedia(e => ({ ...e, name: v.socialMeidaName }));
            setSocialMediaInput(e => ({ ...e, socialtype: v.socialMeidaName }));
            setSocialMediaAdd(true);
        }

    }

    const [socialMediaInput, setSocialMediaInput] = useState({
        socialUrlLink: "",
        socialtype: "",
    })


    async function socialMediaPush() {
        const data = {
            profileId: localStorage.getItem("selectedProfileId"),
            value: {
                socialUrlLink: socialMediaInput.socialUrlLink,
                socialtype: socialMediaInput.socialtype,
                statuMode: true,
                socialOrder: socialMediaListSort.length,
            }
        }

        await setSocialMediaAdd(false);
        await setSocialAdd(false);
        await dispatch(newSocialUrlAddAsync(data));
        await dispatch(getAllSocialMediaAsync(localStorage.getItem("selectedProfileId")));

        await setSocialMediaInput(e => ({ ...e, socialUrlLink: "", socialtype: "" }))
    }


    async function socialMediaDelete() {


        await setSocialDelete(false);
        await dispatch(deleteSocialMediaofProfileAsync(selectedSocialMedia.id));
        await setSelectedSocialMedia(e => ({ ...e, id: "" }));
        await dispatch(getAllSocialMediaAsync(localStorage.getItem("selectedProfileId")));

    }

    async function socialMediaUrlUpdate() {
        
        const data = await {
            socialId: selectedSocialMedia.id,
            value: {
                socialtype: selectedSocialMedia.name,
                socialUrlLink: socialMediaInput.socialUrlLink,
                statuMode: selectedSocialMedia.status,
                socialOrder: selectedSocialMedia.order,
            }
        }
        await setSocialEdit(false);
        await dispatch(updateSocialMediaUrlAsync(data));
        await setSelectedSocialMedia(e => ({ ...e, id: "", socialtype: "", status: true }));
        await dispatch(getAllSocialMediaAsync(localStorage.getItem("selectedProfileId")));
        await setSocialMediaInput(e => ({ ...e, socialUrlLink: "", socialtype: "" }))
    }

    function socialMediaOrderChangeUpdate(oldIndex, newIndex) {


        setSocialMediaListSort(arrayMove(socialMediaListSort, oldIndex, newIndex));



    }

    useEffect(() => {

        socialMediaListSort.map((v, i) => {
            return dispatch(updateSocialMediaUrlAsync({
                socialId: v.socialMediaUrlId,
                value: {
                    socialtype: v.socialtype,
                    socialUrlLink: v.socialUrlLink,
                    statuMode: v.statuMode,
                    socialOrder: i,
                }
            }));
        });
        console.log("socialMediaListSort");
        console.log(socialMediaListSort);
        setAllSocialMedia([
            {
                socialMeidaName: "whatsapp",
                icon: '<i class="fa-brands fa-whatsapp"></i>',

                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "whatsapp" ? true : false)
            },
            {
                socialMeidaName: "telegram",
                icon: '<i class="fa-brands fa-telegram"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "telegram" ? true : false) ? true : false
            },
            {
                socialMeidaName: "bip",
                icon: '<i class="fa-brands fa-bip"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "bip" ? true : false) ? true : false
            },
            {
                socialMeidaName: "instagram",
                icon: '<i class="fa-brands fa-instagram"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "instagram" ? true : false) ? true : false
            },
            {
                socialMeidaName: "twitter",
                icon: '<i class="fa-brands fa-twitter"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "linkedin" ? true : false) ? true : false
            },

            {
                socialMeidaName: "linkedin",
                icon: '<i class="fa-brands fa-linkedin "></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "linkedin" ? true : false) ? true : false
            },
            {
                socialMeidaName: "facebook",
                icon: '<i class="fa-brands fa-facebook "></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "facebook" ? true : false) ? true : false
            },
            {
                socialMeidaName: "youtube",
                icon: '<i class="fa-brands fa-youtube"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "youtube" ? true : false) ? true : false
            },
            {
                socialMeidaName: "discord",
                icon: '<i class="fa-brands fa-discord"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "discord" ? true : false) ? true : false
            },
            {
                socialMeidaName: "dribbble",
                icon: '<i class="fa-brands fa-dribbble"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "dribbble" ? true : false) ? true : false
            },
            {
                socialMeidaName: "vimeo",
                icon: '<i class="fa-brands fa-vimeo"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "vimeo" ? true : false) ? true : false
            },
            {
                socialMeidaName: "ello",
                icon: '<i class="fa-brands fa-ello"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "ello" ? true : false) ? true : false
            },
            {
                socialMeidaName: "github",
                icon: '<i class="fa-brands fa-github"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "github" ? true : false) ? true : false
            },
            {
                socialMeidaName: "hangouts",
                icon: '<i class="fa-brands fa-hangouts"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "hangouts" ? true : false) ? true : false
            },
            {
                socialMeidaName: "icbc",
                icon: '<i class="fa-brands fa-icbc"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "icbc" ? true : false) ? true : false
            },
            {
                socialMeidaName: "icq",
                icon: '<i class="fa-brands fa-icq"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "icq" ? true : false) ? true : false
            },
            {
                socialMeidaName: "kikmessenger",
                icon: '<i class="fa-brands fa-kikmessenger"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "kikmessenger" ? true : false) ? true : false
            },
            {
                socialMeidaName: "twitch",
                icon: '<i class="fa-brands fa-twitch"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "twitch" ? true : false) ? true : false
            },
            {
                socialMeidaName: "medium",
                icon: '<i class="fa-brands fa-medium"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "medium" ? true : false) ? true : false
            },
            {
                socialMeidaName: "nimotv",
                icon: '<i class="fa-brands fa-nimotv"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "nimotv" ? true : false) ? true : false
            },
            {
                socialMeidaName: "periscope",
                icon: '<i class="fa-brands fa-periscope"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "periscope" ? true : false) ? true : false
            },
            {
                socialMeidaName: "dailymotion",
                icon: '<i class="fa-brands fa-dailymotion"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "dailymotion" ? true : false) ? true : false
            },
            {
                socialMeidaName: "wechat",
                icon: '<i class="fa-brands fa-weixin"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "wechat" ? true : false) ? true : false
            },
            {
                socialMeidaName: "qqtile",
                icon: '<i class="fa-brands fa-qq"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "qqtile" ? true : false) ? true : false
            },
            {
                socialMeidaName: "sineweibo",
                icon: '<i class="fa-brands fa-sineweibo"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "sineweibo" ? true : false) ? true : false
            },
            {
                socialMeidaName: "dlive",
                icon: '<i class="fa-brands fa-dlive"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "dlive" ? true : false) ? true : false
            },
            {
                socialMeidaName: "pinterest",
                icon: '<i class="fa-brands fa-pinterest"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "pinterest" ? true : false) ? true : false
            },
            {
                socialMeidaName: "reddit",
                icon: '<i class="fa-brands fa-reddit"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "reddit" ? true : false) ? true : false
            },
            {
                socialMeidaName: "behance",
                icon: '<i class="fa-brands fa-behance"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "behance" ? true : false) ? true : false
            },
            {
                socialMeidaName: "swarm",
                icon: '<i class="fa-brands fa-swarm"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "swarm" ? true : false) ? true : false
            },
            {
                socialMeidaName: "signal",
                icon: '<i class="fa-brands fa-signal"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "signal" ? true : false) ? true : false
            },
            {
                socialMeidaName: "yaya",
                icon: '<i class="fa-brands fa-yaya"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "yaya" ? true : false) ? true : false
            },
            {
                socialMeidaName: "c2",
                icon: '<i class="fa-brands fa-c2"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "c2" ? true : false) ? true : false
            },
            {
                socialMeidaName: "tango",
                icon: '<i class="fa-brands fa-tango"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "tango" ? true : false) ? true : false
            },
            {
                socialMeidaName: "vero",
                icon: '<i class="fa-brands fa-vero"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "vero" ? true : false) ? true : false
            },
            {
                socialMeidaName: "zoom",
                icon: '<i class="fa-brands fa-zoom"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "zoom" ? true : false) ? true : false
            },
            {
                socialMeidaName: "viber",
                icon: '<i class="fa-brands fa-viber"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "viber" ? true : false) ? true : false
            },
            {
                socialMeidaName: "teams",
                icon: '<i class="fa-brands fa-teams"></i>',
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "teams" ? true : false) ? true : false
            }, {
                socialMeidaName: "snapchat",
                icon: '<i class="fa-brands fa-snapchat"></i>',
                
                // socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "snapchat" ? true : false) ? true : false

            },
        ]);



    }, [socialMediaListSort])


    useEffect(() => {
        setAllSocialMediaFilter(allSocialMedia);

        console.log("AllSsocial",allSocialMedia)
    }, [allSocialMedia])

    async function socialMediaStatusUpdate(id, name, socialUrlLink, status, order) {
        const data = await {
            socialId: id,
            value: {
                socialtype: name,
                socialUrlLink: socialUrlLink,
                statuMode: !status,
                socialOrder: order,
            }
        }
        await setSocialEdit(false);
        await dispatch(updateSocialMediaUrlAsync(data));
        await setSelectedSocialMedia(e => ({ ...e, id: "", socialtype: "", status: true }));
        await dispatch(getAllSocialMediaAsync(localStorage.getItem("selectedProfileId")));
        await setSocialMediaInput(e => ({ ...e, socialUrlLink: "", socialtype: "" }))

    }

    return (
        <>

            {socialEdit ?
                <div className='popup-global'>

                    <div onClick={() => setSocialEdit(false)} className='popup-top'>
                        
                    </div>

                    <div className='popup'>
                        <div onClick={() => setSocialEdit(false)} className='close-button'>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                        <div className='header-text'>
                            {selectedSocialMedia.name} hesabını düzenle
                        </div>
                        <div className='description-text'>
                            {selectedSocialMedia.name} hesabını düzenlenleyiniz.
                        </div>
                        <div className='popup-input '>
                            <div className="content-input">
                                <label htmlFor="nextInput" className='prev-input'>{selectedSocialMedia.name==="linkedin" ? "https://linkedin.com/in/" : selectedSocialMedia.name==="whatsapp" ? "https://wa.me/" : "https://"+ selectedSocialMedia.name+".com/"  }</label>
                                <input id='nextInput' value={socialMediaInput.socialUrlLink} onChange={(e) => setSocialMediaInput(v => ({ ...v, socialUrlLink: e.target.value }))} className='next-input' type="text" />
                            </div>
                        </div>
                        <div className='popup-button'>
                            <div className='profile-save-button' onClick={() => socialMediaUrlUpdate()} >Değişiklikleri kaydet</div>
                        </div>

                    </div>
                </div>
                : ""}

            {socialDelete ?
                <div className='popup-global'>
                    <div onClick={() => setSocialDelete(false)} className='popup-top'></div>
                    <div className='popup'>
                        <div onClick={() => setSocialDelete(false)} className='close-button'>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                        <div className='header-text'>
                            {selectedSocialMedia.name} hesabını sil
                        </div>
                        <div className='description-text'>
                            {selectedSocialMedia.name} hesabını silmek istediğinize emin misiniz?
                        </div>
                        <div className='popup-input '>
                        </div>
                        <div className='popup-button'>
                            <div className='danger-button' onClick={() => socialMediaDelete()} >{selectedSocialMedia.name} hesabını sil</div>
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
                        <div className='filter-input'>

                            <input type="text" placeholder='Sosyal medya arayın' value={socialMediaFilterText} onChange={e => { setSocialMediaFilterText(e.target.value); e.target.value != "" ? setAllSocialMediaFilter([...allSocialMedia].filter(s => s.socialMeidaName.toLowerCase().includes(e.target.value.toLowerCase()))) : setAllSocialMediaFilter(allSocialMedia); }} />
                        </div>
                        <div className='social-types'>
                            {allSocialMediaFilter.map((v, i) => {

                                return <div key={i} className='social-type-item' onClick={() => socialMediaAddPopup(v)}>
                                    <div className='type-icon' dangerouslySetInnerHTML={{ __html: v.icon }}></div>
                                    <div className='type-text'>{v.socialMeidaName}</div>
                                    <div className='type-add'>{v.socialMediaAdded ? <span>Eklendi</span> : <i className="fa-solid fa-angle-right"></i>}</div>

                                </div>
                            })}



                        </div>
                    </div>
                </div>
                : ""
            }
            
            {socialMediaAdd ?
                <div className='popup-global'>
                    <div onClick={() => { setSocialMediaAdd(false); }} className='popup-top'></div>
                    <div className='popup'>
                        <div onClick={() => setSocialMediaAdd(false)} className='close-button'>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                        <div className='header-text'>
                            {selectedSocialMedia.name} hesabı ekle
                        </div>
                        <div className='description-text'>
                            {selectedSocialMedia.name}  hesabının URL adresini
                            alt kısıma eklemelisin.
                        </div>
                        <div className='popup-input'>
                            <div className="content-input">

                            <label htmlFor="nextInput" className='prev-input'>{selectedSocialMedia.name==="linkedin" ? "https://linkedin.com/in/" : selectedSocialMedia.name==="whatsapp" ? "https://wa.me/" : "https://"+ selectedSocialMedia.name+".com/"  }</label>

                                {/* <label htmlFor="nextInput" className='prev-input'>{`https://www.${selectedSocialMedia.name}.com/`}</label> */}
                                
                                <input id='nextInput' value={socialMediaInput.socialUrlLink} onChange={(e) => setSocialMediaInput(v => ({ ...v, socialUrlLink: e.target.value }))} className='next-input socialInput' type="text" 
                                />

                            </div>

                        </div>
                        <div className='popup-button'>
                            <button className='profile-save-button' onClick={() => socialMediaPush()}>{selectedSocialMedia.name}  hesabını ekle</button>
                        </div>

                    </div>
                </div>
                : ""}

            <div className='main-card-global'>
                <div className='main-card'>
                    {
                        <>

                            <div className='main-card-header'>
                                Sosyal Medya
                            </div>


                            <div className='main-card-text'>
                            Sosyal Medya Hesaplarınızı Ekleyin
                            </div>
                            <div onClick={() => setSocialAdd(true)} className='social-link-add-button'>
                                Hesap Ekle
                            </div>
                            <div className='social-items-area'>
                                <div className='loading-info'>  {socialStatus == "loading" ? <b>Loading...</b> : ""}</div>

                                <List
                                    values={socialMediaListSort}
                                    onChange={({ oldIndex, newIndex }) => {
                                        socialMediaOrderChangeUpdate(oldIndex, newIndex);
                                    }
                                    }
                                    renderList={({ children, props }) => <div {...props}>{children}</div>}
                                    renderItem={({ value, props }) => <div {...props}> <div className='social-item'>
                                        <div className='scroll-button'>
                                            <i className="fa-solid fa-ellipsis-vertical"></i>
                                        </div>
                                        <button className='right'>
                                            <div className='social-icon'>
                                                {
                                                    value.socialtype==="bip" ? (
                                                        <div style={{
                                                            color:"#FFF",
                                                            fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "400",
fontSize: "11px",
lineHeight: "13px",
textAlign: "justify",
                                                        }}>
                                                            bip
                                                        </div>
                                                    ): value.socialtype==="hangouts" ? (

                                                        <div style={{
                                                            color:"#FFF",
                                                            fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "400",
fontSize: "11px",
lineHeight: "13px",
textAlign: "justify",
                                                        }}>
                                                            Hangouts
                                                        </div>

                                                    ) : value.socialtype==="icbc" ? (

                                                        <div style={{
                                                            color:"#FFF",
                                                            fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "400",
fontSize: "11px",
lineHeight: "13px",
textAlign: "justify",
                                                        }}>
                                                            icbc
                                                        </div>

                                                    ) : value.socialtype==="web" ?(

<i class="fa fa-dribbble"></i>

                                                    ):   value.socialtype==="icq" ? (

                                                        <div style={{
                                                            color:"#FFF",
                                                            fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "400",
fontSize: "11px",
lineHeight: "13px",
textAlign: "justify",
                                                        }}>
                                                            icq
                                                        </div>

                                                    ):  value.socialtype==="kikmessenger" ? (

                                                        <div style={{
                                                            color:"#FFF",
                                                            fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "400",
fontSize: "11px",
lineHeight: "13px",
textAlign: "justify",
                                                        }}>
                                                            kikM
                                                        </div>

                                                    ):   value.socialtype==="nimotv" ? (

                                                        <div style={{
                                                            color:"#FFF",
                                                            fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "400",
fontSize: "11px",
lineHeight: "13px",
textAlign: "justify",
                                                        }}>
                                                            nimotv
                                                        </div>

                                                    ):   value.socialtype==="sineweibo" ? (

                                                        <div style={{
                                                            color:"#FFF",
                                                            fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "400",
fontSize: "11px",
lineHeight: "13px",
textAlign: "justify",
                                                        }}>
                                                            sineweibo
                                                        </div>

                                                    ):   value.socialtype==="dlive" ? (

                                                        <div style={{
                                                            color:"#FFF",
                                                            fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "400",
fontSize: "11px",
lineHeight: "13px",
textAlign: "justify",
                                                        }}>
                                                            dlive
                                                        </div>

                                                    ) :  value.socialtype==="swarm" ? (

                                                        <div style={{
                                                            color:"#FFF",
                                                            fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "400",
fontSize: "11px",
lineHeight: "13px",
textAlign: "justify",
                                                        }}>
                                                            swarm
                                                        </div>

                                                    ) : value.socialtype==="signal" ? (

                                                        <div style={{
                                                            color:"#FFF",
                                                            fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "400",
fontSize: "11px",
lineHeight: "13px",
textAlign: "justify",
                                                        }}>
                                                            signal
                                                        </div>

                                                    ) : value.socialtype==="yaya" ? (

                                                        <div style={{
                                                            color:"#FFF",
                                                            fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "400",
fontSize: "11px",
lineHeight: "13px",
textAlign: "justify",
                                                        }}>
                                                            yaya
                                                        </div>

                                                    ) :  value.socialtype==="vero" ? (

                                                        <div style={{
                                                            color:"#FFF",
                                                            fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "400",
fontSize: "11px",
lineHeight: "13px",
textAlign: "justify",
                                                        }}>
                                                            vero
                                                        </div>

                                                    ) :  value.socialtype==="zoom" ? (

                                                        <div style={{
                                                            color:"#FFF",
                                                            fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "400",
fontSize: "11px",
lineHeight: "13px",
textAlign: "justify",
                                                        }}>
                                                            zoom
                                                        </div>

                                                    ) :   value.socialtype==="teams" ? (

                                                        <div style={{
                                                            color:"#FFF",
                                                            fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "400",
fontSize: "11px",
lineHeight: "13px",
textAlign: "justify",
                                                        }}>
                                                            teams
                                                        </div>

                                                    ) : (

                                                        <i className={`fa-brands fa-${value.socialtype}`}></i>

                                                    )
                                                }
                                                
                                            </div>
                                            <div className='social-text '>
                                                {value.socialUrlLink}
                                            </div>
                                            <div onClick={() => { setSelectedSocialMedia(e => ({ ...e, id: value.socialMediaUrlId, name: value.socialtype, status: value.statuMode, order: value.socialOrder })); setSocialMediaInput(e => ({ ...e, socialUrlLink: value.socialUrlLink })); setSocialEdit(true); }} className='social-edit-button'>
                                                <img src='/icons/Edit.svg' />
                                            </div>
                                            <div onClick={() => { setSelectedSocialMedia(e => ({ ...e, id: value.socialMediaUrlId, name: value.socialtype })); setSocialDelete(true); }} className='social-edit-button'>
                                                <img src='/icons/Trash_2-black.svg' />
                                            </div>

                                            <div className='switch-button '>
                                                <label className="switch">
                                                    <input type="checkbox" checked={value.statuMode} onChange={() => { setSocialMediaListSort(p => p.map(v => v.socialMediaUrlId == value.socialMediaUrlId ? { ...v, statuMode: !value.statuMode } : v)); }} />
                                                    <span className="slider round"></span>
                                                </label>{/**  */}
                                            </div>

                                        </button>
                                    </div>
                                    </div>}
                                />


                                <div className='info'>
                                    Hesaplarınız Sıralayın
                                </div>
                                <div className='position-header-text'>
                                    İkonların Konumu
                                </div>
                                <div className='position-desciription-text'>
                                    {/* İkonların konumu: */}
                                </div>
                                <div className='position-radio-buttons'>
                                    <div className='content-radio'>

                                        <label htmlFor='r1' className="radio-label">
                                            <input id="r1" type="radio" name='social-position' value="top" onClick={(e) => socialPositonChange(e)} checked={placeOfSocialMediaPosition == "top" ? true : false} />
                                            <span className="text">Üstte</span>
                                            <span className="checkmark"><i className="fa-solid fa-circle"></i></span>
                                        </label>
                                        <label htmlFor='r2' className="radio-label">
                                            <input id="r2" type="radio" name='social-position' value="bottom" onClick={(e) => socialPositonChange(e)} checked={placeOfSocialMediaPosition == "bottom" ? true : false} />
                                            <span className="text">Altta</span>
                                            <div className="checkmark"><i className="fa-solid fa-circle"></i></div>
                                        </label>
                                    </div>
                                </div>

                            </div>
                        </>}
                </div>
            </div>

        </>
    )
}

export default SocialMedia