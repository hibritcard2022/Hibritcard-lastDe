import React from "react";
import { useState, useEffect, useRef } from "react";
import Header from "../../components/header";
import { List, arrayMove } from "react-movable";
import ProfilePageButton from "../../components/profile-page-button";
import { useRouter } from "next/router";
import GlobalControllerLayout from "../../layouts/global-controller-layout";

import { InputAdornment } from "@material-ui/core";


import { deleteSocialMediaofProfileAsync, getAllSocialMediaAsync, newSocialUrlAddAsync, updateSocialMediaUrlAsync } from '../../stores/socialSlice';



import NumberFormat from 'react-number-format';




import {
  getProfilePanelAsync,
  postBankInfoAsync,
  updateBankInfoAsync,
  postContactInfoAsync,
  updateContactInfoAsync,
  postDocumentInfoAsync,
  updateDocumentInfoAsync,
  fileUploadAsync,
  fileUploadChangeAsync,
  updatBankStatusModeAsync,
  updatContactStatusModeAsync,
  updatFaturaStatusModeAsync,
  updateDocumentToViewStatusModeAsync,
  updateFileUploadedStatusModeAsync,
  updateOrderOdBankIdAsync,
  updateOrderOfContactIdAsync,
  updateOrderOfFaturaBillIdAsync,
  updateOrderOfDocumentToViewIdAsync,
  updateOrderOfFileUploadedIdAsync,
  deleteBankPanelAsync,
  deleteContactPanelAsync,
  deleteFaturaBillPanelAsync,
  deleteProfileUrlPanelAsync,
  deleteDocumentPanelAsync,
  deleteFileUploadedPanelAsync,
  updatePanelTitleContactdAsync,
  updatePanelTitleOfFaturaAsync,
  updatePanelTitleBankdAsync,
  updatePanelTitleDocumentdAsync,
  updatePanelTitleFileUploadAsync,
  firstTimeUploadFileAsync,
  postProfileUrlInfoAsync,
  updateOrderOfProfilePanelIdAsync,
  updateOnlyPhoneInputContactInfoAsync,
  updateOnlyEmailInputContactInfoAsync,
  updateProfileUrlInfoAsync,
  updatePanelTitleProfileUrlLinkAsync,
  updatProfileUrlStatusModeAsync,
  updateOnlyBankDataArrayInfoAsync,
  postFaturaInfoAsync,
  updateFaturaDataInfoAsync,

  updateProfileUrlDataArrayInfoAsync,
  updateSocialfromUrlPanel,

  deleteEmailArrayOnly,
  deletePhoneArrayOnly,
  deleteFileArrayOnlyUpload,
  deleteBankElementArrayOnlyUpload,
  deleteProfileUrlLinkElementArrayOnlyUpload,


  postUrlLinkSocialInfoAsync,

  updateSocialPartAlways,

  


} from "../../stores/userSlice";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

//code countries here
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; //country css

//import countries and cities
import { Country, State, City } from "country-state-city";

import useTurkeyCities from "use-turkey-cities"; //Türkiye Cities


// import { ICountry, IState, ICity } from "country-state-city";
import { toastify } from "../../util/toastify";
import TextField from "@mui/material/TextField"; //react mui
import { border } from "@mui/system";
import IBAN from "../../buttonInput/ibanFormat";
import e from "cors";

//Iban Input Changs
const IbanInput = (props) => (
  <IBAN
    {...props}
    render={({ onChange, onChangeTwo , indexTwo, bankIbanFormat, value, iban, ...rest }) => (

      
      
      <React.Fragment>
        <input {...rest} onChange={(e)=>{onChange(e); onChangeTwo(e, indexTwo);console.log("datagfsda", value) }} value={bankIbanFormat} placeholder="IBAN"  name="bankIban" />{" "}
        {Boolean(iban) && (
         
          <React.Fragment>

            
            {/* <p>
              <strong> IBAN(unformated) </strong>: <br /> {iban}{" "}
            </p>{" "}
            <p>
              <strong> IBAN(formatted) </strong>: <br /> {value}{" "}
            </p>{" "} */}

            {/* <div>
            <strong> IBAN(formatted) </strong>: <br /> {value}{" "}
            </div> */}


          </React.Fragment>

        )}
      </React.Fragment>

    )}
  />
);


//Account Number here
const AccountNumberInput = (props) => (

  <IBAN
    {...props}
    render={({ onChange,onChangetWO, value, accountNumberFormat, iban, indexTwo,  ...rest }) => (


      <React.Fragment>
        <input
          {...rest}

          onChange={(e)=>{ onChange(e) ; onChangetWO( e, indexTwo)}}
          value={accountNumberFormat}
          placeholder="Hesap Numara"
          name="bankAccountNumber"



        />
      </React.Fragment>


    )}
  />

);

