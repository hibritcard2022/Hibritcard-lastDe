import React, { useEffect, useState } from 'react'
import HeaderMenu from './header-menu'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux';
import ImageLoader from 'react-imageloader';

import { RWebShare } from "react-web-share";
import zIndex from '@mui/material/styles/zIndex';



import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton
  } from "react-share";




function Header() {

    const [notify, setNotify]= useState(false)
    const [notiCount, setnotiCount]= useState(0)


    const shareData = {
        title: 'MDN',
        text: 'Learn web development on MDN!',
        url: 'https://developer.mozilla.org'
      }
      
     // const btn = document.querySelector('.icon-item');
      
      
      // Share must be triggered by "user activation"
    //   btn.addEventListener('click', async () => {
    //     try {
    //       await navigator.share(shareData);
    //       resultPara.textContent = 'MDN shared successfully';
    //     } catch (err) {
    //       resultPara.textContent = `Error: ${err}`;
    //     }
    //   });

      function shareAllData(){

        try {
             navigator.share( {
                title: 'HibritCard Paylaş',
                text: 'Learn web development on MDN!',
                url: 'https://panel.hibritcard.com/#/'
              });
            //resultPara.textContent = 'MDN shared successfully';
          }catch (err) {
            //resultPara.textContent = `Error: ${err}`;
          }

      }


    useEffect(() => {

        if(notiCount % 2 != 0){
            setNotify(true)
           
        }else{
            setNotify(false)
            
        }

        console.log("data geldii::", notiCount)
       
    }, [notiCount])




    function preloader() {
        return <img className='loader' src="/images/Spin-1s-200px.svg" />;
    }

    const selectedProfileId = useSelector(state => state.userSlice.selectProfileId);
    console.log("aaa" + selectedProfileId);


    const profile = useSelector(state => state.userSlice.profiles);

    let selectedProfilData = profile != "" ? profile.find(s => s.profileId == selectedProfileId) : ""

    return (
        <>
            <div className='header-global'>
                <div className='header'>

                    <div className='hibrit-profile'>

                        <div>

                        <Link href="/select-profile">
                            <a>
                                <div className='bg'></div>

                                <ImageLoader
                                    src={selectedProfilData && selectedProfilData.profileUrl}
                                    wrapper={React.createFactory('div')}
                                    preloader={preloader}>
                                    Image load failed!
                                </ImageLoader>

                            </a>
                        </Link>

                        </div>

                        <div style={{
                            marginTop: "48px",
                            fontFamily: 'Montserrat',
                            fontStyle: "normal",
                            fontWeight: 700,
                            fontSize: "11px",
                            lineHeight: "13px"
                        }}>
                            {
                                selectedProfilData && selectedProfilData.profileTag
                            }
                        </div>

                        
                       
                    </div>
                    <div className='header-logo'>
                        <img src='/images/hibritcard-logo.svg' />
                    </div>
                    <div className='header-menu-area'>
                        <HeaderMenu />
                    </div>
                    <div className='header-icons'>


                        <div className='icon-item' 
                        onClick={()=>{ 
                            console.log("panelburada");
                            setnotiCount((notiCount)=>notiCount + 1)
                            }} 
                            style={{
                                cursor:"pointer",
                                zIndex:"999"
                            }}
                        >
                    <div style={
                        {
                            marginLeft:"22px",
                            position: "absolute",
  
  backgroundColor: "#8b8dff",
  fontSize: "11px",
  color: "white",
  display: "inline",
  padding: "3px 5px",
  borderRadius: "20px"
                        }
                    }> 0</div>
                            <img src='/icons/bell-black.svg'
                             />
                        </div>

                       

                       {

                       notify ? 

                       <div  style={{ position:"absolute", width:"auto", marginTop:"50px"}}>

                            <div className='mt-4 rounded-tr-base rounded-tl-base bg-gray-50 px-4 py-4 w-full' style={{borderRadius:"10px", width:"auto", 
                            background:"rgba(0, 0, 0, 0.5)" ,marginTop: "60px",
                            color:"white",
    padding: "20px 20px",
    marginRight:"60px"}}>
                            Bildirim bulunmamaktadır.
                            </div>
                        </div> : ""

                       }
                        


                        <div className='icon-item' style={{
                            cursor:"pointer",
                            zIndex:"999"
                        }}
                        onClick={shareAllData}
                        >
                            {/* <img src='/icons/External link-black.svg' /> */}

                            {/* <RWebShare
        data={{
          text: "Like humans, flamingos make friends for life",
          url: "https://on.natgeo.com/2zHaNup",
          title: "Flamingos",
        }}
        disableNative ={false}
        onClick={() => console.log("shared successfully!")}
      >
       <img src='/icons/External link-black.svg' />

      </RWebShare> */}

<img src='/icons/External link-black.svg' />


                        </div>

                       

                    </div>

                </div>
                <div className='header-mobile-menu-area'>
                    <HeaderMenu />
                </div>
            </div>
        </>
    )
}

export default Header