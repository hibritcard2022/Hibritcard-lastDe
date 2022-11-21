import React from "react";
import { useState, useEffect } from "react";
import ViewPageButton from "../../components/view-page-button";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getPanelAsync, getUserAsync } from "../../stores/userSlice";
import Loading from "../../components/loading";
import { getAllSocialMediaAsync } from "../../stores/socialSlice";
import ImageLoader from "react-imageloader";
import Link from "next/link";
import VCard from "vcard-creator";
import { Grid, } from "@mui/material";
import e from "cors";

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';



import QRCode from "qrcode";

//import from theer
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


// dialog part heer

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};




function Profile() {
  const myVCard = new VCard();
  const myVCard2 = new VCard();

  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const userStatus = useSelector((state) => state.userSlice.status);
  const profile = useSelector((state) => state.userSlice.profiles);
  const socialMediaList = useSelector((state) => state.socialSlice.socialList);


  const socialMediaListSort = socialMediaList != undefined ? [...socialMediaList].sort(

    (a, b) => a.socialOrder - b.socialOrder

  ) : [] ;


  useEffect(() => {

    console.log("Hehhhhee",socialMediaListSort )

    // socialMediaListSort.map((v)=>{

      

    //   return (
    //     v.statuMode && (


    //     )
    //   );
    // })
  
  }, [socialMediaListSort])

  
  

  function shareAllData(){
    

    try {
         navigator.share( {
            title: 'HibritCard-HibritMedya',
            text: 'Bizi tavsiye edin!!',
            url: location.href
          });

        //resultPara.textContent = 'MDN shared successfully';

      }catch (err) {
        //resultPara.textContent = `Error: ${err}`;

      }


  }



  console.log("profile bu:",profile )

  const selectedProfilData = profile != "" && profile.find((s) => s.profileId == id);

  const previewAllPanel = useSelector(
    (state) => state.userSlice.previewAllPanel
  );




  const [previewAllPanelListSort, setpreviewAllPanelListSort]=useState(
    [...previewAllPanel].sort((a,b)=>a.OrderId - b.OrderId)
  );

  useEffect(() => {
    console.log("NiceAllpanel::",previewAllPanelListSort )
    setpreviewAllPanelListSort([...previewAllPanel].sort((a, b) => a.OrderId - b.OrderId));
  }, [previewAllPanel]);





  // get all panel list in sort
  // const getAllPanelSort =[...previewAllPanel].sort(
  //   (a,b)=>a.OrderId - b.OrderId
  // );

  //console.log("deneme here:", selectedProfilData)

  const [postMessages, setPostMessages] = useState([]);

  



    
  myVCard
  // Add personal data
  .addName(
    selectedProfilData && selectedProfilData.publicName,
    selectedProfilData && selectedProfilData.publicsurname,
    "",
    "",
    ""
  )
  // Add work data
  .addCompany(
    selectedProfilData &&
      selectedProfilData.profileCompany &&
      selectedProfilData.profileCompany
  )
  .addJobtitle(
    selectedProfilData &&
      selectedProfilData.position &&
      selectedProfilData.position
  )
  previewAllPanelListSort.map((v,i)=>{

    myVCard
    ///mYvACRD
     .addAddress(
     v.streetAdress && v.streetAdress, v.profileCountry && v.profileCountry,
    "",
    "",
    "",
    "",
    "",
    "",
    "WORK"
  )
  .addURL(
    
    );

if(v.type==="conatctAddForm" && v.panelPhoneNumbers){

v.panelPhoneNumbers.map((w,a)=>{

  myVCard
  .addPhoneNumber(
      w.phoneNumber,
    "PREF;PERSONAL"
  )


})
}

else if( v.type==="conatctAddForm" && v.panelEmailPostas){

v.panelEmailPostas.map((w,a)=>{

  myVCard
  .addEmail(
      w.emailPosta
  )
})
}
  })





  function preloader() {
    return <img className="loader" src="/images/Spin-1s-200px.svg" />;
  }
  const [dropdownList, setDropdownList] = useState([
    {
      id: 0,
      open: false,
    },
    {
      id: 1,
      open: false,
    },
  ]);

  function emailFormatController(value, orderId) {
    if (value != "") {
      const pattern =
        /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
      const result = pattern.test(value);
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" + result + " " + orderId);
      setPostMessages((e) =>
        e.map((x) =>
          x.orderId == orderId
            ? { ...x, eMailFormatError: !result ? true : false }
            : x
        )
      );
      console.log(postMessages);
    }
  }

  //Bring the Ara annd Kaydet Button 
  const [getTheCallButton, setgetTheCallButton]= useState(false);
  const [defaultPhone, setdefaultPhone]= useState("");
  const [ defaultMail, setdefaultMail]= useState("");

  const [bankIbanToKopy, setbankIbanToKopy]= useState("");
  const [isIbanEmpty, setisIbanEmpty] = useState(false);


  useEffect(() => {

    console.log("allPanooo::",previewAllPanelListSort )


    setDropdownList([]);

    previewAllPanelListSort.map((v,i)=>{
      
      if(v.type === "bankform"){

        v.bankDataAll.map((r,y)=>{
          if(r.bankIban && r.bankIban !== ""){

            setbankIbanToKopy(r.bankIban);
            setisIbanEmpty(true)

          }

        })


      }


     
   
    
   

      if(v.panelEmailPostas != undefined){
        console.log("fornowData::",v.panelEmailPostas) 

        v.panelEmailPostas.map((w,a)=>{
          console.log("insidehere::",w.emailPosta)
        })

      }

      if(v.type === "conatctAddForm"){

        v.panelPhoneNumbers.map((w,u)=>{

          if(w.defaultNumber === true && w.phoneNumber != ""){

            setdefaultPhone(w.phoneNumber)

          }

          

        })

        v.panelEmailPostas.map((e,y)=>{
            if(e.defaultEmaill === true && e.emailPosta != ""){

              setdefaultMail(e.emailPosta)
            }
        })

        setgetTheCallButton(true)

      }

      
    })


    if (previewAllPanel) {

      setDropdownList(() => {
        let list = [];
        for (let i = 0; i < previewAllPanelListSort.length + 2; i++) {
          list.push({ id: i, open: false });
        }
        setPostMessages([]);
        for (let i = 0; i < previewAllPanelListSort.length; i++) {

          if (previewAllPanelListSort[i].type === "documentForm") {

            setPostMessages((e) => [
              ...e,
              {
                orderId: previewAllPanelListSort[i].OrderId,
                fullName: "",
                eMail: "",
                phoneNumber: "",
                message: "",
                eMailFormatError: false,

              },
            ]);
          }
        }

        return list;
      });
    }
  }, [previewAllPanelListSort]);

  function OpenDropdownItem(id) {
    const newList = dropdownList.map((v) => {


      
      if (v.id == id && v.open == false) {
        v.open = true;
      } else {
        v.open = false;
      }

      return v;
    });
    setDropdownList(newList);
  }

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([myVCard.toString()], {
      type: "text/vcard;charset=utf-8;application/octet-stream;",
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.vcf";

    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };



  const downloadTxtFile2 = (v) => {


    console.log("AllData", v )


    myVCard2
      // Add personal data
      .addName(v.publicName, v.publicsurname, "", "", "")
      // Add work data
      .addCompany(v.publicOrganization)
      .addJobtitle(v.profilePosition)
      // .addRole('Data Protection Officer')
      .addAddress(
        v.streetAdress,
        "",
        "",
        v.profileCity,
        "",
        "",
        v.profileCountry,
        "WORK"
      )
      .addURL();

    //.addPhoto(, 'JPEG')

  v.panelPhoneNumbers &&  v.panelPhoneNumbers.map((w,i)=>{
    myVCard2
    .addPhoneNumber(w.phoneNumber, "PREF;PERSONAL")
      })

      v.panelEmailPostas &&  v.panelEmailPostas.map((w,i)=>{
        myVCard2
        .addEmail(w.emailPosta)
          })


    
      // .addEmail(v.kisiselEmail)
      // .addEmail(v.kurumsalEmail)
      // .addPhoneNumber(v.kisiselTelefon, "PREF;PERSONAL")
      // .addPhoneNumber(v.kurumsalTelefon, "WORK")

      
    const element = document.createElement("a");
    const file = new Blob([myVCard2.toString()], {
      type: "text/vcard;charset=utf-8;application/octet-stream;",
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.vcf";

    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };



  useEffect(() => {
    if (localStorage.getItem("GZIToken")) {
      dispatch(getUserAsync());
      dispatch(
        getAllSocialMediaAsync(localStorage.getItem("selectedProfileId"))
      );
      dispatch(getPanelAsync(localStorage.getItem("selectedProfileId")));
      console.log(previewAllPanelListSort);
    } else {
      router.push("/login");
    }
  }, []);

  function eMailPost(orderId) {
    const value =
      postMessages[postMessages.findIndex((x) => x.orderId == orderId)];
  }


  const backgroundColor=  selectedProfilData.profileTheme === "light" ? "#FFF" : "#333";

   const saveButtonBackGround=  selectedProfilData.profileTheme === "light" ? "black"  : "#8b8dff" ;
   const saveColor = selectedProfilData.profileTheme === "light" ? "#FFFF" : "#FFF"

  //  "#8b8dff"
  // "rgb(255, 255, 255)"
  // "rgb(245, 245, 245)";




  // dialog Here from 

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

// const locationKopyQr = location.href
  //qrcode generate
  // const [url, setUrl]=useState(location.href);
  const [qrcode, setqrcode] = useState("");

  const GenerateQRCode= ()=>{
    QRCode.toDataURL(location.href,{
      margin:2,
      color:{
        dark: "#335383ff"
      }


    },(err,url)=>{
      if(err){
        return console.log("hatavar", err)
      }
      console.log(url)
      setqrcode(url)
    })
  }


  //forn carousel here
  const handleDragStart = (e) => e.preventDefault();

//   const responsive = {
//     0: { items: 6 },
//     568: { items: 10 },
//     1024: { items: 20 },
// };

const responsive = {

  0: { items: 12 },
  568: { items: 12 },
  1024: { items: 12 }

};




const items2=[]

socialMediaListSort.map((v,i)=>{

  return(

    items2.push(
      <div
      key={v.socialMediaUrlId}
      className="profile-social-item"
    >
      <a
        href={v.socialtype==="whatsapp" ? "https://wa.me/" +
         v.socialUrlLink :v.socialtype==="web" ? "http://"+
         v.socialUrlLink : v.socialtype==="linkedin" ? 
          "https://www.linkedin.com/in/"+ v.socialUrlLink :"https://"+ v.socialtype +".com/"
         + v.socialUrlLink}
        target="_blank"
      >

        
        <div className="profile-social-item ">


        {
                                    v.socialtype==="bip" ? (
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
                                    ): v.socialtype==="web" ?(
                                     
                                        
                                          <i class="fa fa-dribbble"></i>
                                        
                                      

                                    ): v.socialtype==="hangouts" ? (

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

                                    ) : v.socialtype==="icbc" ? (

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

                                    ) :   v.socialtype==="icq" ? (

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

                                    ):  v.socialtype==="kikmessenger" ? (

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

                                    ):   v.socialtype==="nimotv" ? (

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

                                    ):   v.socialtype==="sineweibo" ? (

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

                                    ):   v.socialtype==="dlive" ? (

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

                                    ) :  v.socialtype==="swarm" ? (

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

                                    ) : v.socialtype==="signal" ? (

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

                                    ) : v.socialtype==="yaya" ? (

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

                                    ) :  v.socialtype==="vero" ? (

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

                                    ) :  v.socialtype==="zoom" ? (

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

                                    ) :   v.socialtype==="teams" ? (

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

                                      <i className={`fa-brands fa-${v.socialtype}`}></i>

                                    )
                                }
        </div>




      </a>
    </div>
      
    )
  )
})


console.log("Arrrayhere" , items2)




  return (
    <>
      {userStatus == "loading" ? <Loading /> : ""}
      {/**      <div className='alert-popup-bg'>
                <div className='alert-popup'>
                    <div className='alert-icon'>
                        <i className="fa-solid fa-triangle-exclamation"></i>
                    </div>
                    <div className='alert-text'>
                        Deneme hesabınızın kullanım süresi dolmuştur,    lütfen kartınızı satın alınız.
                    </div>
                    <div className='global-button alert-button'>
                        Kart Satın Al
                    </div>
                </div>
            </div>
*/}

      <div
        className={
          "profile-page " +
          (selectedProfilData && selectedProfilData.profileTheme == "light"
            ? "profile-page-light "
            : "profile-page-dark")
        }
      >
        <div className="header-image">
          <div className="header-gradient"></div>
          <ImageLoader
            src={selectedProfilData && selectedProfilData.backgorundImage}
            wrapper={React.createFactory("div")}
            preloader={preloader}
          >
            Image load failed!
          </ImageLoader>
        </div>
        <div className="profile-area">
          <div className="profile-image">
            <div className="image">
              <ImageLoader
                src={selectedProfilData && selectedProfilData.profileUrl}
                wrapper={React.createFactory("div")}
                preloader={preloader}
              >
                Image load failed!
              </ImageLoader>
            </div>
            <div className="share-icon"  onClick={
            shareAllData
            }>
              {selectedProfilData &&
              selectedProfilData.profileTheme == "light" ? (
                <img src="/icons/External link-black.svg" />
              ) : (

                <img src="/icons/External link-white.svg" />

              )}
            </div>
          </div>
          <div className="infos">
            <div className="profile-name">
              {selectedProfilData &&
                selectedProfilData.publicName +
                  " " +
                  selectedProfilData.publicSurName}
            </div>
            <div className="profile-info">
              {selectedProfilData && selectedProfilData.position}
            </div>
            <div className="profile-description">
              {selectedProfilData && selectedProfilData.profilDescription}
            </div>
          </div>
        </div>



       
        


        {socialMediaListSort.length > 0 &&
          selectedProfilData &&
          selectedProfilData.placeOfSocialMediaPosition == "top" && (

            // <div className="profile-social-items">

<div style={{
  marginLeft:"30px",
  marginRight:"30px"
}}>


<AliceCarousel
        mouseTracking
        items={items2}
        responsive={responsive}
        controlsStrategy="alternate"
    />


{/* <AliceCarousel  mouseTracking
        items={items}
        responsive={responsive}
        controlsStrategy="alternate" /> */}
</div>
            // </div>
          )  
          }


          {/* The new Div start from here */}

{
  getTheCallButton && (

    <div className="profile-content" >
  
    <div  className="profile-dropdown"  style={{
      backgroundColor:"white",
      borderRadius:"0px",
      backgroundColor:backgroundColor
    }}>
    
      <Grid className="container" container >
    
        <Grid xs={3} sm={3} md={3} lg={3} style={{
          padding:"5px",
          cursor: "ponter"
        }}>
    

          <a  href={"tel:"+ defaultPhone}   style={{
            textDecoration:"none"
          }}>
    
          <Grid className="container" container style={{
              textAlign:"center",
              background:"#f5f5f5",
              padding:"5px",
              borderRadius:"5px"
    
            }}>
              <Grid  item xs={12} sm={12} md={12} lg={12}>
                  <div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9349 6.98742C13.1407 6.4749 13.723 6.22624 14.2355 6.43201C15.0144 6.74473 15.719 7.21738 16.3038 7.81944C16.8886 8.42149 17.3406 9.13954 17.6306 9.9272C17.8214 10.4455 17.5559 11.0203 17.0376 11.2111C16.5193 11.4019 15.9445 11.1364 15.7537 10.6181C15.5604 10.093 15.2591 9.61433 14.8692 9.21296C14.4793 8.81159 14.0096 8.49649 13.4903 8.28801C12.9778 8.08223 12.7291 7.49994 12.9349 6.98742Z" fill="black"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3635 3.04786C13.5064 2.51439 14.0547 2.19781 14.5882 2.34075C16.2838 2.79507 17.8298 3.68771 19.0711 4.92894C20.3123 6.17017 21.2049 7.71626 21.6593 9.41182C21.8022 9.94529 21.4856 10.4936 20.9522 10.6366C20.4187 10.7795 19.8704 10.4629 19.7274 9.92946C19.364 8.57301 18.6498 7.33614 17.6569 6.34315C16.6639 5.35017 15.427 4.63606 14.0706 4.2726C13.5371 4.12966 13.2205 3.58132 13.3635 3.04786Z" fill="black"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.96833 5.21549C7.38653 4.4089 9.83018 5.92366 10.5089 8.37611C10.9715 10.0472 10.5334 11.7996 9.46531 12.9995C9.68407 13.2828 9.92311 13.5552 10.1826 13.8149C10.4408 14.0733 10.7116 14.3115 10.9932 14.5295C12.1926 13.4529 13.9502 13.01 15.6262 13.4745C18.0782 14.1542 19.5901 16.5997 18.7848 19.0178C18.2564 20.6044 17.2711 21.5683 15.9571 21.8856C14.7361 22.1805 13.4196 21.867 12.2585 21.3844C9.91992 20.4122 7.61074 18.4974 6.55613 17.442C5.47664 16.3617 3.57003 14.0491 2.60671 11.715C2.12834 10.5559 1.82033 9.24429 2.11584 8.02889C2.43378 6.7213 3.39283 5.74096 4.96833 5.21549ZM8.58141 8.90958C8.16872 7.4185 6.79749 6.7137 5.60116 7.11273C4.54956 7.46347 4.18482 7.98485 4.05922 8.50141C3.91121 9.11016 4.03992 9.94515 4.45545 10.952C5.27992 12.9497 6.9898 15.0465 7.97088 16.0283C8.92821 16.9863 11.0228 18.7048 13.0262 19.5376C14.0361 19.9574 14.8752 20.0894 15.4876 19.9415C16.007 19.8161 16.5331 19.4492 16.8872 18.3858C17.2866 17.1867 16.5807 15.8145 15.092 15.4018C13.9841 15.0948 12.8451 15.4506 12.1672 16.1766C11.7294 16.6454 10.895 16.9126 10.1851 16.4171C9.68553 16.0684 9.21113 15.6722 8.76787 15.2286C8.3239 14.7843 7.92751 14.3087 7.57877 13.8081C7.08635 13.1012 7.3491 12.27 7.81452 11.8312C8.53515 11.1518 8.88742 10.0153 8.58141 8.90958Z" fill="black"/>
    </svg>
    
                  </div>
              </Grid>
    
              <Grid  item xs={12} sm={12} md={12} lg={12} style={{
                fontFamily: 'Montserrat',
                fontStyle: "normal",
                lineHeight: "1.2em",
                color: "#0A2239"
              }}>
                  Ara
              </Grid>
    
            </Grid>
          </a>
    
            
    
    
        </Grid>
    
        <Grid  item xs={3} sm={3} md={3} lg={3}  style={{
          padding:"5px"
        }} >


          <a href={"mailto:" + defaultMail} style={{
            textDecoration:"none"
          }} >


          <Grid className="container" container style={{
              textAlign:"center",
              background:"#f5f5f5",
              padding:"5px",
              borderRadius:"5px",
              color: "#0A2239"
             
            }}>
              <Grid  item xs={12} sm={12} md={12} lg={12}>
             <div>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 8C2 5.79086 3.79086 4 6 4H18C20.2091 4 22 5.79086 22 8V16C22 18.2091 20.2091 20 18 20H6C3.79086 20 2 18.2091 2 16V8ZM6 6C4.89543 6 4 6.89543 4 8V16C4 17.1046 4.89543 18 6 18H18C19.1046 18 20 17.1046 20 16V8C20 6.89543 19.1046 6 18 6H6Z" fill="black"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.21913 8.3753C6.56414 7.94404 7.19343 7.87412 7.6247 8.21913L12 11.7194L16.3753 8.21913C16.8066 7.87412 17.4359 7.94404 17.7809 8.3753C18.1259 8.80657 18.056 9.43586 17.6247 9.78087L12 14.2806L6.37531 9.78087C5.94404 9.43586 5.87412 8.80657 6.21913 8.3753Z" fill="black"/>
    </svg>
    
             </div>
              </Grid>
    
              <Grid  item xs={12} sm={12} md={12} lg={12}>
    
                  Mail
    
              </Grid>
    
            </Grid>

          </a>
    
       
    
        </Grid>
        <Grid  item xs={3} sm={3} md={3} lg={3}  style={{
          padding:"5px"
        }}  >
        <Grid className="container" style={{
              textAlign:"center",
              background:"#f5f5f5",
              padding:"5px",
              borderRadius:"5px"
              
            }}   onClick={(e)=>{handleClickOpen(e); GenerateQRCode(e)}}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
              <div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 6C2 3.79086 3.79086 2 6 2H7C9.20914 2 11 3.79086 11 6V7C11 9.20914 9.20914 11 7 11H6C3.79086 11 2 9.20914 2 7V6ZM6 4C4.89543 4 4 4.89543 4 6V7C4 8.10457 4.89543 9 6 9H7C8.10457 9 9 8.10457 9 7V6C9 4.89543 8.10457 4 7 4H6ZM13 6C13 3.79086 14.7909 2 17 2H18C20.2091 2 22 3.79086 22 6V7C22 9.20914 20.2091 11 18 11H17C14.7909 11 13 9.20914 13 7V6ZM17 4C15.8954 4 15 4.89543 15 6V7C15 8.10457 15.8954 9 17 9H18C19.1046 9 20 8.10457 20 7V6C20 4.89543 19.1046 4 18 4H17ZM2 17C2 14.7909 3.79086 13 6 13H7C9.20914 13 11 14.7909 11 17V18C11 20.2091 9.20914 22 7 22H6C3.79086 22 2 20.2091 2 18V17ZM6 15C4.89543 15 4 15.8954 4 17V18C4 19.1046 4.89543 20 6 20H7C8.10457 20 9 19.1046 9 18V17C9 15.8954 8.10457 15 7 15H6ZM13 17C13 14.7909 14.7909 13 17 13H18C20.2091 13 22 14.7909 22 17V18C22 20.2091 20.2091 22 18 22H17C14.7909 22 13 20.2091 13 18V17ZM17 15C15.8954 15 15 15.8954 15 17V18C15 19.1046 15.8954 20 17 20H18C19.1046 20 20 19.1046 20 18V17C20 15.8954 19.1046 15 18 15H17Z" fill="black"/>
    </svg>
    
              </div>
              </Grid>
    
              <Grid item xs={12} sm={12} md={12} lg={12}>
                QR
              </Grid>
    
            </Grid>
    
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3}   style={{
          padding:"5px"
        }}>


          
        <Grid className="container" container style={{
              textAlign:"center",
              background:saveButtonBackGround,
              padding:"5px",
              borderRadius:"5px",
              color: saveColor,
              
            }}  onClick={() => downloadTxtFile()}>
              <Grid item  xs={12} sm={12} md={12} lg={12}>
                <div>


                {selectedProfilData &&
              selectedProfilData.profileTheme == "light" ? (

                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V8.25C20 7.14543 19.1046 6.25 18 6.25H12.8284C12.0328 6.25 11.2697 5.93393 10.7071 5.37132L9.62868 4.29289C9.44114 4.10536 9.18679 4 8.92157 4H6ZM2 6C2 3.79086 3.79086 2 6 2H8.92157C9.71722 2 10.4803 2.31607 11.0429 2.87868L12.1213 3.95711C12.3089 4.14464 12.5632 4.25 12.8284 4.25H18C20.2091 4.25 22 6.04086 22 8.25V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 9C12.5523 9 13 9.44772 13 10V12H15C15.5523 12 16 12.4477 16 13C16 13.5523 15.5523 14 15 14H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16L11 14H9C8.44772 14 8 13.5523 8 13C8 12.4477 8.44772 12 9 12H11V10C11 9.44772 11.4477 9 12 9Z" fill="white"/>
</svg>
               
              ) : (


                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V8.25C20 7.14543 19.1046 6.25 18 6.25H12.8284C12.0328 6.25 11.2697 5.93393 10.7071 5.37132L9.62868 4.29289C9.44114 4.10536 9.18679 4 8.92157 4H6ZM2 6C2 3.79086 3.79086 2 6 2H8.92157C9.71722 2 10.4803 2.31607 11.0429 2.87868L12.1213 3.95711C12.3089 4.14464 12.5632 4.25 12.8284 4.25H18C20.2091 4.25 22 6.04086 22 8.25V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6Z" fill="black"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 9C12.5523 9 13 9.44772 13 10V12H15C15.5523 12 16 12.4477 16 13C16 13.5523 15.5523 14 15 14H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16L11 14H9C8.44772 14 8 13.5523 8 13C8 12.4477 8.44772 12 9 12H11V10C11 9.44772 11.4477 9 12 9Z" fill="black"/>
                </svg>


              )}

                


             
                </div>
              </Grid>
    
              <Grid item  xs={12} sm={12} md={12} lg={12}>
                  Kaydet
              </Grid>
    
            </Grid>
    
        </Grid>
    
      </Grid>
     
    </div>
    
    </div>

  )
}



{/* QR dİALOG FROM HEER */}

<div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Qr Kodu
        </BootstrapDialogTitle>
        <DialogContent dividers>


          {
            qrcode && <>

<img src={qrcode} alt="" />
            
            </>


          }

          
          
        </DialogContent>
        <DialogActions>

          <a href={qrcode} download="qrcode.png" style={{

            textDecoration:"none"
          }}>
          <Button autoFocus>
            QR'İ İNDİR
          </Button>
          </a>
          
        </DialogActions>
      </BootstrapDialog>
    </div>



{/* END OF dİALOG FROM HERE */}

         






{/* end of new Div From here */}


        <div className="profile-content">

          {/* profil Bilgileri Start form here */}

          <div className="profile-dropdown">


            {/* 
            <div
              onClick={() => OpenDropdownItem(0)}
              className="dropdown-header"
            >
              <div className="dropdown-left-icon">
                {selectedProfilData &&

                selectedProfilData.profileTheme == "light" ? (

                  <img src="/icons/user_3-AEAEB4.svg" />
                  // <img src="/icons/Phone-AEAEB4.svg" />
                ) : (

                  <img src="/icons/user_3-333333.svg" />
                  // <img src="/icons/Phone-333333.svg" />
                )}
              </div>

              <div className="dropdown-text">
                <div>Profile Bilgileri</div>
              </div>
              <div className="dropdown-riht-icon">
                { dropdownList[0] &&  dropdownList[0].open == false ? (
                  <i className="fa-solid fa-angle-down"></i>
                ) : (
                  <i className="fa-solid fa-angle-up"></i>
                )}
              </div>
            </div> */}

            <div
              className={
                "dropdown-content " +

                ( dropdownList[0] && dropdownList[0].open == true ? "dopen" : "dclose")

              }
            >
              <div className="content-header">
                {selectedProfilData && selectedProfilData.publicName && (
                  <div className="profile-name">
                    {selectedProfilData && selectedProfilData.publicName}{" "}

                    {selectedProfilData && selectedProfilData.publicSurName}

                  </div>
                )}
                {selectedProfilData &&
                  (selectedProfilData.profileCompany ||
                    selectedProfilData.position) && (
                    <div className="profile-info">
                      {selectedProfilData && selectedProfilData.profileCompany}{" "}
                      {selectedProfilData &&
                        selectedProfilData.position &&
                        selectedProfilData.profileCompany &&
                        "-"}{" "}
                      {selectedProfilData && selectedProfilData.position}
                    </div>
                  )}
              </div>

              <div className="content-in">
                {selectedProfilData && selectedProfilData.telNumber && (
                  <div className="in-item">
                    <div className="image">
                      {selectedProfilData &&
                      selectedProfilData.profileTheme == "light" ? (
                        <img src="/icons/Phone-AEAEB4.svg" />
                      ) : (
                        <img src="/icons/Phone-666666.svg" />
                      )}
                    </div>
                    <div className="text">
                      <a
                        href={`tel:+${
                          selectedProfilData && selectedProfilData.telNumber
                        }`}
                      >
                        +{selectedProfilData && selectedProfilData.telNumber}
                      </a>
                    </div>
                  </div>
                )}
                {selectedProfilData && selectedProfilData.eMail && (
                  <div className="in-item">
                    <div className="image">
                      {selectedProfilData &&
                      selectedProfilData.profileTheme == "light" ? (
                        <img src="/icons/mail-AEAEB4.svg" />
                      ) : (
                        <img src="/icons/mail-666666.svg" />
                      )}
                    </div>
                    <div className="text">
                      <a
                        href={`mailto:${
                          selectedProfilData && selectedProfilData.eMail
                        }`}
                      >
                        {selectedProfilData && selectedProfilData.eMail}
                      </a>
                    </div>
                    {/**  <div className='global-button profile-in-button'>
                                        <img src='/icons/Send-gray.png' />
                                        <span>Git</span>
                                    </div> */}
                  </div>
                )}
                {selectedProfilData && selectedProfilData.websiteUrlLink && (
                  <div className="in-item">
                    <div className="image">
                      {selectedProfilData &&
                      selectedProfilData.profileTheme == "light" ? (
                        <img src="/icons/Globe-AEAEB4.svg" />
                      ) : (
                        <img src="/icons/Globe-666666.svg" />
                      )}
                    </div>
                    <div className="text">
                      <Link
                        href={`${
                          selectedProfilData &&
                          selectedProfilData.websiteUrlLink
                        }`}
                      >
                        <a target="_blank">
                          {" "}
                          {selectedProfilData &&
                            selectedProfilData.websiteUrlLink}
                        </a>
                      </Link>
                    </div>
                  </div>
                )}
                {selectedProfilData && selectedProfilData.profileAdres && (
                  <div className="in-item">
                    <div className="image">
                      {selectedProfilData &&
                      selectedProfilData.profileTheme == "light" ? (
                        <img src="/icons/location-AEAEB4.svg" />
                      ) : (
                        <img src="/icons/location-666666.svg" />
                      )}
                    </div>
                    <div className="text">
                      <Link
                        href={`https://maps.google.com/?q=${
                          selectedProfilData && selectedProfilData.profileAdres
                        }`}
                      >
                        <a target="_blank">
                          {" "}
                          {selectedProfilData &&
                            selectedProfilData.profileAdres}
                        </a>
                      </Link>
                    </div>
                  </div>
                )}
                {selectedProfilData && selectedProfilData.telNumber && (
                  <a
                    onClick={downloadTxtFile}
                    className={
                      "global-button " +
                      (selectedProfilData &&
                      selectedProfilData.profileTheme == "light"
                        ? "profile-in-button"
                        : "profile-in-button-dark")
                    }
                  >
                    <span>Rehbere Ekle</span>
                  </a>
                )}
              </div>

              {/* end of profile bilgileri updated */}

            </div>

            
          </div>

         
          {previewAllPanel &&
            previewAllPanelListSort.map((v, i) => {

              return (

                <div key={v.OrderId} className="profile-dropdown">

                  <div
                    onClick={() => OpenDropdownItem(i + 2)}
                    className="dropdown-header"
                  >
                    <div className="dropdown-left-icon">
                      {v.type == "conatctAddForm" &&
                        (selectedProfilData &&
                        selectedProfilData.profileTheme == "light" ? (
                          // <img src="/icons/Phone-AEAEB4.svg" />
                          // <img src="/icons/user_3-AEAEB4.svg" />

                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.96833 5.21549C7.38653 4.4089 9.83018 5.92366 10.5089 8.37611C10.9715 10.0472 10.5334 11.7996 9.46531 12.9995C9.68407 13.2828 9.92311 13.5552 10.1826 13.8149C10.4408 14.0733 10.7116 14.3115 10.9932 14.5295C12.1926 13.4529 13.9502 13.01 15.6262 13.4745C18.0782 14.1542 19.5901 16.5997 18.7848 19.0178C18.2564 20.6044 17.2711 21.5683 15.9571 21.8856C14.7361 22.1805 13.4196 21.867 12.2585 21.3844C9.91992 20.4122 7.61074 18.4974 6.55613 17.442C5.47664 16.3617 3.57003 14.0491 2.60671 11.715C2.12834 10.5559 1.82033 9.24429 2.11584 8.02889C2.43378 6.7213 3.39283 5.74096 4.96833 5.21549ZM8.58141 8.90958C8.16872 7.4185 6.79749 6.7137 5.60116 7.11273C4.54956 7.46347 4.18482 7.98485 4.05922 8.50141C3.91121 9.11016 4.03992 9.94515 4.45545 10.952C5.27992 12.9497 6.9898 15.0465 7.97088 16.0283C8.92821 16.9863 11.0228 18.7048 13.0262 19.5376C14.0361 19.9574 14.8752 20.0894 15.4876 19.9415C16.007 19.8161 16.5331 19.4492 16.8872 18.3858C17.2866 17.1867 16.5807 15.8145 15.092 15.4018C13.9841 15.0948 12.8451 15.4506 12.1672 16.1766C11.7294 16.6454 10.895 16.9126 10.1851 16.4171C9.68553 16.0684 9.21113 15.6722 8.76787 15.2286C8.3239 14.7843 7.92751 14.3087 7.57877 13.8081C7.08635 13.1012 7.3491 12.27 7.81452 11.8312C8.53515 11.1518 8.88742 10.0153 8.58141 8.90958Z" fill="#808080"/>
</svg>

                        ) : (

                          <img src="/icons/Phone-333333.svg" />
                          // <img src="/icons/user_3-333333.svg" />
                        ))}


                      {v.type == "uploadFileDocument" &&
                        (selectedProfilData &&
                        selectedProfilData.profileTheme == "light" ? (
                          
                          // <img src="/icons/file-text-AEAEB4.svg" />

                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 10C12.5523 10 13 10.4477 13 11L13 14.5858L14.2929 13.2929C14.6834 12.9024 15.3166 12.9024 15.7071 13.2929C16.0976 13.6834 16.0976 14.3166 15.7071 14.7071L12.7071 17.7071C12.3166 18.0976 11.6834 18.0976 11.2929 17.7071L8.29289 14.7071C7.90237 14.3166 7.90237 13.6834 8.29289 13.2929C8.68342 12.9024 9.31658 12.9024 9.70711 13.2929L11 14.5858L11 11C11 10.4477 11.4477 10 12 10Z" fill="#808080"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C6.89543 4 6 4.89543 6 6V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V8.82843C18 8.56321 17.8946 8.30886 17.7071 8.12132L13.8787 4.29289C13.6911 4.10536 13.4368 4 13.1716 4H8ZM4 6C4 3.79086 5.79086 2 8 2H13.1716C13.9672 2 14.7303 2.31607 15.2929 2.87868L19.1213 6.70711C19.6839 7.26972 20 8.03278 20 8.82843V18C20 20.2091 18.2091 22 16 22H8C5.79086 22 4 20.2091 4 18V6Z" fill="#808080"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 3V5C14 6.65685 15.3431 8 17 8H19V10H17C14.2386 10 12 7.76142 12 5V3H14Z" fill="#808080"/>
</svg>

                        ) : (
                          // <img src="/icons/file-text-333333.svg" />

                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 10C12.5523 10 13 10.4477 13 11L13 14.5858L14.2929 13.2929C14.6834 12.9024 15.3166 12.9024 15.7071 13.2929C16.0976 13.6834 16.0976 14.3166 15.7071 14.7071L12.7071 17.7071C12.3166 18.0976 11.6834 18.0976 11.2929 17.7071L8.29289 14.7071C7.90237 14.3166 7.90237 13.6834 8.29289 13.2929C8.68342 12.9024 9.31658 12.9024 9.70711 13.2929L11 14.5858L11 11C11 10.4477 11.4477 10 12 10Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C6.89543 4 6 4.89543 6 6V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V8.82843C18 8.56321 17.8946 8.30886 17.7071 8.12132L13.8787 4.29289C13.6911 4.10536 13.4368 4 13.1716 4H8ZM4 6C4 3.79086 5.79086 2 8 2H13.1716C13.9672 2 14.7303 2.31607 15.2929 2.87868L19.1213 6.70711C19.6839 7.26972 20 8.03278 20 8.82843V18C20 20.2091 18.2091 22 16 22H8C5.79086 22 4 20.2091 4 18V6Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 3V5C14 6.65685 15.3431 8 17 8H19V10H17C14.2386 10 12 7.76142 12 5V3H14Z" fill="black"/>
</svg>

                        ))}


{v.type == "faturaData" &&
                        (selectedProfilData &&
                        selectedProfilData.profileTheme == "light" ? (
                          
                          // <img src="/icons/file-text-AEAEB4.svg" />
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 17C8 16.4477 8.44772 16 9 16H15C15.5523 16 16 16.4477 16 17C16 17.5523 15.5523 18 15 18H9C8.44772 18 8 17.5523 8 17Z" fill="#808080"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 13C8 12.4477 8.44772 12 9 12H15C15.5523 12 16 12.4477 16 13C16 13.5523 15.5523 14 15 14H9C8.44772 14 8 13.5523 8 13Z" fill="#808080"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 9C8 8.44772 8.44772 8 9 8H10C10.5523 8 11 8.44772 11 9C11 9.55228 10.5523 10 10 10H9C8.44772 10 8 9.55228 8 9Z" fill="#808080"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C6.89543 4 6 4.89543 6 6V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V8.82843C18 8.56321 17.8946 8.30886 17.7071 8.12132L13.8787 4.29289C13.6911 4.10536 13.4368 4 13.1716 4H8ZM4 6C4 3.79086 5.79086 2 8 2H13.1716C13.9672 2 14.7303 2.31607 15.2929 2.87868L19.1213 6.70711C19.6839 7.26972 20 8.03278 20 8.82843V18C20 20.2091 18.2091 22 16 22H8C5.79086 22 4 20.2091 4 18V6Z" fill="#808080"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 3V5C14 6.65685 15.3431 8 17 8H19V10H17C14.2386 10 12 7.76142 12 5V3H14Z" fill="#808080"/>
</svg>

                        ) : (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 17C8 16.4477 8.44772 16 9 16H15C15.5523 16 16 16.4477 16 17C16 17.5523 15.5523 18 15 18H9C8.44772 18 8 17.5523 8 17Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 13C8 12.4477 8.44772 12 9 12H15C15.5523 12 16 12.4477 16 13C16 13.5523 15.5523 14 15 14H9C8.44772 14 8 13.5523 8 13Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 9C8 8.44772 8.44772 8 9 8H10C10.5523 8 11 8.44772 11 9C11 9.55228 10.5523 10 10 10H9C8.44772 10 8 9.55228 8 9Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C6.89543 4 6 4.89543 6 6V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V8.82843C18 8.56321 17.8946 8.30886 17.7071 8.12132L13.8787 4.29289C13.6911 4.10536 13.4368 4 13.1716 4H8ZM4 6C4 3.79086 5.79086 2 8 2H13.1716C13.9672 2 14.7303 2.31607 15.2929 2.87868L19.1213 6.70711C19.6839 7.26972 20 8.03278 20 8.82843V18C20 20.2091 18.2091 22 16 22H8C5.79086 22 4 20.2091 4 18V6Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 3V5C14 6.65685 15.3431 8 17 8H19V10H17C14.2386 10 12 7.76142 12 5V3H14Z" fill="black"/>
</svg>

                          
                        ))}


                      {v.type == "bankform" &&
                        (selectedProfilData &&
                        selectedProfilData.profileTheme == "light" ? (
                          // <img src="/icons/Wallet-AEAEB4.svg" />
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 7C2 4.23858 4.23858 2 7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7ZM7 4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V7C20 5.34315 18.6569 4 17 4H7Z" fill="#808080"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 12C11 9.79086 12.7909 8 15 8H20C21.1046 8 22 8.89543 22 10V14C22 15.1046 21.1046 16 20 16H15C12.7909 16 11 14.2091 11 12ZM15 10C13.8954 10 13 10.8954 13 12C13 13.1046 13.8954 14 15 14H20V10H15Z" fill="#808080"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 12C14 11.4477 14.4477 11 15 11L15.1 11C15.6523 11 16.1 11.4477 16.1 12C16.1 12.5523 15.6523 13 15.1 13L15 13C14.4477 13 14 12.5523 14 12Z" fill="#808080"/>
</svg>

                        ) : (
                          <img src="/icons/Wallet-333333.svg" />
                        ))}
                      {v.type == "documentForm" &&
                        (selectedProfilData &&
                        selectedProfilData.profileTheme == "light" ? (
                          // <img src="/icons/Phone-AEAEB4.svg" />
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.96833 5.21549C7.38653 4.4089 9.83018 5.92366 10.5089 8.37611C10.9715 10.0472 10.5334 11.7996 9.46531 12.9995C9.68407 13.2828 9.92311 13.5552 10.1826 13.8149C10.4408 14.0733 10.7116 14.3115 10.9932 14.5295C12.1926 13.4529 13.9502 13.01 15.6262 13.4745C18.0782 14.1542 19.5901 16.5997 18.7848 19.0178C18.2564 20.6044 17.2711 21.5683 15.9571 21.8856C14.7361 22.1805 13.4196 21.867 12.2585 21.3844C9.91992 20.4122 7.61074 18.4974 6.55613 17.442C5.47664 16.3617 3.57003 14.0491 2.60671 11.715C2.12834 10.5559 1.82033 9.24429 2.11584 8.02889C2.43378 6.7213 3.39283 5.74096 4.96833 5.21549ZM8.58141 8.90958C8.16872 7.4185 6.79749 6.7137 5.60116 7.11273C4.54956 7.46347 4.18482 7.98485 4.05922 8.50141C3.91121 9.11016 4.03992 9.94515 4.45545 10.952C5.27992 12.9497 6.9898 15.0465 7.97088 16.0283C8.92821 16.9863 11.0228 18.7048 13.0262 19.5376C14.0361 19.9574 14.8752 20.0894 15.4876 19.9415C16.007 19.8161 16.5331 19.4492 16.8872 18.3858C17.2866 17.1867 16.5807 15.8145 15.092 15.4018C13.9841 15.0948 12.8451 15.4506 12.1672 16.1766C11.7294 16.6454 10.895 16.9126 10.1851 16.4171C9.68553 16.0684 9.21113 15.6722 8.76787 15.2286C8.3239 14.7843 7.92751 14.3087 7.57877 13.8081C7.08635 13.1012 7.3491 12.27 7.81452 11.8312C8.53515 11.1518 8.88742 10.0153 8.58141 8.90958Z" fill="#808080"/>
</svg>

                        ) : (
                          <img src="/icons/Phone-333333.svg" />
                        ))}

{v.type == "urlLinkPanel" &&
                        (selectedProfilData &&
                        selectedProfilData.profileTheme == "light" ? (

                          // <img src="/icons/Phone-AEAEB4.svg" />

                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="#808080"/>
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8274 5.95227C10.3268 7.45402 10 9.59229 10 12C10 14.4077 10.3268 16.546 10.8274 18.0477C11.0794 18.8038 11.3575 19.3436 11.6177 19.6738C11.7455 19.8359 11.8494 19.9225 11.9186 19.9649C11.9515 19.9852 11.9736 19.9935 11.9847 19.9969C11.9948 20 11.999 20 11.9999 20H12C12.0007 20 12.0049 20.0001 12.0153 19.9969C12.0264 19.9935 12.0485 19.9852 12.0814 19.9649C12.1506 19.9225 12.2545 19.8359 12.3823 19.6738C12.6425 19.3436 12.9206 18.8038 13.1726 18.0477C13.6732 16.546 14 14.4077 14 12C14 9.59229 13.6732 7.45402 13.1726 5.95227C12.9206 5.19616 12.6425 4.65642 12.3823 4.32624C12.2545 4.16408 12.1506 4.07752 12.0814 4.03507C12.0485 4.01483 12.0264 4.00645 12.0153 4.00305C12.0052 3.99998 12.001 4 12.0001 4L12 4L11.9999 4C11.999 4 11.9948 3.99998 11.9847 4.00305C11.9736 4.00645 11.9515 4.01483 11.9186 4.03507C11.8494 4.07752 11.7455 4.16408 11.6177 4.32624C11.3575 4.65642 11.0794 5.19616 10.8274 5.95227ZM10.0469 3.08829C10.4956 2.51889 11.1481 2 12 2C12.8519 2 13.5044 2.51889 13.9531 3.08829C14.4108 3.66896 14.7791 4.44724 15.07 5.31981C15.6552 7.07541 16 9.43715 16 12C16 14.5629 15.6552 16.9246 15.07 18.6802C14.7791 19.5528 14.4108 20.331 13.9531 20.9117C13.5044 21.4811 12.8519 22 12 22C11.1481 22 10.4956 21.4811 10.0469 20.9117C9.58923 20.331 9.22085 19.5528 8.93 18.6802C8.3448 16.9246 8 14.5629 8 12C8 9.43715 8.3448 7.07541 8.93 5.31981C9.22085 4.44724 9.58923 3.66896 10.0469 3.08829Z" fill="#808080"/>
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M4 12C4 12.0009 3.99998 12.0052 4.00305 12.0153C4.00645 12.0264 4.01483 12.0485 4.03507 12.0814C4.07752 12.1506 4.16408 12.2545 4.32624 12.3823C4.65642 12.6425 5.19616 12.9206 5.95227 13.1726C7.45402 13.6732 9.59229 14 12 14C14.4077 14 16.546 13.6732 18.0477 13.1726C18.8038 12.9206 19.3436 12.6425 19.6738 12.3823C19.8359 12.2545 19.9225 12.1506 19.9649 12.0814C19.9852 12.0485 19.9935 12.0264 19.9969 12.0153C20 12.0052 20 12.001 20 12.0001C20 11.9992 20 11.9948 19.9969 11.9847C19.9935 11.9736 19.9852 11.9516 19.9649 11.9186C19.9225 11.8494 19.8359 11.7455 19.6738 11.6177C19.3436 11.3575 18.8038 11.0794 18.0477 10.8274C16.546 10.3268 14.4077 10 12 10C9.59229 10 7.45402 10.3268 5.95227 10.8274C5.19616 11.0794 4.65642 11.3575 4.32624 11.6177C4.16408 11.7455 4.07752 11.8494 4.03507 11.9186C4.01483 11.9515 4.00645 11.9736 4.00305 11.9847C3.99998 11.9948 4 11.9991 4 12ZM5.31981 8.93C7.07541 8.3448 9.43715 8 12 8C14.5629 8 16.9246 8.3448 18.6802 8.93C19.5528 9.22085 20.331 9.58923 20.9117 10.0469C21.4811 10.4956 22 11.1481 22 12C22 12.8519 21.4811 13.5044 20.9117 13.9531C20.331 14.4108 19.5528 14.7791 18.6802 15.07C16.9246 15.6552 14.5629 16 12 16C9.43715 16 7.07541 15.6552 5.31981 15.07C4.44724 14.7791 3.66896 14.4108 3.08829 13.9531C2.51889 13.5044 2 12.8519 2 12C2 11.1481 2.51889 10.4956 3.08829 10.0469C3.66896 9.58923 4.44724 9.22085 5.31981 8.93Z" fill="#808080"/>
                          </svg>
                          



                        ) : (

                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="#333333"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.8274 5.95227C10.3268 7.45402 10 9.59229 10 12C10 14.4077 10.3268 16.546 10.8274 18.0477C11.0794 18.8038 11.3575 19.3436 11.6177 19.6738C11.7455 19.8359 11.8494 19.9225 11.9186 19.9649C11.9515 19.9852 11.9736 19.9935 11.9847 19.9969C11.9948 20 11.999 20 11.9999 20H12C12.0007 20 12.0049 20.0001 12.0153 19.9969C12.0264 19.9935 12.0485 19.9852 12.0814 19.9649C12.1506 19.9225 12.2545 19.8359 12.3823 19.6738C12.6425 19.3436 12.9206 18.8038 13.1726 18.0477C13.6732 16.546 14 14.4077 14 12C14 9.59229 13.6732 7.45402 13.1726 5.95227C12.9206 5.19616 12.6425 4.65642 12.3823 4.32624C12.2545 4.16408 12.1506 4.07752 12.0814 4.03507C12.0485 4.01483 12.0264 4.00645 12.0153 4.00305C12.0052 3.99998 12.001 4 12.0001 4L12 4L11.9999 4C11.999 4 11.9948 3.99998 11.9847 4.00305C11.9736 4.00645 11.9515 4.01483 11.9186 4.03507C11.8494 4.07752 11.7455 4.16408 11.6177 4.32624C11.3575 4.65642 11.0794 5.19616 10.8274 5.95227ZM10.0469 3.08829C10.4956 2.51889 11.1481 2 12 2C12.8519 2 13.5044 2.51889 13.9531 3.08829C14.4108 3.66896 14.7791 4.44724 15.07 5.31981C15.6552 7.07541 16 9.43715 16 12C16 14.5629 15.6552 16.9246 15.07 18.6802C14.7791 19.5528 14.4108 20.331 13.9531 20.9117C13.5044 21.4811 12.8519 22 12 22C11.1481 22 10.4956 21.4811 10.0469 20.9117C9.58923 20.331 9.22085 19.5528 8.93 18.6802C8.3448 16.9246 8 14.5629 8 12C8 9.43715 8.3448 7.07541 8.93 5.31981C9.22085 4.44724 9.58923 3.66896 10.0469 3.08829Z" fill="#333333"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 12C4 12.0009 3.99998 12.0052 4.00305 12.0153C4.00645 12.0264 4.01483 12.0485 4.03507 12.0814C4.07752 12.1506 4.16408 12.2545 4.32624 12.3823C4.65642 12.6425 5.19616 12.9206 5.95227 13.1726C7.45402 13.6732 9.59229 14 12 14C14.4077 14 16.546 13.6732 18.0477 13.1726C18.8038 12.9206 19.3436 12.6425 19.6738 12.3823C19.8359 12.2545 19.9225 12.1506 19.9649 12.0814C19.9852 12.0485 19.9935 12.0264 19.9969 12.0153C20 12.0052 20 12.001 20 12.0001C20 11.9992 20 11.9948 19.9969 11.9847C19.9935 11.9736 19.9852 11.9516 19.9649 11.9186C19.9225 11.8494 19.8359 11.7455 19.6738 11.6177C19.3436 11.3575 18.8038 11.0794 18.0477 10.8274C16.546 10.3268 14.4077 10 12 10C9.59229 10 7.45402 10.3268 5.95227 10.8274C5.19616 11.0794 4.65642 11.3575 4.32624 11.6177C4.16408 11.7455 4.07752 11.8494 4.03507 11.9186C4.01483 11.9515 4.00645 11.9736 4.00305 11.9847C3.99998 11.9948 4 11.9991 4 12ZM5.31981 8.93C7.07541 8.3448 9.43715 8 12 8C14.5629 8 16.9246 8.3448 18.6802 8.93C19.5528 9.22085 20.331 9.58923 20.9117 10.0469C21.4811 10.4956 22 11.1481 22 12C22 12.8519 21.4811 13.5044 20.9117 13.9531C20.331 14.4108 19.5528 14.7791 18.6802 15.07C16.9246 15.6552 14.5629 16 12 16C9.43715 16 7.07541 15.6552 5.31981 15.07C4.44724 14.7791 3.66896 14.4108 3.08829 13.9531C2.51889 13.5044 2 12.8519 2 12C2 11.1481 2.51889 10.4956 3.08829 10.0469C3.66896 9.58923 4.44724 9.22085 5.31981 8.93Z" fill="#333333"/>
</svg>

                        ))}

                    </div>

                    <div className="dropdown-text">
                      <div style={{
                        fontFamily: 'Montserrat',
                        fontStyle: "normal",
                        fontHeight: "700",
                        fontSize: "16px",
                        lineHeight: "20px",
                      }}>



                        {
v.type == "conatctAddForm" && v.panelTitle ==="" ? "İletişim Bilgileri" : v.type === "uploadFileDocument" &&  v.panelTitle ==="" ? "Belge": 

v.type === "urlLinkPanel" && v.panelTitle ==="" ?  "Sosyal Medya/Web" : v.type === "bankform" &&  v.panelTitle=== ""  ? "Banka Hesapları" :

v.type === "documentForm" &&  v.panelTitle ==="" ? "İletişim Formu" : v.type === "faturaData" && v.panelTitle ==="" ? "Fatura Bilgisi" : v.panelTitle


                        }


                      </div>
                    </div>


                    <div className="dropdown-riht-icon">
                      {dropdownList[i + 2] &&
                      dropdownList[i + 2].open == false ? (
                        <i className="fa-solid fa-angle-down"></i>
                      ) : (
                        <i className="fa-solid fa-angle-up"></i>
                      )}
                    </div>


                  </div>


{
  dropdownList[i + 2] &&
  dropdownList[i + 2].open == false && (
    <div className="panelName"  style={{
      width:"100%",
      // textAlign:"end"
    }}>
      <div  style={{
       width:"100%",
      //  position:"absolute",
       textAlign:"end",
       marginTop:"-21px",
      

      }}>
        <div style={{
           marginRight:"55px",
           marginBottom:"5px",
           fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "700",
fontSize: "11px",
lineHeight: "13px"

        }}>


{v.type == "conatctAddForm" &&
                            "İletişim Bilgileri"}

                        {v.type === "uploadFileDocument" && "Belge"}

                        {v.type === "urlLinkPanel" && "Sosyal Medya/Web"}

                        {v.type === "bankform" &&
                         "Banka Hesapları"}

                        {v.type === "documentForm" && "İletişim Formu"}

                        {v.type === "faturaData" && "Fatura Bilgisi"}





        {/* {
          v.panelTitle ==="" ? "Panel Başlık" : v.panelTitle
        } */}


        </div>
      
      </div>
    </div>
  )
}
                 



                  <div
                    className={
                      "dropdown-content " +
                      (dropdownList[i + 2] && dropdownList[i + 2].open == true
                        ? "dopen"
                        : "dclose")
                    }

                  >

                    {v.type == "conatctAddForm" && (
                      <>
                        <div className="content-header">
                          {v.publicName && (
                            <div className="profile-name">
                              {v.publicName} {v.publicsurname}
                            </div>
                          )}
                          {
                            <div className="profile-info">
                              {v.publicOrganization}
                            </div>
                          }
                        </div>

                        <div className="content-in">
                          {
                           v.panelPhoneNumbers != undefined && v.panelPhoneNumbers.map((w,a)=>{

                            return(  
                              <>
                              {
                                w.phoneNumber ? (
                                  <div className="in-item">
                              <div className="image">
                                {selectedProfilData &&
                                selectedProfilData.profileTheme == "light" ? (
                                  <img src="/icons/Phone-AEAEB4.svg" />

                                ) : (
                                  <img src="/icons/Phone-666666.svg" />
                                )}
                              </div>
                              <div className="text">
                                <span>+{w.phoneNumber}</span>
                              </div>
                            </div>
                                ): (
                                  <div className="in-item">

            

          </div>
                                )
                              }
                              </>
                            
                            )
                            })
                          }
                         


{
  v.panelEmailPostas != undefined && v.panelEmailPostas.map((w,a)=>{
    return (

      <>
      {
        w.emailPosta ? (
          <div className="in-item">
          <div className="image">
            {selectedProfilData &&
            selectedProfilData.profileTheme == "light" ? (
              <img src="/icons/mail-AEAEB4.svg" />
            ) : (
              <img src="/icons/mail-666666.svg" />
            )}
          </div>
          <div className="text">
            <span>{w.emailPosta}</span>
          </div>
        </div>
        ): (
          <div className="in-item">

            

          </div>
        )
      }
      </>
     

    )
  })
}

                         


                          {/* <div className="in-item">
                            <div className="image">
                              {selectedProfilData &&
                              selectedProfilData.profileTheme == "light" ? (
                                <img src="/icons/Phone-AEAEB4.svg" />
                              ) : (
                                <img src="/icons/Phone-666666.svg" />
                              )}
                            </div>
                            <div className="text">
                              <span>+{v.kisiselTelefon}</span>
                            </div>
                          </div> */}



                          
                          {/* <div className="in-item">
                            <div className="image">
                              {selectedProfilData &&
                              selectedProfilData.profileTheme == "light" ? (
                                <img src="/icons/mail-AEAEB4.svg" />
                              ) : (
                                <img src="/icons/mail-666666.svg" />
                              )}
                            </div>
                            <div className="text">
                              <span>{v.kurumsalEmail}</span>
                            </div>
                          </div> */}


                         

                          {
                            v.profileCity ? (

                              <div className="in-item">
                              <div className="image">
                                {selectedProfilData &&
                                selectedProfilData.profileTheme == "light" ? (
                                  <img src="/icons/location-AEAEB4.svg" />
                                ) : (
                                  <img src="/icons/location-666666.svg" />
                                )}
                              </div>
                              <div className="text">
                                <span>
                                  {v.profileCity} / {v.profileCountry}
                                </span>
                                <span>{v.streetAdress}</span>
                              </div>
                            </div>

                            ): (

                              <div className="in-item">

                             
                  
                            </div>

                            )
                          }
                          

{
  v.profileNot  ? (
    <div className="in-item">
                            <div className="image">
                              {selectedProfilData &&
                              selectedProfilData.profileTheme == "light" ? (
                                <img src="/icons/file-text-AEAEB4.svg" />
                              ) : (
                                <img src="/icons/file-text-666666.svg" />
                              )}
                            </div>
                            <div className="text">
                              <span>{v.profileNot}</span>
                            </div>
                          </div>

  ) :(
    <div className="in-item">

                             
                  
                            </div>

  )
}


                          {selectedProfilData &&
                              v.panelPhoneNumbers[0].phoneNumber ? (
                              <a
                                onClick={() => downloadTxtFile2(v)}
                                className={
                                  "global-button " +
                                  (selectedProfilData &&
                                  selectedProfilData.profileTheme == "light"
                                    ? "profile-in-button"
                                    : "profile-in-button-dark")
                                }
                              >
                                <span>Rehbere Ekle</span>
                              </a>
                            ) :
                            (

                              <a
                              
                                className={
                                  "global-button " +
                                  (selectedProfilData &&
                                  selectedProfilData.profileTheme == "light"
                                    ? "profile-in-button"
                                    : "profile-in-button-dark")
                                }
                              >
                                <span> Rehbere Ekle </span>
                              </a>

                            )
                          
                          }{" "}
                        </div>
                      </>
                    )}



                    {
                      v.type=="urlLinkPanel" && (
                        <>

                         <div className="content-in ">


    {/* <div className="image">
      {selectedProfilData &&
      selectedProfilData.profileTheme == "light" ? (
        // <img src="/icons/folder_down-AEAEB4.svg" />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2H7ZM11.2929 7.29289C11.6834 6.90237 12.3166 6.90237 12.7071 7.29289L16.7071 11.2929C16.8946 11.4804 17 11.7348 17 12C17 12.2652 16.8946 12.5196 16.7071 12.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071C10.9024 16.3166 10.9024 15.6834 11.2929 15.2929L13.5858 13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H13.5858L11.2929 8.70711C10.9024 8.31658 10.9024 7.68342 11.2929 7.29289Z" fill="#808080"/>
</svg>

      ) : (
        // <img src="/icons/folder_down-666666.svg" />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2H7ZM11.2929 7.29289C11.6834 6.90237 12.3166 6.90237 12.7071 7.29289L16.7071 11.2929C16.8946 11.4804 17 11.7348 17 12C17 12.2652 16.8946 12.5196 16.7071 12.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071C10.9024 16.3166 10.9024 15.6834 11.2929 15.2929L13.5858 13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H13.5858L11.2929 8.70711C10.9024 8.31658 10.9024 7.68342 11.2929 7.29289Z" fill="#333333"/>
</svg>

      )}
    </div> */}



{/* Multiply not url Link */}


    {

  v.profileUrlPanel != undefined && v.profileUrlPanel.map((w,a)=>{

    return (

      <>
      {
        w.socialUrlLink && (
          
          <div className="in-item">

            
          <div className="image">

      {selectedProfilData &&
      selectedProfilData.profileTheme === "light" ? (

          w.socialtype === "whatsapp" ?(
            <div>
<i class="fa-brands fa-whatsapp" style={{color:"#aeaeb4"}}></i>
            </div>
          ):  w.socialtype === "web" ? (
            <div>
              <i class="fa fa-dribbble"  style={{color:"#666"}}></i>
            </div>
          ): w.socialtype === "telegram" ? (
            <div>
              <i class="fa-brands fa-telegram" style={{color:"#aeaeb4"}}></i>
            </div>
          ): w.socialtype === "bip" ? (
            <div>
<i class="fa-brands fa-bip"   style={{color:"#aeaeb4"}}></i>
            </div>
          ): w.socialtype === "instagram" ? (
            <div>
              <i class="fa-brands fa-instagram"  style={{color:"#aeaeb4"}}></i>
            </div>
          ):  w.socialtype === "linkedin" ? (
            <div>
             <i class="fa-brands fa-linkedin " style={{color:"#aeaeb4"}}></i>
            </div>
          ):  w.socialtype === "facebook" ? (
            <div>
<i class="fa-brands fa-facebook " style={{color:"#aeaeb4"}}></i>
            </div>
          ):  w.socialtype === "youtube" ? (
            <div>
              <i class="fa-brands fa-youtube"  style={{color:"#aeaeb4"}}></i>
            </div>
          ): w.socialtype === "discord" ? (
            <div>
              <i class="fa-brands fa-discord"  style={{color:"#aeaeb4"}}></i>
            </div>
          ): w.socialtype === "dribbble" ?(
            <div>
              <i class="fa-brands fa-dribbble"  style={{color:"#aeaeb4"}}></i>
            </div>
          ):  w.socialtype === "vimeo" ?(
            <div>
<i class="fa-brands fa-vimeo"  style={{color:"#aeaeb4"}}></i>
            </div>
          ):  w.socialtype === "ello" ?(
            <div>
<i class="fa-brands fa-ello"  style={{color:"#aeaeb4"}}></i>
            </div>
          ):  w.socialtype === "github" ? (
            <div>
<i class="fa-brands fa-github"  style={{color:"#aeaeb4"}}></i>
            </div>
          ):  w.socialtype === "hangouts" ? (
            <div>
<i class="fa-brands fa-hangouts"  style={{color:"#aeaeb4"}}></i>
            </div>
          ):  w.socialtype === "icbc" ? (
            <div>
<i class="fa-brands fa-icbc"  style={{color:"#aeaeb4"}}></i>
            </div>
          ): w.socialtype === "icq" ? (
            <div>
<i class="fa-brands fa-icq"  style={{color:"#aeaeb4"}}></i>
            </div>

          ): w.socialtype === "kikmessenger" ?(
            <div>
<i class="fa-brands fa-kikmessenger" style={{color:"#aeaeb4"}}></i>
            </div>
          ): w.socialtype === "twitch" ?(
            <div>
              <i class="fa-brands fa-twitch" style={{color:"#aeaeb4"}}></i>
            </div>
          ): w.socialtype === "medium" ? (
            <div>
<i class="fa-brands fa-medium"  style={{color:"#aeaeb4"}}></i>
            </div>
          ): w.socialtype === "nimotv" ? (
            <div>
<i class="fa-brands fa-nimotv"  style={{color:"#aeaeb4"}}></i>
            </div>
          ): w.socialtype === "periscope" ? (
            <div>
<i class="fa-brands fa-periscope"  style={{color:"#aeaeb4"}}></i>
            </div>
          ): w.socialtype === "dailymotion" ? (
            <div>
              <i class="fa-brands fa-dailymotion"  style={{color:"#aeaeb4"}}></i>
            </div>
          ) :  w.socialtype === "wechat" ? (
            <div>
             <i class="fa-brands fa-weixin"  style={{color:"#aeaeb4"}}></i>
            </div>
          ):  w.socialtype === "qqtile" ? (
            <div>
             <i class="fa-brands fa-qq"  style={{color:"#aeaeb4"}}></i>
            </div>
          ): w.socialtype === "sineweibo" ? (
            <div>
            <i class="fa-brands fa-sineweibo"  style={{color:"#aeaeb4"}}></i>
            </div>
          ):  w.socialtype === "dlive" ? (
            <div>
           <i class="fa-brands fa-dlive"  style={{color:"#aeaeb4"}}></i>
            </div>
          ):  w.socialtype === "pinterest" ? (
            <div>
           <i class="fa-brands fa-pinterest"  style={{color:"#aeaeb4"}}></i>
            </div>
          ):  w.socialtype === "reddit" ? (
            <div>
          <i class="fa-brands fa-reddit"  style={{color:"#aeaeb4"}}></i>
            </div>
          ):   w.socialtype === "behance" ? (
            <div>
         <i class="fa-brands fa-behance"  style={{color:"#aeaeb4"}}></i>
            </div>
          ):   w.socialtype === "swarm" ? (
            <div>
        <i class="fa-brands fa-swarm"  style={{color:"#aeaeb4"}}></i>
            </div>
          ):   w.socialtype === "signal" ? (
            <div>
      <i class="fa-brands fa-signal"  style={{color:"#aeaeb4"}}></i>
            </div>
          ):   w.socialtype === "yaya" ? (
            <div>
      <i class="fa-brands fa-yaya"  style={{color:"#aeaeb4"}}></i>
            </div>
          ):   w.socialtype === "c2" ? (
            <div>
     <i class="fa-brands fa-c2"  style={{color:"#aeaeb4"}}></i>
            </div>
          ):   w.socialtype === "tango" ? (
            <div>
     <i class="fa-brands fa-tango"  style={{color:"#aeaeb4"}}></i>
            </div>
          ):  w.socialtype === "vero" ? (
            <div>
    <i class="fa-brands fa-vero"  style={{color:"#aeaeb4"}}></i>
            </div>
          ):  w.socialtype === "zoom" ? (
            <div>
    <i class="fa-brands fa-zoom"  style={{color:"#aeaeb4"}}></i>
            </div>
          ):  w.socialtype === "viber" ? (
            <div>
    <i class="fa-brands fa-viber"  style={{color:"#aeaeb4"}}></i>
            </div>
          ):  w.socialtype === "teams" ? (
            <div>
    <i class="fa-brands fa-teams"  style={{color:"#aeaeb4"}}></i>
            </div>
          ):  w.socialtype === "snapchat" ? (
            <div>
   <i class="fa-brands fa-snapchat"  style={{color:"#aeaeb4"}}></i>
            </div>
          ): (
            <div>

            </div>
          )
        // <img src="/icons/folder_down-AEAEB4.svg" />
//         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path fill-rule="evenodd" clip-rule="evenodd" d="M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2H7ZM11.2929 7.29289C11.6834 6.90237 12.3166 6.90237 12.7071 7.29289L16.7071 11.2929C16.8946 11.4804 17 11.7348 17 12C17 12.2652 16.8946 12.5196 16.7071 12.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071C10.9024 16.3166 10.9024 15.6834 11.2929 15.2929L13.5858 13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H13.5858L11.2929 8.70711C10.9024 8.31658 10.9024 7.68342 11.2929 7.29289Z" fill="#808080"/>
// </svg>

      ) : (


        w.socialtype === "whatsapp" ?(
          <div>
<i class="fa-brands fa-whatsapp" style={{color:"#666"}}></i>
          </div>
        ): w.socialtype === "telegram" ? (
          <div>
            <i class="fa-brands fa-telegram" style={{color:"#666"}}></i>
          </div>
        ): w.socialtype === "web" ? (
          <div>
            <i class="fa fa-dribbble"  style={{color:"#666"}}></i>
          </div>
        ): w.socialtype === "bip" ? (
          <div>
<i class="fa-brands fa-bip"   sstyle={{color:"#666"}}></i>
          </div>
        ): w.socialtype === "instagram" ? (
          <div>
            <i class="fa-brands fa-instagram"  style={{color:"#666"}}></i>
          </div>
        ):  w.socialtype === "linkedin" ? (
          <div>
           <i class="fa-brands fa-linkedin " style={{color:"#666"}}></i>
          </div>
        ):  w.socialtype === "facebook" ? (
          <div>
<i class="fa-brands fa-facebook " style={{color:"#666"}}></i>
          </div>
        ):  w.socialtype === "youtube" ? (
          <div>
            <i class="fa-brands fa-youtube"  style={{color:"#666"}}></i>
          </div>
        ): w.socialtype === "discord" ? (
          <div>
            <i class="fa-brands fa-discord"  style={{color:"#666"}}></i>
          </div>
        ): w.socialtype === "dribbble" ?(
          <div>
            <i class="fa-brands fa-dribbble"  style={{color:"#666"}}></i>
          </div>
        ):  w.socialtype === "vimeo" ?(
          <div>
<i class="fa-brands fa-vimeo"  style={{color:"#666"}}></i>
          </div>
        ):  w.socialtype === "ello" ?(
          <div>
<i class="fa-brands fa-ello"  style={{color:"#666"}}></i>
          </div>
        ):  w.socialtype === "github" ? (
          <div>
<i class="fa-brands fa-github"  style={{color:"#666"}}></i>
          </div>
        ):  w.socialtype === "hangouts" ? (
          <div>
<i class="fa-brands fa-hangouts"  style={{color:"#666"}}></i>
          </div>
        ):  w.socialtype === "icbc" ? (
          <div>
<i class="fa-brands fa-icbc"  style={{color:"#666"}}></i>
          </div>
        ): w.socialtype === "icq" ? (
          <div>
<i class="fa-brands fa-icq"  style={{color:"#666"}}></i>
          </div>

        ): w.socialtype === "kikmessenger" ?(
          <div>
<i class="fa-brands fa-kikmessenger" style={{color:"#666"}}></i>
          </div>
        ): w.socialtype === "twitch" ?(
          <div>
            <i class="fa-brands fa-twitch" style={{color:"#666"}}></i>
          </div>
        ): w.socialtype === "medium" ? (
          <div>
<i class="fa-brands fa-medium" style={{color:"#666"}}></i>
          </div>
        ): w.socialtype === "nimotv" ? (
          <div>
<i class="fa-brands fa-nimotv"  style={{color:"#666"}}></i>
          </div>
        ): w.socialtype === "periscope" ? (
          <div>
<i class="fa-brands fa-periscope"  style={{color:"#666"}}></i>
          </div>
        ): w.socialtype === "dailymotion" ? (
          <div>
            <i class="fa-brands fa-dailymotion"  style={{color:"#666"}}></i>
          </div>
        ) :  w.socialtype === "wechat" ? (
          <div>
           <i class="fa-brands fa-weixin"  style={{color:"#666"}}></i>
          </div>
        ):  w.socialtype === "qqtile" ? (
          <div>
           <i class="fa-brands fa-qq"  style={{color:"#666"}}></i>
          </div>
        ): w.socialtype === "sineweibo" ? (
          <div>
          <i class="fa-brands fa-sineweibo"  style={{color:"#666"}}></i>
          </div>
        ):  w.socialtype === "dlive" ? (
          <div>
         <i class="fa-brands fa-dlive"  style={{color:"#666"}}></i>
          </div>
        ):  w.socialtype === "pinterest" ? (
          <div>
         <i class="fa-brands fa-pinterest"  style={{color:"#666"}}></i>
          </div>
        ):  w.socialtype === "reddit" ? (
          <div>
        <i class="fa-brands fa-reddit"  style={{color:"#666"}}></i>
          </div>
        ):   w.socialtype === "behance" ? (
          <div>
       <i class="fa-brands fa-behance"  style={{color:"#666"}}></i>
          </div>
        ):   w.socialtype === "swarm" ? (
          <div>
      <i class="fa-brands fa-swarm"  style={{color:"#666"}}></i>
          </div>
        ):   w.socialtype === "signal" ? (
          <div>
    <i class="fa-brands fa-signal"  style={{color:"#666"}}></i>
          </div>
        ):   w.socialtype === "yaya" ? (
          <div>
    <i class="fa-brands fa-yaya"  style={{color:"#666"}}></i>
          </div>
        ):   w.socialtype === "c2" ? (
          <div>
   <i class="fa-brands fa-c2"  style={{color:"#666"}}></i>
          </div>
        ):   w.socialtype === "tango" ? (
          <div>
   <i class="fa-brands fa-tango"  style={{color:"#666"}}></i>
          </div>
        ):  w.socialtype === "vero" ? (
          <div>
  <i class="fa-brands fa-vero"  style={{color:"#666"}}></i>
          </div>
        ):  w.socialtype === "zoom" ? (
          <div>
  <i class="fa-brands fa-zoom"  style={{color:"#666"}}></i>
          </div>
        ):  w.socialtype === "viber" ? (
          <div>
  <i class="fa-brands fa-viber"  style={{color:"#666"}}></i>
          </div>
        ):  w.socialtype === "teams" ? (
          <div>
  <i class="fa-brands fa-teams"  style={{color:"#666"}}></i>
          </div>
        ):  w.socialtype === "snapchat" ? (
          <div>
 <i class="fa-brands fa-snapchat"  style={{color:"#666"}}></i>
          </div>
        ): (
          <div>

          </div>
        )


        // <img src="/icons/folder_down-666666.svg" />
//         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path fill-rule="evenodd" clip-rule="evenodd" d="M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2H7ZM11.2929 7.29289C11.6834 6.90237 12.3166 6.90237 12.7071 7.29289L16.7071 11.2929C16.8946 11.4804 17 11.7348 17 12C17 12.2652 16.8946 12.5196 16.7071 12.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071C10.9024 16.3166 10.9024 15.6834 11.2929 15.2929L13.5858 13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H13.5858L11.2929 8.70711C10.9024 8.31658 10.9024 7.68342 11.2929 7.29289Z" fill="#333333"/>
// </svg>


      )}
    </div>



<div className="text" style={{
  padding:"0px"
}}>

<a href={w.socialtype==="whatsapp" ? "https://wa.me/"+w.socialUrlLink: w.socialtype==="web" ? "http://"+w.socialUrlLink : "https://"+ w.socialtype+".com"+w.socialUrlLink} 
target="_blank" style={{
  textDecoration:"none",
  paddingLeft:"5px"
}}>
            <span>{w.socialUrlLink}</span>
            </a>
          </div>

         
        </div>

        )
      }

      </>
     

    )




  })
}

    {/* <div className="text">
      <span> {v.panelUrlLink}</span>
    </div> */}



                          {/* {  v.profileUrlPanel.length > 0 ? (
                            <a
                              href={v.panelUrlLink}
                              target="_blank"
                              className={
                                "global-button " +
                                (selectedProfilData &&
                                selectedProfilData.profileTheme == "light"
                                  ? "profile-in-button"
                                  : "profile-in-button-dark")
                              }
                            >
                              <span>Linki Tıkla</span>
                            </a>
                          ) :(

                            <a
                              
                              
                              className={
                                "global-button " +
                                (selectedProfilData &&
                                selectedProfilData.profileTheme == "light"
                                  ? "profile-in-button"
                                  : "profile-in-button-dark")
                              }
                            >
                              <span>Eksik Bilgi</span>
                            </a>

                          )
                        
                        } */}



                        
                        </div>

                        </>

                      )
                    }





                    { v.type == "uploadFileDocument" &&  (
                      <>
                        <div className="content-in ">



{
    v.belgeDocumentUploads !==undefined && v.belgeDocumentUploads.map((q,p)=>{

      return (
        <>
{
   q.belgeDocument && q.belgeDocument !="" && (

<div className="in-item">
                            <div className="image">
                              {selectedProfilData &&
                              selectedProfilData.profileTheme == "light" ? (
                                <img src="/icons/folder_down-AEAEB4.svg" />
                              ) : (
                                <img src="/icons/folder_down-666666.svg" />
                              )}
                            </div>
                            <div className="text">
                              <a href={q.belgeDocument}   download style={{
                                textDecoration:"none"
                              }}  target="_blank">
                              <span> Belge {p}</span>
                              </a>
                             
                            </div>
                          </div>

   )
}

        
        
        </>
      )




    })





}

                          
{/* Tıkladığımda indirecek */}

                          {/* {v.belgeDocumentUploads && (
                            <a
                              href={v.belgeDocument}
                              target="_blank"
                              className={
                                "global-button " +
                                (selectedProfilData &&
                                selectedProfilData.profileTheme == "light"
                                  ? "profile-in-button"
                                  : "profile-in-button-dark")
                              }
                            >
                              <span>Dosyayı indir</span>
                            </a>
                          )} */}


                        </div>

                      </>
                    )}



                    {v.type == "bankform" && (
                      <>
                        <div className="content-in ">



{

  v.bankDataAll !== undefined && v.bankDataAll.map((e,p)=>{


    return (
      <>

{

  e.accountOwner && e.accountOwner !=="" && (

    <div className="in-item">
                            <div className="image">
                              {selectedProfilData &&
                              selectedProfilData.profileTheme == "light" ? (
                                <img src="/icons/user_3-AEAEB4.svg" />
                              ) : (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6Z" fill="#666666"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 14.0289 19.2447 15.8813 18.0001 17.2916C16.4085 15.8674 14.3052 15 12.0002 15C9.69511 15 7.5917 15.8675 6.00015 17.2918C4.75533 15.8815 4 14.029 4 12Z" fill="#666666"/>
                                </svg>
                              )}
                            </div>
                            <div className="text">
                              <span>
                             
                                {/* { selectedProfilData.publicName && selectedProfilData.publicName +
                                  " " +
                                  selectedProfilData.publicSurName &&   selectedProfilData.publicSurName} */}


                                  {e.accountOwner}





                              </span>
                            </div>
                          </div>

    
  )




}




{

  e.bankName && e.bankName !=="" && (

    <div className="in-item">
<div className="image">
  {selectedProfilData &&
  selectedProfilData.profileTheme == "light" ? (
    <img src="/icons/home_4-AEAEB4.svg" />
  ) : (
  

<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C10.4255 4 8.90459 4.65749 7.77501 5.84574C6.6438 7.03572 5.99998 8.66001 5.99998 10.3636C5.99998 12.844 7.5363 15.2652 9.24306 17.1603C10.0789 18.0884 10.9177 18.8486 11.5484 19.3769C11.7154 19.5168 11.8673 19.64 12 19.7453C12.1327 19.64 12.2846 19.5168 12.4516 19.3769C13.0823 18.8486 13.9211 18.0884 14.7569 17.1603C16.4637 15.2652 18 12.844 18 10.3636C18 8.66001 17.3562 7.03572 16.225 5.84574C15.0954 4.65749 13.5745 4 12 4ZM12 21C11.4258 21.8187 11.4256 21.8186 11.4253 21.8184L11.4228 21.8166L11.4172 21.8127L11.3986 21.7994C11.3829 21.7882 11.3607 21.7722 11.3325 21.7517C11.2761 21.7106 11.1956 21.6511 11.0943 21.5741C10.8917 21.4203 10.6057 21.1962 10.2641 20.9101C9.58226 20.3389 8.67109 19.5139 7.75691 18.4988C5.96367 16.5076 3.99998 13.6105 3.99998 10.3636C3.99998 8.16134 4.83117 6.0397 6.32546 4.46777C7.82139 2.89413 9.86144 2 12 2C14.1385 2 16.1786 2.89413 17.6745 4.46777C19.1688 6.0397 20 8.16134 20 10.3636C20 13.6105 18.0363 16.5076 16.2431 18.4988C15.3289 19.5139 14.4177 20.3389 13.7359 20.9101C13.3942 21.1962 13.1082 21.4203 12.9057 21.5741C12.8044 21.6511 12.7238 21.7106 12.6675 21.7517C12.6393 21.7722 12.6171 21.7882 12.6014 21.7994L12.5828 21.8127L12.5772 21.8166L12.5754 21.8179C12.5751 21.8181 12.5742 21.8187 12 21ZM12 21L12.5742 21.8187C12.2295 22.0604 11.7699 22.0601 11.4253 21.8184L12 21Z" fill="#666666"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 8C10.8954 8 9.99998 8.89543 9.99998 10C9.99998 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8ZM7.99998 10C7.99998 7.79086 9.79085 6 12 6C14.2091 6 16 7.79086 16 10C16 12.2091 14.2091 14 12 14C9.79085 14 7.99998 12.2091 7.99998 10Z" fill="#666666"/>
</svg>

    
  )}
</div>
<div className="text">
  <span> { e.bankName} {e.bankStation}</span>
</div>
</div>


  )


}


                         
{
  e.bankIban &&  e.bankIban !== "" && (

    <div className="in-item">
                            <div className="image">
                              {selectedProfilData &&
                              selectedProfilData.profileTheme == "light" ? (
                                <img src="/icons/Wallet-AEAEB4.svg" />
                              ) : (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 7C2 4.23858 4.23858 2 7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7ZM7 4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V7C20 5.34315 18.6569 4 17 4H7Z" fill="#666666"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11 12C11 9.79086 12.7909 8 15 8H20C21.1046 8 22 8.89543 22 10V14C22 15.1046 21.1046 16 20 16H15C12.7909 16 11 14.2091 11 12ZM15 10C13.8954 10 13 10.8954 13 12C13 13.1046 13.8954 14 15 14H20V10H15Z" fill="#666666"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14 12C14 11.4477 14.4477 11 15 11L15.1 11C15.6523 11 16.1 11.4477 16.1 12C16.1 12.5523 15.6523 13 15.1 13L15 13C14.4477 13 14 12.5523 14 12Z" fill="#666666"/>
                                </svg>
                                
                              )}
                            </div>
                            <div className="text">
                              <span> {e.bankIban}</span>
                            </div>
                          </div>

  )
}

{

  e.bankAccountNumber && e.bankAccountNumber !=="" && (

    <div className="in-item">
    <div className="image">
      {selectedProfilData &&
      selectedProfilData.profileTheme == "light" ? (
        <img src="/icons/Wallet-AEAEB4.svg" />
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 8C2 5.79086 3.79086 4 6 4H18C20.2091 4 22 5.79086 22 8V8.5C22 8.77614 21.7761 9 21.5 9L2.5 9C2.22386 9 2 8.77614 2 8.5V8ZM2.5 11C2.22386 11 2 11.2239 2 11.5V16C2 18.2091 3.79086 20 6 20H18C20.2091 20 22 18.2091 22 16V11.5C22 11.2239 21.7761 11 21.5 11L2.5 11ZM13 15C13 14.4477 13.4477 14 14 14H17C17.5523 14 18 14.4477 18 15C18 15.5523 17.5523 16 17 16H14C13.4477 16 13 15.5523 13 15Z" fill="#666666"/>
        </svg>
        
      )}
    </div>
    <div className="text">
      <span> {e.bankAccountNumber}</span>
      
    </div>
  </div>

  )



}


{

isIbanEmpty  && (

  <a
  onClick={() => {
    navigator.clipboard.writeText(e.bankIban)
  }}
  className={
    "global-button " +
    (selectedProfilData &&
    selectedProfilData.profileTheme == "light"
      ? "profile-in-button"
      : "profile-in-button-dark")
  }

>
  <span>IBAN'ı Kopyala</span>
</a>


)


                          }

      
      </>
    )
  })
}


                    
 

                       


{/* 
                          {selectedProfilData && v.bankIban ? (
                            <a
                              onClick={() => {
                                {navigator.clipboard.writeText(v.bankIban)}
                              }}
                              className={
                                "global-button " +
                                (selectedProfilData &&
                                selectedProfilData.profileTheme == "light"
                                  ? "profile-in-button"
                                  : "profile-in-button-dark")
                              }
                            >
                              <span>IBAN'ı kopyala</span>
                            </a>
                          ) : (
                            <a
                           
                            className={
                              "global-button " +
                              (selectedProfilData &&
                              selectedProfilData.profileTheme == "light"
                                ? "profile-in-button"
                                : "profile-in-button-dark")
                            }
                          >
                            <span>IBAN'ı kopyala</span>
                          </a>

                          )
                        
                        } */}





                        </div>
                      </>
                    )}




                    { v.type == "documentForm" &&
                      postMessages.find((x) => x.orderId == v.OrderId) && (
                        <>
                          <div className="content-header">
                            {v.publicDropNot && (
                              <div className="profile-name">
                                {v.publicDropNot}
                              </div>
                            )}
                          </div>
                          <div className="content-in ">
                            <div className="in-item">
                              {v.statusNameSurname && (
                                <div className="input-item">
                                  <input
                                    value={
                                      postMessages[
                                        postMessages.findIndex(
                                          (x) => x.orderId == v.OrderId
                                        )
                                      ].fullName
                                    }
                                    onChange={(s) =>
                                      setPostMessages((e) =>
                                        e.map((x) =>
                                          x.orderId == v.OrderId
                                            ? { ...x, fullName: s.target.value }
                                            : x
                                        )
                                      )
                                    }
                                    type="text"
                                    placeholder="İsim Soyisim"
                                  />
                                </div>
                              )}
                            </div>
                            <div className="in-item">
                              {v.statusEmail && (
                                <div className="input-item">
                                  <input
                                    value={
                                      postMessages[
                                        postMessages.findIndex(
                                          (x) => x.orderId == v.OrderId
                                        )
                                      ].eMail
                                    }
                                    onChange={(s) => {
                                      setPostMessages((e) =>
                                        e.map((x) =>
                                          x.orderId == v.OrderId
                                            ? { ...x, eMail: s.target.value }
                                            : x
                                        )
                                      );
                                      emailFormatController(
                                        s.target.value,
                                        v.OrderId
                                      );
                                    }}
                                    type="email"
                                    placeholder="E-Posta"
                                  />
                                </div>
                              )}
                            </div>
                            {postMessages[
                              postMessages.findIndex(
                                (x) => x.orderId == v.OrderId
                              )
                            ].eMailFormatError == true ? (
                              <div className="error-text">
                                E posta formatı hatalı.
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="in-item">
                              {v.statusTelefon && (
                                <div className="input-item">
                                  <input
                                    value={
                                      postMessages[
                                        postMessages.findIndex(
                                          (x) => x.orderId == v.OrderId
                                        )
                                      ].phoneNumber
                                    }
                                    onChange={(s) =>
                                      setPostMessages((e) =>
                                        e.map((x) =>
                                          x.orderId == v.OrderId
                                            ? {
                                                ...x,
                                                phoneNumber: s.target.value,
                                              }
                                            : x
                                        )
                                      )
                                    }
                                    type="tel"
                                    placeholder="Telefon"
                                  />
                                </div>
                              )}
                            </div>{" "}
                            <div className="in-item">
                              {v.statusMessage && (
                                <div className="input-item">
                                  <textarea
                                    value={
                                      postMessages[
                                        postMessages.findIndex(
                                          (x) => x.orderId == v.OrderId
                                        )
                                      ].message
                                    }
                                    onChange={(s) =>
                                      setPostMessages((e) =>
                                        e.map((x) =>
                                          x.orderId == v.OrderId
                                            ? { ...x, message: s.target.value }
                                            : x
                                        )
                                      )
                                    }
                                    placeholder="Mesaj"
                                  >
                                    {" "}
                                  </textarea>
                                </div>
                              )}
                            </div>


                            {
                              v.emailToSend && v.emailToSend !==""  && (

                                <a
                                onClick={() => {
                                  eMailPost(v.OrderId);
                                }}
                                className={
                                  "global-button " +
                                  (selectedProfilData &&
                                  selectedProfilData.profileTheme == "light"
                                    ? "profile-in-button"
                                    : "profile-in-button-dark")
                                }
                              >
                                <span>Gönder</span>

                              </a>


                              )
                             

                            }



                          </div>
                        </>
                      )}


                      {

v.type == "faturaData" && (

  <>

<div className="content-in ">



  {

    v.companyStatus && v.companyStatus !=="" && (

      <div className="in-item">

      <div className="image">
        {selectedProfilData &&
        selectedProfilData.profileTheme == "light" ? (


          // <img src="/icons/user_3-AEAEB4.svg" />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.9036 4.85667C12.7971 3.94825 11.2029 3.94825 10.0964 4.85667L4.73093 9.26165C4.2682 9.64155 4 10.2087 4 10.8074V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V10.8074C20 10.2087 19.7318 9.64155 19.2691 9.26165L13.9036 4.85667ZM8.82732 3.31089C10.6715 1.79684 13.3285 1.79684 15.1727 3.31089L20.5381 7.71587C21.4636 8.47565 22 9.61006 22 10.8074V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V10.8074C2 9.61006 2.53641 8.47565 3.46186 7.71587L8.82732 3.31089Z" fill="#808080"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C8 14.3431 9.34315 13 11 13H13C14.6569 13 16 14.3431 16 16V21H14V16C14 15.4477 13.5523 15 13 15H11C10.4477 15 10 15.4477 10 16V21H8V16Z" fill="#808080"/>
</svg>




        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.9036 4.85668C12.7971 3.94825 11.2029 3.94825 10.0964 4.85668L4.73093 9.26166C4.2682 9.64155 4 10.2088 4 10.8074V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V10.8074C20 10.2088 19.7318 9.64155 19.2691 9.26166L13.9036 4.85668ZM8.82732 3.31089C10.6715 1.79685 13.3285 1.79685 15.1727 3.31089L20.5381 7.71587C21.4636 8.47565 22 9.61006 22 10.8074V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V10.8074C2 9.61006 2.53641 8.47565 3.46186 7.71587L8.82732 3.31089Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C8 14.3431 9.34315 13 11 13H13C14.6569 13 16 14.3431 16 16V21H14V16C14 15.4477 13.5523 15 13 15H11C10.4477 15 10 15.4477 10 16V21H8V16Z" fill="black"/>
</svg>

        )}
      </div>
      <div className="text">
        <span>
       
          {/* { selectedProfilData.publicName && selectedProfilData.publicName +
            " " +
            selectedProfilData.publicSurName &&   selectedProfilData.publicSurName} */}


            {v.companyStatus}





        </span>
      </div>
    </div>


    )
  }



  {

    v.taxAdministration && v.taxAdministration !=="" && (

      <div className="in-item">

      <div className="image">
        {selectedProfilData &&
        selectedProfilData.profileTheme == "light" ? (
          // <img src="/icons/user_3-AEAEB4.svg" />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.9036 4.85667C12.7971 3.94825 11.2029 3.94825 10.0964 4.85667L4.73093 9.26165C4.2682 9.64155 4 10.2087 4 10.8074V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V10.8074C20 10.2087 19.7318 9.64155 19.2691 9.26165L13.9036 4.85667ZM8.82732 3.31089C10.6715 1.79684 13.3285 1.79684 15.1727 3.31089L20.5381 7.71587C21.4636 8.47565 22 9.61006 22 10.8074V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V10.8074C2 9.61006 2.53641 8.47565 3.46186 7.71587L8.82732 3.31089Z" fill="#808080"/>
</svg>

        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.9036 4.85667C12.7971 3.94825 11.2029 3.94825 10.0964 4.85667L4.73093 9.26165C4.2682 9.64155 4 10.2087 4 10.8074V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V10.8074C20 10.2087 19.7318 9.64155 19.2691 9.26165L13.9036 4.85667ZM8.82732 3.31089C10.6715 1.79684 13.3285 1.79684 15.1727 3.31089L20.5381 7.71587C21.4636 8.47565 22 9.61006 22 10.8074V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V10.8074C2 9.61006 2.53641 8.47565 3.46186 7.71587L8.82732 3.31089Z" fill="black"/>
</svg>

        )}
      </div>
      <div className="text">
        <span>
       
          {/* { selectedProfilData.publicName && selectedProfilData.publicName +
            " " +
            selectedProfilData.publicSurName &&   selectedProfilData.publicSurName} */}


            {v.taxAdministration}





        </span>
      </div>
    </div>



    )


  }


  {

    v.taxNumber && v.taxNumber !== "" && (

      <div className="in-item">

      <div className="image">
        {selectedProfilData &&
        selectedProfilData.profileTheme == "light" ? (
          // <img src="/icons/user_3-AEAEB4.svg" />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 14C8 13.4477 8.44772 13 9 13H15C15.5523 13 16 13.4477 16 14C16 14.5523 15.5523 15 15 15H9C8.44772 15 8 14.5523 8 14Z" fill="#808080"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C6.89543 4 6 4.89543 6 6V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V8.82843C18 8.56321 17.8946 8.30886 17.7071 8.12132L13.8787 4.29289C13.6911 4.10536 13.4368 4 13.1716 4H8ZM4 6C4 3.79086 5.79086 2 8 2H13.1716C13.9672 2 14.7303 2.31607 15.2929 2.87868L19.1213 6.70711C19.6839 7.26972 20 8.03278 20 8.82843V18C20 20.2091 18.2091 22 16 22H8C5.79086 22 4 20.2091 4 18V6Z" fill="#808080"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 3V5C14 6.65685 15.3431 8 17 8H19V10H17C14.2386 10 12 7.76142 12 5V3H14Z" fill="#808080"/>
</svg>

        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8 14C8 13.4477 8.44772 13 9 13H15C15.5523 13 16 13.4477 16 14C16 14.5523 15.5523 15 15 15H9C8.44772 15 8 14.5523 8 14Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C6.89543 4 6 4.89543 6 6V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V8.82843C18 8.56321 17.8946 8.30886 17.7071 8.12132L13.8787 4.29289C13.6911 4.10536 13.4368 4 13.1716 4H8ZM4 6C4 3.79086 5.79086 2 8 2H13.1716C13.9672 2 14.7303 2.31607 15.2929 2.87868L19.1213 6.70711C19.6839 7.26972 20 8.03278 20 8.82843V18C20 20.2091 18.2091 22 16 22H8C5.79086 22 4 20.2091 4 18V6Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M14 3V5C14 6.65685 15.3431 8 17 8H19V10H17C14.2386 10 12 7.76142 12 5V3H14Z" fill="black"/>
          </svg>
          
        )}
      </div>
      <div className="text">
        <span>
       
          {/* { selectedProfilData.publicName && selectedProfilData.publicName +
            " " +
            selectedProfilData.publicSurName &&   selectedProfilData.publicSurName} */}


            {v.taxNumber}
        </span>
      </div>
    </div>


    )

  }


  {

    v.location && v.location !=="" && (

      <div className="in-item">

      <div className="image">
        {selectedProfilData &&
        selectedProfilData.profileTheme == "light" ? (
          // <img src="/icons/user_3-AEAEB4.svg" />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C10.4255 4 8.90459 4.65749 7.77501 5.84574C6.6438 7.03572 5.99998 8.66001 5.99998 10.3636C5.99998 12.844 7.5363 15.2652 9.24306 17.1603C10.0789 18.0884 10.9177 18.8486 11.5484 19.3769C11.7154 19.5168 11.8673 19.64 12 19.7453C12.1327 19.64 12.2846 19.5168 12.4516 19.3769C13.0823 18.8486 13.9211 18.0884 14.7569 17.1603C16.4637 15.2652 18 12.844 18 10.3636C18 8.66001 17.3562 7.03572 16.225 5.84574C15.0954 4.65749 13.5745 4 12 4ZM12 21C11.4258 21.8187 11.4256 21.8186 11.4253 21.8184L11.4228 21.8166L11.4172 21.8127L11.3986 21.7994C11.3829 21.7882 11.3607 21.7722 11.3325 21.7517C11.2761 21.7106 11.1956 21.6511 11.0943 21.5741C10.8917 21.4203 10.6057 21.1962 10.2641 20.9101C9.58226 20.3389 8.67109 19.5139 7.75691 18.4988C5.96367 16.5076 3.99998 13.6105 3.99998 10.3636C3.99998 8.16134 4.83117 6.0397 6.32546 4.46777C7.82139 2.89413 9.86144 2 12 2C14.1385 2 16.1786 2.89413 17.6745 4.46777C19.1688 6.0397 20 8.16134 20 10.3636C20 13.6105 18.0363 16.5076 16.2431 18.4988C15.3289 19.5139 14.4177 20.3389 13.7359 20.9101C13.3942 21.1962 13.1082 21.4203 12.9057 21.5741C12.8044 21.6511 12.7238 21.7106 12.6675 21.7517C12.6393 21.7722 12.6171 21.7882 12.6014 21.7994L12.5828 21.8127L12.5772 21.8166L12.5754 21.8179C12.5751 21.8181 12.5742 21.8187 12 21ZM12 21L12.5742 21.8187C12.2295 22.0604 11.7699 22.0601 11.4253 21.8184L12 21Z" fill="#808080"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 8C10.8954 8 9.99998 8.89543 9.99998 10C9.99998 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8ZM7.99998 10C7.99998 7.79086 9.79085 6 12 6C14.2091 6 16 7.79086 16 10C16 12.2091 14.2091 14 12 14C9.79085 14 7.99998 12.2091 7.99998 10Z" fill="#808080"/>
</svg>

        ) : (

          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C10.4255 4 8.90459 4.65749 7.77501 5.84574C6.6438 7.03572 5.99998 8.66001 5.99998 10.3636C5.99998 12.844 7.5363 15.2652 9.24306 17.1603C10.0789 18.0884 10.9177 18.8486 11.5484 19.3769C11.7154 19.5168 11.8673 19.64 12 19.7453C12.1327 19.64 12.2846 19.5168 12.4516 19.3769C13.0823 18.8486 13.9211 18.0884 14.7569 17.1603C16.4637 15.2652 18 12.844 18 10.3636C18 8.66001 17.3562 7.03572 16.225 5.84574C15.0954 4.65749 13.5745 4 12 4ZM12 21C11.4258 21.8187 11.4256 21.8186 11.4253 21.8184L11.4228 21.8166L11.4172 21.8127L11.3986 21.7994C11.3829 21.7882 11.3607 21.7722 11.3325 21.7517C11.2761 21.7106 11.1956 21.6511 11.0943 21.5741C10.8917 21.4203 10.6057 21.1962 10.2641 20.9101C9.58226 20.3389 8.67109 19.5139 7.75691 18.4988C5.96367 16.5076 3.99998 13.6105 3.99998 10.3636C3.99998 8.16134 4.83117 6.0397 6.32546 4.46777C7.82139 2.89413 9.86144 2 12 2C14.1385 2 16.1786 2.89413 17.6745 4.46777C19.1688 6.0397 20 8.16134 20 10.3636C20 13.6105 18.0363 16.5076 16.2431 18.4988C15.3289 19.5139 14.4177 20.3389 13.7359 20.9101C13.3942 21.1962 13.1082 21.4203 12.9057 21.5741C12.8044 21.6511 12.7238 21.7106 12.6675 21.7517C12.6393 21.7722 12.6171 21.7882 12.6014 21.7994L12.5828 21.8127L12.5772 21.8166L12.5754 21.8179C12.5751 21.8181 12.5742 21.8187 12 21ZM12 21L12.5742 21.8187C12.2295 22.0604 11.7699 22.0601 11.4253 21.8184L12 21Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8C10.8954 8 9.99998 8.89543 9.99998 10C9.99998 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8ZM7.99998 10C7.99998 7.79086 9.79085 6 12 6C14.2091 6 16 7.79086 16 10C16 12.2091 14.2091 14 12 14C9.79085 14 7.99998 12.2091 7.99998 10Z" fill="black"/>
          </svg>          

        )}
      </div>
      <div className="text">
        <span>
       
          {/* { selectedProfilData.publicName && selectedProfilData.publicName +
            " " +
            selectedProfilData.publicSurName &&   selectedProfilData.publicSurName} */}


            {v.location}

        </span>
      </div>
    </div>


    )



  }


  {

v.officePhoneNumber && v.officePhoneNumber !== "" && (

  <div className="in-item">

      <div className="image">
        {selectedProfilData &&
        selectedProfilData.profileTheme == "light" ? (
          // <img src="/icons/user_3-AEAEB4.svg" />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.9349 6.98742C13.1407 6.4749 13.723 6.22624 14.2355 6.43201C15.0144 6.74473 15.719 7.21738 16.3038 7.81944C16.8886 8.42149 17.3406 9.13954 17.6306 9.9272C17.8214 10.4455 17.5559 11.0203 17.0376 11.2111C16.5193 11.4019 15.9445 11.1364 15.7537 10.6181C15.5604 10.093 15.2591 9.61433 14.8692 9.21296C14.4793 8.81159 14.0096 8.49649 13.4903 8.28801C12.9778 8.08223 12.7291 7.49994 12.9349 6.98742Z" fill="#808080"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.3635 3.04786C13.5064 2.51439 14.0547 2.19781 14.5882 2.34075C16.2838 2.79507 17.8298 3.68771 19.0711 4.92894C20.3123 6.17017 21.2049 7.71626 21.6593 9.41182C21.8022 9.94529 21.4856 10.4936 20.9522 10.6366C20.4187 10.7795 19.8704 10.4629 19.7274 9.92946C19.364 8.57301 18.6498 7.33614 17.6569 6.34315C16.6639 5.35017 15.427 4.63606 14.0706 4.2726C13.5371 4.12966 13.2205 3.58132 13.3635 3.04786Z" fill="#808080"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.96833 5.21549C7.38653 4.4089 9.83018 5.92366 10.5089 8.37611C10.9715 10.0472 10.5334 11.7996 9.46531 12.9995C9.68407 13.2828 9.92311 13.5552 10.1826 13.8149C10.4408 14.0733 10.7116 14.3115 10.9932 14.5295C12.1926 13.4529 13.9502 13.01 15.6262 13.4745C18.0782 14.1542 19.5901 16.5997 18.7848 19.0178C18.2564 20.6044 17.2711 21.5683 15.9571 21.8856C14.7361 22.1805 13.4196 21.867 12.2585 21.3844C9.91992 20.4122 7.61074 18.4974 6.55613 17.442C5.47664 16.3617 3.57003 14.0491 2.60671 11.715C2.12834 10.5559 1.82033 9.24429 2.11584 8.02889C2.43378 6.7213 3.39283 5.74096 4.96833 5.21549ZM8.58141 8.90958C8.16872 7.4185 6.79749 6.7137 5.60116 7.11273C4.54956 7.46347 4.18482 7.98485 4.05922 8.50141C3.91121 9.11016 4.03992 9.94515 4.45545 10.952C5.27992 12.9497 6.9898 15.0465 7.97088 16.0283C8.92821 16.9863 11.0228 18.7048 13.0262 19.5376C14.0361 19.9574 14.8752 20.0894 15.4876 19.9415C16.007 19.8161 16.5331 19.4492 16.8872 18.3858C17.2866 17.1867 16.5807 15.8145 15.092 15.4018C13.9841 15.0948 12.8451 15.4506 12.1672 16.1766C11.7294 16.6454 10.895 16.9126 10.1851 16.4171C9.68553 16.0684 9.21113 15.6722 8.76787 15.2286C8.3239 14.7843 7.92751 14.3087 7.57877 13.8081C7.08635 13.1012 7.3491 12.27 7.81452 11.8312C8.53515 11.1518 8.88742 10.0153 8.58141 8.90958Z" fill="#808080"/>
</svg>

        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9349 6.98742C13.1407 6.4749 13.723 6.22624 14.2355 6.43201C15.0144 6.74473 15.719 7.21738 16.3038 7.81944C16.8886 8.42149 17.3406 9.13954 17.6306 9.9272C17.8214 10.4455 17.5559 11.0203 17.0376 11.2111C16.5193 11.4019 15.9445 11.1364 15.7537 10.6181C15.5604 10.093 15.2591 9.61433 14.8692 9.21296C14.4793 8.81159 14.0096 8.49649 13.4903 8.28801C12.9778 8.08223 12.7291 7.49994 12.9349 6.98742Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3635 3.04786C13.5064 2.51439 14.0547 2.19781 14.5882 2.34075C16.2838 2.79507 17.8298 3.68771 19.0711 4.92894C20.3123 6.17017 21.2049 7.71626 21.6593 9.41182C21.8022 9.94529 21.4856 10.4936 20.9522 10.6366C20.4187 10.7795 19.8704 10.4629 19.7274 9.92946C19.364 8.57301 18.6498 7.33614 17.6569 6.34315C16.6639 5.35017 15.427 4.63606 14.0706 4.2726C13.5371 4.12966 13.2205 3.58132 13.3635 3.04786Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.96833 5.21549C7.38653 4.4089 9.83018 5.92366 10.5089 8.37611C10.9715 10.0472 10.5334 11.7996 9.46531 12.9995C9.68407 13.2828 9.92311 13.5552 10.1826 13.8149C10.4408 14.0733 10.7116 14.3115 10.9932 14.5295C12.1926 13.4529 13.9502 13.01 15.6262 13.4745C18.0782 14.1542 19.5901 16.5997 18.7848 19.0178C18.2564 20.6044 17.2711 21.5683 15.9571 21.8856C14.7361 22.1805 13.4196 21.867 12.2585 21.3844C9.91992 20.4122 7.61074 18.4974 6.55613 17.442C5.47664 16.3617 3.57003 14.0491 2.60671 11.715C2.12834 10.5559 1.82033 9.24429 2.11584 8.02889C2.43378 6.7213 3.39283 5.74096 4.96833 5.21549ZM8.58141 8.90958C8.16872 7.4185 6.79749 6.7137 5.60116 7.11273C4.54956 7.46347 4.18482 7.98485 4.05922 8.50141C3.91121 9.11016 4.03992 9.94515 4.45545 10.952C5.27992 12.9497 6.9898 15.0465 7.97088 16.0283C8.92821 16.9863 11.0228 18.7048 13.0262 19.5376C14.0361 19.9574 14.8752 20.0894 15.4876 19.9415C16.007 19.8161 16.5331 19.4492 16.8872 18.3858C17.2866 17.1867 16.5807 15.8145 15.092 15.4018C13.9841 15.0948 12.8451 15.4506 12.1672 16.1766C11.7294 16.6454 10.895 16.9126 10.1851 16.4171C9.68553 16.0684 9.21113 15.6722 8.76787 15.2286C8.3239 14.7843 7.92751 14.3087 7.57877 13.8081C7.08635 13.1012 7.3491 12.27 7.81452 11.8312C8.53515 11.1518 8.88742 10.0153 8.58141 8.90958Z" fill="black"/>
          </svg>
          
        )}
      </div>
      <div className="text">
        <span>
       
          {/* { selectedProfilData.publicName && selectedProfilData.publicName +
            " " +
            selectedProfilData.publicSurName &&   selectedProfilData.publicSurName} */}


            {v.officePhoneNumber}


        </span>
      </div>
    </div>

)

  }


  {
 
    v.officeEmail && v.officeEmail !== ""  && (

      <div className="in-item">

      <div className="image">
        {selectedProfilData &&
        selectedProfilData.profileTheme == "light" ? (
          // <img src="/icons/user_3-AEAEB4.svg" />

          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 8C2 5.79086 3.79086 4 6 4H18C20.2091 4 22 5.79086 22 8V16C22 18.2091 20.2091 20 18 20H6C3.79086 20 2 18.2091 2 16V8ZM6 6C4.89543 6 4 6.89543 4 8V16C4 17.1046 4.89543 18 6 18H18C19.1046 18 20 17.1046 20 16V8C20 6.89543 19.1046 6 18 6H6Z" fill="#808080"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.21913 8.37528C6.56414 7.94402 7.19343 7.8741 7.6247 8.21911L12 11.7194L16.3753 8.21911C16.8066 7.8741 17.4359 7.94402 17.7809 8.37528C18.1259 8.80654 18.056 9.43584 17.6247 9.78084L12 14.2806L6.37531 9.78084C5.94404 9.43584 5.87412 8.80654 6.21913 8.37528Z" fill="#808080"/>
</svg>

        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 8C2 5.79086 3.79086 4 6 4H18C20.2091 4 22 5.79086 22 8V16C22 18.2091 20.2091 20 18 20H6C3.79086 20 2 18.2091 2 16V8ZM6 6C4.89543 6 4 6.89543 4 8V16C4 17.1046 4.89543 18 6 18H18C19.1046 18 20 17.1046 20 16V8C20 6.89543 19.1046 6 18 6H6Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.21913 8.37528C6.56414 7.94402 7.19343 7.8741 7.6247 8.21911L12 11.7194L16.3753 8.21911C16.8066 7.8741 17.4359 7.94402 17.7809 8.37528C18.1259 8.80654 18.056 9.43584 17.6247 9.78084L12 14.2806L6.37531 9.78084C5.94404 9.43584 5.87412 8.80654 6.21913 8.37528Z" fill="black"/>
</svg>

        )}
      </div>
      <div className="text">
        <span>
      
            {v.officeEmail}


        </span>
      </div>
    </div>


    )



  }

{

v.taxNumber !== ""  && (

  <a
  onClick={() => {
    {navigator.clipboard.writeText(v.taxNumber)}
  }}
  className={
    "global-button " +
    (selectedProfilData &&
    selectedProfilData.profileTheme == "light"
      ? "profile-in-button"
      : "profile-in-button-dark")
  }
>
  <span> Vergi Numarası Kopyala</span>
</a>


)


                          }




                        </div>
  
  
  </>



)



                      }




                  </div>


                </div>
              );
            })}
        </div>

        {socialMediaListSort.length > 0 &&
          selectedProfilData &&
          selectedProfilData.placeOfSocialMediaPosition == "bottom" && (
            <div style={{
              marginLeft:"30px",
              marginRight:"30px"
            }}>
            
            
            <AliceCarousel
                    mouseTracking
                    items={items2}
                    responsive={responsive}
                    controlsStrategy="alternate"
                />
            
            
            {/* <AliceCarousel  mouseTracking
                    items={items}
                    responsive={responsive}
                    controlsStrategy="alternate" /> */}
            </div>
          )}

        <div className="mini-logo">
          {selectedProfilData && selectedProfilData.profileTheme == "light" ? (
            <img src="/images/hibritcard-black-logo.svg" />
          ) : (
            <img src="/images/hibritcard-white-logo.svg" />
          )}
        </div>
      </div>
      <ViewPageButton />
    </>
  );
}

export default Profile;
