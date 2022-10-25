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

  
  

  function shareAllData(){
    try {
         navigator.share( {
            title: 'HibritCard Paylaş',
            text: 'Bizi tavsiye edin!!',
            url: 'https://panel.hibritcard.com/#/'
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
    // .addRole('Data Protection Officer')
    .addEmail(
      selectedProfilData && selectedProfilData.eMail && selectedProfilData.eMail
    )
    .addPhoneNumber(
      selectedProfilData &&
        selectedProfilData.telNumber &&
        selectedProfilData.telNumber,
      "PREF;PERSONAL"
    )
    .addPhoneNumber(
      selectedProfilData &&
        selectedProfilData.phoneNumber &&
        selectedProfilData.phoneNumber,
      "WORK"
    )
    .addAddress(
      selectedProfilData &&
        selectedProfilData.profileAdres &&
        selectedProfilData.profileAdres,
      "",
      "",
      "",
      "",
      "",
      "",
      "WORK"
    )
    .addAddress(
      selectedProfilData &&
        selectedProfilData.location &&
        selectedProfilData.location,
      "",
      "",
      "",
      "",
      "",
      "",
      "WORK"
    )
    .addURL(
      selectedProfilData &&
        selectedProfilData.websiteUrlLink &&
        selectedProfilData.websiteUrlLink
    );



    
  //.addPhoto(, 'JPEG')
  console.log(myVCard.toString());


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

  useEffect(() => {
    console.log("allpanelfrom::",previewAllPanelListSort);

    setDropdownList([]);

    previewAllPanelListSort.map((v,i)=>{
      if(v.panelEmailPostas != undefined){
        console.log("fornowData::",v.panelEmailPostas)

        v.panelEmailPostas.map((w,a)=>{
          console.log("insidehere::",w.emailPosta)
        })

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
          if (previewAllPanelListSort[i].type == "documentForm") {
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
    myVCard2
      // Add personal data
      .addName(v.publicName, v.publicsurname, "", "", "")
      // Add work data
      .addCompany(v.publicOrganization)
      .addJobtitle(v.profilePosition)
      // .addRole('Data Protection Officer')
      .addEmail(v.kisiselEmail)
      .addEmail(v.kurumsalEmail)
      .addPhoneNumber(v.kisiselTelefon, "PREF;PERSONAL")
      .addPhoneNumber(v.kurumsalTelefon, "WORK")
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
            <div className="profile-social-items">
              {socialMediaListSort.map((v) => {
                return (
                  v.statuMode && (
                    <div
                      key={v.socialMediaUrlId}
                      className="profile-social-item"
                    >
                      <a
                        href={`https://www.${v.socialtype}.com/${v.socialUrlLink}`}
                        target="_blank"
                      >
                        {" "}
                        <div className="profile-social-item">
                          <i className={`fa-brands fa-${v.socialtype}`}></i>
                        </div>
                      </a>
                    </div>
                  )
                );
              })}
            </div>
          )}
        <div className="profile-content">

          <div className="profile-dropdown">
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
            </div>
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
                          <img src="/icons/Phone-AEAEB4.svg" />
                          // <img src="/icons/user_3-AEAEB4.svg" />
                        ) : (

                          <img src="/icons/Phone-333333.svg" />
                          // <img src="/icons/user_3-333333.svg" />
                        ))}
                      {v.type == "uploadFileDocument" &&
                        (selectedProfilData &&
                        selectedProfilData.profileTheme == "light" ? (
                          <img src="/icons/file-text-AEAEB4.svg" />
                        ) : (
                          <img src="/icons/file-text-333333.svg" />
                        ))}
                      {v.type == "bankform" &&
                        (selectedProfilData &&
                        selectedProfilData.profileTheme == "light" ? (
                          <img src="/icons/Wallet-AEAEB4.svg" />
                        ) : (
                          <img src="/icons/Wallet-333333.svg" />
                        ))}
                      {v.type == "documentForm" &&
                        (selectedProfilData &&
                        selectedProfilData.profileTheme == "light" ? (
                          <img src="/icons/Phone-AEAEB4.svg" />
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
                          // <img src="/icons/Phone-333333.svg" />

                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="#333333"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.8274 5.95227C10.3268 7.45402 10 9.59229 10 12C10 14.4077 10.3268 16.546 10.8274 18.0477C11.0794 18.8038 11.3575 19.3436 11.6177 19.6738C11.7455 19.8359 11.8494 19.9225 11.9186 19.9649C11.9515 19.9852 11.9736 19.9935 11.9847 19.9969C11.9948 20 11.999 20 11.9999 20H12C12.0007 20 12.0049 20.0001 12.0153 19.9969C12.0264 19.9935 12.0485 19.9852 12.0814 19.9649C12.1506 19.9225 12.2545 19.8359 12.3823 19.6738C12.6425 19.3436 12.9206 18.8038 13.1726 18.0477C13.6732 16.546 14 14.4077 14 12C14 9.59229 13.6732 7.45402 13.1726 5.95227C12.9206 5.19616 12.6425 4.65642 12.3823 4.32624C12.2545 4.16408 12.1506 4.07752 12.0814 4.03507C12.0485 4.01483 12.0264 4.00645 12.0153 4.00305C12.0052 3.99998 12.001 4 12.0001 4L12 4L11.9999 4C11.999 4 11.9948 3.99998 11.9847 4.00305C11.9736 4.00645 11.9515 4.01483 11.9186 4.03507C11.8494 4.07752 11.7455 4.16408 11.6177 4.32624C11.3575 4.65642 11.0794 5.19616 10.8274 5.95227ZM10.0469 3.08829C10.4956 2.51889 11.1481 2 12 2C12.8519 2 13.5044 2.51889 13.9531 3.08829C14.4108 3.66896 14.7791 4.44724 15.07 5.31981C15.6552 7.07541 16 9.43715 16 12C16 14.5629 15.6552 16.9246 15.07 18.6802C14.7791 19.5528 14.4108 20.331 13.9531 20.9117C13.5044 21.4811 12.8519 22 12 22C11.1481 22 10.4956 21.4811 10.0469 20.9117C9.58923 20.331 9.22085 19.5528 8.93 18.6802C8.3448 16.9246 8 14.5629 8 12C8 9.43715 8.3448 7.07541 8.93 5.31981C9.22085 4.44724 9.58923 3.66896 10.0469 3.08829Z" fill="#333333"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 12C4 12.0009 3.99998 12.0052 4.00305 12.0153C4.00645 12.0264 4.01483 12.0485 4.03507 12.0814C4.07752 12.1506 4.16408 12.2545 4.32624 12.3823C4.65642 12.6425 5.19616 12.9206 5.95227 13.1726C7.45402 13.6732 9.59229 14 12 14C14.4077 14 16.546 13.6732 18.0477 13.1726C18.8038 12.9206 19.3436 12.6425 19.6738 12.3823C19.8359 12.2545 19.9225 12.1506 19.9649 12.0814C19.9852 12.0485 19.9935 12.0264 19.9969 12.0153C20 12.0052 20 12.001 20 12.0001C20 11.9992 20 11.9948 19.9969 11.9847C19.9935 11.9736 19.9852 11.9516 19.9649 11.9186C19.9225 11.8494 19.8359 11.7455 19.6738 11.6177C19.3436 11.3575 18.8038 11.0794 18.0477 10.8274C16.546 10.3268 14.4077 10 12 10C9.59229 10 7.45402 10.3268 5.95227 10.8274C5.19616 11.0794 4.65642 11.3575 4.32624 11.6177C4.16408 11.7455 4.07752 11.8494 4.03507 11.9186C4.01483 11.9515 4.00645 11.9736 4.00305 11.9847C3.99998 11.9948 4 11.9991 4 12ZM5.31981 8.93C7.07541 8.3448 9.43715 8 12 8C14.5629 8 16.9246 8.3448 18.6802 8.93C19.5528 9.22085 20.331 9.58923 20.9117 10.0469C21.4811 10.4956 22 11.1481 22 12C22 12.8519 21.4811 13.5044 20.9117 13.9531C20.331 14.4108 19.5528 14.7791 18.6802 15.07C16.9246 15.6552 14.5629 16 12 16C9.43715 16 7.07541 15.6552 5.31981 15.07C4.44724 14.7791 3.66896 14.4108 3.08829 13.9531C2.51889 13.5044 2 12.8519 2 12C2 11.1481 2.51889 10.4956 3.08829 10.0469C3.66896 9.58923 4.44724 9.22085 5.31981 8.93Z" fill="#333333"/>
</svg>



                        ))}

                    </div>
                    <div className="dropdown-text">
                      <div>
                        {v.type == "conatctAddForm" &&
                          v.publicName +
                            " " +
                            v.publicsurname +
                            " " +
                            "İletişim Bilgileri"}
                        {v.type == "uploadFileDocument" && "Dosya"}
                        {v.type == "urlLinkPanel" && "Url Linki"}
                        {v.type == "bankform" &&
                          v.bankName + " " + "Banka Bilgilerim"}
                        {v.type == "documentForm" && "İletişim Kur"}
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

{
  v.panelUrlLink && (
    <div className="in-item">
    <div className="image">
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
    </div>

    <div className="text">
      <span> {v.panelUrlLink}</span>
    </div>

  </div>
  )
}

                         


                          {v.panelUrlLink ? (
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
                        
                        }
                        </div>

                        </>

                      )
                    }


                    {v.type == "uploadFileDocument" && (
                      <>
                        <div className="content-in ">
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
                              <span> {v.panelTitle && v.panelTitle}</span>
                            </div>
                          </div>
                          {v.belgeDocument && (
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
                          )}
                        </div>
                      </>
                    )}

                    {v.type == "bankform" && (
                      <>
                        <div className="content-in ">


{
  selectedProfilData.publicName && (

    <div className="in-item">
                            <div className="image">
                              {selectedProfilData &&
                              selectedProfilData.profileTheme == "light" ? (
                                <img src="/icons/user_3-AEAEB4.svg" />
                              ) : (
                                <img src="/icons/user_3-666666.svg" />
                              )}
                            </div>
                            <div className="text">
                              <span>
                                {" "}
                                { selectedProfilData.publicName && selectedProfilData.publicName +
                                  " " +
                                  selectedProfilData.publicSurName &&   selectedProfilData.publicSurName}
                              </span>
                            </div>
                          </div>

  )
}
                          


{ v.bankName && (

<div className="in-item">
<div className="image">
  {selectedProfilData &&
  selectedProfilData.profileTheme == "light" ? (
    <img src="/icons/home_4-AEAEB4.svg" />
  ) : (
    <img src="/icons/home_4-666666.svg" />
  )}
</div>
<div className="text">
  <span> { v.bankName && v.bankName + " " + v.bankStation && v.bankStation}</span>
</div>
</div>

)

}

                          
{
  v.bankIban && (

    <div className="in-item">
                            <div className="image">
                              {selectedProfilData &&
                              selectedProfilData.profileTheme == "light" ? (
                                <img src="/icons/Wallet-AEAEB4.svg" />
                              ) : (
                                <img src="/icons/Wallet-666666.svg" />
                              )}
                            </div>
                            <div className="text">
                              <span> {v.bankIban}</span>
                            </div>
                          </div>

  )
}

                          

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
                        
                        }
                        </div>
                      </>
                    )}

                    {v.type == "documentForm" &&
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
                                    placeholder="İsminizi ve soyisminizi giriniz"
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
                                    placeholder="E-Posta adresinizi giriniz"
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
                                    placeholder="Telefon numaranızı giriniz"
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
                                    placeholder="Göndermek istediğiniz mesajı giriniz"
                                  >
                                    {" "}
                                  </textarea>
                                </div>
                              )}
                            </div>
                            {
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
                            }
                          </div>
                        </>
                      )}


                  </div>


                </div>
              );
            })}
        </div>

        {socialMediaListSort.length > 0 &&
          selectedProfilData &&
          selectedProfilData.placeOfSocialMediaPosition == "bottom" && (
            <div className="profile-social-items">
              {socialMediaListSort.map((v) => {
                return (
                  v.statuMode && (
                    <div
                      key={v.socialMediaUrlId}
                      className="profile-social-item"
                    >
                      <a
                        href={`https://www.${v.socialtype}.com/${v.socialUrlLink}`}
                        target="_blank"
                      >
                        {" "}
                        <div className="profile-social-item">
                          <i className={`fa-brands fa-${v.socialtype}`}></i>
                        </div>
                      </a>
                    </div>
                  )
                );
              })}
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
