import React, { useEffect, useState } from 'react'
import GlobalControllerLayout from '../layouts/global-controller-layout'
import Link from 'next/link'
import NumberFormat from 'react-number-format'
import { useSelector, useDispatch } from 'react-redux'
import { userUpdateAsync, getUserAsync, deleteUserAsync, changegePasswordAsync,changegeEmailAsync } from '../stores/userSlice'
import Loading from '../components/loading'
import { useRouter } from 'next/router'

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

//for time picker
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { textAlign } from '@mui/system'


function UserSettings() {

    const router = useRouter();

    const dispatch = useDispatch();
    const user = useSelector(state => state.userSlice.user);
    const userStatus = useSelector(state => state.userSlice.status);


    const [userValues, setUserValues] = useState(user);
    const passwordChangeError = useSelector(state => state.userSlice.passwordChangeError);
    const passwordSuccess = useSelector(state => state.userSlice.passwordSuccess);   

    const emailChangeSuccess = useSelector(state => state.userSlice.EmailChangeSuccess);
    const emailAlreadyExist = useSelector(state=> state.userSlice.EmailExistAlready);


   


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

        emailChangeSuccess === true && setemailAfterChange(newEmail.newEmailTochange);
        if(emailChangeSuccess === true){
            handleClose();
        }

    }, [emailChangeSuccess]);

    useEffect(() => {

        if(emailAlreadyExist === true){

            setemailAlready(true)
            setemailError(false);

            console.log("Hesap varrr", emailAlready)
        }
    
    }, [emailAlreadyExist])


    useEffect(() => {
        setUserValues(user);

        console.log("userre", userValues)
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

    const [newEmail,setnewEmail]= useState({

        newEmailTochange: userValues && userValues.eMail

    })

    useEffect(() => {
       console.log("emailChanges",newEmail.newEmailTochange)
    }, [newEmail]);

    const [emailAfterChange, setemailAfterChange]= useState("")

    const [emailError,setemailError]= useState(false);
    const [emailAlready,setemailAlready]=useState(false);

    function changeEmailOfUser(){

        if(newEmail.newEmailTochange !==""){

            dispatch(changegeEmailAsync(newEmail))


        }else{
            setemailError(true)
        }
       
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

    //for time pişcker
   

 // const handleChange = (newValue) => {
   // setValue(newValue);

    //console.log("veriii", value ,  newValue)
 // };


  //email Dialog Here
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


//   for the Header features
const [notify, setNotify]= useState(false)
const [notiCount, setnotiCount]= useState(0)



function shareAllData(){

    try {
         navigator.share( {
            title: 'HibritCard-HibritMedya',
            text: 'Kopyala!',
            url: location.href
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



                            <div className='header-icons'

onClick={()=>{ 
    console.log("panelburada");
    setnotiCount((notiCount)=>notiCount + 1)
    }} 
    style={{
        cursor:"pointer",
        zIndex:"999"
    }}
                            
                            >


                                <div className='icon-item'>
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
                                    <img src='/icons/bell-black.svg' />
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


                                <div className='icon-item'  style={{
                            cursor:"pointer",
                            zIndex:"999"
                        }}
                        onClick={shareAllData}>
                                    <img src='/icons/External link-black.svg' />
                                </div>

                            </div>
                        </div>

                    </div>




                    <div className='main-card-global'>
                        <div className='main-card '  style={{
                            marginTop:"15px"
                        }}>

                            <div className='main-card-header' >
                                Hesap
                            </div>

                            <div className='content-in content-input-padding'>
                                <div className='content-input'>
                                    <input value={userValues && userValues.userHandleName} onChange={(e) => setUserValues(v => ({ ...v, userHandleName: e.target.value.replace(/[^a-z0-9]/gi, '') }))} type="text" placeholder='Hesap Kullanıcı Adı' />

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



                                    <input value={ emailAfterChange=== "" ? userValues && userValues.eMail : emailAfterChange } onChange={(e) => setUserValues(v => 
                                        ({ ...v, eMail: e.target.value }))} type="button" placeholder='E-Posta' onClick={(e)=>{handleClickOpen(e); setnewEmail((ne)=>({ ...ne,   newEmailTochange: emailAfterChange==="" ? userValues && userValues.eMail : emailAfterChange })); setemailError(false)  }}  style={{
                                            textAlign:"start"
                                        }}></input>


<div>
<Dialog open={open} onClose={handleClose}>
    <div style={{
        display:"flex"
        
    }}>

    <DialogTitle> Email Değiştir</DialogTitle>

    <div style={{
        width:"100%",
        textAlign:"center"
    }}>
        <div style={{
            paddingLeft:"20px",
            paddingTop:"20px",
            paddingBottom:"20px"
        }}  onClick={handleClose}>

<i className="fa-solid fa-xmark" style={{
                    color:"#8B8DFF"
                  }}> </i>
        </div>
    </div>

    </div>
       
        <DialogContent>
            <div style={{
                display:"flex"
            }}>

<div>

<TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email"
            value={newEmail.newEmailTochange}
            onChange={(e)=> setnewEmail((ne)=>({ ...ne, newEmailTochange: e.target.value }))}
            type="email"
            fullWidth
            variant="standard"
          />

{

emailError === true && (
    <div style={{
        color:"red",
        fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "400",
fontSize: "11px",
lineHeight: "13px",
textAlign: "justify"
    }}>

        
Email boş olamaz!
</div>

)


}

{
    emailAlready ===true &&(
        <div style={{
            color:"red",
            fontFamily: 'Montserrat',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "11px",
    lineHeight: "13px",
    textAlign: "justify"
        }}>
    Mail Kontrol edin!
    </div>


    )
}
         

</div>
            


          <div style={{
       
        textAlign:"center",
        paddingTop: "20px",
        paddingLeft:"10px"
    }}>

            <div onClick={()=> changeEmailOfUser()} >
            <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M19.6585 6.24742C20.0741 6.6111 20.1162 7.24287 19.7526 7.6585L11.0026 17.6585C10.6402 18.0726 10.0114 18.1162 9.59543 17.756L4.34543 13.2106C3.92789 12.8491 3.88247 12.2175 4.24397 11.8C4.60547 11.3825 5.23701 11.337 5.65454 11.6985L10.1525 15.5928L18.2474 6.34149C18.6111 5.92586 19.2429 5.88374 19.6585 6.24742Z"
                      fill="#8B8DFF"
                    />
                  </svg>
            </div>
           
          </div>

            </div>
          
         
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button onClick={handleClose}>Kaydet</Button>
        </DialogActions> */}
      </Dialog>
</div>




                                    <PhoneInput
                                        country={'tr'}
                                        value={userValues && userValues.phoneNumber}
                                        onChange={(e) => setUserValues(v => ({ ...v, phoneNumber: e }))}
                                        placeholder='Telefon numarası'
                                    />


                                    <select value={userValues && userValues.gender} onChange={(e) => setUserValues(v => ({ ...v, gender: e.target.value }))}  >

                                        <option value={0}>Cinsiyet Seçiniz</option>
                                        <option value={1}>Erkek</option>
                                        <option value={2}>Kadın</option>

                                    </select>

                                    {/* <div className='date-input'><NumberFormat value={userValues && userValues.birthDate}
                                     onChange={(e) => setUserValues(v => ({ ...v, birthDate: e.target.value }))} 
                                     format="##.##.####" placeholder="Doğum Tarihi" mask={['G', 'G', 'M', 'M', 'Y', 'Y', 'Y', 'Y']} /></div> */}


{/* date picker */}

<div  className='date-input'>

<LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        
        <MobileDatePicker
         
          inputFormat="MM/DD/YYYY"
        //   value={value}
          value={userValues && userValues.birthDate}
        //   onChange={handleChange}
        onChange={(e) =>{ setUserValues( (v) => ({ ...v, birthDate: e }))  ; console.log("datata", e)} }
          renderInput={(params) => <TextField {...params} />}
        />
       
      </Stack>
    </LocalizationProvider>

</div>






                                </div>

                            </div>
                            <div className='profile-save-button-global'>
                                <button onClick={() => dispatch(userUpdateAsync(userValues))} className='profile-save-button'>
                                    Güncelle
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
                                    Güncelle
                                    {/* #9ed5ff */}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='main-card-global' style={{
                        marginBottom:"20px"
                    }}>
                        <div className='account-buttons'>
                            {/* <div onClick={() => setDeletePopup(true)} className='global-button account-delete-button'>
                                Hesabı sil
                            </div> */}
                            <div className='button-space '></div>
                            <div onClick={() => exit()} className='global-button account-exit-button'>
                                Çıkış yap
                            </div>

                        </div>
                    </div>

                    {/* Hesabı sil buttonu */}

                    <div className="content-input">

<div className="content-min-link">

<div onClick={() => setDeletePopup(true)} className='global-button account-delete-buttonn'>
    <span className='hesap_Bottom'>
    Hesabı sil
    </span>
                               
                            </div>

</div>


  
</div>


                </div>
            </div>
        </>
    )
}

export default UserSettings