function Panel() {
  const dispatch = useDispatch();

  const router = useRouter();
  const { id } = router.query;

  const profilePanel = useSelector((state) => state.userSlice.profilePanel); //profile Panel

  const profilePanelStatus = useSelector((state) => state.userSlice.status);  

  const onlyFileUploadStatus = useSelector((state) => state.userSlice.onlyFileUploadStatus);  

  // onlyFileUploadStatus

  const contactPoststatus = useSelector(
    (state) => state.userSlice.postContactStatus
  ); //conatct post status
  const bankPoststatus = useSelector((state) => state.userSlice.postbanStatus); //bank post status
  const documentPoststatus = useSelector(
    (state) => state.userSlice.documentstatus
  ); //document post status
  const uploadPoststatus = useSelector(
    (state) => state.userSlice.uploadFilestatusFirst
  ); //upload Profile post status
  const profileUrlPoststatus = useSelector(
    (state) => state.userSlice.postPanelProfilUrlStatus
  ); //upload Profile post status

  const faturaDataStatus= useSelector(
    (state)=> state.userSlice.postFaturaStatus
  )


  //New Social media Status NewAddUrlsocialstatus

  const NewSocialMediaUrlAdd= useSelector(
    (state)=> state.socialSlice.NewAddUrlsocialstatus
  )

  //order status Mode  dispaly

  const contactorderStatus = useSelector(
    (state) => state.userSlice.orderContactStatus
  ); //conatct post status

//order of fatura Status  

const faturaBillorderStatus = useSelector(
  (state) => state.userSlice.orderFaturaStatus
);





  const bankorderstatus = useSelector(
    (state) => state.userSlice.orderBankStatus
  ); //bank post status
  const documentorderstatus = useSelector(
    (state) => state.userSlice.orderDocumentStatus
  ); //document post status
  const uploadorderstatus = useSelector(
    (state) => state.userSlice.orderUploadUploadStatus
  ); //upload Profile post status

  const profileUrlOrderstatus = useSelector(
    (state) => state.userSlice.orderProfileUrStatus
  ); //upload Profile post status


  


     /// socialMedia Panel Id selector
  const socialMediaPanelId = useSelector(
    (state) => state.socialSlice.NewAddSocialMediaInfo
  ); 




  
  


  const faturaOrderStatus = useSelector(
    (state) => state.userSlice.orderUpdateFaturaStatus
  ); //fatura Order

  useEffect(() => {
    if (contactorderStatus == "success") {
      getAllPanelFromChangepanelList();
      console.log("brada girdi sta::", contactorderStatus);
    }
  }, [contactorderStatus]);


  useEffect(() => {

    if (faturaBillorderStatus == "success") {
      getAllPanelFromChangepanelList();
      console.log("brada girdi sta::", faturaBillorderStatus);
    }
  }, [faturaBillorderStatus])


  


  useEffect(() => {
    if (bankorderstatus == "success") {
      getAllPanelFromChangepanelList();
    }
  }, [bankorderstatus]);

  useEffect(() => {
    if (documentorderstatus == "success") {
      getAllPanelFromChangepanelList();
    }
  }, [documentorderstatus]);

  useEffect(() => {
    if (uploadorderstatus == "success") {
      getAllPanelFromChangepanelList();
    }
  }, [uploadorderstatus]);

  useEffect(() => {

    console.log("helookkk", profileUrlOrderstatus )
    if (profileUrlOrderstatus === "loading" ) {

      // dispatch(
      //   getProfilePanelAsync(localStorage.getItem("selectedProfileId"))
      // );

    }
  }, [profileUrlOrderstatus]);



  useEffect(() => {

    console.log("contactStatusfgh:", contactPoststatus);

    if(contactPoststatus ==="success") {
      
      getAllPanelFromHere();
      console.log("whyy")
    }

  }, [contactPoststatus]);


  useEffect(() => {
    console.log("faturaaafddg:", faturaDataStatus);
    if(faturaDataStatus ==="success") {

      getAllPanelFromHere();
    }
  }, [faturaDataStatus]);

  useEffect(() => {
    console.log("bank Status:", bankPoststatus);
    if (bankPoststatus === "success") {
      getAllPanelFromHere();
    }
  }, [bankPoststatus]);

  useEffect(() => {
    console.log("contact Status:", documentPoststatus);
    if (documentPoststatus === "success") {
      getAllPanelFromHere();
    }
  }, [documentPoststatus]);

  useEffect(() => {
    console.log("contact Status:", uploadPoststatus);
    if (uploadPoststatus === "success") {

      console.log("okkkkfdsfkk",uploadPoststatus )
      getAllPanelFromHere();
    }
  }, [uploadPoststatus]);

  useEffect(() => {
    console.log("contact Status:", profileUrlPoststatus);
    if (profileUrlPoststatus === "success") {
      getAllPanelFromHere();
    }
  }, [profileUrlPoststatus]);

  const deletePanelstatus = useSelector(
    (state) => state.userSlice.deletesatatus
  );
  const profile = useSelector((state) => state.userSlice.profiles);

  const selectedProfilData = profile.find(
    (s) => s.profileId == selectedProfileId
  );

  //here will be the usestate
  //const [profileId, setprofileId] = useState(selectedProfileId);
  const [accountOwner, setaccountOwner] = useState();

  const [accountNumber, setaccountNumber] = useState();

  const [bankName, setbankName] = useState("");
  const [bankStation, setbankStation] = useState("");
  const [bankIban, setbankIban] = useState("");
  const [BankDataId, setBankDataId] = useState();
  const [bankstatueMode, setbankstatueMode] = useState(true);
  const [bankType, setBankType] = useState("");
  const [orderIdOfBank, setorderIdOfBank] = useState(0);
  const [bankAccountNum, setbankAccountNum] = useState("");

  const [bankdataDeleteId, setbankdataDeleteId] = useState();
  const [contactdeleteId, setcontactdeleteId] = useState();
  const [documentdeleteId, setdocumentdeleteId] = useState();
  const [fileUploaddeleteId, setfileUploaddeleteId] = useState();
  const [profileUrlDeleteId, setprofileUrlDeleteId] = useState();

  //panel Title from here
  const [bankdataEditId, setbankdataEditId] = useState();
  const [contactdataEditId, setcontactdataEditId] = useState();
  const [profileUrldataEditId, setprofileUrldataEditId] = useState();
  const [documentdataEditId, setdocumentdataEditId] = useState();
  const [fileUploadEditId, setfileUploadEditId] = useState();
  const [panelTitleText, setpanelTitleText] = useState("Değiştir"); //panel Title

  const [valueKontrolafterEdit, setvalueKontrolafterEdit] = useState(false);

  // post contact usestate
  const [publicName, setpublicName] = useState("");
  const [publicsurname, setpublicsurname] = useState("");
  const [publicOrganization, setpublicOrganization] = useState("");
  const [profilePosition, setprofilePosition] = useState("");

  const [takenPhoneNumberState, settakenPhoneNumberState] = useState("");
  const [takenEmailEpostaState, settakenEmailEpostaState] = useState("");

  //set Fatura datafrom here

  const [taxNumber, settaxNumber]= useState("");
  const [taxAdministration , settaxAdministration]= useState("");
  const [companyStatus , setcompanyStatus ] = useState("");
  const [officeEmail , setofficeEmail]= useState("");
  const [officePhoneNumber, setofficePhoneNumber]= useState("");
  const [location, setlocation]= useState("");
  const [fatuarOrderId, setfatuarOrderId]= useState();
  const [faturaDataId, setfaturaDataId]= useState()
  const [faturaStatueMode, setfaturaStatueMode]=useState(true);





  const [streetAdress, setstreetAdress] = useState("");
  const [profileCountry, setprofileCountry] = useState("");
  const [profileCity, setprofileCity] = useState("");
  const [profileNot, setprofileNot] = useState("");
  const [contactDataId, setcontactDataId] = useState();
  const [contactstatueMode, setcontactstatueMode] = useState(true);
  const [orderIdOfContact, setorderIdOfContact] = useState(0);

  //post Profile URL pANEL
  const [profileUrlPanel, setprofileUrlPanel] = useState("");
  const [profileUrlDataId, setprofileUrlDataId] = useState();
  const [profileUrlstatueMode, setprofileUrlstatueMode] = useState(true);
  const [orderIdOfProfileUrl, setorderIdOfProfileUrl] = useState(0);

  const [editUrlProfile, setEditUrlProfile] = useState(false);

  // post Document form heree
  const [statusNameSurname, setstatusNameSurname] = useState(false);
  const [statusEmail, setstatusEmail] = useState(false);
  const [statusTelefon, setstatusTelefon] = useState(false);
  const [statusMessage, setstatusMessage] = useState(false);
  const [emailToSend, setemailToSend] = useState("");
  const [publicstreetAdress, setpublicstreetAdress] = useState("");
  const [publicDropNot, setpublicDropNot] = useState("");
  const [documentDataFormId, setdocumentDataFormId] = useState();
  const [documentstatueMode, setdocumentstatueMode] = useState(true);
  const [orderIdOfDocument, setorderIdOfDocument] = useState(0);

  //upload file
  const [uploadFilestatueMode, setuploadFilestatueMode] = useState(); //kullanıldı
  const [belgeDocument, setbelgeDocument] = useState("");
  const [belgeDocumentId, setbelgeDocumentId] = useState();
  const [uploadFileStatueModeSecond, setuploadFileStatueModeSecond] =
    useState(true);
  const [orderIdOfFileUpload, setorderIdOfFileUpload] = useState(0);

  //******************************* Usetae of Panel Cout */
  const [countContactPanel, setcountContactPanel] = useState(0);
  const [countDocumentPanel, setcountDocumentPanel] = useState(0);
  const [countUploadfilePanel, setcountUploadfilePanel] = useState(0);
  const [countBankaPanel, setcountBankaPanel] = useState(0);
  const [countProfileUrlPanel, setcountProfileUrlPanel] = useState(0);

  const [countFaturaData, setcountFaturaData]= useState(0)

  useEffect(() => {

//     if(countFaturaData > 0 ){
// postFaturaFromData(panelListSort)

//     }

  }, [countFaturaData]);

  /// Incraese fuction contact
  function IncreaseAddContactPanel() {
    setcountContactPanel(countContactPanel + 1),
      console.log("data Send :", countContactPanel);


  }

  //Decrease function contact
  function DecreaseDeleteContactPanel() {
    setcountContactPanel(countContactPanel - 1);
  }

  /// Incraese fuction banka
  function IncreaseAddBankaPanel() {
    setcountBankaPanel(countBankaPanel + 1);
  }

  //Decrease function banka
  function DecreaseDeleteBankaPanel() {
    setcountBankaPanel(countBankaPanel - 1);
  }

  //Increase FATURA DATA FROM  countFaturaData

  function IncreaseAddFaturaDataPanel() {

    if(ekleDoldu === false){
      setcountFaturaData(countFaturaData + 1);
    }

   
  }

  //decraese fatura data 
  function DecreaseFaturaDataPanel(){

    setcountFaturaData(countFaturaData - 1);

  }


  /// Incraese fuction Dcument
  function IncreaseAddDocumentPanel() {
    setcountDocumentPanel(countDocumentPanel + 1);
  }

  //Decrease function banka
  function DecreaseDeleteDocumnentPanel() {
    setcountDocumentPanel(countDocumentPanel - 1);
  }

  /// Incraese fuction Profile URL
  function IncreaseAddProfilePanel() {
    setcountProfileUrlPanel(countProfileUrlPanel + 1);
  }

  //Decrease function Profile URL
  function DecreaseDeleteProfileUrlPanel() {
    setcountProfileUrlPanel(countProfileUrlPanel - 1);
  }

  /// Incraese fuction Upload File
  function IncreaseAddUploadFilePanel() {
    setcountUploadfilePanel(countUploadfilePanel + 1);
  }

  //Decrease function Upload File
  function DecreaseDeleteUploadFilePanel() {
    setcountUploadfilePanel(countUploadfilePanel - 1);
  }

  //console.log("ülkeler", Country.getAllCountries()[0].isoCode);
  // console.log("stateler", State.getAllStates());
  // console.log("Şehirler", City.getAllCities());


  console.log("ŞehirlerERT", City.getCitiesOfCountry("TR"));
  // console.log("Statelerjkgfd",State.getAllStates())

  const { cities, city, setCity, districts, district, setDistrict } = useTurkeyCities();//Türkiye Cities

  cities.map((city)=>{

    console.log("citiesss", city)

  })

  console.log()

  //all countries
  function rollCallCountries(countries, index) {
    //console.log(`The first ${index + 1} country is ${countries.name}.`);
    //<option value={countries.name}>Ankara</option>;
    //console.log("countries:",countries.name)
  }

  //call all countries
  Country.getAllCountries().forEach((name, index) =>
    rollCallCountries(name, index)
  );

  useEffect(() => {
    setProfileData(selectedProfilData);
  }, [selectedProfilData]);

  const selectedProfileId = useSelector(
    (state) => state.userSlice.selectProfileId
  ); //profileId

  const [profileData, setProfileData] = useState(selectedProfilData);
  const [countryCode, setcountryCode] = useState("AF");

  useEffect(() => {
    //console.log("veri again:", countryCode);
  }, [countryCode]);

  const [coutryCity, setcoutryCity] = useState("");

  //change every
  useEffect(() => {
    console.log("country here::", profileCountry);
    console.log("allcountry::", Country.getAllCountries());
    Country.getAllCountries().map((v, i) => {
      if (v.name == profileCountry) {
        setcoutryCity(v.isoCode);
      }

      console.log("Isocodebur::", coutryCity);
    });
  }, [profileCountry]);

  const data = { profileId: selectedProfileId };

  const profilePanelBank = useSelector(
    (state) => state.userSlice.profilePanelBank
  );

  //useEffect to bring the profile  panel
  useEffect(() => {
    selectedProfileId != ""
      ? dispatch(getProfilePanelAsync(selectedProfileId))
      : dispatch(
          getProfilePanelAsync(localStorage.getItem("selectedProfileId"))
        );


      //   if (localStorage.getItem("GZIToken")) {
      //     dispatch(getAllSocialMediaAsync(localStorage.getItem("selectedProfileId")));
      // }
      // else {
      //     router.push("/login");
      // }

      selectedProfileId != ""
      ? dispatch(getAllSocialMediaAsync(selectedProfileId))
      : dispatch(
        getAllSocialMediaAsync(localStorage.getItem("selectedProfileId"))
        );


    console.log("hee Geldi yinee::");

  }, [dispatch]);

  const socialList = useSelector( state => state.socialSlice.socialList)

console.log("socialAll::", socialList)


function updateAllsociall(){

  


  


        socialList.map((v,i)=>{


          const data =  {
            socialId: v.socialMediaUrlId,
            value: {
                socialtype: "",
                socialUrlLink: "",
                statuMode:"",
                socialOrder: "",
            }
        }
        dispatch(updateSocialMediaUrlAsync(data));
        })

        

}

  //deneme buarada dispatch

  //credentials to send
  const uploadDataDetails12 = {

    profileId: selectedProfileId,
    belgeDocument: uploadFilestatueMode,
    belgeDocumentId: belgeDocumentId,
    OrderId: orderIdOfFileUpload,


  };

  const updateDatasatusModeBank12 = {

    profileId: selectedProfileId,
    statueMode: bankstatueMode,
    bankDataId: BankDataId,

  };

  const updateStatueModeProfileUrl = {
    profileId: selectedProfileId,
    statueMode: profileUrlstatueMode,
    panelProfileUrlDataId: profileUrlDataId,
  };

  //fatura Here
  const updateStatueModeFatura={
    faturaDataId: faturaDataId,
    statueMode: faturaStatueMode,
    profileId: selectedProfileId,

  }

  const updateContactStatuMode13 = {
    profileId: selectedProfileId,
    statueMode: contactstatueMode,
    contactDataId: contactDataId,
  };

  const updateDocumentToViewStatuMode14 = {
    profileId: selectedProfileId,
    statueMode: documentstatueMode,
    documentDataFormId: documentDataFormId,
  };

  const updateFileUpoadedStatuMode15 = {
    profileId: selectedProfileId,
    statueMode: uploadFileStatueModeSecond,
    belgeDocumentId: belgeDocumentId,
  };

  useEffect(() => {
    console.log("uplad File:", uploadDataDetails12);
  }, [uploadDataDetails12]);

  //useEffect of BANKsTATUmode
  useEffect(() => {
    // console.log("Bank StatusMode:", updateDatasatusModeBank12);
    if (updateDatasatusModeBank12.bankDataId != undefined) {
      // console.log("gitti değişiklik banka");
      dispatch(updatBankStatusModeAsync(updateDatasatusModeBank12));

    }
  }, [updateDatasatusModeBank12]);

  useEffect(() => {
    if (updateStatueModeProfileUrl.panelProfileUrlDataId != undefined) {
      dispatch(updatProfileUrlStatusModeAsync(updateStatueModeProfileUrl));
    }
  }, [updateStatueModeProfileUrl]);


  //fatura StatueMode 

  useEffect(() => {
    
    if (updateStatueModeFatura.faturaDataId != undefined){

dispatch(updatFaturaStatusModeAsync(
  updateStatueModeFatura
))
    }
  }, [updateStatueModeFatura])


  //useEffect of StatuMode of Contact MOde
  useEffect(() => {
    //console.log("contact StatusMode:", updateContactStatuMode13);
    if (updateContactStatuMode13.contactDataId != undefined) {
      //console.log("gitti değişiklik contact");
      dispatch(updatContactStatusModeAsync(updateContactStatuMode13));
    }
  }, [updateDatasatusModeBank12]);

  //update Document to View Status
  useEffect(() => {
    console.log("Document Toview StatusMode:", updateDocumentToViewStatuMode14);
    if (updateDocumentToViewStatuMode14.documentDataFormId != undefined) {
      console.log("gitti değişiklik Document");
      dispatch(
        updateDocumentToViewStatusModeAsync(updateDocumentToViewStatuMode14)
      );
    }
  }, [updateDocumentToViewStatuMode14]);

  //update StatuMODE OF fİLE uPLOADED
  useEffect(() => {
    //console.log("fİLE  uOPLOADED StatusMode:", updateFileUpoadedStatuMode15);
    if (updateFileUpoadedStatuMode15.belgeDocumentId != undefined) {
      // console.log("gitti değişiklik fİLE Uploaded");
      dispatch(updateFileUploadedStatusModeAsync(updateFileUpoadedStatuMode15));
    }
  }, [updateFileUpoadedStatuMode15]);

  //to see on console from here
  useEffect(() => {
    // console.log("Bank Data Id:", BankDataId);
  }, [BankDataId]);

  //status Mode from here
  useEffect(() => {
    // console.log("status Mode From:", bankstatueMode);
  }, [bankstatueMode]);

  //upload File HERR
  function handleUploadFile(event, numberSend) {
    event.preventDefault();

    //   let OrderIdContactPost = profilePanelBank.length==0  ?  0 : (profilePanelBank.length - 1) +1 ;
    //   for(let index = 0; index < numberSend; index++) {
    //     console.log("Burasi index:", index)
    //     setorderIdOfContact(index);
    //     console.log("bEFORE send:", OrderIdContactPost)
    //       dispatch(fileUploadAsync({
    //         profileId: localStorage.getItem("selectedProfileId"),
    //         belgeDocument: uploadFilestatueMode,
    //           OrderId: OrderIdContactPost
    //       }))
    //     OrderIdContactPost++
    // }
  }

  function getAllPanelFromChangepanelList() {

    panelListSort.map((v, i) => {
      if (
        v.OrderId &&
        v.type == "bankform" &&
        v.OrderId != i &&
        v.BankDataId != undefined
      ) {
        dispatch(
          getProfilePanelAsync(localStorage.getItem("selectedProfileId"))
        );
        console.log("buradavar::");

      } else if (
        v.OrderId &&
        v.type == "conatctAddForm" &&
        v.OrderId != i &&
        v.conatctDataId != undefined
      ) {

        console.log("heenooo")
        dispatch(
          getProfilePanelAsync(localStorage.getItem("selectedProfileId"))
        );
      } else if (
        v.OrderId &&
        v.type == "documentForm" &&
        v.OrderId != i &&
        v.documentDataFormId != undefined
      ) {
        dispatch(
          getProfilePanelAsync(localStorage.getItem("selectedProfileId"))
        );
      } else if (
        v.OrderId &&
        v.type == "uploadFileDocument" &&
        v.OrderId != i &&
        v.belgeDocumentId != undefined
      ) {
        dispatch(
          getProfilePanelAsync(localStorage.getItem("selectedProfileId"))
        );
      } else if (
        v.OrderId &&
        v.type == "urlLinkPanel" &&
        v.OrderId != i &&
        v.profileUrlDataId != undefined
      ) {
        dispatch(
          getProfilePanelAsync(localStorage.getItem("selectedProfileId"))
        );
      }else if( v.OrderId &&
        v.type == "faturaData" &&
        v.OrderId != i &&
        v.faturaDataId != undefined){
          dispatch(
            getProfilePanelAsync(localStorage.getItem("selectedProfileId"))
          );
        }
    });
  }

  function getAllPanelFromHere() {

    console.log("girmedibuu",panelListSort)

    panelListSort.map((v, i) => {
      if (
        v.OrderId===i || v.id===i && v.type === "bankform" && v.BankDataId === undefined
      ) {

        console.log("olmadıbur");
        dispatch(
          getProfilePanelAsync(localStorage.getItem("selectedProfileId"))
        );

        
      } 

       else if (
        v.OrderId===i || v.id===i  && v.type === "conatctAddForm" && v.contactDataId === undefined
      ) {

        console.log("contactFrrtyet")

        dispatch(
          getProfilePanelAsync(localStorage.getItem("selectedProfileId"))
        );
      }
      
      
      else if (
        v.OrderId===i || v.id===i && v.type === "documentForm" && v.documentDataFormId === undefined
      ) {
        dispatch(
          getProfilePanelAsync(localStorage.getItem("selectedProfileId"))
        );
      } else if (
        v.OrderId ===i  &&
          v.type === "uploadFileDocument" &&
          v.belgeDocumentId === undefined
      ) {
        dispatch(
          getProfilePanelAsync(localStorage.getItem("selectedProfileId"))
        );
      } else if (
        v.OrderId ===i || v.id===i &&
        v.type === "urlLinkPanel" &&
          v.panelProfileUrlDataId === undefined
      ) {
        dispatch(
          getProfilePanelAsync(localStorage.getItem("selectedProfileId"))
        );
      }

      else if (
          v.OrderId ===i || v.id===i &&
          v.type === "faturaData" &&
            v.faturaDataId === undefined
        ) {
          dispatch(
            getProfilePanelAsync(localStorage.getItem("selectedProfileId"))
          );
        }
    });
  }

  // firstTimeUploadFileAsync //burada first Timöe upload function form here

  function handleUploadFileFirstTimeFile(event, numberSend, arr) {
    event.preventDefault();
    let newArray = [...arr];

    const indexes = newArray
      .map((element, index) => {
        if (element.type === "uploadFileDocument") {
          return index;
        }
      })
      .filter((element) => element >= 0);

    console.log("sonuda::", indexes);
    const indexesOfIndex = indexes.length - 1;

    for (let index = 0; index < numberSend; index++) {
      console.log("Burasi index:", index);
      setorderIdOfContact(index);
      dispatch(
        firstTimeUploadFileAsync({
          profileId: localStorage.getItem("selectedProfileId"),
          belgeDocument: uploadFilestatueMode,
          OrderId: indexes[indexesOfIndex],
        })
      );
      indexesOfIndex--;
    }
  }

  //uploadChange(event)
  function uploadChangeFiles() {

    uploadFileField.map((v, i) => {
      for (let index = 0; index <=uploadFileField.length; index++) {

        dispatch(fileUploadChangeAsync({

          belgeDocument: uploadFilestatueMode,
          belgeDocumentId: belgeDocumentId,
          arrayLentghToChange: i


        }));


      }
    });


  }


  //update BnakStatusMode

  //new panel
  const [newPanel, setNewPanel] = useState(false);

  //console.log("Panel data:", profilePanel);

  //credentials to send
  const bankDataDetails1 = {
    BankDataId: BankDataId,
    profileId: selectedProfileId,
    accountOwner: accountOwner,
    bankName: bankName,
    bankStation: bankStation,
    bankIban: bankIban,
    bankstatueMode: bankstatueMode,
    bankType: bankType,
    OrderId: orderIdOfBank,
  };

  const profileUrlData = {
    panelProfileUrlDataId: profileUrlDataId,
    panelUrlLink: profileUrlPanel,
  };

  //credentials to send contact
  const bankDataDetails2 = {
    contactDataId: contactDataId,
    publicName: publicName,
    profileId: selectedProfileId,
    publicsurname: publicsurname,
    publicOrganization: publicOrganization,
    profilePosition: profilePosition,
    takenPhoneNumber: takenPhoneNumberState,
    takenEmailEposta: takenEmailEpostaState,
    streetAdress: streetAdress,
    profileCountry: profileCountry,
    profileCity: profileCity,
    profileNot: profileNot,
    OrderId: orderIdOfContact,
  };

  //documentDataDetails3
  const documentDataDetails3 = {
    documentDataFormId: documentDataFormId,
    profileId: selectedProfileId,
    statusNameSurname: statusNameSurname,
    statusEmail: statusEmail,
    statusTelefon: statusTelefon,
    statusMessage: statusMessage,
    emailToSend: emailToSend,
    publicstreetAdress: publicstreetAdress,
    publicDropNot: publicDropNot,
    OrderId: orderIdOfDocument,
  };

  const [sendData, sesendData] = useState(bankDataDetails1);
  const [sendDataconatct, setsendDataconatct] = useState(bankDataDetails2);
  const [sendDataDocument, setsendDataDocument] =
    useState(documentDataDetails3);

  useEffect(() => {
    //console.log("veri again bank details:", bankDataDetails1);
  }, [bankDataDetails1]);

  useEffect(() => {
    console.log("veri kontrol contact yu:", bankDataDetails2);
  }, [bankDataDetails2]);

  useEffect(() => {
    //console.log("veri again:", documentDataDetails3);
  }, [documentDataDetails3]);

  // post bank Info send
  function postBankData(event, numberSend, arr) {

    event.preventDefault();

    let newArray = [...arr];

    const indexes = newArray
      .map((element, index) => {
        if (element.type === "bankform") {
          return index;
        }
      })
      .filter((element) => element >= 0);

    console.log("sonuda::", indexes);

    const indexesOfIndex = indexes.length - 1;

    console.log("zuun::", indexesOfIndex);

    for (let index = 0; index < numberSend; index++) {
      setorderIdOfContact(index);
      dispatch(
        postBankInfoAsync({
          profileId: localStorage.getItem("selectedProfileId"),
          accountOwner: accountOwner,
bankAccountNumber:accountNumber,
          bankName: bankName,
          bankStation: bankStation,
          bankIban: bankIban,
          bankstatueMode: bankstatueMode,
          bankType: bankType,
          OrderId: indexes[indexesOfIndex],
        })
      );
      indexesOfIndex--;
    }
  }

  //update bank data
  function updateBankData(event) {

console.log("bankIdd::", BankDataId)
    event.preventDefault();


    // dispatch(updateBankInfoAsync(bankDataDetails1)).then(()=>{

      bankFiledAdd.map((v, i) => {

        for (let index = 0; index <= bankFiledAdd.length; index++) {

          dispatch(
            updateOnlyBankDataArrayInfoAsync({

              BankDataId: BankDataId,
              accountOwner : v.accountOwner,
              bankName: v.bankName,
              bankStation:v.bankStation,
              bankIban: v. bankIban,
              bankAccountNumber:v.bankAccountNumber,
              arrayLentghToChange: i


            })
          );
        }
      //  console.log("numara bak:", v.phoneNumber);

      });

    // }).catch(()=>{
    //   console.log("Olmadı bu")
    // })


  }


  useEffect(() => {
   console.log("NewAddStatus", NewSocialMediaUrlAdd )
  }, [NewSocialMediaUrlAdd]);



let NewAddUrlData= []

useEffect(() => {
 console.log("Okuul", NewAddUrlData )
}, [NewAddUrlData]);


const [pass,setpass]=useState("")




const [profileUrlofSocialMediaId , setprofileUrlofSocialMediaId] = useState("");





console.log("aginhdsjf",socialMediaPanelId )


// const [newProfileId, setnewProfileId]= useState("");

// const newSocialMediaId = socialMediaPanelId !==undefined ? setnewProfileId(socialMediaPanelId)  : ""

// console.log("yeniadataa", newSocialMediaId)

  useEffect(() => {

  
   if(socialMediaPanelId){

    console.log("BuytukGor::", socialMediaPanelId)

    // if(dataTo !== "" || dataTo !== undefined){
    //   setprofileUrlofSocialMediaId(dataTo)
    // }
    setprofileUrlofSocialMediaId(socialMediaPanelId)

   console.log("HEEEGRİD", profileUrlofSocialMediaId )


   }
  }, [socialMediaPanelId])

  

  // useEffect(() => {
  //   if(NewSocialMediaUrlAdd === "success")
  // }, [NewSocialMediaUrlAdd])



  

  useEffect(() => {

    console.log("Buftdsar",profileUrlofSocialMediaId )



    if(profileUrlofSocialMediaId !== ""){

      panelProfileUrlSev.map((v, i) => {

        // for (let index = 0; index < panelProfileUrlSev.length   ; index++) {

         dispatch(
           updateProfileUrlDataArrayInfoAsync({

             panelProfileUrlDataId: profileUrlDataId,
             arrayIndexthis: i,
   socialOrder: v.socialOrder,
   socialUrlHead: v.socialUrlHead,
   socialUrlLink: v.socialUrlLink,
   socialtype: v.socialtype,
   statuMode: v.statuMode,
   placeholder: v.placeholder,
   socialMediaLinkMatch : profileUrlofSocialMediaId

           })

         )
 
       });


    }


  }, [profileUrlofSocialMediaId])





  //upadte to social Url from here
  function addNewurladdOfsocial(event){
    console.log("Oktamammm", profileUrlofSocialMediaId)

console.log("panbelpro", panelProfileUrlSev)

    panelProfileUrlSev.map((v,i)=>{


      const data = {
        profileId: localStorage.getItem("selectedProfileId"),
        value: {
            socialUrlLink: v.socialUrlLink,
            socialtype: v.socialtype,
            statuMode: true,
            socialOrder: 0,
        }
    }

    console.log("veara", v.newValueAdd)

      if( v.newValueAdd && v.socialMediaLinkMatch=== undefined){
        console.log("truuee::")
        dispatch(newSocialUrlAddAsync(data))
      }

      
    })


  }

  //update profile Url from here

  function updateprofileUrlDataArray() {


    addNewurladdOfsocial()

   
        // dispatch(updateBankInfoAsync(bankDataDetails1)).then(()=>{

        panelProfileUrlSev.map((v, i) => {

           // for (let index = 0; index < panelProfileUrlSev.length   ; index++) {

            dispatch(
              updateProfileUrlDataArrayInfoAsync({

                panelProfileUrlDataId: profileUrlDataId,
                arrayIndexthis: i,
      socialOrder: v.socialOrder,
      socialUrlHead: v.socialUrlHead,
      socialUrlLink: v.socialUrlLink,
      socialtype: v.socialtype,
      statuMode: v.statuMode,
      placeholder: v.placeholder,
      socialMediaLinkMatch : v.socialMediaLinkMatch ? v.socialMediaLinkMatch : profileUrlofSocialMediaId

              })

            ).then(()=>{
              updateAllsociall();

              if(v.socialMediaLinkMatch && v.socialMediaLinkMatch !==""){

                updateSocialMediaFromUrlpanel(v.socialMediaLinkMatch, v.socialUrlLink )

                console.log("varmışbsdjh")

              }

            })
    
          });

      
    
    
      }

//update from url panel social Media
      function updateSocialMediaFromUrlpanel(socialMediaLinkMatch, socialUrlLink ){
        dispatch(updateSocialfromUrlPanel({
          socialMediaId: socialMediaLinkMatch,
          socialUrlLink: socialUrlLink

        }))
      }




  useEffect(() => {
    console.log("urlveri", profileUrlData);
  }, [profileUrlData]);
  //UPDATE PROFİLE URL LİNK
  function updateProfileUrlLinkData(event) {
    event.preventDefault();
    dispatch(updateProfileUrlInfoAsync(profileUrlData));
    // console.log("updated veri:", bankDataDetails1);
  }

  //update contact data

  function updateContactData(event) {
    event.preventDefault();
    dispatch(updateContactInfoAsync(bankDataDetails2))
      .then(() => {
        telefonInputServ.map((v, i) => {
          for (let index = 0; index <= telefonInputServ.length; index++) {
            dispatch(
              updateOnlyPhoneInputContactInfoAsync({
                conatctDataId: contactDataId,
                newEnterPhoneInput: v.phoneNumber,
                newEnterDefaultPhone: radioButtonIndexPhone == 0 && radioButtonIndexPhone == i ? true : radioButtonIndexPhone== i ?  radionButtonValuePhone : false,
                arrayLentghToChange: i,

              })
            );
          }

          console.log("numara bak:", v.phoneNumber);
        });
      })
      .then(() => {
        emailInputServ.map((v, i) => {
          for (let index = 0; index <= emailInputServ.length; index++) {
            dispatch(
              updateOnlyEmailInputContactInfoAsync({
                conatctDataId: contactDataId,
                newEmailPosta: v.emailPosta,
                newEmailDefault: radioButtonIndexEmail == 0 && radioButtonIndexEmail == i  ? true : radioButtonIndexEmail== i ? radioButtonValueEmail : false,
                arrayLentghToChange: i,

              })
            );
          }
        });
      })
      .catch(() => {
        console.log("update olmadı::");
      });

    //console.log("updated veri:", bankDataDetails2);
  }


  //delete Phone Array Element in contact

  function deletePhoneArrayInContact(e ,existPhoneNumberrr,existDefaultPhoneee,index ){


    console.log("eeeee",e)

     dispatch(deletePhoneArrayOnly({

      conatctDataId: contactDataId,
      existPhoneNumber: existPhoneNumberrr,
      existDefaultPhone: existDefaultPhoneee
      
     })).then(()=>{

      removeInputPhoneHandle(index);

     })

  }

  // delete Email Array element in contact

  function deleteEmailArrayInContact(e ,existPhoneNumberrr,existDefaultPhoneee , index){

    console.log("dataComm  data::", existPhoneNumberrr)
    console.log("dataComm  dafault::", existDefaultPhoneee)
    

    dispatch(deleteEmailArrayOnly({
      conatctDataId: contactDataId,
      existEmail: existPhoneNumberrr,
      existDefaultEmail: existDefaultPhoneee
    })).then(()=>{
      removeInputEmailHandle(index);
    }).catch((err)=>{
      console.log("Not delete")
    })
 }


//delete File Upload Array
function deleteFileUploadArrayOnlyOne(e, existUrlLinkOfFileUpload, index ){

  dispatch(deleteFileArrayOnlyUpload({
    belgeDocumentId:belgeDocumentId,
    existUrlLinkOfFileUpload:existUrlLinkOfFileUpload
  })).then(()=>{
removeUploadFieldLess(index);
  }).catch((err)=>{
    console.log("Not delete")

  })
}

// delete bank Element from here   

//delete File Upload Array
function deleteBankArrayOnlyOne(e, exisBankIban,existAccountOwner,existbankNumber,existbankName,existbankStation, index ){

  dispatch(deleteBankElementArrayOnlyUpload({
    bankDataId: BankDataId,
    exisBankIban:exisBankIban,
    existAccountOwner: existAccountOwner,
    existbankNumber : existbankNumber,
    existbankName : existbankName,
    existbankStation : existbankStation
  })).then(()=>{
removeBankFieldLess(index)

  }).catch((err)=>{
    console.log("Not delete")

  })
}


//delete Profile url from here   


function deleteProfileUrlElementArrayOnlyOne(e, exiseMail,existgeneralUserId,existplaceholder,existsocialOrder,existsocialUrlHead,socialUrlLink,socialtype,
   existstatuMode, socialMediaLinkMatch, index ){

  dispatch(deleteProfileUrlLinkElementArrayOnlyUpload({

    panelProfileUrlDataId: profileUrlDataId,
    exiseMail: exiseMail,
    existgeneralUserId: existgeneralUserId,
    existplaceholder: existplaceholder,
    existsocialOrder: existsocialOrder,
    existsocialUrlHead: existsocialUrlHead,
    socialUrlLink: socialUrlLink,
    socialtype: socialtype,
    existstatuMode: existstatuMode,
    socialMediaLinkMatch:  socialMediaLinkMatch,


  })).then(()=>{
removeUrlPanelLinkHandle(index)
  }).catch((err)=>{
    console.log("Not delete")

  })
}





  //function update data of Info  updateFaturaDataInfoAsync

  function updateFaturaDataInfo(event) {
    event.preventDefault();
    dispatch(updateFaturaDataInfoAsync({

      faturaDataId: faturaDataId,
      taxNumber:  taxNumber,
            taxAdministration:  taxAdministration,
            companyStatus:  companyStatus,
            officeEmail:  officeEmail,
            officePhoneNumber:  officePhoneNumber,
            location: location


    }))

    //console.log("updated veri:", bankDataDetails2);
  }




  //*****post Contact  */
  //let OrderIdContactPost= profilePanelBank !="" ?  profilePanelBank == null ? 0 : profilePanelBank.length + 1 : "";
  //let OrderIdContactPost= profilePanelBank !="" ?  console.log("ProfileBnak hee::",profilePanelBank ) : "";

  //post contact
  function postContactData(event, numberSend, arr) {
    event.preventDefault();

    let newArray = [...arr];

    const indexes = newArray
      .map((element, index) => {
        if (element.type === "conatctAddForm") {
          return index;
        }
      })
      .filter((element) => element >= 0);

    console.log("sonuda::", indexes);

    const indexesOfIndex = indexes.length - 1;

    for (let index = 0; index < numberSend; index++) {
      setorderIdOfContact(index);
      dispatch(
        postContactInfoAsync({
          profileId: localStorage.getItem("selectedProfileId"),
          publicName: publicName,
          publicsurname: publicsurname,
          publicOrganization: publicOrganization,
          profilePosition: profilePosition,
          takenPhoneNumber: takenPhoneNumberState,
          takenEmailEposta: takenEmailEpostaState,
          streetAdress: streetAdress,
          profileCountry: profileCountry,
          profileCity: profileCity,
          profileNot: profileNot,
          OrderId: indexes[indexesOfIndex],
        })
      );

      indexesOfIndex--;
    }
  }

  //Post Fatura DATA FROM Here

  function postFaturaFromData( event, arr) {

    event.preventDefault();

    let newArray = [...arr];

    console.log("newarar",newArray )

    const indexes = newArray.map((element, index) => {

        if (element.type === "faturaData") {

          console.log("indoodo:", index)

          return index;
        }
      }).filter((element) => element >= 0);

    console.log("sonuda::", indexes);

    const indexesOfIndex = indexes.length - 1;


   //for (let index = 0; index < numberSend ; index++) {

      //setorderIdOfContact(index);  //order of Fatura

      ///console.log("buradaHere::",indexes[indexesOfIndex])


      dispatch(
        postFaturaInfoAsync({
          profileId: localStorage.getItem("selectedProfileId"),
          taxNumber: taxNumber,
          taxAdministration: taxAdministration,
          companyStatus: companyStatus,
          officeEmail: officeEmail,
          officePhoneNumber: officePhoneNumber,
          location: location,
          OrderId: indexes[indexesOfIndex],
        })
      );

      //indexesOfIndex--;

     // console.log("orderId")

   //}

  }


  // social url Link useState from heere
  const [ socialUrlLink, setsocialUrlLink] = useState("");
  const [ socialType, setsocialType]= useState("web");
  const [socialOrder, setsocialOrder]= useState(0);

  const [socialHead,setsocialHead]= useState("");
  const [socialStatusMode, setsocialStatusMode]= useState(true);
  const [placeholder,setplaceholder]= useState("");


  //post PRofile url panel 
  function postprofileUrlPanelData(event, numberSend, arr) {
    event.preventDefault();
    let newArray = [...arr];

    const indexes = newArray
      .map((element, index) => {
        if (element.type === "urlLinkPanel") {
          return index;
        }
      })
      .filter((element) => element >= 0);

    console.log("sonuda::", indexes);

    const indexesOfIndex = indexes.length - 1;

    for (let index = 0; index < numberSend; index++) {
      console.log("Burasi index:", index);
      setorderIdOfContact(index);
      dispatch(
        postProfileUrlInfoAsync({
          profileId: localStorage.getItem("selectedProfileId"),
          socialUrlLink : socialUrlLink,
          socialtype: socialType,
          socialOrder: socialOrder,
          OrderId: indexes[indexesOfIndex]
        })
      );
      indexesOfIndex--;
    }
  }



  //panel Social add post  postUrlLinkSocialInfoAsync
  function postPanelSocialUrlDatas( event, numberSend , arr){
    
    event.preventDefault();

    let newArray = [...arr];

    const indexes = newArray
      .map((element, index) => {

        if (element.type === "urlLinkPanel") {

          return index;

        }
      })
      .filter((element) => element >= 0);

    console.log("sonuda::", indexes);

    const indexesOfIndex = indexes.length - 1;

    for (let index = 0; index < numberSend; index++) {

      console.log("Burasi index:", index);

      setorderIdOfContact(index);
      dispatch(
        postUrlLinkSocialInfoAsync({
          profileId: localStorage.getItem("selectedProfileId"),
          socialUrlLink : socialUrlLink,
          socialtype: socialType,
          socialOrder: socialOrder,
          OrderId: indexes[indexesOfIndex],

        })
      );

      indexesOfIndex--;
    }
  }


  //postDocument
  function postDocument(event, numberSend, arr) {
    event.preventDefault();

    let newArray = [...arr];

    const indexes = newArray
      .map((element, index) => {
        if (element.type === "documentForm") {
          return index;
        }
      })
      .filter((element) => element >= 0);

    console.log("sonuda::", indexes);

    const indexesOfIndex = indexes.length - 1;

    for (let index = 0; index < numberSend; index++) {
      setorderIdOfContact(index);

      dispatch(
        postDocumentInfoAsync({
          profileId: localStorage.getItem("selectedProfileId"),
          statusNameSurname: statusNameSurname,
          statusEmail: statusEmail,
          statusTelefon: statusTelefon,
          statusMessage: statusMessage,
          emailToSend: emailToSend,
          publicstreetAdress: publicstreetAdress,
          publicDropNot: publicDropNot,
          OrderId: indexes[indexesOfIndex],
        })
      );
      indexesOfIndex--;
    }
  }

  //update document form heer
  function updateDoumentData(event) {
    event.preventDefault();
    dispatch(updateDocumentInfoAsync(documentDataDetails3));
    // console.log("updated veri:", documentDataDetails3);
  }

  const deleteBank = {
    bankDataId: bankdataDeleteId,
  };
  const deleteContact = {
    contactDataId: contactdeleteId,
  };

  const deleteFatura={
    faturaDataId: faturaDataId
  }

  const deleteProfileUrl = {
    panelProfileUrlDataId: profileUrlDeleteId,
  };

  const deleteDocument = {
    documentDataFormId: documentdeleteId,
  };

  const deleteFileUpload = {
    belgeDocumentId: fileUploaddeleteId,
  };

  useEffect(() => {
    console.log("en son veri deleteBank:", deleteBank);
  }, [deleteBank]);

  //delete bank
  function delteBankData() {
    if (deleteBank.bankDataId != undefined) {
      dispatch(deleteBankPanelAsync(deleteBank));
    }
  }

  // delete contact
  function delteContactData() {
    if (deleteContact.contactDataId != undefined) {
      dispatch(deleteContactPanelAsync(deleteContact));
    }
  }

  function deleteFaturaBill(){

    if (deleteFatura.faturaDataId != undefined) {
      dispatch(deleteFaturaBillPanelAsync(deleteFatura));
    }

  }

  //delete panel Url PROFİLE FROM HEER
  function delteProfileUrlData() {
    if (deleteProfileUrl.panelProfileUrlDataId != undefined) {
      dispatch(deleteProfileUrlPanelAsync(deleteProfileUrl));
    }
  }

  //delete Document
  function delteDocumentData() {
    if (deleteDocument.documentDataFormId != undefined) {
      dispatch(deleteDocumentPanelAsync(deleteDocument));
    }
  }

  // delete FileUpload
  function delteFileUploadData() {
    if (deleteFileUpload.belgeDocumentId != undefined) {
      dispatch(deleteFileUploadedPanelAsync(deleteFileUpload));
    }
  }

  const contactEditPanel = {
    contactDataId: contactdataEditId,
    panelTitle: panelTitleText,
    bankDataId: bankdataEditId,
    documentDataFormId: documentdataEditId,
    belgeDocumentId: fileUploadEditId,
    panelProfileUrlDataId: profileUrldataEditId,
    faturaDataId: faturaDataId
  };

 

  useEffect(() => {
    console.log("here you are with me:", contactEditPanel);
  }, [contactEditPanel]);

  //*********** panel Ttitle Edit */
  //Conatct Panel Title
  function contactEditTitlePanel() {
    if (
      contactEditPanel.contactDataId != undefined &&
      contactEditPanel.panelTitle != undefined
    ) {
      dispatch(updatePanelTitleContactdAsync(contactEditPanel));
      console.log("her you are send");
    }
    console.log("inside function");
  }

  //fatura Panel Title Changes  

  function contactEditFaturaitlePanel() {
    if (
      contactEditPanel.faturaDataId != undefined &&
      contactEditPanel.panelTitle != undefined
    ) {
      dispatch(updatePanelTitleOfFaturaAsync(contactEditPanel));
      console.log("her you are send");
    }
    console.log("inside function");
  }

  //profile Url panel Title
  function profileUrlEditTitlePanel() {
    if (
      contactEditPanel.panelProfileUrlDataId != undefined &&
      contactEditPanel.panelTitle != undefined
    ) {
      dispatch(updatePanelTitleProfileUrlLinkAsync(contactEditPanel));
      console.log("her you are send");
    }
    console.log("inside function");
  }

  //Fatura Edit data from heer

  function faturaEditData() {
    // if (
    //   contactEditPanel.panelProfileUrlDataId != undefined &&
    //   contactEditPanel.panelTitle != undefined
    // ) {
    //   dispatch(updatePanelTitleProfileUrlLinkAsync(contactEditPanel));
    //   console.log("her you are send");
    // }
    console.log("fatura Data")
  }


  //Bank panel edit Title
  function bankEditTitlePanel() {
    if (
      contactEditPanel.bankDataId != undefined &&
      contactEditPanel.panelTitle != undefined
    ) {
      dispatch(updatePanelTitleBankdAsync(contactEditPanel));
      console.log("her you are send");
    }
    console.log("inside function");
  }

  //Document panel Title
  function documentEditTitlePanel() {
    if (
      contactEditPanel.documentDataFormId != undefined &&
      contactEditPanel.panelTitle != undefined
    ) {
      dispatch(updatePanelTitleDocumentdAsync(contactEditPanel));
    }
  }

  //file Upload panel Title
  function FileUploadEditTitlePanel() {
    if (
      contactEditPanel.belgeDocumentId != undefined &&
      contactEditPanel.panelTitle != undefined
    ) {
      dispatch(updatePanelTitleFileUploadAsync(contactEditPanel));
      console.log("her you are send");
    }
    console.log("inside function");
  }

  //useEffect again
  useEffect(() => {
    // console.log(profilePanelStatus);
    // console.log("profilPanel: ", profilePanel);

    console.log("changesdhj", profilePanelStatus)

    if (profilePanelStatus !== "success") {

      console.log("okullll")

      // dispatch(
      //   getProfilePanelAsync(localStorage.getItem("selectedProfileId"))
      // );

      
    }

  }, [profilePanelStatus]);

// useEffect(() => {

//   console.log("fkjkfdgdfgdfg", onlyFileUploadStatus)

//   if (onlyFileUploadStatus !== "success") {

//     console.log("okullll")

//     dispatch(
//       getProfilePanelAsync(localStorage.getItem("selectedProfileId"))
//     );

    
//   }

// }, [onlyFileUploadStatus])



  useEffect(() => {
    // console.log("delete panel status:", deletePanelstatus);
    // if (deletePanelstatus === "success") {
    //   toastify({ type: "success", message: "Başarıyla Silindi." });
    // }
  }, [deletePanelstatus]);

  //foreach get all thye data
  // const [panels, setPanels] = useState(profilePanelBank);

  const [panels, setPanels] = useState([]);

  useEffect(() => {
    profilePanelBank !== null ? setPanels(profilePanelBank) : setPanels([]);

    console.log("velooo");
  }, [profilePanelBank]);

  // ******************* sıaralama here*************

  // panelList order heer
  const [panelListSort, setpanelListSort] = useState(
    [...panels].sort((a, b) => a.OrderId - b.OrderId)
  );

  useEffect(() => {
    setpanelListSort([...panels].sort((a, b) => a.OrderId - b.OrderId));
  }, [panels]);

  //function order panel List
  function panelOrderIdChangeUpdate(oldIndex, newIndex) {
    setpanelListSort(arrayMove(panelListSort, oldIndex, newIndex));
    setorderIdOfBank(newIndex);
    // console.log("yeni sıralama panel:", panelListSort);
  }

  //const bank order Update
  const bankdataOrderUpdate = {
    bankDataId: BankDataId,
    OrderId: orderIdOfBank,
  };

  //update and changes every time order and bring new PANEL LİST
  useEffect(() => {
    console.log("panel List orderId yeni:", panelListSort);
    console.log("panel List orderId old:", panels);







    panelListSort.map((v, i) => {

      if(v.type==="faturaData" && v.OrderId){
        setekleDoldu(true);
      }

      if (
        v.type == "urlLinkPanel" &&
        v.panelUrlLink != undefined &&
        profileUrlPanel == ""
      ) {
        setprofileUrlPanel(v.panelUrlLink);
      }


      // if(  v.type  ===  "uploadFileDocument"){

      //   setuploadFileField(v.belgeDocumentUploads);


      // }

      // if (v.OrderId != i) {
      //   setpanelListSort((v) =>
      //     panelListSort.map((s, i) =>
      //       s.OrderId == i && s.isOpen != true
      //         ? { ...s, OrderId: i }
      //         : { ...s, OrderId: i }
      //     )
      //   );
      // }


      

      if (v.BankDataId != undefined) {
        dispatch(
          updateOrderOdBankIdAsync({ bankDataId: v.BankDataId, OrderId: i })
        );
      } else if (v.contactDataId != undefined) {
        dispatch(
          updateOrderOfContactIdAsync({
            contactDataId: v.contactDataId,
            OrderId: i,
          })
        );
      }else if(v.faturaDataId != undefined){
        dispatch(
          updateOrderOfFaturaBillIdAsync({
            faturaDataId: v.faturaDataId,
            OrderId:i
          })
        )
      }
      
      else if (v.documentDataFormId != undefined) {
        dispatch(
          updateOrderOfDocumentToViewIdAsync({
            documentDataFormId: v.documentDataFormId,
            OrderId: i,
          })
        );
      } else if (v.belgeDocumentId != undefined) {
        dispatch(
          updateOrderOfFileUploadedIdAsync({
            belgeDocumentId: v.belgeDocumentId,
            OrderId: i,
          })
        );
      } else if (v.panelProfileUrlDataId != undefined) {
        dispatch(
          updateOrderOfProfilePanelIdAsync({
            panelProfileUrlDataId: v.panelProfileUrlDataId,
            OrderId: i,
          })
        );
      }
      //dispatch(getProfilePanelAsync(localStorage.getItem("selectedProfileId")))
    });



  }, [panelListSort]);


  // ************************sıralama bitti here***************

  useEffect(() => {}, [bankstatueMode]);

  //open StatusMode From here
  async function OpenStatus(
    id,
    newOrderId,
    statueMode,
    BankDataId,
    contactDataId,
    documentDataFormId,
    belgeDocumentId,
    panelProfileUrlDataId,
    faturaDataId
  ) {
    //console.log("orderId :", id);
    setbankstatueMode(statueMode);
    setprofileUrlstatueMode(statueMode);
    setBankDataId(BankDataId);
    setprofileUrlDataId(panelProfileUrlDataId);
    setcontactstatueMode(statueMode);
    setcontactDataId(contactDataId);
    setdocumentDataFormId(documentDataFormId);
    setdocumentstatueMode(statueMode);

    setfaturaStatueMode(statueMode);

    setfaturaDataId(faturaDataId);

    setuploadFileStatueModeSecond(statueMode);
    setbelgeDocumentId(belgeDocumentId);

    // { ...s, statueMode: false }

    await setPanels((v) =>
      panelListSort.map((s, i) =>
        s.OrderId
          ? s.OrderId == id && s.statueMode != true
            ? { ...s, statueMode: true }
            : s.OrderId == id && s.statueMode == true
            ? { ...s, statueMode: false }
            : { ...s }
          : i == newOrderId && s.statueMode != true
          ? { ...s, statueMode: true }
          : s.OrderId == id && s.statueMode == true
          ? { ...s, statueMode: false }
          : { ...s }
      )
    );
  }

  //open PANEL FROM HERE
  async function PanelOpen(
    id,
    accountOwner,
    bankIban,
    bankName,
    bankStation,
    BankDataId,
    type,
    newOrderId,
    profileCity,
    profileCountry,
    profileNot,
    profilePosition,
    takenPhoneNumberState,
    takenEmailEpostaState,
    bankDataList,
    belgeDocumentUploads,
    publicName,
    publicOrganization,
    publicsurname,
    streetAdress,
    contactDataId,

    statusNameSurname,
    statusEmail,
    statusTelefon,
    statusMessage,
    emailToSend,
    publicstreetAdress,
    publicDropNot,
    documentDataFormId,

    belgeDocument,
    belgeDocumentId,

    panelUrlLink,
    panelProfileUrlDataId,

    faturaDataId,
    taxNumber,
    taxAdministration,
    companyStatus,
    officeEmail,
    officePhoneNumber,
    location,
    profileUrlPanel

  ) {
    console.log("contactId here::", contactDataId);
    console.log("ayya::", takenPhoneNumberState);

    console.log("bankadatabu::",bankDataList );

    setaccountOwner(accountOwner);
    setbankIban(bankIban);
    setbankName(bankName);
    setbankStation(bankStation);
    setBankDataId(BankDataId);
    setBankType(type);
    setorderIdOfBank(newOrderId);
    setorderIdOfContact(newOrderId);
    setorderIdOfDocument(newOrderId);
    setorderIdOfFileUpload(newOrderId);

    setprofileCity(profileCity);
    
     console.log("ulkegh", profileCountry) 
    setprofileCountry(profileCountry  ? profileCountry : "Türkiye");
    setprofileNot(profileNot);
    setprofilePosition(profilePosition);

    // settakenPhoneNumberState(takenPhoneNumberState)
    // settakenEmailEpostaState(takenEmailEpostaState)
    settelefonInputServ(takenPhoneNumberState ? takenPhoneNumberState : []);

    setemailInputServ(takenEmailEpostaState ? takenEmailEpostaState : []);

    //set bank form heer
    setbankFiledAdd(bankDataList ? bankDataList : [] );

    setuploadFileField(belgeDocumentUploads ? belgeDocumentUploads : [] );



    setpublicName(publicName);
    setpublicOrganization(publicOrganization);
    setpublicsurname(publicsurname);
    setstreetAdress(streetAdress);
    setcontactDataId(contactDataId);

    setstatusNameSurname(statusNameSurname);
    setstatusEmail(statusEmail);
    setstatusTelefon(statusTelefon);
    setstatusMessage(statusMessage);
    setemailToSend(emailToSend);
    setpublicstreetAdress(publicstreetAdress);
    setpublicDropNot(publicDropNot);
    setdocumentDataFormId(documentDataFormId);

    setbelgeDocumentId(belgeDocumentId);
    setbelgeDocument(belgeDocument);

    setprofileUrlPanel(panelUrlLink);
    setprofileUrlDataId(panelProfileUrlDataId);





            setfaturaDataId(faturaDataId);
            
            settaxNumber(taxNumber);

            settaxAdministration(taxAdministration);
            setcompanyStatus(companyStatus)
            setofficeEmail( officeEmail)
            setofficePhoneNumber(officePhoneNumber);
            setlocation(location)


            setpanelProfileUrlSev(profileUrlPanel? profileUrlPanel : []);

    await setPanels((v) =>
      panelListSort.map((s, i) =>
        s.OrderId
          ? s.OrderId == id && s.isOpen != true
            ? { ...s, isOpen: true, isDeleteOpen: false }
            : { ...s, isOpen: false, isDeleteOpen: false }
          : i == newOrderId && s.isOpen != true
          ? { ...s, isOpen: true, isDeleteOpen: false }
          : { ...s, isOpen: false, isDeleteOpen: false }
      )
    );
  }

  

  //open EDİT PART FROM HERE
  async function openEditPart(
    id,
    newOrderId,
    contactDataId,
    bankDataId,
    documentDataFormId,
    belgeDocumentId,
    panelProfileUrlDataId,
    panelTitle
  ) {
    setcontactdataEditId(contactDataId);
    setbankdataEditId(bankDataId);
    setdocumentdataEditId(documentDataFormId);
    setfileUploadEditId(belgeDocumentId);
    setprofileUrldataEditId(panelProfileUrlDataId);

    setpanelTitleText(panelTitle); //set panel Title

    await setPanels((v) =>
      panels.map((s, i) =>
        s.OrderId
          ? s.OrderId == id && s.isEditTitle != true
            ? { ...s, isEditTitle: true }
            : { ...s, isEditTitle: false }
          : i == newOrderId && s.isEditTitle != true
          ? { ...s, isEditTitle: true }
          : { ...s, isEditTitle: false }
      )
    );
  }

  //DELETE PANEL FROM HERE
  async function DeletePanelOpen(
    id,
    newOrderId,
    BankDataId,
    contactDataId,
    documentDataFormId,
    belgeDocumentId,
    panelProfileUrlDataId,
    
    faturaDataId
  ) {
    console.log("silecek..");
    setbankdataDeleteId(BankDataId);
    setcontactdeleteId(contactDataId);
    setdocumentdeleteId(documentDataFormId);
    setfileUploaddeleteId(belgeDocumentId);
    setprofileUrlDeleteId(panelProfileUrlDataId);

    setfaturaDataId(faturaDataId);

    await setPanels((v) =>
      panelListSort.map((s, i) =>
        s.OrderId
          ? s.OrderId == id && s.isDeleteOpen != true
            ? { ...s, isOpen: false, isDeleteOpen: true }
            : s.OrderId == id && s.isDeleteOpen == true
            ? { ...s, isOpen: false, isDeleteOpen: false }
            : { ...s }
          : i == newOrderId && s.isDeleteOpen != true
          ? { ...s, isOpen: false, isDeleteOpen: true }
          : s.OrderId == id && s.isDeleteOpen == true
          ? { ...s, isOpen: false, isDeleteOpen: false }
          : { ...s }
      )
    );
  }

  //  async function deletePanelContactPart(id){

  //   await setPanels((v) =>
  //       panels.map((s, i) =>

  //           s.OrderId == id && s.type== "conatctAddForm"
  //             ? { ...s, isOpen: false, isDeleteOpen: true }
  //             : s.OrderId == id && s.isDeleteOpen == true
  //             ? { ...s, isOpen: false, isDeleteOpen: false }
  //             : { ...s }
  //       )
  //     );
  //  }

  // add new Panel from here
  async function NewPanelAdd() {
    await setPanels((v) => [
      ...v,
      { id: v[v.length - 1].id + 1, isOpen: false },
    ]);
    setNewPanel(false);
  }

  // add contact from here
  async function NewPanelAddConatct() {
    console.log("uzunluk bak:", panels.length);
    // setorderIdOfContact(panels.length + 1);
    // id: v.length == 0 ? 0 : v[v.length - 1].OrderId + 1,
    await setPanels((v) => [
      ...v,
      {
        OrderId: v.length == 0 ? 0 : panels.length + 1,
        isOpen: false,
        statueMode: true,
        isEditTitle: false,
        type: "conatctAddForm",
        panelTitle: "Baslık",
      },
    ]);
    //setNewPanel(false);
  }

  // remove contact from frontend here
  async function RemovePanelRemoveConatct(arr) {
    let newArray = [...arr];
    console.log(
      "Index buul:",
      newArray.map((s) => s.type == "conatctAddForm")
    );
    //let secondItemTodelete=newArray.map((s)=>s.type == "conatctAddForm")
    const index = newArray.findIndex(
      (element) => element.type == "conatctAddForm"
    );

    if (index !== -1) {
      newArray.splice(index, 1);
      return setPanels(newArray);

      // let newPanel = [...arr];
      // newPanel.splice(arr.type=="conatctAddForm", 1);
      // console.log("sondurum panel here: ",newPanel )
      // return setPanels(newPanel);
    }
  }


  

  async function RemovePanelRemoveFatura(arr) {
    let newArray = [...arr];
    console.log(
      "Index buul:",
      newArray.map((s) => s.type == "faturaData")
    );
    //let secondItemTodelete=newArray.map((s)=>s.type == "conatctAddForm")
    const index = newArray.findIndex(
      (element) => element.type == "faturaData"
    );

    if (index !== -1) {
      newArray.splice(index, 1);
      return setPanels(newArray);

      // let newPanel = [...arr];
      // newPanel.splice(arr.type=="conatctAddForm", 1);
      // console.log("sondurum panel here: ",newPanel )
      // return setPanels(newPanel);
    }
  }


  function Onchange(bankIban) {
    setbankIban(bankIban);
  }



  console.log("setbankIbanBu::", bankIban);

  // onChange = ({ value, iban }) => {

  //   this.setState({ value, iban })

  // }

  // const removeItem = (arr, item) => {
  //   let newArray = [... arr]
  //   const index = newArray.findIndex((element) => element item)
  //   if (index !== -1) {
  //   newArray.splice(index, 1)
  //   return newArray
  //   }
  //   }

  //banka Remove Frontend From here
  async function RemovePanelRemoveBanka(arr) {
    let newArray = [...arr];
    const index = newArray.findIndex((element) => element.type == "bankform");
    if (index !== -1) {
      newArray.splice(index, 1);
      return setPanels(newArray);
    }
    // let newPanel = [...arr];
    // newPanel.splice(arr.type=="bankform", 1);
    // console.log("sondurum panel here: ",newPanel )
    // return setPanels(newPanel);
  }

  //async Document Fromtend Here Remove
  async function RemovePanelRemoveDocumentForm(arr) {
    let newArray = [...arr];
    const index = newArray.findIndex(
      (element) => element.type == "documentForm"
    );
    if (index !== -1) {
      newArray.splice(index, 1);
      return setPanels(newArray);
    }

    // let newPanel = [...arr];
    // newPanel.splice(arr.type=="documentForm", 1);
    // console.log("sondurum panel here: ",newPanel )
    // return setPanels(newPanel);
  }

  //Remove Fatura From Panel


  //File Upload Fromheer Remove
  async function RemovePanelRemoveFileUploadPdf(arr) {
    let newArray = [...arr];
    const index = newArray.findIndex(
      (element) => element.type == "uploadFileDocument"
    );
    if (index !== -1) {
      newArray.splice(index, 1);
      return setPanels(newArray);
    }

    // let newPanel = [...arr];
    // newPanel.splice(arr.type=="uploadFileDocument", 1);
    // console.log("sondurum panel here: ",newPanel )
    // return setPanels(newPanel);
  }

  //Profile Remove From panel bekle
  async function RemovePanelRemoveProfileUrl(arr) {
    let newArray = [...arr];
    const index = newArray.findIndex(
      (element) => element.type == "urlLinkPanel"
    );
    if (index !== -1) {
      newArray.splice(index, 1);
      return setPanels(newArray);
    }

    // let newPanel = [...arr];
    // newPanel.splice(arr.type=="urlLinkPanel", 1);
    // console.log("sondurum panel here: ",newPanel )
    // return setPanels(newPanel);
  }

  //upload PDF FİLE FOM HER


  const[fileUploadContent,setfileUploadContent]= useState("Dosya yükle (maks. 5MB)")

  useEffect(() => {
    console.log("changesmake",  fileUploadContent )


  }, [fileUploadContent])

  function handleImageChange(event) {

    const image = event.target.files[0];

    if (image.size < 2000000) {
      const formData = new FormData();
      // console.log("formDTA  hErer:", image);
      formData.append("image", image, image.name);
      console.log("file upoaded From here:", formData);
      setuploadFilestatueMode(formData);

      setfileUploadContent(image.name)

      // dispatch(
      //   fileUploadChangeAsync({
      //     belgeDocument: formData,
      //     belgeDocumentId: belgeDocumentId,
      //   })
      // );

    } else {
      setfileUploadContent("Dosya Boyutu Aştı")
      console.log("Dosya Büyük");
    }

    // const formData=new FormData();
    // formData.append("image",image,image.name);
    // this.props.uploadImage(formData)
  }

  // Upload Change from here File
function handleChangeFileToUpload(e){


  dispatch(fileUploadChangeAsync({
    belgeDocument: uploadFilestatueMode,
    belgeDocumentId: belgeDocumentId
  })).then(()=>{

    panelListSort.map((v,i)=>{
      if(  v.type==="uploadFileDocument" && v.belgeDocumentUploads.length > 1){

        setuploadFileField(v.belgeDocumentUploads);
        setfileUploadContent("Dosya yükle (maks. 5MB)");

      }
    })


  })
}




  function handleEditPicture(e) {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  }

  // function handleFileUploadChange(event) {
  //   const image = event.target.files[0];
  //   //console.log("File Upload all", image);
  //   // console.log("file oploaded Size:", image.size);

  //   if (image.size < 2000000) {
  //     const formData = new FormData();
  //     // console.log("formDTA  hErer:", image);
  //     formData.append("image", image, image.name);
  //     console.log("file upoaded From here:", formData);
  //     setuploadFilestatueMode(formData);
  //   } else {
  //     console.log("Dosya Büyük");
  //   }

  //   //this.props.uploadImage(formData)
  // }

  function deleteData(name, value) {
    panels.find((e) => e === OrderId);
    if (target) {
      target.values = target.values.filter((e) => e !== value);
    }
  }

  //add Bank from here
  async function NewPanelAddBank() {
    await setPanels((v) => [
      ...v,
      {
        id: v.length == 0 ? 0 : v[v.length - 1].OrderId + 1,
        isOpen: false,
        statueMode: true,
        isEditTitle: false,
        type: "bankform",
        panelTitle: "Başlık",
      },
    ]);
    //setNewPanel(false);
  }

  // add document from here
  async function NewPanelAddDocument() {

    await setPanels((v) => [
      ...v,
      {
        id: v.length == 0 ? 0 : v[v.length - 1].OrderId + 1,
        isOpen: false,
        type: "documentForm",
        isEditTitle: false,
        statueMode: true,
        panelTitle: "Başlık",
      },
    ]);
    //setNewPanel(false);

  }



  // add new Url Link from here
  async function NewPanelURLink() {
    await setPanels((v) => [
      ...v,
      {
        id: v.length == 0 ? 0 : v[v.length - 1].OrderId + 1,
        isOpen: false,
        type: "urlLinkPanel",
        isEditTitle: false,
        statueMode: true,
        panelTitle: "Başlık",
      },
    ]);
    //setNewPanel(false);
  }

  // add Fatura Data from here
  async function NewPanelFtauraEkle() {


    if(ekleDoldu === false){

      await setPanels((v) => [
        ...v,
        {
          id: v.length == 0 ? 0 : v[v.length - 1].OrderId + 1,
          isOpen: false,
          type: "faturaData",
          isEditTitle: false,
          statueMode: true,
          panelTitle: "Başlık",
        },
      ]);
  


    }

    


    //setNewPanel(false);

  }



  // upload file from here
  async function NewPanelAdduploadFile() {
    await setPanels((v) => [
      ...v,
      {
        id: v.length == 0 ? 0 : v[v.length - 1].OrderId + 1,
        isOpen: false,
        type: "uploadFileDocument",
        isEditTitle: false,
        statueMode: true,
        panelTitle: "Başlık",
      },
    ]);
    //setNewPanel(false);
  }

  async function ChangeTitleText(
    id,
    newOrderId,
    contactDataId,
    bankDataId,
    documentDataFormId,
    belgeDocumentId,
    panelProfileUrlDataId,
    panelTitle
  ) {
    setcontactdataEditId(contactDataId);
    setbankdataEditId(bankDataId);
    setdocumentdataEditId(documentDataFormId);
    setfileUploadEditId(belgeDocumentId);
    setprofileUrldataEditId(panelProfileUrlDataId);

    //setpanelTitleText(panelTitle);//set panel Title

    await setPanels((v) =>
      panels.map((s, i) =>
        s.OrderId
          ? s.OrderId == id && s.panelTitle != ""
            ? { ...s, panelTitle: panelTitleText, isEditTitle: false }
            : s.OrderId == id && s.panelTitle == ""
            ? { ...s, panelTitle: panelTitleText, isEditTitle: false }
            : { ...s }
          : i == newOrderId && s.panelTitle != ""
          ? { ...s, panelTitle: panelTitleText, isEditTitle: false }
          : s.OrderId == id && s.panelTitle == ""
          ? { ...s, panelTitle: panelTitleText, isEditTitle: false }
          : { ...s }
      )
    );

    // await setPanels((v) =>
    //   panels.map((s, i) =>
    //     s.OrderId
    //       ? s.OrderId == id && s.isEditTitle != true
    //         ? { ...s, isEditTitle: true }
    //         : { ...s, isEditTitle: false }
    //       : i == newOrderId && s.isEditTitle != true
    //       ? { ...s, isEditTitle: true }
    //       : { ...s, isEditTitle: false }
    //   )
    // );
  }

  const[ekleDoldu,setekleDoldu]= useState(false)


  //fatura Ekle Doldu  yazi gelsin
const [ekledolduyazi,setekledolduyazi]= useState("");

  function ekleDolduFaturaYazi(){

     if(ekleDoldu === true){
      setekledolduyazi("1 Fatura Eklenebilir")

      console.log("doldubu",ekleDoldu)
     }
  }

  const divDecreaseStatuPanel = countContactPanel === 0 ? "none" : "";
  const divDecreaseStatuBankPanel = countBankaPanel === 0 ? "none" : "";
  const divDecreaseStatuDocumentPanel = countDocumentPanel === 0 ? "none" : "";
  const divDecreaseStatueUploadFilePanel =
    countUploadfilePanel === 0 ? "none" : "";
  const divDecreaseStatueProfileUrlPanel =
    countProfileUrlPanel === 0 ? "none" : "";

    const divDecreaeFatura = countFaturaData === 0 || ekleDoldu ? "none": "";
    const divIncreaseFtaura= countFaturaData === 1 || ekleDoldu ? "none" : "";


  //Multiply Bank Info Add More
  const [bankFiledAdd, setbankFiledAdd] = useState([]);

  const [uploadFileField, setuploadFileField] = useState([]);


  useEffect(() => {
    console.log("fileThere::",uploadFileField)


  }, [uploadFileField])


  useEffect(() => {

   console.log("bankAddFileAll", bankFiledAdd)

  }, [bankFiledAdd]);


  //handle bank part list accountName
  function handleBankPanelList(e, index) {

    console.log("targetheert", e.target.value)


    const { name, value } = e.target;

    const list = [...bankFiledAdd];

    var o = Object.create(list[index]);

    Object.defineProperty(o, [name], {
      value: value,
      writable: true,
      enumerable: true,
      configurable: true,
    });

    //console.log("emailpart::",list[index][name] )
    list[index] = o;

    setbankFiledAdd(list);

  }



  //handle bankName

  function handleBankPanelListBankName(e, index) {

    console.log("targethbankName", e.target.value)


    const { name, value } = e.target;

    const list = [...bankFiledAdd];

    var o = Object.create(list[index]);

    Object.defineProperty(o, [name], {
      value: value,
      writable: true,
      enumerable: true,
      configurable: true,
    });

    //console.log("emailpart::",list[index][name] )
    list[index] = o;

    setbankFiledAdd(list);

  }

  //bankStation heer


  function handleBankPanelListBankStation(e, index) {

    console.log("targethbankStation", e.target.value)


    const { name, value } = e.target;

    const list = [...bankFiledAdd];

    var o = Object.create(list[index]);

    Object.defineProperty(o, [name], {
      value: value,
      writable: true,
      enumerable: true,
      configurable: true,
    });

    //console.log("emailpart::",list[index][name] )
    list[index] = o;
    setbankFiledAdd(list);

  }





  //bank Iban

  function handleBankPanelListBankIban(e, index) {

    console.log("targethbankIban", e.target.value)

    const { name, value } = e.target;

    const list = [...bankFiledAdd];

    var o = Object.create(list[index]);

    Object.defineProperty(o, [name], {
      value: value,
      writable: true,
      enumerable: true,
      configurable: true,
    });

    //console.log("emailpart::",list[index][name] )
    list[index] = o;

    setbankFiledAdd(list);

  }

  //bank hesap Numara



  function handleBankPanelListBankAccountNumber( e , index) {


    //console.log("targethbankaccountNum : ", e.target)

    console.log("logındex:", e.target)

    console.log("logındex:", index)

    const { name, value } = e.target

    const list = [...bankFiledAdd];

    var o = Object.create(list[index]);

    Object.defineProperty(o, [name], {

      value: value,
      writable: true,
      enumerable: true,
      configurable: true,

    });

    //console.log("emailpart::",list[index][name] )
    list[index] = o;

    setbankFiledAdd(list);

  }






  //add document for more
  function addUploadFileMore() {
    setuploadFileField([
      ...uploadFileField,
      {
        belgeDocument: "",
      },
    ]);
  }

  //Remove Upload Field fromhere
  function removeUploadFieldLess(index) {
    const uploadList = [...uploadFileField];
    uploadList.splice(index, 1);
    setuploadFileField(uploadList);
  }



  //add Bank Info from here
  function addBankFieldMore() {
    setbankFiledAdd([
      ...bankFiledAdd,
      {
        accountOwner: "",
        bankName: "",
        bankStation: "",
        bankIban: "",
        bankAccountNumber: ""
      },
    ]);
  }
  //Remove Bank Info Field from
  function removeBankFieldLess(index) {
    const bankList = [...bankFiledAdd];

    bankList.splice(index, 1);

    setbankFiledAdd(bankList);

    console.log("not silinmiş", bankList);
    console.log("indexsil::", index);
  }

  //Multiply Input of Phone
  const [telefonInputServ, settelefonInputServ] = useState([]);

  useEffect(() => {
    console.log("telsevHere::", telefonInputServ);
  }, [telefonInputServ]);

  //add phoneNumber Input
  function addPhoneInputHandle() {
    settelefonInputServ([...telefonInputServ, { phoneNumber: "" }]);
  }

  function removeInputPhoneHandle(index) {
    const list = [...telefonInputServ];
    list.splice(index, 1);
    settelefonInputServ(list);
  }

  // panel Url LKink Multiply
  const [panelProfileUrlSev, setpanelProfileUrlSev]=useState([]);

  useEffect(() => {
   console.log("panelUrlProfileee::",panelProfileUrlSev)
  }, [panelProfileUrlSev]);



  //adMore Input field Pnale url
  function addUrlPanelInputHandle(urlLinkNamee,placeholder,socialUrlLink,socialtype) {

    setpanelProfileUrlSev([...panelProfileUrlSev, { 

      socialOrder: panelProfileUrlSev.length ,
      socialUrlHead:urlLinkNamee,
      placeholder: placeholder,
      socialUrlLink: socialUrlLink,
      socialtype: socialtype,
      statuMode: true,
      newValueAdd:true

     }]);

  }

  //remove Url Panel Link
  function removeUrlPanelLinkHandle(index) {
    const list = [...panelProfileUrlSev];
    list.splice(index, 1);
    setpanelProfileUrlSev(list);
  }

  //handle Profile Url to Change 

  //Email handle Changes from heer
  function handleProfileUrlToChange(e, index) {

    console.log("değişiyorbuu")

    const { name, value } = e.target;

    const list = [...panelProfileUrlSev];

    var o = Object.create(list[index]);

    Object.defineProperty(o, [name], {

      value: value,
      writable: true,
      enumerable: true,
      configurable: true,
    }
    );

    //console.log("emailpart::",list[index][name] )
   // list[index] = o;

   
    list[index]={

      socialOrder: panelProfileUrlSev.length ,
      socialUrlHead:panelProfileUrlSev[index].socialUrlHead,
      placeholder: panelProfileUrlSev[index].placeholder,
      socialUrlLink:o.socialUrlLink,
      socialtype:panelProfileUrlSev[index].socialtype,
      socialMediaLinkMatch:panelProfileUrlSev[index].socialMediaLinkMatch,
      statuMode: true,
      newValueAdd:true

    }

    console.log("tummLig::",list)

    setpanelProfileUrlSev(list);

  }


  //multiply Input Of Email
  const [emailInputServ, setemailInputServ] = useState([]);

  useEffect(() => {
    console.log("EmailSev::", emailInputServ);
  }, [emailInputServ]);

  //add Email Input from here
  function addEmailInputHandle() {

    setemailInputServ([...emailInputServ, { emailPosta: "" }]);

  }

  function removeInputEmailHandle(index) {
    const list = [...emailInputServ];
    list.splice(index, 1);

    setemailInputServ(list);
  }

  //handle phone Input Changes
  function handlePhoneList(e, index) {
    //const { name,value}=e
    let list = [...telefonInputServ];

    var o = Object.create(list[index]);

    Object.defineProperty(o, "phoneNumber", {

      value: e,
      writable: true,
      enumerable: true,
      configurable: true,
    });
    list[index] = o;
    //  console.log("ooo", o)
    //  console.log("Listlar",)

    settelefonInputServ(list);

  }

  //Email handle Changes from heer
  function handleEmailList(e, index) {
    const { name, value } = e.target;
    const list = [...emailInputServ];

    var o = Object.create(list[index]);

    Object.defineProperty(o, [name], {
      value: value,
      writable: true,
      enumerable: true,
      configurable: true,
    });

    //console.log("emailpart::",list[index][name] )
    list[index] = o;

    setemailInputServ(list);
  }

  // handle default Email from heer

  function handleDefaultEmailFrom(e, index) {

    console.log("defaultValue::", e.target.value)

    //const { name, value } = e.target.value;

    const list = [...emailInputServ];

    console.log("heee", emailInputServ)

    var o = Object.create(list[index]);

    Object.defineProperty(o, "defaultEmaill", {
      value: true,
      writable: true,
      enumerable: true,
      configurable: true,
    });

    //console.log("emailpart::",list[index][name] )
    list[index] = o;
    setemailInputServ(list);

  }





  //hadnle phone default from heere

  const [radioButtonValueEmail, setradioButtonValueEmail]= useState(false);
  const [radionButtonValuePhone, setradionButtonValuePhone]= useState(false);
  const [radioButtonIndexPhone, setradioButtonIndexPhone] = useState(0);
  const [radioButtonIndexEmail, setradioButtonIndexEmail] = useState(0);

  useEffect(() => {
    console.log("phoneRadioo::",radionButtonValuePhone )
  }, [radionButtonValuePhone]);


  useEffect(() => {
   console.log("EmailDefault::",radioButtonValueEmail )
  }, [radioButtonValueEmail]);


  function handleDefaultPhoneFrom(e, index) {

    //console.log("defaultValue::", e.target.value + "indexhu", index)


    //const { name, value } = e.target;
    const list = [...telefonInputServ];

    console.log("heyuıer:", telefonInputServ)

    var o = Object.create(list[index]);

    Object.defineProperty(o,"defaultNumber", {
      value: true,
      writable: true,
      enumerable: true,
      configurable: true,
    });
    //console.log("emailpart::",list[index][name] )
    list[index] = o;
    settelefonInputServ(list);

  }

  //get the index of radio button Clcik  getRadioButtonIndex PHONE

  function getRadioButtonIndexPhone(e, index) {

    setradioButtonIndexPhone(index)

    console.log("indexhu", index)

    setradionButtonValuePhone(true)

  }

  // handle index of radio hutton click EMAİL

  function getRadioButtonIndexEmail(e, index) {

    setradioButtonIndexEmail(index)
    console.log("indexhu", index)
    setradioButtonValueEmail(true)

  }




  console.log("phoneHere::", telefonInputServ);
  console.log("Email List::", emailInputServ);

  function onChange({ value, iban }) {
    setbankIban(value, iban);

    console.log("datadfgda", bankIban)
  }

  //account Number onChange
  function onChangeBankAccount({value, iban}){
    setbankAccountNum(value, iban)
  }



  //handle Upload Input from here
  function handleUploadFileList(e, index) {
    //const { name,value}=e
    let list = [...uploadFileField];

    var o = Object.create(list[index]);

    Object.defineProperty(o, "belgeDocument", {
      value: e,
      writable: true,
      enumerable: true,
      configurable: true,
    });
    list[index] = o;
    //  console.log("ooo", o)
    //  console.log("Listlar",)

    setuploadFileField(list);
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


// url kısmı burdan başlıyor

const [socialAdd,setSocialAdd]= useState(false)
const [socialMediaFilterText, setSocialMediaFilterText] = useState("");
const [socialMediaAdd, setSocialMediaAdd] = useState(false);

const socialMediaList = useSelector(state => state.socialSlice.socialList);

console.log("allSocial",socialMediaList)

const [socialMediaListSort, setSocialMediaListSort] = useState(socialMediaList != undefined ? [...socialMediaList].sort((a, b) => a.socialOrder - b.socialOrder) : [])


useEffect(() => {
  console.log("*********** social list ****************");
  console.log(socialMediaListSort);

  setSocialMediaListSort(socialMediaList != undefined ? [...socialMediaList].sort((a, b) => a.socialOrder - b.socialOrder) : []);

  console.log(allSocialMedia);
  console.log("soyalmedya uzunluğu : " + socialMediaListSort.length)
}, [socialMediaList]);


const [socialMediaInput, setSocialMediaInput] = useState({
  socialUrlLink: "",
  socialtype: "",
})


const [selectedSocialMedia, setSelectedSocialMedia] = useState({
  name: "",
  id: "",
  value: "",
  status: "",
  order: 0,
});



const [allSocialMedia, setAllSocialMedia] = useState();
const [allSocialMediaFilter, setAllSocialMediaFilter] = useState([]);

const socialStatus = useSelector(state => state.socialSlice.status);//social Media status




useEffect(() => {
  setAllSocialMediaFilter(allSocialMedia ? allSocialMedia : [] );
}, [allSocialMedia])


useEffect(() => {

  // socialMediaListSort.map((v, i) => {
  //     return dispatch(updateSocialMediaUrlAsync({
  //         socialId: v.socialMediaUrlId,
  //         value: {
  //             socialtype: v.socialtype,
  //             socialUrlLink: v.socialUrlLink,
  //             statuMode: v.statuMode,
  //             socialOrder: i,
  //         }
  //     }));
  // });


  console.log("socialMediaListSort");
  console.log(socialMediaListSort);

  setAllSocialMedia([

    {
      socialMeidaName: "Web Site",
      icon: '<i class="fa fa-dribbble"></i>',
      socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "website" ? true : false),
      urlLink: "http://",
      placeholder:"hibritcard.com",
      socialtype:"web",
      socialUrlLink:""

    },
      {
          socialMeidaName: "whatsapp",
          icon: '<i class="fa-brands fa-whatsapp"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "whatsapp" ? true : false),
          urlLink: "http://wa.me/+",
          placeholder:"905351035340",
          socialtype:"whatsapp",
      socialUrlLink:""
         
      },
      {
          socialMeidaName: "telegram",
          icon: '<i class="fa-brands fa-telegram"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "telegram" ? true : false) ? true : false,
          urlLink: "https://telegram.com/",
          placeholder:"",
          socialtype:"telegram",
          socialUrlLink:""
          
      },
      {
          socialMeidaName: "bip",
          icon: '<i class="fa-brands fa-bip"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "bip" ? true : false) ? true : false,
          urlLink: "https://bip.com/",
          placeholder:"",
          socialtype:"bip",
          socialUrlLink:""
          
      },
      {
          socialMeidaName: "instagram",
          icon: '<i class="fa-brands fa-instagram"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "instagram" ? true : false) ? true : false,
          urlLink: "https://instagram.com/",
          placeholder:"",
          socialtype:"instagram",
          socialUrlLink:""
      },
      {
          socialMeidaName: "twitter",
          icon: '<i class="fa-brands fa-twitter"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "linkedin" ? true : false) ? true : false,
          urlLink: "https://twitter.com/",
          placeholder:"",
          socialtype:"twitter",
          socialUrlLink:""
      },

      {
          socialMeidaName: "linkedin",
          icon: '<i class="fa-brands fa-linkedin "></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "linkedin" ? true : false) ? true : false,
          urlLink: "https://linkedin.com/in/",
          placeholder:"",
          socialtype:"linkedin",
          socialUrlLink:""
      },
      {
          socialMeidaName: "facebook",
          icon: '<i class="fa-brands fa-facebook "></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "facebook" ? true : false) ? true : false,
          urlLink: "https://facebook.com/",
          placeholder:"",
          socialtype:"facebook",
          socialUrlLink:""
      },
      {
          socialMeidaName: "youtube",
          icon: '<i class="fa-brands fa-youtube"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "youtube" ? true : false) ? true : false,
          urlLink: "https://youtube.com/",
          placeholder:"",
          socialtype:"youtube",
          socialUrlLink:""
      },
      {
          socialMeidaName: "discord",
          icon: '<i class="fa-brands fa-discord"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "discord" ? true : false) ? true : false,
          urlLink: "https://discord.com/",
          placeholder:"",
          socialtype:"discord",
          socialUrlLink:""
      },
      {
          socialMeidaName: "dribbble",
          icon: '<i class="fa-brands fa-dribbble"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "dribbble" ? true : false) ? true : false,
          urlLink: "https://dribble.com/",
          placeholder:"",
          socialtype:"dribbble",
          socialUrlLink:""
      },
      {
          socialMeidaName: "vimeo",
          icon: '<i class="fa-brands fa-vimeo"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "vimeo" ? true : false) ? true : false,
          urlLink: "https://vimeo.com/",
          placeholder:"",
          socialtype:"vimeo",
          socialUrlLink:""
      },
      {
          socialMeidaName: "ello",
          icon: '<i class="fa-brands fa-ello"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "ello" ? true : false) ? true : false,
          urlLink: "https://ello.com/",
          placeholder:"",
          socialtype:"ello",
          socialUrlLink:""
      },
      {
          socialMeidaName: "github",
          icon: '<i class="fa-brands fa-github"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "github" ? true : false) ? true : false,
          urlLink: "https://github.com/",
          placeholder:"",
          socialtype:"github",
          socialUrlLink:""
      },
      {
          socialMeidaName: "hangouts",
          icon: '<i class="fa-brands fa-hangouts"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "hangouts" ? true : false) ? true : false,
          urlLink: "https://hangouts.com/",
          placeholder:"",
          socialtype:"hangouts",
          socialUrlLink:""
      },
      {
          socialMeidaName: "icbc",
          icon: '<i class="fa-brands fa-icbc"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "icbc" ? true : false) ? true : false,
          urlLink: "https://icbc.com/",
          placeholder:"",
          socialtype:"icbc",
          socialUrlLink:""
      },
      {
          socialMeidaName: "icq",
          icon: '<i class="fa-brands fa-icq"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "icq" ? true : false) ? true : false,
          urlLink: "https://icq.com/",
          placeholder:"",
          socialtype:"icq",
          socialUrlLink:""
      },
      {
          socialMeidaName: "kikmessenger",
          icon: '<i class="fa-brands fa-kikmessenger"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "kikmessenger" ? true : false) ? true : false,
          urlLink: "https://kikmessenger.com/",
          placeholder:"",
          socialtype:"kikmessenger",
          socialUrlLink:""
      },
      {
          socialMeidaName: "twitch",
          icon: '<i class="fa-brands fa-twitch"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "twitch" ? true : false) ? true : false,
          urlLink: "https://twitch.com/",
          placeholder:"",
          socialtype:"twitch",
          socialUrlLink:""
      },
      {
          socialMeidaName: "medium",
          icon: '<i class="fa-brands fa-medium"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "medium" ? true : false) ? true : false,
          urlLink: "https://medium.com/",
          placeholder:"",
          socialtype:"medium",
          socialUrlLink:""
      },
      {
          socialMeidaName: "nimotv",
          icon: '<i class="fa-brands fa-nimotv"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "nimotv" ? true : false) ? true : false,
          urlLink: "https://nimotv.com/",
          placeholder:"",
          socialtype:"nimotv",
          socialUrlLink:""
          
      },
      {
          socialMeidaName: "periscope",
          icon: '<i class="fa-brands fa-periscope"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "periscope" ? true : false) ? true : false,
          urlLink: "https://periscope.com/",
          placeholder:"",
          socialtype:"periscope",
          socialUrlLink:""
      },
      {
          socialMeidaName: "dailymotion",
          icon: '<i class="fa-brands fa-dailymotion"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "dailymotion" ? true : false) ? true : false,
          urlLink: "https://dailymotion.com/",
          placeholder:"",
          socialtype:"dailymotion",
          socialUrlLink:""
      },
      {
          socialMeidaName: "wechat",
          icon: '<i class="fa-brands fa-weixin"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "wechat" ? true : false) ? true : false,
          urlLink: "https://wechat.com/",
          placeholder:"",
          socialtype:"wechat",
          socialUrlLink:""
      },
      {
          socialMeidaName: "qqtile",
          icon: '<i class="fa-brands fa-qq"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "qqtile" ? true : false) ? true : false,
          urlLink: "https://qqtile.com/",
          placeholder:"",
          socialtype:"qqtile",
          socialUrlLink:""
      },
      {
          socialMeidaName: "sineweibo",
          icon: '<i class="fa-brands fa-sineweibo"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "sineweibo" ? true : false) ? true : false,
          urlLink: "https://sineweibo.com/",
          placeholder:"",
          socialtype:"sineweibo",
          socialUrlLink:""
      },
      {
          socialMeidaName: "dlive",
          icon: '<i class="fa-brands fa-dlive"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "dlive" ? true : false) ? true : false,
          urlLink: "https://dlive.com/",
          placeholder:"",
          socialtype:"dlive",
          socialUrlLink:""
      },
      {
          socialMeidaName: "pinterest",
          icon: '<i class="fa-brands fa-pinterest"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "pinterest" ? true : false) ? true : false,
          urlLink: "https://pinterest.com/",
          placeholder:"",
          socialtype:"pinterest",
          socialUrlLink:""
      },
      {
          socialMeidaName: "reddit",
          icon: '<i class="fa-brands fa-reddit"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "reddit" ? true : false) ? true : false,
          urlLink: "https://reddit.com/",
          placeholder:"",
          socialtype:"reddit",
          socialUrlLink:""
      },
      {
          socialMeidaName: "behance",
          icon: '<i class="fa-brands fa-behance"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "behance" ? true : false) ? true : false,
          urlLink: "https://behance.com/",
          placeholder:"",
          socialtype:"behance",
          socialUrlLink:""
      },
      {
          socialMeidaName: "swarm",
          icon: '<i class="fa-brands fa-swarm"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "swarm" ? true : false) ? true : false,
          urlLink: "https://swarm.com/",
          placeholder:"",
          socialtype:"swarm",
          socialUrlLink:""

      },
      {
          socialMeidaName: "signal",
          icon: '<i class="fa-brands fa-signal"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "signal" ? true : false) ? true : false,
          urlLink: "https://signal.com/",
          placeholder:"",
          socialtype:"signal",
          socialUrlLink:""
      },
      {
          socialMeidaName: "yaya",
          icon: '<i class="fa-brands fa-yaya"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "yaya" ? true : false) ? true : false,
          urlLink: "https://yaya.com/",
          placeholder:"",
          socialtype:"yaya",
          socialUrlLink:""
      },
      {
          socialMeidaName: "c2",
          icon: '<i class="fa-brands fa-c2"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "c2" ? true : false) ? true : false,
          urlLink: "https://c2.com/",
          placeholder:"",
          socialtype:"c2",
          socialUrlLink:""
      },
      {
          socialMeidaName: "tango",
          icon: '<i class="fa-brands fa-tango"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "tango" ? true : false) ? true : false,
          urlLink: "https://tango.com/",
          placeholder:"",
          socialtype:"tango",
          socialUrlLink:""
      },
      {
          socialMeidaName: "vero",
          icon: '<i class="fa-brands fa-vero"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "vero" ? true : false) ? true : false,
          urlLink: "https://vero.com/",
          placeholder:"",
          socialtype:"vergo",
          socialUrlLink:""
      },
      {
          socialMeidaName: "zoom",
          icon: '<i class="fa-brands fa-zoom"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "zoom" ? true : false) ? true : false,
          urlLink: "https://zoom.com/",
          placeholder:"",
          socialtype:"zoom",
          socialUrlLink:""
      },
      {
          socialMeidaName: "viber",
          icon: '<i class="fa-brands fa-viber"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "viber" ? true : false) ? true : false,
          urlLink: "https://viber.com/",
          placeholder:"",
          socialtype:"viber",
          socialUrlLink:""
      },
      {
          socialMeidaName: "teams",
          icon: '<i class="fa-brands fa-teams"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "teams" ? true : false) ? true : false,
          urlLink: "https://teams.com/",
          placeholder:"",
          socialtype:"teams",
          socialUrlLink:""
      }, {
          socialMeidaName: "snapchat",
          icon: '<i class="fa-brands fa-snapchat"></i>',
          socialMediaAdded: socialMediaListSort.find(v => v.socialtype == "snapchat" ? true : false) ? true : false,
          urlLink: "https://snapchat.com/",
          placeholder:"",
          socialtype:"snapchat",
          socialUrlLink:""
      },
  ]);



}, [socialMediaListSort])



const [urlLinkName, seturlLinkName]= useState("")

console.log("nameBuu::", urlLinkName)



//function to close popup and add input for url
function addUrlLinkOfSocial(e,v){
  setSocialAdd(false)
  
  addUrlPanelInputHandle(v.urlLink, v.placeholder,v.socialUrlLink,v.socialtype,)

}






  return (
    <>
      <GlobalControllerLayout>
        {" "}
        {newPanel ? (
          <div className="popup-global">
            <div onClick={() => setNewPanel(false)} className="popup-top">
              {" "}
            </div>{" "}
            <div className="popup">
              {countBankaPanel != 0 ||
              countContactPanel != 0 ||
              countDocumentPanel != 0 ||
              countUploadfilePanel != 0 ||
              countProfileUrlPanel != 0 ||
              countFaturaData != 0 ? (
                <div
                  className="close-button"
                  onClick={(e) => {
                    setNewPanel(false);
                    countContactPanel != 0
                      ? postContactData(e, countContactPanel, panelListSort)
                      : "";
                    countProfileUrlPanel != 0
                      ? postprofileUrlPanelData(
                          e,
                          countProfileUrlPanel,
                          panelListSort
                        )
                      : "";
                    countDocumentPanel != 0
                      ? postDocument(e, countDocumentPanel, panelListSort)
                      : "";
                    countBankaPanel != 0
                      ? postBankData(e, countBankaPanel, panelListSort)
                      : "";
                    countUploadfilePanel != 0
                      ? handleUploadFileFirstTimeFile(
                          e,
                          countUploadfilePanel,
                          panelListSort
                        )
                      : "";

                      countFaturaData != 0 ? postFaturaFromData(e,  panelListSort) : "";

                  }}
                >
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
              ) : (
                <div
                  onClick={() => setNewPanel(false)}
                  className="close-button"
                >
                  <i className="fa-solid fa-xmark" style={{
                    color:"#8B8DFF"
                  }}> </i>

                </div>
              )}
              <div className="header-text"> Panel Ekle </div>{" "}
              {/* <div className="description-text">Aşağıdan Bilgi Ekle</div>{" "} */}
              <div className="panel-types">
                <div className="panel-type-item w-full">
                  <div className="type-icon">
                    {" "}
                    {/* <i className="fa-solid fa-phone"> </i>{" "} */}
                    <svg
                      width="45"
                      height="45"
                      viewBox="0 0 45 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="45" height="45" rx="10" fill="#ECF3FF" />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M15.9684 15.2155C18.3866 14.4089 20.8302 15.9237 21.509 18.3761C21.9715 20.0473 21.5335 21.7996 20.4654 22.9995C20.6841 23.2828 20.9232 23.5552 21.1827 23.8149C21.4409 24.0733 21.7117 24.3115 21.9932 24.5295C23.1927 23.453 24.9503 23.01 26.6263 23.4745C29.0782 24.1542 30.5902 26.5997 29.7848 29.0178C29.2565 30.6044 28.2712 31.5684 26.9571 31.8857C25.7361 32.1805 24.4197 31.8671 23.2585 31.3844C20.92 30.4123 18.6108 28.4974 17.5562 27.442C16.4767 26.3617 14.5701 24.0492 13.6068 21.715C13.1284 20.5559 12.8204 19.2443 13.1159 18.0289C13.4338 16.7213 14.3929 15.741 15.9684 15.2155ZM19.5815 18.9096C19.1688 17.4185 17.7976 16.7137 16.6012 17.1128C15.5496 17.4635 15.1849 17.9849 15.0593 18.5014C14.9113 19.1102 15.04 19.9452 15.4555 20.952C16.28 22.9497 17.9899 25.0465 18.9709 26.0283C19.9283 26.9863 22.0228 28.7048 24.0263 29.5376C25.0361 29.9574 25.8752 30.0894 26.4877 29.9415C27.0071 29.8161 27.5332 29.4492 27.8873 28.3859C28.2867 27.1867 27.5807 25.8145 26.0921 25.4019C24.9842 25.0948 23.8451 25.4506 23.1672 26.1766C22.7295 26.6454 21.8951 26.9127 21.1851 26.4171C20.6856 26.0684 20.2112 25.6722 19.7679 25.2286C19.324 24.7843 18.9276 24.3088 18.5788 23.8081C18.0864 23.1012 18.3492 22.27 18.8146 21.8312C19.5352 21.1519 19.8875 20.0153 19.5815 18.9096Z"
                        fill="#ABCAFF"
                      />
                    </svg>
                    {/* <img src="" alt="" /> */}
                  </div>{" "}
                  <div className="type-text">
                    {" "}
                    İletişim

                    {/* İletişim bilgileriniz(telefon, mail vb.) ekleyebilirsiniz.{" "} */}

                  </div>{" "}
                  <div className="type-add" style={{ display: "flex" }}>

                    <div
                      class="value-button"
                      id="decrease"
                      onClick={(e) => {
                        DecreaseDeleteContactPanel(e);
                        RemovePanelRemoveConatct(panels);
                      }}
                      style={{
                        pointerEvents: divDecreaseStatuPanel,
                      }}
                    >
                      <div
                        style={{
                          marginTop: "10px",
                        }}
                      >
                        -
                      </div>
                    </div>
                    <input
                      type="number"
                      id="number"
                      value={countContactPanel}
                    />
                    <div
                      class="value-button"
                      id="increase"
                      onClick={(e) => {
                        IncreaseAddContactPanel();
                        NewPanelAddConatct(e);
                      }}
                    >
                      <div
                        style={{
                          marginTop: "10px",
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>
                </div>
                {/* istediğiniz Url ekleyin burada */}
                <div className="panel-type-item w-full">
                  <div className="type-icon">
                    {" "}
                    {/* <i className="fa-solid fa-folder-plus"> </i>{" "} */}
                    <svg
                      width="45"
                      height="45"
                      viewBox="0 0 45 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="45" height="45" rx="10" fill="#ECF3FF" />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M23 14C18.5817 14 15 17.5817 15 22C15 26.4183 18.5817 30 23 30C27.4183 30 31 26.4183 31 22C31 17.5817 27.4183 14 23 14ZM13 22C13 16.4772 17.4772 12 23 12C28.5228 12 33 16.4772 33 22C33 27.5228 28.5228 32 23 32C17.4772 32 13 27.5228 13 22Z"
                        fill="#ABCAFF"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M21.0854 16.0422C20.4305 17.5156 20 19.6211 20 22C20 24.3789 20.4305 26.4844 21.0854 27.9578C21.4134 28.6958 21.778 29.2311 22.1324 29.5683C22.4816 29.9007 22.7731 30 23 30C23.2269 30 23.5184 29.9007 23.8676 29.5683C24.222 29.2311 24.5866 28.6958 24.9146 27.9578C25.5695 26.4844 26 24.3789 26 22C26 19.6211 25.5695 17.5156 24.9146 16.0422C24.5866 15.3042 24.222 14.7689 23.8676 14.4317C23.5184 14.0993 23.2269 14 23 14C22.7731 14 22.4816 14.0993 22.1324 14.4317C21.778 14.7689 21.4134 15.3042 21.0854 16.0422ZM20.7536 12.9829C21.3615 12.4044 22.1223 12 23 12C23.8777 12 24.6385 12.4044 25.2464 12.9829C25.8491 13.5565 26.3464 14.3392 26.7422 15.2299C27.5351 17.0139 28 19.4083 28 22C28 24.5917 27.5351 26.9861 26.7422 28.7701C26.3464 29.6608 25.8491 30.4435 25.2464 31.0171C24.6385 31.5956 23.8777 32 23 32C22.1223 32 21.3615 31.5956 20.7536 31.0171C20.1509 30.4435 19.6536 29.6608 19.2578 28.7701C18.4649 26.9861 18 24.5917 18 22C18 19.4083 18.4649 17.0139 19.2578 15.2299C19.6536 14.3392 20.1509 13.5565 20.7536 12.9829Z"
                        fill="#ABCAFF"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M23.1584 26C19.8707 26 17.0954 26.7732 15.5664 27.8241L14.4336 26.1759C16.4125 24.8158 19.6355 24 23.1584 24C26.4844 24 29.5304 24.7265 31.521 25.9415L30.4791 27.6486C28.8986 26.684 26.2489 26 23.1584 26Z"
                        fill="#ABCAFF"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M23.0641 20C19.5786 20 16.3884 19.1834 14.4291 17.821L15.5709 16.179C17.0788 17.2275 19.8177 18 23.0641 18C26.2286 18 28.9165 17.2656 30.4485 16.2527L31.5515 17.921C29.5847 19.2214 26.4682 20 23.0641 20Z"
                        fill="#ABCAFF"
                      />
                    </svg>
                  </div>{" "}
                  <div className="type-text">
                    {" "}
                    Sosyal Medya / Web
                    {/* İstediğiniz url adresini profilinizde sergileyebilirsiniz. */}
                  </div>{" "}
                  <div className="type-add" style={{ display: "flex" }}>
                    <div
                      class="value-button"
                      id="decrease"
                      onClick={(e) => {
                        DecreaseDeleteProfileUrlPanel(e);
                        RemovePanelRemoveProfileUrl(panels);
                      }}
                      style={{
                        pointerEvents: divDecreaseStatueProfileUrlPanel,
                      }}
                    >
                      <div
                        style={{
                          marginTop: "10px",
                        }}
                      >
                        -
                      </div>
                    </div>
                    <input
                      type="number"
                      id="number"
                      value={countProfileUrlPanel}
                    />
                    <div
                      class="value-button"
                      id="increase"
                      onClick={(e) => {
                        IncreaseAddProfilePanel(e);
                        NewPanelURLink(e);
                      }}
                    >
                      <div
                        style={{
                          marginTop: "10px",
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>
                  {/* <div className="type-add" onClick={NewPanelURLink}>
                    {" "}
                    Ekle{" "}
                  </div>{" "} */}
                </div>{" "}
                {/* Bank Add fil */}{" "}
                <div className="panel-type-item w-full">
                  <div className="type-icon">
                    {" "}
                    {/* <i className="fa-solid fa-wallet"> </i>{" "} */}
                    <svg
                      width="45"
                      height="45"
                      viewBox="0 0 45 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="45" height="45" rx="10" fill="#ECF3FF" />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13 17C13 14.2386 15.2386 12 18 12H28C30.7614 12 33 14.2386 33 17V27C33 29.7614 30.7614 32 28 32H18C15.2386 32 13 29.7614 13 27V17ZM18 14C16.3431 14 15 15.3431 15 17V27C15 28.6569 16.3431 30 18 30H28C29.6569 30 31 28.6569 31 27V17C31 15.3431 29.6569 14 28 14H18Z"
                        fill="#ABCAFF"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M22 22C22 19.7909 23.7909 18 26 18H31C32.1046 18 33 18.8954 33 20V24C33 25.1046 32.1046 26 31 26H26C23.7909 26 22 24.2091 22 22ZM26 20C24.8954 20 24 20.8954 24 22C24 23.1046 24.8954 24 26 24H31V20H26Z"
                        fill="#ABCAFF"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M25 22C25 21.4477 25.4477 21 26 21L26.1 21C26.6523 21 27.1 21.4477 27.1 22C27.1 22.5523 26.6523 23 26.1 23L26 23C25.4477 23 25 22.5523 25 22Z"
                        fill="#ABCAFF"
                      />
                    </svg>
                  </div>{" "}
                  <div className="type-text w-full">
                    {" "}
                    Banka Hesapları
                    {/* Banka hesap bilgilerinizi ekleyebilirsiniz.{" "} */}
                  </div>{" "}
                  <div className="type-add" style={{ display: "flex" }}>
                    <div
                      class="value-button"
                      id="decrease"
                      onClick={(e) => {
                        DecreaseDeleteBankaPanel(e);
                        RemovePanelRemoveBanka(panels);
                      }}
                      style={{
                        pointerEvents: divDecreaseStatuBankPanel,
                      }}
                    >
                      <div
                        style={{
                          marginTop: "10px",
                        }}
                      >
                        -
                      </div>
                    </div>
                    <input type="number" id="number" value={countBankaPanel} />
                    <div
                      class="value-button"
                      id="increase"
                      onClick={(e) => {
                        IncreaseAddBankaPanel(e);
                        NewPanelAddBank(e);
                      }}
                    >
                      <div
                        style={{
                          marginTop: "10px",
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>
                  {/* <div
                    className="type-add"
                    onClick={(e) => {
                      NewPanelAddBank(e);
                      postBankData(e);
                    }}
                  >
                    {" "}
                    Ekle{" "}
                  </div>{" "} */}
                </div>{" "}
                {/* belge sergilemek documnent fil ***************/}{" "}
                <div className="panel-type-item w-full">
                  <div className="type-icon">
                    {" "}
                    {/* <i className="fa-solid fa-folder-plus"> </i>{" "} */}
                    <svg
                      width="45"
                      height="45"
                      viewBox="0 0 45 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="45" height="45" rx="10" fill="#ECF3FF" />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M17 14C15.8954 14 15 14.8954 15 16V28C15 29.1046 15.8954 30 17 30H29C30.1046 30 31 29.1046 31 28V18.25C31 17.1454 30.1046 16.25 29 16.25H23.8284C23.0328 16.25 22.2697 15.9339 21.7071 15.3713L20.6287 14.2929C20.4411 14.1054 20.1868 14 19.9216 14H17ZM13 16C13 13.7909 14.7909 12 17 12H19.9216C20.7172 12 21.4803 12.3161 22.0429 12.8787L23.1213 13.9571C23.3089 14.1446 23.5632 14.25 23.8284 14.25H29C31.2091 14.25 33 16.0409 33 18.25V28C33 30.2091 31.2091 32 29 32H17C14.7909 32 13 30.2091 13 28V16Z"
                        fill="#ABCAFF"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M23 19C23.5523 19 24 19.4477 24 20V22H26C26.5523 22 27 22.4477 27 23C27 23.5523 26.5523 24 26 24H24V26C24 26.5523 23.5523 27 23 27C22.4477 27 22 26.5523 22 26L22 24H20C19.4477 24 19 23.5523 19 23C19 22.4477 19.4477 22 20 22H22V20C22 19.4477 22.4477 19 23 19Z"
                        fill="#ABCAFF"
                      />
                    </svg>
                  </div>{" "}
                  <div className="type-text">
                    {" "}
                    Belge Yükle
                    {/* Sergilemek istediğiniz belgeleri ekleyebilirsiniz.{" "} */}
                  </div>{" "}
                  <div className="type-add" style={{ display: "flex" }}>
                    <div
                      class="value-button"
                      id="decrease"
                      onClick={(e) => {
                        DecreaseDeleteUploadFilePanel(e);
                        RemovePanelRemoveFileUploadPdf(panels);
                      }}
                      style={{
                        pointerEvents: divDecreaseStatueUploadFilePanel,
                      }}
                    >
                      <div
                        style={{
                          marginTop: "10px",
                        }}
                      >
                        -
                      </div>
                    </div>
                    <input
                      type="number"
                      id="number"
                      value={countUploadfilePanel}
                    />
                    <div
                      class="value-button"
                      id="increase"
                      onClick={(e) => {
                        IncreaseAddUploadFilePanel(e);
                        NewPanelAdduploadFile(e);
                      }}
                    >
                      <div
                        style={{
                          marginTop: "10px",
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>
                </div>
                {/* form documnent fil */}{" "}
                <div className="panel-type-item w-full">
                  <div className="type-icon">
                    {" "}
                    {/* <i className="fa-solid fa-file-lines"> </i>{" "} */}
                    <svg
                      width="45"
                      height="45"
                      viewBox="0 0 45 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="45" height="45" rx="10" fill="#ECF3FF" />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M19 27C19 26.4477 19.4477 26 20 26H26C26.5523 26 27 26.4477 27 27C27 27.5523 26.5523 28 26 28H20C19.4477 28 19 27.5523 19 27Z"
                        fill="#ABCAFF"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M19 23C19 22.4477 19.4477 22 20 22H26C26.5523 22 27 22.4477 27 23C27 23.5523 26.5523 24 26 24H20C19.4477 24 19 23.5523 19 23Z"
                        fill="#ABCAFF"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M19 19C19 18.4477 19.4477 18 20 18H21C21.5523 18 22 18.4477 22 19C22 19.5523 21.5523 20 21 20H20C19.4477 20 19 19.5523 19 19Z"
                        fill="#ABCAFF"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M19 14C17.8954 14 17 14.8954 17 16V28C17 29.1046 17.8954 30 19 30H27C28.1046 30 29 29.1046 29 28V18.8284C29 18.5632 28.8946 18.3089 28.7071 18.1213L24.8787 14.2929C24.6911 14.1054 24.4368 14 24.1716 14H19ZM15 16C15 13.7909 16.7909 12 19 12H24.1716C24.9672 12 25.7303 12.3161 26.2929 12.8787L30.1213 16.7071C30.6839 17.2697 31 18.0328 31 18.8284V28C31 30.2091 29.2091 32 27 32H19C16.7909 32 15 30.2091 15 28V16Z"
                        fill="#ABCAFF"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M25 13V15C25 16.6569 26.3431 18 28 18H30V20H28C25.2386 20 23 17.7614 23 15V13H25Z"
                        fill="#ABCAFF"
                      />
                    </svg>
                  </div>{" "}
                  <div className="type-text">
                    {" "}
                    Müşteri İletişim Formu
                    {/* İletişim formu sayesinde kişisel bilgilerinzi vermeden
                    kişilerle iletişime geçebilirsiniz..{" "} */}
                  </div>{" "}
                  <div className="type-add" style={{ display: "flex" }}>
                    <div
                      class="value-button"
                      id="decrease"
                      onClick={(e) => {
                        DecreaseDeleteDocumnentPanel(e);
                        RemovePanelRemoveDocumentForm(panels);
                      }}
                      style={{
                        pointerEvents: divDecreaseStatuDocumentPanel,
                      }}
                    >
                      <div
                        style={{
                          marginTop: "10px",
                        }}
                      >
                        -
                      </div>
                    </div>
                    <input
                      type="number"
                      id="number"
                      value={countDocumentPanel}
                    />
                    <div
                      class="value-button"
                      id="increase"
                      onClick={(e) => {
                        IncreaseAddDocumentPanel(e);
                        NewPanelAddDocument(e);
                      }}
                    >
                      <div
                        style={{
                          marginTop: "10px",
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>
                </div>{" "}

                {/* fatura Biligisi Ekleyin Buarada */}



                <div className="panel-type-item w-full">
                  <div className="type-icon">
                    {" "}
                    {/* <i className="fa-solid fa-phone"> </i>{" "} */}
                    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="45" height="45" rx="10" fill="#ECF3FF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19 27C19 26.4477 19.4477 26 20 26H26C26.5523 26 27 26.4477 27 27C27 27.5523 26.5523 28 26 28H20C19.4477 28 19 27.5523 19 27Z" fill="#ABCAFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19 23C19 22.4477 19.4477 22 20 22H26C26.5523 22 27 22.4477 27 23C27 23.5523 26.5523 24 26 24H20C19.4477 24 19 23.5523 19 23Z" fill="#ABCAFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19 19C19 18.4477 19.4477 18 20 18H21C21.5523 18 22 18.4477 22 19C22 19.5523 21.5523 20 21 20H20C19.4477 20 19 19.5523 19 19Z" fill="#ABCAFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19 14C17.8954 14 17 14.8954 17 16V28C17 29.1046 17.8954 30 19 30H27C28.1046 30 29 29.1046 29 28V18.8284C29 18.5632 28.8946 18.3089 28.7071 18.1213L24.8787 14.2929C24.6911 14.1054 24.4368 14 24.1716 14H19ZM15 16C15 13.7909 16.7909 12 19 12H24.1716C24.9672 12 25.7303 12.3161 26.2929 12.8787L30.1213 16.7071C30.6839 17.2697 31 18.0328 31 18.8284V28C31 30.2091 29.2091 32 27 32H19C16.7909 32 15 30.2091 15 28V16Z" fill="#ABCAFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M25 13V15C25 16.6569 26.3431 18 28 18H30V20H28C25.2386 20 23 17.7614 23 15V13H25Z" fill="#ABCAFF"/>
</svg>


                    {/* <img src="" alt="" /> */}
                  </div>{" "}
                  <div className="type-text" >
                    {" "}
                    Fatura Bilgileri
                    {/* İletişim bilgileriniz(telefon, mail vb.) ekleyebilirsiniz.{" "} */}
                  </div>{" "}


                  {/* <div className="type-add" style={{  marginRight:"33px" }}
                  onClick={(e)=>{NewPanelFtauraEkle(e);   IncreaseAddFaturaDataPanel(e) ; }}
                  >
                    


{
  ekleDoldu ?
  (
<div>

</div>
  ):
  (

    <div>
      Ekle
  </div>

  )

}
                    

                  </div> */}


                 

                      <div className="type-add" style={{ display: "flex" }}

>
                    <div
                      class="value-button"
                      id="decrease"
                     onClick={(e)=>{
                      DecreaseFaturaDataPanel(e);
                      RemovePanelRemoveFatura(panels);
                     }}
                      style={{
                        pointerEvents: divDecreaeFatura,
                      }}
                    >
                      <div
                        style={{
                          marginTop: "10px",
                        }}
                      >
                        -
                      </div>
                    </div>
                    <input
                      type="number"
                      id="number"
                      value={ ekleDoldu ? 0 : countFaturaData}
                    />
                    <div
                      class="value-button"
                      id="increase"

                      onClick={(e)=>{NewPanelFtauraEkle(e); IncreaseAddFaturaDataPanel(e); ekleDolduFaturaYazi(e) }}

                      // style={{
                      //   pointerEvents: divIncreaseFtaura,
                      // }}
                     
                    >
                      <div
                        style={{
                          marginTop: "10px",
                        }}
                      >
                        +
                      </div>
                    </div>





                  </div>

                  

                   
                </div>

                {/* {
                    ekledolduyazi !=="" && (

                      <div className="panel-type-item w-full">

<div style={{
                        color:"red",
                        fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "400",
fontSize: "11px",
lineHeight: "13px",
textAlign: "center",
justifyContent:"end",
position:"absolute"
                      }}  >
                        {ekledolduyazi}
                      </div>


                      </div>

                     
                    )
                  } */}


                  
{
                    ekledolduyazi !=="" && (

                     

<div style={{
                        color:"red",
                        fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "400",
fontSize: "11px",
lineHeight: "13px",
// textAlign: "center",
justifyContent:"end",
width:"100%"
                      }}  >
                        <div  style={{
                          position: "relative",
                          textAlign: "end",
                          justifyContent: "end",
                          width: "100%",
                          marginTop: "-20px",
                        }}>
                        {ekledolduyazi}
                        </div>
                       
                      </div>


                      

                     
                    )
                  }


               



                {/* //yeni özellikler geliyor */}
                <div className="panel-type-item w-full">


                  <div className="type-icon">
                    {" "}
                    {/* <i className="fa-solid fa-folder-plus"> </i>{" "} */}
                    <svg
                      width="45"
                      height="45"
                      viewBox="0 0 45 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="45" height="45" rx="10" fill="#ECF3FF" />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M21.2864 13.9082C22.0637 12.6165 23.9363 12.6165 24.7137 13.9082L26.6008 17.044L30.1664 17.8698C31.635 18.2099 32.2137 19.9909 31.2254 21.1293L28.8263 23.8931L29.1427 27.5394C29.273 29.0412 27.7581 30.1419 26.37 29.5538L23 28.1261L19.6301 29.5538C18.242 30.1419 16.7271 29.0412 16.8574 27.5394L17.1738 23.8931L14.7746 21.1293C13.7864 19.9909 14.3651 18.2099 15.8337 17.8698L19.3992 17.044L21.2864 13.9082ZM23 14.9395L21.1129 18.0753C20.8336 18.5393 20.3781 18.8703 19.8505 18.9925L16.285 19.8182L18.6842 22.5821C19.0392 22.9911 19.2132 23.5265 19.1663 24.0661L18.8499 27.7123L22.2199 26.2846C22.7185 26.0733 23.2816 26.0733 23.7802 26.2846L27.1502 27.7123L26.8337 24.0661C26.7869 23.5265 26.9609 22.9911 27.3159 22.5821L29.7151 19.8182L26.1496 18.9925C25.622 18.8703 25.1665 18.5393 24.8872 18.0753L23 14.9395Z"
                        fill="#ABCAFF"
                      />
                    </svg>
                  </div>{" "}
                  <div className="type-text">
                    {" "}
                    Yeni özellikler yakında Hibrit Card’da...
                  </div>{" "}
                  <div
                    className="type-add"
                    style={{ display: "flex", visibility: "hidden" }}
                  >
                    <div
                      class="value-button"
                      id="decrease"
                      value="Decrease Value"
                    >
                      <div
                        style={{
                          marginTop: "10px",
                        }}
                      >
                        -
                      </div>
                    </div>
                    <input type="number" id="number" value="0" />
                    <div
                      class="value-button"
                      id="increase"
                      value="Increase Value"
                    >
                      <div
                        style={{
                          marginTop: "10px",
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}


         {/* //social Medi panel popup Open from here */}




         { socialAdd ? 

         (

          <div className='popup-global'>
                    <div onClick={() => setSocialAdd(false) } className='popup-top'></div>
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

                            <input type="text" placeholder='Sosyal medya arayın' value={socialMediaFilterText} onChange={e => { setSocialMediaFilterText(e.target.value); e.target.value != "" ? 
                            setAllSocialMediaFilter([...allSocialMedia].filter(s => s.socialMeidaName.toLowerCase().includes(e.target.value.toLowerCase()))) :
                             setAllSocialMediaFilter(allSocialMedia); }} />
                        </div>
                        <div className='social-types'>
                            {allSocialMediaFilter.map((v, i) => {


                                return <div key={i} className='social-type-item' onClick={(e)=>{addUrlLinkOfSocial(e,v); seturlLinkName(v.urlLink)}}>

                                    <div className='type-icon' dangerouslySetInnerHTML={{ __html: v.icon }}></div>
                                    <div className='type-text'>{v.socialMeidaName}</div>
                                    {/* <div className='type-add'>{v.socialMediaAdded ? <span>Eklendi</span> : <i className="fa-solid fa-angle-right"></i>}</div> */}
                                    <div>
                                      <i className="fa-solid fa-angle-right"></i>
                                    </div>
                                </div>



                            })}
                        </div>
                    </div>
                </div>
         )
                
                : (
                  ""
                )
            }





         {/* social Media Popup end From Here ****************/}



        <div className="main-content ">
          <hr />
          <div className="panel-area">
            <div className="panel-button">
              <div
                onClick={() => {
                  setNewPanel(true);
                  setcountBankaPanel(0);
                  setcountContactPanel(0);
                  setcountDocumentPanel(0);
                  setcountUploadfilePanel(0);
                  setcountProfileUrlPanel(0);
                }}
                className="global-button new-panel-button"
                style={{ display: "flex", margin: "auto", width: "230px" }}
              >
                <div>
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
                      d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z"
                      fill="white"
                    />
                  </svg>
                </div>

                <div style={{ margin: "auto" }}>
                  <span
                    style={{
                      fontFamily: "Montserrat",
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "13px",
                      lineHeight: "16px",
                      textAlign: "center",
                      color: "#FFFFFF",
                    }}
                  >
                    {" "}
                  Panel Ekle{" "}
                  </span>{" "}
                </div>

              </div>{" "}
            </div>{" "}
            {/* first one panel to drop */}{" "}
            <div className="panel-content">
              <List
                values={panelListSort}
                onChange={({ oldIndex, newIndex }) => {
                  panelOrderIdChangeUpdate(oldIndex, newIndex);
                }}
                renderList={({ children, props }) => (
                  <div {...props}> {children} </div>
                )}
                renderItem={({ value, props }) => (
                  <div {...props}>
                    {" "}
                    {
                      <div key={props.key} className="panel-item">
                        <div className="panel-up">
                          <div className="scroll-button">
                            <img src="/icons/scroll-button.svg" />
                          </div>{" "}
                          <button className="item-content">
                            <div className="content-header">
                              <div className="header-left">
                                {value.isEditTitle ? (
                                  <div
                                    style={{
                                      display: "flex",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    <div style={{ maxWidth: "100px" }}>
                                      <TextField
                                        id="standard-basic"
                                        label={
                                          value.panelTitle == ""
                                            ? panelTitleText
                                            : value.panelTitle
                                        }
                                        variant="standard"
                                        value={panelTitleText}
                                        onChange={(e) =>
                                          setpanelTitleText(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div
                                      onClick={(e) => {
                                        //openEditPart(value.OrderId, props.key, value.contactDataId,  value.BankDataId , value.documentDataFormId, value.belgeDocumentId);
                                        value.type == "conatctAddForm"
                                          ? contactEditTitlePanel()
                                          : value.type == "bankform"
                                          ? bankEditTitlePanel()
                                          : value.type == "documentForm"
                                          ? documentEditTitlePanel()
                                          : value.type == "uploadFileDocument"
                                          ? FileUploadEditTitlePanel()
                                          : value.type == "urlLinkPanel"
                                          ? profileUrlEditTitlePanel() :
                                          value.type == "faturaData" ?
                                          contactEditFaturaitlePanel()
                                          : "";

                                        ChangeTitleText(
                                          value.OrderId,
                                          props.key,
                                          value.contactDataId,
                                          value.BankDataId,
                                          value.documentDataFormId,
                                          value.belgeDocumentId,
                                          value.panelProfileUrlDataId,
                                          value.panelTitle
                                        );
                                      }}
                                      style={{
                                        justifyContent: "center",
                                        textAlign: "center",
                                        margin: "auto",
                                        cursor: "pointer",
                                      }}
                                    >
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
                                          d="M6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V9C20 7.89543 19.1046 7 18 7H13C12.0557 7 11.1666 6.55542 10.6 5.8L9.55 4.4C9.36115 4.14819 9.06476 4 8.75 4H6ZM2 6C2 3.79086 3.79086 2 6 2H8.75C9.69427 2 10.5834 2.44458 11.15 3.2L12.2 4.6C12.3889 4.85181 12.6852 5 13 5H18C20.2091 5 22 6.79086 22 9V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6Z"
                                          fill="#8B8DFF"
                                        />
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M15.6839 11.2705C16.0868 11.6482 16.1072 12.281 15.7295 12.6839L11.9795 16.6839C11.6213 17.0661 11.0289 17.107 10.6215 16.7778L8.37145 14.9596C7.94189 14.6125 7.87506 13.9829 8.22218 13.5533C8.5693 13.1237 9.19893 13.0569 9.62849 13.404L11.1559 14.6383L14.2704 11.3161C14.6482 10.9131 15.281 10.8927 15.6839 11.2705Z"
                                          fill="#8B8DFF"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                ) : (
                                  <div style={{ display: "flex" }}>
                                    <div className="header-text">
                                      {value.panelTitle == "" && value.type=="conatctAddForm" 
                                         ? "İletişim Bilgileri" : value.panelTitle == "" && value.type=="urlLinkPanel" ? "Linkler" :
                                         value.panelTitle == "" && value.type=="bankform" ? "Banka Bilgileri" : value.panelTitle == "" && value.type=="documentForm" ?
                                         "Müşteri Formu" : value.panelTitle == "" && value.type=="uploadFileDocument" ? "Belgeler" :
                                         value.panelTitle == "" && value.type=="faturaData" ? "Fatura"
                                        : value.panelTitle}
                                      {/* {props.key} */}
                                    </div>

                                    <div
                                      style={{
                                        justifyContent: "center",
                                        marginLeft: "10px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        openEditPart(
                                          value.OrderId,
                                          props.key,
                                          value.contactDataId,
                                          value.BankDataId,
                                          value.documentDataFormId,
                                          value.belgeDocumentId,
                                          value.panelProfileUrlDataId,
                                          value.panelTitle
                                        );
                                        console.log(
                                          "getid:",
                                          value.documentDataFormId
                                        );
                                      }}
                                    >
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        background="rgba(0, 0, 0, 0.5)"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M12.0118 3.33333C11.8381 3.33333 11.6715 3.40233 11.5487 3.52516L4.28338 10.7904C4.02706 11.0468 3.84522 11.3679 3.7573 11.7196L3.58293 12.4171L4.28044 12.2427C4.6321 12.1548 4.95326 11.973 5.20958 11.7166L12.4749 4.45136C12.5357 4.39055 12.5839 4.31835 12.6168 4.23889C12.6497 4.15943 12.6667 4.07427 12.6667 3.98826C12.6667 3.90225 12.6497 3.81709 12.6168 3.73763C12.5839 3.65817 12.5357 3.58597 12.4749 3.52516C12.414 3.46434 12.3418 3.4161 12.2624 3.38319C12.1829 3.35027 12.0978 3.33333 12.0118 3.33333ZM10.6058 2.58235C10.9787 2.20948 11.4844 2 12.0118 2C12.2729 2 12.5314 2.05143 12.7726 2.15135C13.0139 2.25127 13.233 2.39772 13.4177 2.58235C13.6023 2.76697 13.7487 2.98616 13.8487 3.22739C13.9486 3.46861 14 3.72716 14 3.98826C14 4.24936 13.9486 4.50791 13.8487 4.74913C13.7487 4.99036 13.6023 5.20954 13.4177 5.39417L6.15239 12.6594C5.72519 13.0866 5.18993 13.3897 4.60382 13.5362L2.82837 13.9801C2.60119 14.0369 2.36086 13.9703 2.19528 13.8047C2.02969 13.6392 1.96312 13.3988 2.01992 13.1716L2.46378 11.3962C2.61031 10.8101 2.91337 10.2748 3.34057 9.84762L10.6058 2.58235Z"
                                          fill="black"
                                          fill-opacity="0.5"
                                        />
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M10.8618 7.13806L8.86182 5.13806L9.80463 4.19525L11.8046 6.19525L10.8618 7.13806Z"
                                          fill="black"
                                          fill-opacity="0.5"
                                        />
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M8 13.3334C8 12.9652 8.29848 12.6667 8.66667 12.6667L13.3333 12.6667C13.7015 12.6667 14 12.9652 14 13.3334C14 13.7015 13.7015 14 13.3333 14L8.66667 14C8.29848 14 8 13.7015 8 13.3334Z"
                                          fill="black"
                                          fill-opacity="0.5"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                )}
                                {/* <img src="/icons/Edit-888888.svg" />{" "} */}

                                <div
                                  className="header-url"
                                  onClick={() =>
                                    PanelOpen(
                                      value.OrderId,
                                      value.accountOwner,
                                      value.bankIban,
                                      value.bankName,
                                      value.bankStation,
                                      value.BankDataId,
                                      value.type,
                                      props.key,

                                      value.profileCity,
                                      value.profileCountry,
                                      value.profileNot,
                                      value.profilePosition,
                                      value.panelPhoneNumbers,
                                      value.panelEmailPostas,
                                      value.bankDataAll,
                                      value.belgeDocumentUploads,

                                      value.publicName,
                                      value.publicOrganization,
                                      value.publicsurname,
                                      value.streetAdress,
                                      value.contactDataId,

                                      value.statusNameSurname,
                                      value.statusEmail,
                                      value.statusTelefon,
                                      value.statusMessage,
                                      value.emailToSend,
                                      value.publicstreetAdress,
                                      value.publicDropNot,
                                      value.documentDataFormId,

                                      value.belgeDocument,
                                      value.belgeDocumentId,
                                      value.panelUrlLink,
                                      value.panelProfileUrlDataId,


                                      value.faturaDataId,
                                      value.taxNumber,
                                      value.taxAdministration,
                                      value.companyStatus,
                                      value.officeEmail,
                                      value.officePhoneNumber,
                                      value.location,

                                      value.profileUrlPanel,

                                    )
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  {value.type == "conatctAddForm" ? (

                                    <div style={{display:"flex"}}>
                                      <div>

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
                                        d="M2 7C2 4.23858 4.23858 2 7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7ZM7 4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V7C20 5.34315 18.6569 4 17 4H7Z"
                                        fill="#8B8DFF"
                                      />
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8ZM8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10C16 12.2091 14.2091 14 12 14C9.79086 14 8 12.2091 8 10Z"
                                        fill="#8B8DFF"
                                      />
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M11.9998 17C9.44261 17 7.2567 18.6001 6.39342 20.8572L4.52539 20.1428C5.67496 17.1371 8.58655 15 11.9998 15C15.413 15 18.3246 17.1371 19.4742 20.1428L17.6061 20.8572C16.7429 18.6001 14.5569 17 11.9998 17Z"
                                        fill="#8B8DFF"
                                      />
                                    </svg>

                                      </div>
                                      &nbsp;

                                      <div style={{fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: 700,
fontSize: "11px",
lineHeight: "13px",
margin:"auto",
color:"#8B8DFF"

}}>
                                        Düzenle
                                      </div>


                                    </div>

                                  ) : value.type == "bankform" ? (

                                    <div style={{ display:"flex"}}>
                                      <div>
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
                                        d="M2 7C2 4.23858 4.23858 2 7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7ZM7 4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V7C20 5.34315 18.6569 4 17 4H7Z"
                                        fill="#8B8DFF"
                                      />
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M11 12C11 9.79086 12.7909 8 15 8H20C21.1046 8 22 8.89543 22 10V14C22 15.1046 21.1046 16 20 16H15C12.7909 16 11 14.2091 11 12ZM15 10C13.8954 10 13 10.8954 13 12C13 13.1046 13.8954 14 15 14H20V10H15Z"
                                        fill="#8B8DFF"
                                      />
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M14 12C14 11.4477 14.4477 11 15 11L15.1 11C15.6523 11 16.1 11.4477 16.1 12C16.1 12.5523 15.6523 13 15.1 13L15 13C14.4477 13 14 12.5523 14 12Z"
                                        fill="#8B8DFF"
                                      />
                                    </svg>

                                      </div>

                                      <div style={{fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: 700,
fontSize: "11px",
lineHeight: "13px",
margin:"auto",
color:"#8B8DFF"
}}>
                                        Düzenle
                                      </div>



                                    </div>

                                  ) : value.type == "documentForm" ? (

                                    <div style={{display:"flex"}}>

                                      <div>

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
                                        d="M8 17C8 16.4477 8.44772 16 9 16H15C15.5523 16 16 16.4477 16 17C16 17.5523 15.5523 18 15 18H9C8.44772 18 8 17.5523 8 17Z"
                                        fill="#8B8DFF"
                                      />
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M8 13C8 12.4477 8.44772 12 9 12H15C15.5523 12 16 12.4477 16 13C16 13.5523 15.5523 14 15 14H9C8.44772 14 8 13.5523 8 13Z"
                                        fill="#8B8DFF"
                                      />
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M8 9C8 8.44772 8.44772 8 9 8H10C10.5523 8 11 8.44772 11 9C11 9.55228 10.5523 10 10 10H9C8.44772 10 8 9.55228 8 9Z"
                                        fill="#8B8DFF"
                                      />
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M8 4C6.89543 4 6 4.89543 6 6V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V8.82843C18 8.56321 17.8946 8.30886 17.7071 8.12132L13.8787 4.29289C13.6911 4.10536 13.4368 4 13.1716 4H8ZM4 6C4 3.79086 5.79086 2 8 2H13.1716C13.9672 2 14.7303 2.31607 15.2929 2.87868L19.1213 6.70711C19.6839 7.26972 20 8.03278 20 8.82843V18C20 20.2091 18.2091 22 16 22H8C5.79086 22 4 20.2091 4 18V6Z"
                                        fill="#8B8DFF"
                                      />
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M14 3V5C14 6.65685 15.3431 8 17 8H19V10H17C14.2386 10 12 7.76142 12 5V3H14Z"
                                        fill="#8B8DFF"
                                      />
                                    </svg>

                                      </div>


                                      <div style={{fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: 700,
fontSize: "11px",
lineHeight: "13px",
margin:"auto",
color:"#8B8DFF"
}}>
                                        Düzenle
                                      </div>

                                    </div>

                                  ) : value.type == "uploadFileDocument" ? (

                                    <div style={{ display:"flex"}}>

                                      <div>
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
                                        d="M6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V9.375C20 8.27043 19.1046 7.375 18 7.375H13.0704C12.0673 7.375 11.1306 6.8737 10.5742 6.0391L9.51168 4.4453C9.32622 4.1671 9.01399 4 8.67963 4H6ZM2 6C2 3.79086 3.79086 2 6 2H8.67963C9.68269 2 10.6194 2.5013 11.1758 3.3359L12.2383 4.9297C12.4238 5.2079 12.736 5.375 13.0704 5.375H18C20.2091 5.375 22 7.16586 22 9.375V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6Z"
                                        fill="#8B8DFF"
                                      />
                                    </svg>

                                      </div>

                                      <div style={{fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: 700,
fontSize: "11px",
lineHeight: "13px",
margin:"auto",
color:"#8B8DFF"

}}>
                                        Düzenle
                                      </div>


                                    </div>

                                  ) : value.type== "urlLinkPanel" ? (

                                    <div  style={{ display:"flex"}}>

                                      <div>

                                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="#ABCAFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.0854 6.04218C9.43054 7.51558 9 9.62114 9 12C9 14.3789 9.43054 16.4844 10.0854 17.9578C10.4134 18.6958 10.778 19.2311 11.1324 19.5683C11.4816 19.9007 11.7731 20 12 20C12.2269 20 12.5184 19.9007 12.8676 19.5683C13.222 19.2311 13.5866 18.6958 13.9146 17.9578C14.5695 16.4844 15 14.3789 15 12C15 9.62114 14.5695 7.51558 13.9146 6.04218C13.5866 5.30422 13.222 4.76892 12.8676 4.43166C12.5184 4.0993 12.2269 4 12 4C11.7731 4 11.4816 4.0993 11.1324 4.43166C10.778 4.76892 10.4134 5.30422 10.0854 6.04218ZM9.75363 2.98287C10.3615 2.40438 11.1223 2 12 2C12.8777 2 13.6385 2.40438 14.2464 2.98287C14.8491 3.55645 15.3464 4.33918 15.7422 5.2299C16.5351 7.01386 17 9.40829 17 12C17 14.5917 16.5351 16.9861 15.7422 18.7701C15.3464 19.6608 14.8491 20.4435 14.2464 21.0171C13.6385 21.5956 12.8777 22 12 22C11.1223 22 10.3615 21.5956 9.75363 21.0171C9.15092 20.4435 8.65364 19.6608 8.25776 18.7701C7.46489 16.9861 7 14.5917 7 12C7 9.40829 7.46489 7.01386 8.25776 5.2299C8.65364 4.33918 9.15092 3.55645 9.75363 2.98287Z" fill="#ABCAFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.1584 16C8.87071 16 6.0954 16.7732 4.56645 17.8241L3.43359 16.1759C5.41246 14.8158 8.63551 14 12.1584 14C15.4844 14 18.5304 14.7265 20.521 15.9415L19.4791 17.6486C17.8986 16.684 15.2489 16 12.1584 16Z" fill="#ABCAFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0642 9.99998C8.57877 9.99998 5.38856 9.18344 3.4292 7.821L4.571 6.17896C6.07894 7.22751 8.81778 7.99998 12.0642 7.99998C15.2287 7.99998 17.9166 7.26561 19.4486 6.2527L20.5516 7.92102C18.5849 9.22139 15.4683 9.99998 12.0642 9.99998Z" fill="#ABCAFF"/>
</svg>

                                      </div>


                                      <div style={{fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: 700,
fontSize: "11px",
lineHeight: "13px",
margin:"auto",
color:"#8B8DFF"

}}>
                                        Düzenle
                                      </div>


                                    </div>




                                  ) : value.type=="faturaData" ? (


                                    <div style={{ display:"flex"}}>

<div>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.33333 5C3.33333 3.15905 4.82571 1.66667 6.66666 1.66667H13.3333C15.1743 1.66667 16.6667 3.15905 16.6667 5V15C16.6667 16.8409 15.1743 18.3333 13.3333 18.3333H6.66666C4.82571 18.3333 3.33333 16.8409 3.33333 15V5ZM6.66666 3.33333C5.74619 3.33333 4.99999 4.07953 4.99999 5V15C4.99999 15.9205 5.74619 16.6667 6.66666 16.6667H13.3333C14.2538 16.6667 15 15.9205 15 15V5C15 4.07953 14.2538 3.33333 13.3333 3.33333H6.66666Z" fill="#8B8DFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.66666 1.66667H6.75925C7.79472 1.66667 8.66477 2.37487 8.91146 3.33333H11.0885C11.3352 2.37487 12.2053 1.66667 13.2407 1.66667H13.3333V3.33333H13.2407C12.9339 3.33333 12.6852 3.58206 12.6852 3.88889C12.6852 4.50254 12.1877 5 11.5741 5H8.42592C7.81227 5 7.3148 4.50254 7.3148 3.88889C7.3148 3.58206 7.06607 3.33333 6.75925 3.33333H6.66666V1.66667Z" fill="#8B8DFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.41075 7.74408C9.73619 7.41864 10.2638 7.41864 10.5893 7.74408L13.0893 10.2441C13.4147 10.5695 13.4147 11.0972 13.0893 11.4226C12.7638 11.748 12.2362 11.748 11.9107 11.4226L10.8333 10.3452L10.8333 13.3333C10.8333 13.7936 10.4602 14.1667 10 14.1667C9.53977 14.1667 9.16667 13.7936 9.16667 13.3333L9.16667 10.3452L8.08926 11.4226C7.76382 11.748 7.23619 11.748 6.91075 11.4226C6.58531 11.0972 6.58531 10.5695 6.91075 10.2441L9.41075 7.74408Z" fill="#8B8DFF"/>
</svg>

                                  </div>



                                  <div style={{fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: 700,
fontSize: "11px",
lineHeight: "13px",
margin:"auto",
color:"#8B8DFF"

}}>
                                        Düzenle
                                      </div>

                                    </div>

                                  ) : (
                                    <div>

                                    </div>
                                  )}
                                </div>

                              </div>{" "}
                              <div className="header-right">
                                <div className="header-switch">
                                  <div className="switch-button ">
                                    <label
                                      className="switch"
                                      value={
                                        value.type == "bankform"
                                          ? bankstatueMode
                                          : value.type == "conatctAddForm"
                                          ? contactstatueMode
                                          : value.type == "documentForm"
                                          ? documentstatueMode
                                          : value.type == "uploadFileDocument"
                                          ? uploadFileStatueModeSecond
                                          : value.type=="urlLinkPanel" ? profileUrlstatueMode : value.type=="faturaData"  ? faturaStatueMode : ""
                                      }
                                      onChange={(e) =>
                                        OpenStatus(
                                          value.OrderId,
                                          props.key,
                                          !value.statueMode,
                                          value.BankDataId,
                                          value.contactDataId,
                                          value.documentDataFormId,
                                          value.belgeDocumentId,
                                          value.panelProfileUrlDataId,
                                          value.faturaDataId
                                        )
                                      }
                                    >
                                      <input
                                        type="checkbox"
                                        checked={value.statueMode}
                                      />{" "}
                                      <span className="slider round"> </span>{" "}
                                    </label>{" "}
                                  </div>{" "}
                                </div>{" "}
                              </div>{" "}
                            </div>{" "}
                            <div className="footer">
                              <div className="footer-left">
                                <div className="icon">
                                  {" "}
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
                                      d="M2 7C2 4.23858 4.23858 2 7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7ZM7 4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V7C20 5.34315 18.6569 4 17 4H7Z"
                                      fill="black"
                                      fill-opacity="0.5"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M8 13C8.55228 13 9 13.4477 9 14V16C9 16.5523 8.55228 17 8 17C7.44772 17 7 16.5523 7 16L7 14C7 13.4477 7.44772 13 8 13Z"
                                      fill="black"
                                      fill-opacity="0.5"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M16 7C16.5523 7 17 7.44772 17 8L17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16L15 8C15 7.44772 15.4477 7 16 7Z"
                                      fill="black"
                                      fill-opacity="0.5"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M12 10C12.5523 10 13 10.4477 13 11L13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16L11 11C11 10.4477 11.4477 10 12 10Z"
                                      fill="black"
                                      fill-opacity="0.5"
                                    />
                                  </svg>
                                </div>{" "}
                                <div className="text">
                                  {" "}
                                  0 (Tıklanma Sayısı){" "}
                                </div>{" "}
                              </div>{" "}
                              <div className="footer-right">
                                <div
                                  onClick={() =>
                                    DeletePanelOpen(
                                      value.OrderId,
                                      props.key,

                                      value.BankDataId,
                                      value.contactDataId,
                                      value.documentDataFormId,
                                      value.belgeDocumentId,
                                      value.panelProfileUrlDataId,
                                      value.faturaDataId
                                    )
                                  }
                                  className="trash"
                                  style={{ cursor: "pointer" }}
                                >
                                  {" "}
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5C20 5.55228 19.5523 6 19 6H5C4.44772 6 4 5.55228 4 5Z" fill="#8B8DFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.77778 3.33333C8.77778 2.59695 9.37473 2 10.1111 2L13.8889 2C14.6253 2 15.2222 2.59695 15.2222 3.33333C15.2222 3.70152 15.5207 4 15.8889 4H16V6H15.8889C14.6463 6 13.6023 5.15015 13.3062 4L10.6938 4C10.3977 5.15015 9.35367 6 8.11111 6H8V4L8.11111 4C8.4793 4 8.77778 3.70152 8.77778 3.33333Z" fill="#8B8DFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.91695 8.00345C6.46733 7.95758 6.95068 8.36657 6.99654 8.91695L7.7673 18.1661C7.85368 19.2027 8.72022 20 9.76039 20H14.2396C15.2798 20 16.1463 19.2027 16.2327 18.1661L17.0034 8.91695C17.0493 8.36657 17.5327 7.95758 18.083 8.00345C18.6334 8.04931 19.0424 8.53266 18.9965 9.08304L18.2258 18.3322C18.053 20.4053 16.32 22 14.2396 22H9.76039C7.68004 22 5.94697 20.4053 5.77421 18.3322L5.00345 9.08304C4.95758 8.53266 5.36657 8.04931 5.91695 8.00345Z" fill="#8B8DFF"/>
</svg>



                                </div>{" "}
                              </div>{" "}
                            </div>{" "}
                          </button>{" "}
                        </div>{" "}


                        {value.type == "conatctAddForm" ? (
                          <div>
                            <button
                              className={
                                "panel-inner " +
                                (value.isOpen == true ? "p-open" : "p-close")
                              }
                            >
                              <div className="panel-inner-header">
                                <div className="text"> İletişim Bilgileri </div>{" "}
                                <div
                                  className="close-icon"
                                  onClick={() => PanelOpen(value.OrderId)}
                                >
                                  {" "}
                                  <i className="fa-solid fa-xmark"> </i>{" "}
                                </div>{" "}
                              </div>{" "}

                              <div className="panel-inner-content">

                                <div className="panel-inner-content-info">


{/* İnput to change again the value from heer */}


                                  <div>



                                  </div>

                                  {/* end of input to vchange data */}

                                  <div className="two-input-area">
                                    <input
                                      className=""
                                      id="grid-first-name"
                                      type="text"
                                      placeholder="İsim"
                                      value={publicName}
                                      onChange={(e) =>
                                        setpublicName(e.target.value)
                                      }
                                    />{" "}
                                    <div className="input-space"> </div>{" "}
                                    <input
                                      id="grid-last-name"
                                      type="text"
                                      placeholder="Soyisim"
                                      value={publicsurname}
                                      onChange={(e) =>
                                        setpublicsurname(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="panel-input">
                                    <input
                                      id="grid-password"
                                      type="text"
                                      placeholder="Organizasyon"
                                      value={publicOrganization}
                                      onChange={(e) =>
                                        setpublicOrganization(e.target.value)
                                      }
                                    />{" "}
                                  </div>
                                  <div className="panel-input">
                                    <input
                                      id="grid-password"
                                      type="text"
                                      placeholder="Pozisyon"
                                      value={profilePosition}
                                      onChange={(e) =>
                                        setprofilePosition(e.target.value)
                                      }
                                    />{" "}
                                  </div>




                                  {
                                    telefonInputServ.length > 1  && (

                                      <div style={{width:"100%"}}>
                                      <div style={{position:"absolute", right:0 , marginRight:"12px"}}>
                                        Default
                                      </div>
                                    </div>

                                    )
                                  }



                                  {telefonInputServ.map(
                                    (singleTelefonInput, index) => (

                                      <div>


                                      <div
                                        className="select-input-area"
                                        key={index}
                                      >
                                        <PhoneInput
                                          id="grid-zip"
                                          name="phoneNumber"
                                          className="phoneInputu"
                                          type="text"
                                          country={"tr"}
                                          value={singleTelefonInput.phoneNumber}
                                          onChange={(e) =>
                                            handlePhoneList(e, index)
                                          }
                                          fullWidth
                                        />

                                        <div
                                          className="input-space"
                                          style={{ width: "5px" }}
                                        >
                                          {" "}
                                        </div>





                                        {/* {telefonInputServ.length - 1 ===
                                          index && ( */}


                                          <div
                                            className="panel-input"
                                            style={{ margin: "auto" }}
                                            onClick={(e) =>{
                                              deletePhoneArrayInContact( e,singleTelefonInput.phoneNumber, singleTelefonInput.defaultNumber ,index)
                                            }}
                                          >
                                            <button
                                              className="global-button content-buttons-item primary-buttonaddRemove"
                                              style={{
                                                margin: "auto",
                                                padding: "7px",
                                                background: "#ffff",
                                                border: "none",
                                              }}
                                            >
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
                                                  d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5C20 5.55228 19.5523 6 19 6H5C4.44772 6 4 5.55228 4 5Z"
                                                  fill="black"
                                                  fill-opacity="0.5"
                                                />
                                                <path
                                                  fill-rule="evenodd"
                                                  clip-rule="evenodd"
                                                  d="M8.77778 3.33334C8.77778 2.59695 9.37473 2 10.1111 2L13.8889 2C14.6253 2 15.2222 2.59696 15.2222 3.33334C15.2222 3.70153 15.5207 4 15.8889 4H16V6H15.8889C14.6463 6 13.6023 5.15015 13.3062 4L10.6938 4C10.3977 5.15015 9.35367 6 8.11111 6H8V4L8.11111 4C8.4793 4 8.77778 3.70153 8.77778 3.33334Z"
                                                  fill="black"
                                                  fill-opacity="0.5"
                                                />
                                                <path
                                                  fill-rule="evenodd"
                                                  clip-rule="evenodd"
                                                  d="M5.91701 8.00345C6.46739 7.95759 6.95074 8.36658 6.9966 8.91695L7.76736 18.1661C7.85374 19.2027 8.72028 20 9.76045 20H14.2397C15.2798 20 16.1464 19.2027 16.2327 18.1661L17.0035 8.91695C17.0494 8.36658 17.5327 7.95759 18.0831 8.00345C18.6335 8.04932 19.0425 8.53267 18.9966 9.08305L18.2258 18.3322C18.0531 20.4054 16.32 22 14.2397 22H9.76045C7.6801 22 5.94704 20.4054 5.77427 18.3322L5.00351 9.08305C4.95765 8.53267 5.36663 8.04932 5.91701 8.00345Z"
                                                  fill="black"
                                                  fill-opacity="0.5"
                                                />
                                              </svg>
                                            </button>
                                          </div>


                                        {/* )} */}


{
  telefonInputServ.length > 1 && (
    <div class="radio" >
            <input type="radio" id={`radio-${index}`} name="defaultNumber"

            value={singleTelefonInput.defaultNumber}

            onChange={(e)=> handleDefaultPhoneFrom(e, index)}

           checked={singleTelefonInput.defaultNumber}

/>
            <label for={`radio-${index}`} onClick={()=> getRadioButtonIndexPhone(e, index)} ></label>

        </div>
  )
}

                                      </div>

{telefonInputServ.length - 1 ===
  index && (
<div
style={{ display: "flex", cursor:"pointer" }}
onClick={addPhoneInputHandle}
>

<div>
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
      d="M3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12Z"
      fill="#8B8DFF"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 3C12.5523 3 13 3.44772 13 4L13 20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20L11 4C11 3.44772 11.4477 3 12 3Z"
      fill="#8B8DFF"
    />
  </svg>
</div>
<div
  style={{
    color: "#8B8DFF",
    marginTop: "auto",
    marginBottom: "auto",
  }}
>&nbsp;
<span style={{
  borderBottom: "1px solid #8B8DFF "
}}>
Yeni Ekle
</span>
 
</div>
</div>
)}

</div>

                                    )
                                  )}




{
  emailInputServ.length > 1 && (

    <div style={{width:"100%"}}>
                                    <div style={{position:"absolute", right:0 , marginRight:"12px"}}>
                                      Default
                                    </div>
                                  </div>

  )
}

                                  {emailInputServ.map(
                                    (singleEmailInput, index) => (

                                      <div>

<div
                                        className="select-input-area"
                                        key={index}
                                      >
                                        <input
                                          id="grid-zip"
                                          name="emailPosta"
                                          type="email"
                                          placeholder="Email"
                                          value={singleEmailInput.emailPosta}
                                          onChange={(e) =>
                                            handleEmailList(e, index)
                                          }
                                        />

                                        <div
                                          className="input-space"
                                          style={{ width: "5px" }}
                                        >
                                          {" "}
                                        </div>


                                       {/* // {emailInputServ.length - 1 === */}
                                          {/* //index && ( */}
                                          <div
                                            className="panel-input"
                                            style={{ margin: "auto" }}
                                            onClick={(e) =>{
                                              deleteEmailArrayInContact(e, singleEmailInput.emailPosta,singleEmailInput.defaultEmaill, index)
                                            }}
                                          >
                                            <button
                                              className="global-button content-buttons-item primary-buttonaddRemove"
                                              style={{
                                                margin: "auto",
                                                padding: "7px",
                                                background: "#ffff",
                                                border: "none",
                                              }}
                                            >
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
                                                  d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5C20 5.55228 19.5523 6 19 6H5C4.44772 6 4 5.55228 4 5Z"
                                                  fill="black"
                                                  fill-opacity="0.5"
                                                />
                                                <path
                                                  fill-rule="evenodd"
                                                  clip-rule="evenodd"
                                                  d="M8.77778 3.33334C8.77778 2.59695 9.37473 2 10.1111 2L13.8889 2C14.6253 2 15.2222 2.59696 15.2222 3.33334C15.2222 3.70153 15.5207 4 15.8889 4H16V6H15.8889C14.6463 6 13.6023 5.15015 13.3062 4L10.6938 4C10.3977 5.15015 9.35367 6 8.11111 6H8V4L8.11111 4C8.4793 4 8.77778 3.70153 8.77778 3.33334Z"
                                                  fill="black"
                                                  fill-opacity="0.5"
                                                />
                                                <path
                                                  fill-rule="evenodd"
                                                  clip-rule="evenodd"
                                                  d="M5.91701 8.00345C6.46739 7.95759 6.95074 8.36658 6.9966 8.91695L7.76736 18.1661C7.85374 19.2027 8.72028 20 9.76045 20H14.2397C15.2798 20 16.1464 19.2027 16.2327 18.1661L17.0035 8.91695C17.0494 8.36658 17.5327 7.95759 18.0831 8.00345C18.6335 8.04932 19.0425 8.53267 18.9966 9.08305L18.2258 18.3322C18.0531 20.4054 16.32 22 14.2397 22H9.76045C7.6801 22 5.94704 20.4054 5.77427 18.3322L5.00351 9.08305C4.95765 8.53267 5.36663 8.04932 5.91701 8.00345Z"
                                                  fill="black"
                                                  fill-opacity="0.5"
                                                />
                                              </svg>
                                            </button>
                                          </div>




                                       {/* // )} */}

        {
          emailInputServ.length > 1 && (

            <div class="radio">

            <input type="radio" id={`radioo-${index}`} name="defaultEmaill"

            value={singleEmailInput.defaultEmaill}

            checked={singleEmailInput.defaultEmaill}

            onChange={ (e)=> handleDefaultEmailFrom( e, index)}


       />


            <label for={`radioo-${index}`}  onClick={(e)=>getRadioButtonIndexEmail(e,index)} ></label>
        </div>

          )

        }




                                      </div>




{emailInputServ.length - 1 ===
                                          index && (

<div
style={{ display: "flex", cursor:"pointer" }}
onClick={addEmailInputHandle}
>

<div>
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
      d="M3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12Z"
      fill="#8B8DFF"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 3C12.5523 3 13 3.44772 13 4L13 20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20L11 4C11 3.44772 11.4477 3 12 3Z"
      fill="#8B8DFF"
    />
  </svg>
</div>
<div
  style={{
    color: "#8B8DFF",
    marginTop: "auto",
    marginBottom: "auto",
  }}
>
&nbsp;
<span style={{
  borderBottom: "1px solid #8B8DFF "
}}>
Yeni Ekle
</span>
</div>
</div>



                                        )}
                                      </div>




                                    )
                                  )}
                                  {/* text area from here */}{" "}
                                  <div className="panel-input">
                                    <textarea
                                      value={streetAdress}
                                      onChange={(e) =>
                                        setstreetAdress(e.target.value)
                                      }
                                      placeholder="Sokak Adresi"
                                    ></textarea>{" "}
                                  </div>
                                  <div className="two-input-area">
                                    <select
                                      id="grid-state"
                                      value={profileCountry}
                                      ///value="Turkey"
                                      onChange={(e) =>
                                        setprofileCountry(e.target.value)
                                      }
                                    >
                                      {Country.getAllCountries().map(
                                        (name, index) => (
                                          <option key={index} value={name.name}>
                                            {name.name ==="Turkey" ? "Türkiye" : name.name}
                                          </option>
                                        )
                                      )}
                                    </select>


                                    <div className="input-space"> </div>{" "}
                                    <select
                                      id="grid-state"
                                      value={profileCity}
                                      onChange={(e) => {
                                        setprofileCity(e.target.value);
                                      }}
                                    >
                                      { profileCountry !== "Turkey" ?  City.getCitiesOfCountry(coutryCity).map(
                                        (name, index) => {
                                          return (
                                            <option key={index}>
                                              {" "}
                                              {name.name}
                                            </option>
                                          );
                                        }
                                      ) : cities.map(
                                        (name, index) => {
                                          return (
                                            <option key={index}>
                                              {" "}
                                              {name}
                                            </option>
                                          );
                                        }
                                      )  }
                                    </select>{" "}
                                  </div>
                                  <div className="panel-input">
                                    <textarea
                                      value={profileNot}
                                      onChange={(e) =>
                                        setprofileNot(e.target.value)
                                      }
                                      placeholder="Not Ekle"
                                    ></textarea>{" "}
                                  </div>

                                  <div className="panel-input">
                                    <button
                                      className="global-button content-buttons-item primary-button"
                                      onClick={
                                        contactDataId != undefined
                                          ? updateContactData
                                          : postContactData
                                      }
                                    >
                                      {contactDataId != undefined
                                        ? "Güncelle"
                                        : "kaydet"}{" "}
                                    </button>{" "}
                                  </div>

                                </div>{" "}
                              </div>{" "}
                            </button>

                            {/* delete page heer */}{" "}
                            <button
                              className={
                                "panel-inner " +
                                (value.isDeleteOpen == true
                                  ? "p-open"
                                  : "p-close")

                              }
                            >
                              <div className="panel-inner-header">
                                <div className="text"> Sil </div>
                                <div
                                  className="close-icon"
                                  onClick={() =>
                                    DeletePanelOpen(value.OrderId, props.key)
                                  }
                                >
                                  {" "}
                                  <i className="fa-solid fa-xmark"> </i>{" "}
                                </div>{" "}
                              </div>{" "}

                              
                              <div className="panel-inner-content">
                                <div
                                  className="panel-inner-content-info"
                                  style={{ textAlign: "center" }}
                                >
                                  Silmek istediğinizden emin misiniz ?
                                </div>{" "}
                                <div className="yes-no-buttons">
                                  <div
                                    className="global-button no-button"
                                    onClick={() =>
                                      DeletePanelOpen(value.OrderId, props.key)
                                    }

                                    style={{
                                      fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "700",
fontSize: "13px",
lineHeight: "16px",
textAlign: "center",
color: "#FFFFFF",
backgroundColor:" #D9D9D9"
                                  }}
                                  >
                                    Hayır{" "}
                                  </div>{" "}
                                  <div className="yes-no-space "> </div>{" "}
                                  <div
                                    className="global-button yes-button"
                                    //onClick={delteContactData}
                                    onClick={() => {
                                      RemovePanelRemoveConatct(
                                        panels,
                                        props.key
                                      );
                                      delteContactData();
                                    }}

                                    style={{
                                      fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "700",
fontSize: "13px",
lineHeight: "16px",
textAlign: "center",
color: "#FFFFFF"
                                  }}
                                  >
                                    Evet{" "}
                                  </div>{" "}
                                </div>{" "}
                              </div>



                            </button>
                          </div>
                        ) : value.type == "bankform" ? (
                          <div>
                            <button
                              className={
                                "panel-inner " +
                                (value.isOpen == true ? "p-open" : "p-close")
                              }
                            >
                              <div className="panel-inner-header">
                                <div className="text">
                                  {" "}
                                  Banka Hesap Bilgileri{" "}
                                </div>{" "}
                                <div
                                  className="close-icon"
                                  onClick={() => PanelOpen(value.OrderId)}
                                >
                                  {" "}
                                  <i className="fa-solid fa-xmark"> </i>{" "}
                                </div>{" "}
                              </div>{" "}
                              <div className="panel-inner-content">
                                <div className="panel-inner-content-info">

                                  <div>Banka Hesap Bilgilerinizi Doldurun.</div>

                                  {bankFiledAdd.map(
                                    (singleBankField, index) => (
                                      <div>
                                        <div
                                          style={{
                                            border: "2px solid #F5F5F5",
                                            paddingLeft: "10px",
                                            paddingRight: "10px",
                                            paddingBottom: "10px",
                                            borderRadius: "10px",
                                            marginTop: "10px",
                                          }}
                                        >
                                         


                                            <div
                                              style={{
                                                width: "100%",
                                                textAlign: "end",
                                                cursor:"pointer"
                                              }}
                                            >
                                              <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                onClick={(e) =>

                                                  deleteBankArrayOnlyOne(e, singleBankField.bankIban, singleBankField.accountOwner, 
                                                    singleBankField.bankAccountNumber, singleBankField.bankName,singleBankField.bankStation, index
                                                    )
                                                }
                                              >
                                                <path
                                                  fill-rule="evenodd"
                                                  clip-rule="evenodd"
                                                  d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5C20 5.55228 19.5523 6 19 6H5C4.44772 6 4 5.55228 4 5Z"
                                                  fill="black"
                                                  fill-opacity="0.5"
                                                />
                                                <path
                                                  fill-rule="evenodd"
                                                  clip-rule="evenodd"
                                                  d="M8.77778 3.33333C8.77778 2.59695 9.37473 2 10.1111 2L13.8889 2C14.6253 2 15.2222 2.59695 15.2222 3.33333C15.2222 3.70152 15.5207 4 15.8889 4H16V6H15.8889C14.6463 6 13.6023 5.15015 13.3062 4L10.6938 4C10.3977 5.15015 9.35367 6 8.11111 6H8V4L8.11111 4C8.4793 4 8.77778 3.70152 8.77778 3.33333Z"
                                                  fill="black"
                                                  fill-opacity="0.5"
                                                />
                                                <path
                                                  fill-rule="evenodd"
                                                  clip-rule="evenodd"
                                                  d="M5.91695 8.00345C6.46733 7.95758 6.95068 8.36657 6.99654 8.91695L7.7673 18.1661C7.85368 19.2027 8.72022 20 9.76039 20H14.2396C15.2798 20 16.1463 19.2027 16.2327 18.1661L17.0034 8.91695C17.0493 8.36657 17.5327 7.95758 18.083 8.00345C18.6334 8.04931 19.0424 8.53266 18.9965 9.08304L18.2258 18.3322C18.053 20.4053 16.32 22 14.2396 22H9.76039C7.68004 22 5.94697 20.4053 5.77421 18.3322L5.00345 9.08304C4.95758 8.53266 5.36657 8.04931 5.91695 8.00345Z"
                                                  fill="black"
                                                  fill-opacity="0.5"
                                                />
                                              </svg>
                                            </div>



                                          

                                          <div className="panel-input">
                                            <input
                                              id="grid-first-name"
                                              type="text"
                                              name="accountOwner"
                                              placeholder="Heasp sahibinin Adı Soyadı"
                                              value={singleBankField.accountOwner}
                                              onChange={(e) =>
                                                handleBankPanelList(e,index)
                                              }

                                               // setaccountOwner(e.target.value)
                                            />
                                          </div>

                                          <div className="two-input-area">
                                            <input
                                              id="grid-first-name"
                                              type="text"
                                              name="bankName"
                                              placeholder="Banka"
                                              value={singleBankField.bankName}
                                              onChange={(e)=>handleBankPanelListBankName(e,index)}
                                              //setbankName(e.target.value)
                                            />{" "}
                                            <div className="input-space"> </div>{" "}
                                            <input
                                              id="grid-last-name"
                                              type="text"
                                              name="bankStation"
                                              placeholder="Şube"
                                              value={singleBankField.bankStation}

                                              onChange={(e)=>handleBankPanelListBankStation(e,index)}
                                              //setbankStation(e.target.value)
                                            />
                                          </div>


                                          <div className="panel-input">
                                            {/* <input
                                      id="grid-first-name"
                                      type="text"
                                      placeholder="Iban"
                                      value={bankIban}
                                      onChange={(e) =>
                                        setbankIban(e.target.value)
                                      }
                                    /> */}

                                            <IbanInput
                                              onChange={onChange}
                                              value={singleBankField.bankIban}
                                              onChangeTwo={ handleBankPanelListBankAccountNumber }
                                              indexTwo={index}
                                              bankIbanFormat={bankIban === ""? singleBankField.bankIban : bankIban }

                                            />
                                          </div>

                                          {/* here will be the account Number */}
                                          <div className="panel-input">


                                            <AccountNumberInput

                                              onChange={ onChangeBankAccount}
                                              onChangetWO={ handleBankPanelListBankAccountNumber }
                                              indexTwo={index}

                                              value={singleBankField.bankAccountNumber}

                                              accountNumberFormat={bankAccountNum === "" ? singleBankField.bankAccountNumber : bankAccountNum }

                                            />
                                          </div>

                                          {/* account Number end Here */}

                                          <div> </div>
                                          <div className="panel-input">
                                            <button
                                              className="global-button content-buttons-item primary-button"
                                              onClick={
                                                BankDataId != undefined
                                                  ? updateBankData
                                                  : postBankData
                                              }
                                            >
                                              {BankDataId != undefined
                                                ? "Gücelle"
                                                : "Kaydet"}{" "}
                                            </button>{" "}
                                          </div>
                                        </div>

                                        {bankFiledAdd.length - 1 == index && (
                                          <div
                                            style={{ display: "flex", cursor:"pointer" }}
                                            onClick={addBankFieldMore}
                                          >

                                            <div>
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
                                                  d="M3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12Z"
                                                  fill="#8B8DFF"
                                                />
                                                <path
                                                  fill-rule="evenodd"
                                                  clip-rule="evenodd"
                                                  d="M12 3C12.5523 3 13 3.44772 13 4L13 20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20L11 4C11 3.44772 11.4477 3 12 3Z"
                                                  fill="#8B8DFF"
                                                />
                                              </svg>
                                            </div>
                                            <div
                                              style={{
                                                color: "#8B8DFF",
                                                marginTop: "auto",
                                                marginBottom: "auto",
                                              }}
                                            >
                                              &nbsp;
<span style={{
  borderBottom: "1px solid #8B8DFF "
}}>
Yeni Ekle
</span>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>{" "}
                            </button>
                            {/* //delete bank */}{" "}
                            <button
                              className={
                                "panel-inner " +
                                (value.isDeleteOpen == true
                                  ? "p-open"
                                  : "p-close")
                              }
                            >
                              <div className="panel-inner-header">
                                <div className="text"> Sil </div>{" "}
                                <div
                                  className="close-icon"
                                  onClick={() =>
                                    DeletePanelOpen(value.OrderId, props.key)
                                  }
                                >
                                  {" "}
                                  <i className="fa-solid fa-xmark"> </i>{" "}
                                </div>{" "}
                              </div>{" "}
                              <div className="panel-inner-content">
                                <div
                                  className="panel-inner-content-info"
                                  style={{ textAlign: "center" }}
                                >
                                  Silmek istediğinizden emin misiniz ?
                                </div>{" "}
                                <div className="yes-no-buttons">
                                  <div
                                    className="global-button no-button"
                                    onClick={() =>
                                      DeletePanelOpen(value.OrderId, props.key)
                                    }

                                    style={{
                                      fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "700",
fontSize: "13px",
lineHeight: "16px",
textAlign: "center",
color: "#FFFFFF",
backgroundColor:" #D9D9D9"
                                  }}
                                  >
                                    Hayır{" "}
                                  </div>{" "}
                                  <div className="yes-no-space "> </div>{" "}
                                  <div
                                    className="global-button yes-button"
                                    onClick={() => {
                                      delteBankData();
                                      RemovePanelRemoveBanka(panels, props.key);
                                    }}

                                    style={{
                                      fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "700",
fontSize: "13px",
lineHeight: "16px",
textAlign: "center",
color: "#FFFFFF"
                                  }}
                                  >
                                    Evet{" "}
                                  </div>{" "}
                                </div>{" "}
                              </div>{" "}
                            </button>{" "}
                          </div>
                        ) : value.type == "documentForm" ? (
                          <div>
                            <button
                              className={
                                "panel-inner " +
                                (value.isOpen == true ? "p-open" : "p-close")
                              }
                            >
                              <div className="panel-inner-header">
                                <div className="text"> İletişim Formu </div>{" "}
                                <div
                                  className="close-icon"
                                  onClick={() => PanelOpen(value.OrderId)}
                                >
                                  {" "}
                                  <i className="fa-solid fa-xmark"> </i>{" "}
                                </div>{" "}
                              </div>{" "}
                              <div className="panel-inner-content">
                                <div className="panel-inner-content-info">
                                  <div
                                    style={{
                                      color: "#808080",
                                      padding: "10px 0",
                                      fontSize: "16px",
                                      textAlign: "left",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Direkt mesaj Alanı
                                    {/* Ziyaretçilerinizin ileteceği mesajların
                                  içeriğini ne olacağını düzenleyebilirsiniz. */}
                                  </div>
                                  <div className="panel-switch-area">
                                    <div className="panel-switch-item">
                                      <div className="switch-header">
                                        İsim soyİsim{" "}
                                      </div>
                                      <div className="switch-button">
                                        <label
                                          className="switch"
                                          value={statusNameSurname}
                                          onChange={(e) => {
                                            setstatusNameSurname(
                                              !statusNameSurname
                                            );
                                          }}
                                        >
                                          <input
                                            type="checkbox"
                                            checked={statusNameSurname}
                                          />{" "}
                                          <span className="slider round"></span>{" "}
                                        </label>{" "}
                                      </div>{" "}
                                    </div>

                                    {/* email adres */}

                                    <div className="panel-switch-item">
                                      <div className="switch-header">
                                        Email{" "}
                                      </div>
                                      <div className="switch-button">
                                        <label
                                          className="switch"
                                          value={statusEmail}
                                          onChange={(e) => {
                                            setstatusEmail(!statusEmail);
                                          }}
                                        >
                                          <input
                                            type="checkbox"
                                            checked={statusEmail}
                                          />{" "}
                                          <span className="slider round"></span>{" "}
                                        </label>{" "}
                                      </div>{" "}
                                    </div>

                                    {/* Telefon  */}

                                    <div className="panel-switch-item">
                                      <div className="switch-header">
                                        Telefon{" "}
                                      </div>
                                      <div className="switch-button">
                                        <label
                                          className="switch"
                                          value={statusTelefon}
                                          onChange={(e) => {
                                            setstatusTelefon(!statusTelefon);
                                          }}
                                        >
                                          <input
                                            type="checkbox"
                                            checked={statusTelefon}
                                          />{" "}
                                          <span className="slider round"></span>{" "}
                                        </label>{" "}
                                      </div>{" "}
                                    </div>

                                    {/* mesaj send */}

                                    <div
                                      className="panel-switch-item"
                                      style={{
                                        marginBottom: "20px",
                                      }}
                                    >
                                      <div className="switch-header">
                                        Mesaj Alanı{" "}
                                      </div>
                                      <div className="switch-button">
                                        <label
                                          className="switch"
                                          value={statusMessage}
                                          onChange={(e) => {
                                            setstatusMessage(!statusMessage);
                                          }}
                                        >
                                          <input
                                            type="checkbox"
                                            checked={statusMessage}
                                          />{" "}
                                          <span className="slider round"></span>{" "}
                                        </label>{" "}
                                      </div>{" "}
                                    </div>
                                  </div>
                                  <div className="panel-inner-content-header">
                                    Mesaj Nereye İletilsin ?
                                  </div>{" "}
                                  <div className="panel-inner-content-subtext">
                                    Mail Adresiniz
                                  </div>
                                  <div>
                                    <form className="w-full max-w-lg m-auto">
                                      <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="panel-input">
                                          <input
                                            id="grid-first-name"
                                            type="email"
                                            placeholder="E-Posta"
                                            value={emailToSend}
                                            onChange={(e) =>
                                              setemailToSend(e.target.value)
                                            }
                                          />{" "}
                                        </div>{" "}
                                      </div>
                                      {/* text area from here */}
                                      <div className="panel-inner-content-subtext">
                                        Açıklama yazınız
                                      </div>{" "}
                                      <div className="panel-input">
                                        <textarea
                                          value={publicstreetAdress}
                                          onChange={(e) =>
                                            setpublicstreetAdress(
                                              e.target.value
                                            )
                                          }
                                          placeholder="Açıklama "
                                        ></textarea>
                                      </div>


                                      {/* <div className="panel-input">
                                        <br />
                                        <textarea
                                          value={publicDropNot}
                                          onChange={(e) =>
                                            setpublicDropNot(e.target.value)
                                          }
                                          placeholder="Teşekkür Mesajı"
                                        ></textarea>{" "}
                                      </div> */}


                                      <div className="panel-input">
                                        <button
                                          className="global-button content-buttons-item primary-button"
                                          onClick={
                                            documentDataFormId != undefined
                                              ? updateDoumentData
                                              : postDocument
                                          }
                                        >
                                          {documentDataFormId != undefined
                                            ? "Güncelle"
                                            : "Kaydet"}{" "}
                                        </button>{" "}
                                      </div>
                                    </form>{" "}
                                  </div>{" "}
                                </div>{" "}
                              </div>{" "}
                            </button>
                            {/* delet button */}{" "}
                            <button
                              className={
                                "panel-inner " +
                                (value.isDeleteOpen == true
                                  ? "p-open"
                                  : "p-close")
                              }
                            >
                              <div className="panel-inner-header">
                                <div className="text"> Sil </div>{" "}
                                <div
                                  className="close-icon"
                                  onClick={() =>
                                    DeletePanelOpen(value.OrderId, props.key)
                                  }
                                >
                                  {" "}
                                  <i className="fa-solid fa-xmark"> </i>{" "}
                                </div>{" "}
                              </div>{" "}
                              <div className="panel-inner-content">
                                <div
                                  className="panel-inner-content-info"
                                  style={{ textAlign: "center" }}
                                >
                                  Silmek istediğinizden emin misiniz ?
                                </div>{" "}
                                <div className="yes-no-buttons">
                                  <div
                                    className="global-button no-button"
                                    onClick={() =>
                                      DeletePanelOpen(value.OrderId, props.key)
                                    }

                                    style={{
                                      fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "700",
fontSize: "13px",
lineHeight: "16px",
textAlign: "center",
color: "#FFFFFF",
backgroundColor:" #D9D9D9"
                                  }}
                                  >
                                    Hayır{" "}
                                  </div>{" "}
                                  <div className="yes-no-space "> </div>{" "}
                                  <div
                                    className="global-button yes-button"
                                    onClick={() => {
                                      delteDocumentData();
                                      RemovePanelRemoveDocumentForm(
                                        panels,
                                        props.key
                                      );
                                    }}

                                    style={{
                                      fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "700",
fontSize: "13px",
lineHeight: "16px",
textAlign: "center",
color: "#FFFFFF"
                                  }}
                                  >
                                    Evet{" "}
                                  </div>{" "}
                                </div>{" "}
                              </div>{" "}
                            </button>{" "}
                          </div>
                        ) : value.type == "uploadFileDocument" ? (
                          <div>


                            <button
                              className={
                                "panel-inner " +
                                (value.isOpen == true ? "p-open" : "p-close")
                              }
                            >


                              <div className="panel-inner-header">
                                <div className="text"> Belge Yükle </div>{" "}
                                <div
                                  className="close-icon"
                                  onClick={() => PanelOpen(value.OrderId)}
                                >
                                  {" "}
                                  <i className="fa-solid fa-xmark"> </i>{" "}
                                </div>{" "}
                              </div>



                              <div className="panel-inner-content">

      <div className="panel-inner-content-info">
        
      {

  uploadFileField.map((singleUploadFile,index)=>(

    <div>

<div   style={{
      display:"flex",
      width: "100% !important",
    }}>



{
    singleUploadFile.belgeDocument ? (
  
      <div className="panel-input" style={{
        justifyContent: "center",
        marginTop: "10px",
        cursor: "pointer",
        width:"100%"
      }}>
       
        <button   className="global-button content-buttons-item primary-button" style={{
          background: "#8B8DFF",
          borderRadius: "10px",
          
        }}>

<div style={{ display:"flex", justifyContent:"center"}}>
<div style={{
            visibility:"hidden"
          }}>

<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.41666 8.50002C1.41666 4.588 4.58797 1.41669 8.49999 1.41669C12.412 1.41669 15.5833 4.588 15.5833 8.50002C15.5833 12.412 12.412 15.5834 8.49999 15.5834C4.58797 15.5834 1.41666 12.412 1.41666 8.50002ZM8.49999 2.83335C5.37038 2.83335 2.83332 5.37041 2.83332 8.50002C2.83332 11.6296 5.37038 14.1667 8.49999 14.1667C11.6296 14.1667 14.1667 11.6296 14.1667 8.50002C14.1667 5.37041 11.6296 2.83335 8.49999 2.83335Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.50001 4.95831C8.89121 4.95831 9.20834 5.27544 9.20834 5.66665V7.79165H11.3333C11.7245 7.79165 12.0417 8.10878 12.0417 8.49998C12.0417 8.89118 11.7245 9.20831 11.3333 9.20831H9.20834V11.3333C9.20834 11.7245 8.89121 12.0416 8.50001 12.0416C8.10881 12.0416 7.79168 11.7245 7.79168 11.3333V9.20831H5.66668C5.27548 9.20831 4.95834 8.89118 4.95834 8.49998C4.95834 8.10878 5.27548 7.79165 5.66668 7.79165H7.79168V5.66665C7.79168 5.27544 8.10881 4.95831 8.50001 4.95831Z" fill="white"/>
</svg>



          </div>
          &nbsp;&nbsp;
<div style={{marginTop:"3px"}}>
Belge {index}
</div>
</div>
         
       
        </button>
      </div>
  
    ):(
      

     uploadFileField.length > 1 && singleUploadFile.fileIndex === 0  ? (
      <div   style={{
        display: "none"
      }}>

      </div>
     ): (
      <div
      className="panel-input"
      style={{
        justifyContent: "center",
        marginTop: "10px",
        cursor: "pointer",
        width:"100%"
      }}
      // onClick={
      //   belgeDocumentId != undefined
      //     ? uploadChangeFiles
      //     : handleUploadFile
      // }
      onClick={(e) => handleEditPicture(e)}

    >
     <button  className="global-button content-buttons-item primary-button" style={{
    background: "#8B8DFF",
    borderRadius: "10px",
    
  }}>

    <div style={{ display:"flex", justifyContent:"center"}}>

    <div>

    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.41666 8.50002C1.41666 4.588 4.58797 1.41669 8.49999 1.41669C12.412 1.41669 15.5833 4.588 15.5833 8.50002C15.5833 12.412 12.412 15.5834 8.49999 15.5834C4.58797 15.5834 1.41666 12.412 1.41666 8.50002ZM8.49999 2.83335C5.37038 2.83335 2.83332 5.37041 2.83332 8.50002C2.83332 11.6296 5.37038 14.1667 8.49999 14.1667C11.6296 14.1667 14.1667 11.6296 14.1667 8.50002C14.1667 5.37041 11.6296 2.83335 8.49999 2.83335Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.50001 4.95831C8.89121 4.95831 9.20834 5.27544 9.20834 5.66665V7.79165H11.3333C11.7245 7.79165 12.0417 8.10878 12.0417 8.49998C12.0417 8.89118 11.7245 9.20831 11.3333 9.20831H9.20834V11.3333C9.20834 11.7245 8.89121 12.0416 8.50001 12.0416C8.10881 12.0416 7.79168 11.7245 7.79168 11.3333V9.20831H5.66668C5.27548 9.20831 4.95834 8.89118 4.95834 8.49998C4.95834 8.10878 5.27548 7.79165 5.66668 7.79165H7.79168V5.66665C7.79168 5.27544 8.10881 4.95831 8.50001 4.95831Z" fill="white"/>
</svg>



</div>


&nbsp;&nbsp;

<div style={{marginTop:"3px"}}>
{fileUploadContent}
</div>

    </div>


    


     </button>


    </div>
     )


    )
  }





{
uploadFileField.length > 0 && singleUploadFile.fileIndex === 0 ? (
  <div  style={{
    display: "none"
  }}>

  </div>
):(

  <div
    className=""
    onClick={(e)=>deleteFileUploadArrayOnlyOne(e,singleUploadFile.belgeDocument ,index )}

  >
    <button
      className="global-button content-buttons-item primary-buttonaddRemove "
      style={{
        margin: "auto",
        padding: "7px",
        background: "#FFFF",
        border: "none",
        marginTop: "20px",
      }}
    >
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
                                                  d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5C20 5.55228 19.5523 6 19 6H5C4.44772 6 4 5.55228 4 5Z"
                                                  fill="black"
                                                  fill-opacity="0.5"
                                                />
                                                <path
                                                  fill-rule="evenodd"
                                                  clip-rule="evenodd"
                                                  d="M8.77778 3.33334C8.77778 2.59695 9.37473 2 10.1111 2L13.8889 2C14.6253 2 15.2222 2.59696 15.2222 3.33334C15.2222 3.70153 15.5207 4 15.8889 4H16V6H15.8889C14.6463 6 13.6023 5.15015 13.3062 4L10.6938 4C10.3977 5.15015 9.35367 6 8.11111 6H8V4L8.11111 4C8.4793 4 8.77778 3.70153 8.77778 3.33334Z"
                                                  fill="black"
                                                  fill-opacity="0.5"
                                                />
                                                <path
                                                  fill-rule="evenodd"
                                                  clip-rule="evenodd"
                                                  d="M5.91701 8.00345C6.46739 7.95759 6.95074 8.36658 6.9966 8.91695L7.76736 18.1661C7.85374 19.2027 8.72028 20 9.76045 20H14.2397C15.2798 20 16.1464 19.2027 16.2327 18.1661L17.0035 8.91695C17.0494 8.36658 17.5327 7.95759 18.0831 8.00345C18.6335 8.04932 19.0425 8.53267 18.9966 9.08305L18.2258 18.3322C18.0531 20.4054 16.32 22 14.2397 22H9.76045C7.6801 22 5.94704 20.4054 5.77427 18.3322L5.00351 9.08305C4.95765 8.53267 5.36663 8.04932 5.91701 8.00345Z"
                                                  fill="black"
                                                  fill-opacity="0.5"
                                                />
                                              </svg>
    </button>
  </div>

)

}











<div style={{ display: "none" }}>
          <input
            type="file"
            id="imageInput"
            hidden="hidden"
            onChange={(e) =>{ handleImageChange(e)}}
          />
        </div>




    </div>


    {

  uploadFileField.length -1 == index && (


    singleUploadFile.belgeDocument ? (
      <div
    style={{ display: "flex", cursor:"pointer" }}
    onClick={addUploadFileMore}
    >
    
    <div>
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
          d="M3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12Z"
          fill="#8B8DFF"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 3C12.5523 3 13 3.44772 13 4L13 20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20L11 4C11 3.44772 11.4477 3 12 3Z"
          fill="#8B8DFF"
        />
      </svg>
    </div>
    <div
      style={{
        color: "#8B8DFF",
        marginTop: "auto",
        marginBottom: "auto",
      }}
    >
      &nbsp;
<span style={{
  borderBottom: "1px solid #8B8DFF "
}}>
Yeni Ekle
</span>
    </div>
    </div>
    ) :(
      <div>
      Belge Yükleyin
    </div>
    )

    

  )

}

    </div>

   



  ))}







        
         
        
        
        <div className="panel-input"  onClick={handleChangeFileToUpload}>
        <button
          className="global-button content-buttons-item primary-button"

        >
          {belgeDocumentId != undefined
            ? "Güncelle"
            : "Kaydet"}
        </button>
      </div>

        

      </div>{" "}

      
    </div>




                    
                            </button>


                            {/* delete form uploaded */}{" "}
                            <button
                              className={
                                "panel-inner " +
                                (value.isDeleteOpen == true
                                  ? "p-open"
                                  : "p-close")
                              }
                            >
                              <div className="panel-inner-header">
                                <div className="text"> Sil </div>{" "}
                                <div
                                  className="close-icon"
                                  onClick={() =>
                                    DeletePanelOpen(value.OrderId, props.key)
                                  }
                                >
                                  {" "}
                                  <i className="fa-solid fa-xmark"> </i>{" "}
                                </div>{" "}
                              </div>{" "}
                              <div className="panel-inner-content">
                                <div
                                  className="panel-inner-content-info"
                                  style={{ textAlign: "center" }}
                                >
                                  Silmek istediğinizden emin misiniz ?
                                </div>{" "}
                                <div className="yes-no-buttons">
                                  <div
                                    className="global-button no-button"
                                    onClick={() =>
                                      DeletePanelOpen(value.OrderId, props.key)
                                    }

                                    style={{
                                      fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "700",
fontSize: "13px",
lineHeight: "16px",
textAlign: "center",
color: "#FFFFFF",
backgroundColor:" #D9D9D9"
                                  }}
                                  >
                                    Hayır{" "}
                                  </div>{" "}
                                  <div className="yes-no-space "> </div>{" "}
                                  <div
                                    className="global-button yes-button"
                                    onClick={() => {
                                      delteFileUploadData();
                                      RemovePanelRemoveFileUploadPdf(
                                        panels,
                                        props.key
                                      );
                                    }}
                                    style={{
                                      fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "700",
fontSize: "13px",
lineHeight: "16px",
textAlign: "center",
color: "#FFFFFF"
                                  }}
                                  >
                                    Evet{" "}
                                  </div>{" "}
                                </div>{" "}
                              </div>{" "}
                            </button>
                          </div>
                        ) : value.type == "urlLinkPanel" ? (

                          <div>

                            <button   className={
                                "panel-inner " +
                                (value.isOpen == true ? "p-open" : "p-close")
                              }>
<div className="panel-inner-header">
                                <div className="text" > Url Link Biligileri </div>
                                <div
                                  className="close-icon"
                                  onClick={() => PanelOpen(value.OrderId)}
                                >
                                  {" "}
                                  <i className="fa-solid fa-xmark"> </i>
                                </div>{" "}
                              </div>{" "}

                              <div className="panel-inner-content">
                                <div className="panel-inner-content-info">







  <div  className='social-link-add-button-2' onClick={()=>setSocialAdd(true)} >

 Link Ekle

</div>


{
   panelProfileUrlSev.map((singleUrl, index)=>(
    <div
      className="select-input-area"
      key={index}
    >


      {/* <input
        id="grid-zip"
        name="phoneNumber"
        className="phoneInputu"
        placeholder="Url Link"
        type="text"
        value={singleUrl.panelUrlLink}
        onChange={(e) =>
          setprofileUrlPanel(e.target.value)
        }
        fullWidth
      /> */}


{/* <input
                                              id="grid-first-name"
                                              type="text"
                                              name="accountOwner"
                                              placeholder="Heasp sahibinin Adı Soyadı"
                                              value={singleBankField.accountOwner}
                                              onChange={(e) =>
                                                handleBankPanelList(e,index)
                                              }

                                               // setaccountOwner(e.target.value)
                                            /> */}



<TextField
 name="socialUrlLink"
 type="text"
 className="phoneInputu"
 value={singleUrl.socialUrlLink}
 onChange={(e)=> handleProfileUrlToChange(e, index)}
 fullWidth

 autoFocus={panelProfileUrlSev.length-1 == index ? true : false}

 placeholder={singleUrl.placeholder}
              InputProps={{

               startAdornment: 
               
               <InputAdornment position="start" >
                {
                  singleUrl.socialUrlHead
                }
               </InputAdornment>,

           }}
           style={{marginTop:"15px"}}
              />



      <div
        className="input-space"
        style={{ width: "5px" }}
      >
        {" "}
      </div>

      

      {/* {panelProfileUrlSev.length - 1 ===
        index && ( */}



        <div
          className="panel-input"
          style={{ margin: "auto" , marginTop:"20px" }}
          onClick={(e) =>{

            // console.log("singleall", singleUrl )

            deleteProfileUrlElementArrayOnlyOne(e, singleUrl.eMail, singleUrl.generalUserId, singleUrl.placeholder, singleUrl.socialOrder,
              singleUrl.socialUrlHead, singleUrl.socialUrlLink, singleUrl.socialtype, singleUrl.statuMode, singleUrl.socialMediaLinkMatch, index
              );

          }
            
          }
        >
          <button
            className="global-button content-buttons-item primary-buttonaddRemove"

            style={{
              margin: "auto",
              padding: "7px",
              background: "#ffff",
              border: "none",
            }}
          >
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
                d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5C20 5.55228 19.5523 6 19 6H5C4.44772 6 4 5.55228 4 5Z"
                fill="black"
                fill-opacity="0.5"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.77778 3.33334C8.77778 2.59695 9.37473 2 10.1111 2L13.8889 2C14.6253 2 15.2222 2.59696 15.2222 3.33334C15.2222 3.70153 15.5207 4 15.8889 4H16V6H15.8889C14.6463 6 13.6023 5.15015 13.3062 4L10.6938 4C10.3977 5.15015 9.35367 6 8.11111 6H8V4L8.11111 4C8.4793 4 8.77778 3.70153 8.77778 3.33334Z"
                fill="black"
                fill-opacity="0.5"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.91701 8.00345C6.46739 7.95759 6.95074 8.36658 6.9966 8.91695L7.76736 18.1661C7.85374 19.2027 8.72028 20 9.76045 20H14.2397C15.2798 20 16.1464 19.2027 16.2327 18.1661L17.0035 8.91695C17.0494 8.36658 17.5327 7.95759 18.0831 8.00345C18.6335 8.04932 19.0425 8.53267 18.9966 9.08305L18.2258 18.3322C18.0531 20.4054 16.32 22 14.2397 22H9.76045C7.6801 22 5.94704 20.4054 5.77427 18.3322L5.00351 9.08305C4.95765 8.53267 5.36663 8.04932 5.91701 8.00345Z"
                fill="black"
                fill-opacity="0.5"
              />
            </svg>
          </button>
        </div>
      {/* )} */}
    </div>
  ))

}



<div className="panel-input">
                                    <button
                                      className="global-button content-buttons-item primary-button"
                                      onClick={
                                        profileUrlDataId != undefined
                                          ? updateprofileUrlDataArray
                                          : postprofileUrlPanelData
                                      }
                                    >
                                      {profileUrlDataId != undefined
                                        ? "Güncelle"
                                        : "kaydet"}{" "}
                                    </button>{" "}
                                  </div>


                                  
                                    </div>

                                    
                                    </div>


                                    
                            </button>


                            


                            {/* delete button here */}
                            <button
                              className={
                                "panel-inner " +
                                (value.isDeleteOpen == true
                                  ? "p-open"
                                  : "p-close")
                              }
                            >
                              <div className="panel-inner-header">
                                <div className="text"> Sil </div>{" "}
                                <div
                                  className="close-icon"
                                  onClick={() =>
                                    DeletePanelOpen(value.OrderId, props.key)
                                  }
                                >
                                  {" "}
                                  <i className="fa-solid fa-xmark"> </i>{" "}
                                </div>{" "}
                              </div>{" "}
                              <div className="panel-inner-content">
                                <div
                                  className="panel-inner-content-info"
                                  style={{ textAlign: "center" }}
                                >
                                  Silmek istediğinizden emin misiniz ?
                                </div>{" "}
                                <div className="yes-no-buttons">
                                  <div
                                    className="global-button no-button"
                                    onClick={() =>
                                      DeletePanelOpen(value.OrderId, props.key)
                                    }

                                    style={{
                                      fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "700",
fontSize: "13px",
lineHeight: "16px",
textAlign: "center",
color: "#FFFFFF",
backgroundColor:" #D9D9D9"
                                  }}
                                  >
                                    Hayır{" "}
                                  </div>{" "}
                                  <div className="yes-no-space "> </div>{" "}
                                  <div
                                    className="global-button yes-button"
                                    //onClick={delteContactData}
                                    onClick={() => {
                                      RemovePanelRemoveProfileUrl(
                                        panels,
                                        props.key
                                      );
                                      delteProfileUrlData();
                                    }}
                                    style={{
                                      fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "700",
fontSize: "13px",
lineHeight: "16px",
textAlign: "center",
color: "#FFFFFF"
                                  }}
                                  >
                                    Evet{" "}
                                  </div>{" "}
                                </div>{" "}
                              </div>{" "}
                            </button>


                          </div>
                        ) : value.type== "faturaData" ? (
                          <div>
                          <button
                            className={
                              "panel-inner " +
                              (value.isOpen == true ? "p-open" : "p-close")
                            }
                          >
                            <div className="panel-inner-header">
                              <div className="text"> Fatura Bilgileri </div>{" "}
                              <div
                                className="close-icon"
                                onClick={() => PanelOpen(value.OrderId)}

                              >
                                {" "}
                                <i className="fa-solid fa-xmark"> </i>{" "}
                              </div>{" "}
                            </div>{" "}
                            <div className="panel-inner-content">
                              <div className="panel-inner-content-info">


                              <div className="panel-input">

                              <input autocomplete="organization" name="organization" value={companyStatus}
                              onChange={(e)=> setcompanyStatus(e.target.value)}
                               type="text" placeholder='Firma Unvanı' />

                                  </div>


                             <div className="panel-input">
                             <input
                             autocomplete="taxAdministration"
                             name="taxAdministration"
                             value={taxAdministration}
                             onChange={(e)=>  settaxAdministration(e.target.value) }
                             type="text"
                              placeholder='Vergi Dairesi'
                              />
                             </div>


<div className="panel-input">
  
<NumberFormat type='tel' value={taxNumber}
onChange={(e)=>settaxNumber(e.target.value)}

format="##########" placeholder="Vergi Numarası" mask="_" />

</div>

<div className="panel-input">
<textarea value={location}
onChange={(e)=>   setlocation(e.target.value) }
  placeholder='Adres' ></textarea>
</div>


<div className="panel-input">
<PhoneInput
    preferredCountries={['tr', 'us']}
       country={'tr'}
    autocomplete="tel"
    name="tel"
    type="tel"
    value={officePhoneNumber}
    onChange={(e)=>setofficePhoneNumber(e)}
    placeholder='Ofis Telefonu'
/>
</div>


<div className="panel-input">

<input autocomplete="email" name="email" value={officeEmail}   type="email"
onChange={(e)=> setofficeEmail(e.target.value) }
 placeholder='Ofis E-postası' />

{profileInputErrors && profileInputErrors.emailFormatError2 && <div className='error-text'>E posta formatı hatalı.</div>}

</div>

                                {/* <div className="panel-input">
                                    <button
                                      className="global-button content-buttons-item primary-button"
                                    >
                                     Güncelle
                                    </button>
                                  </div> */}


                                  <div className="panel-input">
                                    <button
                                      className="global-button content-buttons-item primary-button"
                                      onClick={
                                        faturaDataId != undefined
                                          ? updateFaturaDataInfo
                                          : postFaturaFromData
                                      }
                                    >
                                      {faturaDataId != undefined
                                        ? "Güncelle"
                                        : "kaydet"}
                                    </button>{" "}
                                  </div>


                              </div>{" "}
                            </div>{" "}
                          </button>
                          {/* delete page heer */}{" "}
                          <button
                            className={
                              "panel-inner " +
                              (value.isDeleteOpen == true
                                ? "p-open"
                                : "p-close")
                            }
                          >
                            <div className="panel-inner-header">
                              <div className="text"> Sil </div>{" "}
                              <div
                                className="close-icon"
                                onClick={() =>
                                  DeletePanelOpen(value.OrderId, props.key)
                                }
                              >
                                {" "}
                                <i className="fa-solid fa-xmark"> </i>{" "}
                              </div>{" "}
                            </div>{" "}
                            <div className="panel-inner-content">
                              <div
                                className="panel-inner-content-info"
                                style={{ textAlign: "center" }}
                              >
                                Silmek istediğinizden emin misiniz ?
                              </div>{" "}
                              <div className="yes-no-buttons">
                                <div
                                  className="global-button no-button"
                                  onClick={() =>
                                    DeletePanelOpen(value.OrderId, props.key)
                                  }

                                  style={{
                                    fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "700",
fontSize: "13px",
lineHeight: "16px",
textAlign: "center",
color: "#FFFFFF",
backgroundColor:" #D9D9D9"
                                }}
                                >
                                  Hayır{" "}
                                </div>{" "}
                                <div className="yes-no-space "> </div>{" "}
                                <div
                                  className="global-button yes-button"
                                  //onClick={delteContactData}
                                  onClick={() => {
                                    RemovePanelRemoveFatura(
                                      panels,
                                      props.key
                                    );
                                    deleteFaturaBill();
                                  }}

                                  style={{
                                    fontFamily: 'Montserrat',
fontStyle: "normal",
fontWeight: "700",
fontSize: "13px",
lineHeight: "16px",
textAlign: "center",
color: "#FFFFFF"
                                }}
                                >
                                  Evet{" "}
                                </div>{" "}
                              </div>{" "}
                            </div>{" "}
                          </button>
                        </div>

                        ): (
                          <div></div>
                        )}
                      </div>
                    }{" "}
                  </div>
                )}
              />{" "}
            </div>{" "}
          </div>{" "}







        </div>
        <ProfilePageButton />
      </GlobalControllerLayout>{" "}
    </>
  );
}

export default Panel;
