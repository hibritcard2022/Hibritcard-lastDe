import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const getUserAsync = createAsyncThunk("profile/getUserAsync", async() => {

    const res = await axios.get(`https://us-central1-hibritardpro.cloudfunctions.net/api/userAuthData`, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {

            return res;
        })


    .catch(err => {
        return err;
    });

    return res;

});


export const getPanelAsync = createAsyncThunk("profile/getPanelAsync", async(profileId) => {

    const res = await axios.get(`https://us-central1-hibritardpro.cloudfunctions.net/api/panelData/${profileId}`, {

            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {

            return res;
        })


    .catch(err => {
        return err;
    });

    return res;

});


export const updateProfileAsync = createAsyncThunk("profile/updateProfileAsync", async(data) => {
    console.log(data);
    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/updateProfile/${data.profileId}`, {

            profileEmail: data.profileEmail,
            phoneNumber: data.phoneNumber,
            websiteUrlLink: data.websiteUrlLink,
            profilDescription: data.profilDescription,
            publicName: data.publicName,
            publicSurName: data.publicSurName,
            profileAdres: data.profileAdres,
            profileCompany: data.profileCompany,
            profileTag: data.profileTag,
            telNumber: data.telNumber,
            position: data.position,
            placeOfSocialMediaPosition: data.placeOfSocialMediaPosition,
            profileTheme: data.profileTheme,
            orderOfProfile: data.orderOfProfile,
        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })


    .catch(err => {
        console.log("hatalı : ");
        console.log(err);
        return err;
    });

    return res;

});


export const updateOrderProfileAsync = createAsyncThunk("profile/updateOrderProfileAsync", async(data) => {
    console.log(data);
    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/updateProfile/${data.profileId}`, {
            profileEmail: data.profileEmail,
            phoneNumber: data.phoneNumber,
            websiteUrlLink: data.websiteUrlLink,
            profilDescription: data.profilDescription,
            publicName: data.publicName,
            publicSurName: data.publicSurName,
            profileAdres: data.profileAdres,
            profileCompany: data.profileCompany,
            profileTag: data.profileTag,
            telNumber: data.telNumber,
            position: data.position,
            placeOfSocialMediaPosition: data.placeOfSocialMediaPosition,
            profileTheme: data.profileTheme,
            orderOfProfile: data.orderOfProfile,
        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })


    .catch(err => {
        console.log("hatalı : ");
        console.log(err);
        return err;
    });

    return res;

});



export const changegePasswordAsync = createAsyncThunk("profile/changegePasswordAsync", async(data) => {

    const res = await axios.post(`https://us-central1-hibritardpro.cloudfunctions.net/api/changegePassword`, data, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })


    .catch(err => {
        console.log("hatalı : ");
        console.log(err);
        return err;
    });

    return res;

});

export const changesocialPositionAsync = createAsyncThunk("profile/changesocialPositionAsync", async(data) => {

    const res = await axios.post(`https://us-central1-hibritardpro.cloudfunctions.net/api/ChangesocialPosition/${data.profileId}`, {

            placeOfSocialMediaPosition: data.placeOfSocialMediaPosition,

        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })


    .catch(err => {
        console.log("hatalı : ");
        console.log(err);
        return err;
    });

    return res;

});

export const themeChangeAsync = createAsyncThunk("profile/themeChangeAsync", async(data) => {

    const res = await axios.post(`https://us-central1-hibritardpro.cloudfunctions.net/api/themeChange/${data.profileId}`, {

            profileTheme: data.profileTheme,

        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })


    .catch(err => {
        console.log("hatalı : ");
        console.log(err);
        return err;
    });

    return res;

});


export const profileImageUploadAsync = createAsyncThunk("profile/profileImageUploadAsync", async(data) => {
    console.log("profileImageUploadAsync*************");
    console.log(data);
    const res = await axios.post(`https://us-central1-hibritardpro.cloudfunctions.net/api/uploadProfile/${data.profileId}`, data.profileImage, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı foto : ");
            console.log(res);
            return res;
        })


    .catch(err => {
        console.log("hatalı foto : ");
        console.log(err);
        return err;
    });

    return res;

});

export const updateProfileBackgroundAsync = createAsyncThunk("profile/updateProfileBackgroundAsync", async(data) => {
    console.log("updateProfileBackgroundAsync*************");
    console.log(data);
    const res = await axios.post(`https://us-central1-hibritardpro.cloudfunctions.net/api/uploadBackgroundImage/${data.profileId}`, data.profileImage, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı bg foto : ");
            console.log(res);
            return res;
        })


    .catch(err => {
        console.log("hatalı bg foto : ");
        console.log(err);
        return err;
    });

    return res;

});

export const newProfileAddAsync = createAsyncThunk("register/newProfileAddAsync", async(data) => {


    const res = await axios.post(`https://us-central1-hibritardpro.cloudfunctions.net/api/addProfile`, data, {
        headers: {
            'Authorization': localStorage.getItem("GZIToken")
        }
    }).then(res => {
        axios.post(`https://us-central1-hibritardpro.cloudfunctions.net/api/clickProfile/${res.data.newProfileId}/add`)
            .then(res => {})



        console.log("ProfileRes");
        console.log(res);
        return res;
    }).catch(err => {
        console.log("ProfileError");
        console.log(err);
        return err;
    });




    return res;

})


export const userUpdateAsync = createAsyncThunk("register/userUpdateAsync", async(data) => {


    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/user/updateUser/`, data, {
        headers: {
            'Authorization': localStorage.getItem("GZIToken")
        }
    }).then(res => {

        console.log("profile update");
        console.log(res);
        return res;
    }).catch(err => {
        console.log("profile update error");
        console.log(err);
        return err;
    });




    return res;

})


export const deleteProfileAsync = createAsyncThunk("register/deleteProfileAsync", async(profileId) => {


    const res = await axios.delete(`https://us-central1-hibritardpro.cloudfunctions.net/api/deleteProfile/${profileId}`, {
        headers: {
            'Authorization': localStorage.getItem("GZIToken")
        }
    }).then(res => {

        console.log("ProfileRes");
        console.log(res);
        return res;
    }).catch(err => {
        console.log("ProfileError");
        console.log(err);
        return err;
    });




    return res;

})

export const deleteUserAsync = createAsyncThunk("register/deleteUserAsync", async(profileId) => {


    const res = await axios.delete(`https://us-central1-hibritardpro.cloudfunctions.net/api/deleteUser/`, {
        headers: {
            'Authorization': localStorage.getItem("GZIToken")
        }
    }).then(res => {

        console.log("user deleted");
        console.log(res);
        return res;
    }).catch(err => {
        console.log("user deleted error");
        console.log(err);
        return err;
    });




    return res;

})


export const resetPasswordForgetAsync = createAsyncThunk("register/resetPasswordForgetAsync", async(data) => {


    const res = await axios.post(`https://us-central1-hibritardpro.cloudfunctions.net/api/resetPasswordForget/`, data).then(res => {

        console.log("PasswordForget success");
        console.log(res);
        return res;
    }).catch(err => {
        console.log("PasswordForget error");
        console.log(err);
        return err;
    });




    return res;

})

export const AddBillInfoDataAsync = createAsyncThunk("register/AddBillInfoDataAsync", async(data) => {

    const billValues = {
        taxNumber: data.taxNumber,
        taxAdministration: data.taxAdministration,
        companyStatus: data.companyStatus,
        officeEmail: data.officeEmail,
        officePhoneNumber: data.officePhoneNumber,
        location: data.location,
    }
    const res = await axios.post(`https://us-central1-hibritardpro.cloudfunctions.net/api/AddBillInfoData/${data.selectedProfileId}`, billValues, {
        headers: {
            'Authorization': localStorage.getItem("GZIToken")
        }
    }).then(res => {

        console.log("bill update");
        console.log(res);
        return res;
    }).catch(err => {
        console.log("bill update error");
        console.log(err);
        return err;
    });




    return res;

})

export const loginWithCardUrlAsync = createAsyncThunk("register/loginWithCardUrlAsync", async(data) => {

    const res = await axios.post(`https://us-central1-hibritardpro.cloudfunctions.net/api/loginWithCardUrl`, data, {
        headers: {
            'Authorization': localStorage.getItem("GZIToken")
        }
    }).then(res => {

        console.log("loginWithCardUrl success");
        console.log(res);
        return res;
    }).catch(err => {
        console.log("loginWithCardUrl error");
        console.log(err);
        return err;
    });




    return res;

})



//Abdoul Changes From HERE
//get All panel Info to Front
export const getProfilePanelAsync = createAsyncThunk("profile/getProfilePanelAsync", async(data) => {

    const res = await axios.get(`https://us-central1-hibritardpro.cloudfunctions.net/api/panelData/${data}`, {

        headers: {
            'Authorization': localStorage.getItem("GZIToken")
        }
    }).then(res => {
        //console.log("veriler:", res)
        return res;
    }).catch(err => {
        console.log("hata var:", err)
        return err;
    });

    console.log("DATA: ", res)
    return res;

});



// post bank 
export const postBankInfoAsync = createAsyncThunk("profile/postBankAsync", async(data) => {

    console.log(data);

    const res = await axios.post(`https://us-central1-hibritardpro.cloudfunctions.net/api/bankAddData/${data.profileId}`, {
            accountOwner: data.accountOwner == undefined ? "" : data.accountOwner,
            bankName: data.bankName == undefined ? "" : data.bankName,
            bankStation: data.bankStation == undefined ? "" : data.bankStation,
            bankAccountNumber: data.bankAccountNumber == undefined ? "" : data.bankAccountNumber,
            bankIban: data.bankIban == undefined ? "" : data.bankIban,
            OrderId: data.OrderId == undefined ? 0 : data.OrderId

        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            // console.log("başarılı : ");
            // console.log(res);
            return res;
        })
        .catch(err => {
            // console.log("hatalı :", err);
            // console.log(err);
            return err;
        });

    return res;

});




//post contact 
export const postContactInfoAsync = createAsyncThunk("profile/postContactInfoAsync", async(data) => {
    console.log("data burada:", data);

    console.log("adtaalaraa:", data.publicName)

    const res = await axios.post(`https://us-central1-hibritardpro.cloudfunctions.net/api/conatctAddData/${data.profileId}`, {


            publicName: data.publicName == undefined ? "" : data.publicName,
            publicsurname: data.publicsurname == undefined ? "" : data.publicsurname,
            publicOrganization: data.publicOrganization == undefined ? "" : data.publicOrganization,
            profilePosition: data.profilePosition == undefined ? "" : data.profilePosition,
            takenPhoneNumber: data.takenPhoneNumber == undefined ? "" : data.takenPhoneNumber,
            takenEmailEposta: data.takenEmailEposta == undefined ? "" : data.takenEmailEposta,
            streetAdress: data.streetAdress == undefined ? "" : data.streetAdress,
            profileCountry: data.profileCountry == undefined ? "" : data.profileCountry,
            profileCity: data.profileCity == undefined ? "" : data.profileCity,
            profileNot: data.profileNot == undefined ? "" : data.profileNot,
            OrderId: data.OrderId == undefined ? 0 : data.OrderId
        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")

            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

});



//Post Fatura From here
export const postFaturaInfoAsync = createAsyncThunk("profile/postFaturaInfoAsync", async(data) => {

    const res = await axios.post(`https://us-central1-hibritardpro.cloudfunctions.net/api/faturaBillAddData/${data.profileId}`, {

            taxNumber: data.taxNumber == undefined ? "" : data.taxNumber,
            taxAdministration: data.taxAdministration == undefined ? "" : data.taxAdministration,
            companyStatus: data.companyStatus == undefined ? "" : data.companyStatus,
            officeEmail: data.officeEmail == undefined ? "" : data.officeEmail,
            officePhoneNumber: data.officePhoneNumber == undefined ? "" : data.officePhoneNumber,
            location: data.location == undefined ? "" : data.location,
            OrderId: data.OrderId == undefined ? 0 : data.OrderId


        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")

            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

});




//update Only Contact phoneInput
export const updateOnlyPhoneInputContactInfoAsync = createAsyncThunk("profile/updateOnlyPhoneInputContactInfoAsync", async(data) => {


    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/updatePhoneNumbersHere/${data.conatctDataId}`, {

            newEnterPhoneInput: data.newEnterPhoneInput,
            arrayLentghToChange: data.arrayLentghToChange,
            newDefaultPhonenumber: data.newEnterDefaultPhone
        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")

            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

});


//update allways socialMedyapart
export const updateSocialPartAlways = createAsyncThunk("profile/updateSocialPartAlways", async(data) => {

    console.log(data);

    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/updateSocialFromPanel`, {


            profileId: data.profileId,
            socialMediaId: data.socialMediaId,
            socialMediaType: data.socialMediaType,
            socialUrlLink: data.socialUrlLink


        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

})


// update Only bank Arrayt from here

export const updateOnlyBankDataArrayInfoAsync = createAsyncThunk("profile/updateOnlyBankDataArrayInfoAsync", async(data) => {


    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/updateBankDataOnly/${data.BankDataId}`, {

            accountOwner: data.accountOwner,
            bankName: data.bankName,
            bankStation: data.bankStation,
            bankIban: data.bankIban,
            bankAccountNumber: data.bankAccountNumber,
            arrayLentghToChange: data.arrayLentghToChange

        }, {

            headers: {

                'Authorization': localStorage.getItem("GZIToken")
            }



        })
        .then(res => {
            console.log("başarılı bank update: ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı bank:", err);

            console.log(err);
            return err;
        });

    return res;

});

//update new Profile Array from here updateProfileUrlLinksDataOnly

export const updateProfileUrlDataArrayInfoAsync = createAsyncThunk("profile/updateProfileUrlDataArrayInfoAsync", async(data) => {

    console.log(data);

    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/updateProfileUrlLinksDataOnly/${data.panelProfileUrlDataId}`, {

            arrayIndexthis: data.arrayIndexthis,
            socialOrder: data.socialOrder,
            socialUrlHead: data.socialUrlHead,
            socialUrlLink: data.socialUrlLink,
            socialtype: data.socialtype,
            statuMode: data.statuMode,
            placeholder: data.placeholder


        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

})


//update ONLY Contact Email Input
export const updateOnlyEmailInputContactInfoAsync = createAsyncThunk("profile/updateOnlyEmailInputContactInfoAsync", async(data) => {


    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/updateEmailPostasHere/${data.conatctDataId}`, {
            newEmailPosta: data.newEmailPosta,
            arrayLentghToChange: data.arrayLentghToChange,
            newDefaultEmail: data.newEmailDefault
        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")

            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

});


//post Panel profil URL from here
export const postProfileUrlInfoAsync = createAsyncThunk("profile/postProfileUrlInfoAsync", async(data) => {


    const res = await axios.post(`https://us-central1-hibritardpro.cloudfunctions.net/api/panelUrlLinkAddData/${data.profileId}`, {


            //panelUrlLink: data.panelUrlLink == undefined ? "" : data.panelUrlLink,

            socialUrlLink: data.socialUrlLink == undefined ? "" : data.socialUrlLink,
            socialtype: data.socialtype == undefined ? "web" : data.socialtype,
            socialOrder: data.socialOrder == undefined ? 0 : data.socialOrder,
            OrderId: data.OrderId == undefined ? 0 : data.OrderId


        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")

            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

});

//post Profile of Link social from heer
export const postUrlLinkSocialInfoAsync = createAsyncThunk("profile/postUrlLinkSocialInfoAsync", async(data) => {


    const res = await axios.post(`https://us-central1-hibritardpro.cloudfunctions.net/api/newSocialUrlAddArray/${data.profileId}`, {

            socialUrlLink: data.socialUrlLink == undefined ? "" : data.socialUrlLink,
            socialtype: data.socialtype == undefined ? "web" : data.socialtype,
            socialOrder: data.socialOrder == undefined ? 0 : data.socialOrder,
            OrderId: data.OrderId == undefined ? 0 : data.OrderId

        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")

            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

});



//update profile Url From Here  

export const updateProfileUrlInfoAsync = createAsyncThunk("profile/updateProfileUrlInfoAsync", async(data) => {

    console.log(data);

    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/updatePanelProfileUrl/${data.panelProfileUrlDataId}`, {

            panelUrlLink: data.panelUrlLink
        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

})



//post document from here
export const postDocumentInfoAsync = createAsyncThunk("profile/postDocumentAsyn", async(data) => {
    console.log(data);

    const res = await axios.post(`https://us-central1-hibritardpro.cloudfunctions.net/api/documentData/${data.profileId}`, {

            statusNameSurname: data.statusNameSurname == undefined ? "" : data.statusNameSurname,
            statusEmail: data.statusEmail == undefined ? "" : data.statusEmail,
            statusTelefon: data.statusTelefon == undefined ? "" : data.statusTelefon,
            statusMessage: data.statusMessage == undefined ? "" : data.statusMessage,
            emailToSend: data.emailToSend == undefined ? "" : data.emailToSend,
            publicstreetAdress: data.publicstreetAdress == undefined ? "" : data.publicstreetAdress,
            publicDropNot: data.publicDropNot == undefined ? "" : data.publicDropNot,
            OrderId: data.OrderId == undefined ? "" : data.OrderId

        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

});


//update Bank Data
export const updateBankInfoAsync = createAsyncThunk("profile/updateBankAsync", async(data) => {

    console.log(data);

    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/bankdataUpdate/${data.BankDataId}`, {
            OrderId: data.OrderId
        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

})

//update contact data
export const updateContactInfoAsync = createAsyncThunk("profile/updateBankAsync", async(data) => {

    console.log(data);

    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/contactdataUpdate/${data.contactDataId}`, {
            contactDataId: data.contactDataId,
            publicName: data.publicName,
            publicsurname: data.publicsurname,
            publicOrganization: data.publicOrganization,
            profilePosition: data.profilePosition,
            streetAdress: data.streetAdress,
            profileCountry: data.profileCountry,
            profileCity: data.profileCity,
            profileNot: data.profileNot
        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

})






//update fatura Dtaa from heer  

export const updateFaturaDataInfoAsync = createAsyncThunk("profile/updateFaturaDataInfoAsync", async(data) => {

    console.log(data);

    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/faturaBilldataUpdate/${data.faturaDataId}`, {

            taxNumber: data.taxNumber,
            taxAdministration: data.taxAdministration,
            companyStatus: data.companyStatus,
            officeEmail: data.officeEmail,
            officePhoneNumber: data.officePhoneNumber,
            location: data.location,

        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

})


//update document
export const updateDocumentInfoAsync = createAsyncThunk("profile/updateBankAsync", async(data) => {

    console.log(data);

    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/documentdataUpdate/${data.documentDataFormId}`, {

            statusNameSurname: data.statusNameSurname,
            statusEmail: data.statusEmail,
            statusTelefon: data.statusTelefon,
            statusMessage: data.statusMessage,
            emailToSend: data.emailToSend,
            publicstreetAdress: data.publicstreetAdress,
            publicDropNot: data.publicDropNot

        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

})






//upload Files
export const fileUploadAsync = createAsyncThunk("profile/fileUploadAsync", async(data) => {
    // console.log("fileUploadAsync*************");
    // console.log(data);
    console.log("haydii baku:", data.belgeDocument)

    const res = await axios.post(`https://us-central1-hibritardpro.cloudfunctions.net/api/uploadFileDoucment/${data.profileId}`,
            belgeDocument = data.belgeDocument == undefined ? "" : data.belgeDocument, {
                headers: {
                    'Authorization': localStorage.getItem("GZIToken")
                }
            })
        .then(res => {
            // console.log("başarılı foto : ");
            // console.log(res);
            return res;
        })


    .catch(err => {
        // console.log("hatalı File UPLOAD : ");
        // console.log(err);
        return err;
    });

    return res;

});


// first Upload File from heere
export const firstTimeUploadFileAsync = createAsyncThunk("profile/firstTimeUploadFileAsync", async(data) => {
    // console.log("fileUploadAsync*************");
    // console.log(data);

    const res = await axios.post(`https://us-central1-hibritardpro.cloudfunctions.net/api/uploadFileDoucmentFirstTime/${data.profileId}`, {


            belgeDocument: "",
            OrderId: data.OrderId == undefined ? "" : data.OrderId


        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            // console.log("başarılı foto : ");
            // console.log(res);
            return res;
        })




    .catch(err => {
        // console.log("hatalı File UPLOAD : ");
        // console.log(err);
        return err;
    });

    return res;

});


//changes Files from here
export const fileUploadChangeAsync = createAsyncThunk("profile/fileUploadChangeAsync", async(data) => {
    // console.log("fileUploadAsync*************");
    // console.log(data);
    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/changeUploadImage/${data.belgeDocumentId}`,

        data.belgeDocument, {

            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })

    .then(res => {
        // console.log("başarılı foto : ");
        // console.log(res);
        return res;
    })


    .catch(err => {
        //console.log("hatalı File UPLOAD : ");
        //console.log(err);
        return err;
    });

    return res;

});


//handleImageChange



//update statusMode Bank
export const updatBankStatusModeAsync = createAsyncThunk("profile/updatBankStatusModeAsync", async(data) => {

    console.log(data);

    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/changeStatusModeOfBank/${data.bankDataId}`, {
            statueMode: data.statueMode
        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            // console.log("başarılı : ");
            //console.log(res);
            return res;
        })
        .catch(err => {
            //console.log("hatalı :", err);
            // console.log(err);
            return err;
        });

    return res;

})







//update StatueMode of Profile Url form here
export const updatProfileUrlStatusModeAsync = createAsyncThunk("profile/updatProfileUrlStatusModeAsync", async(data) => {

    console.log(data);

    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/changeStatusModeOfProfileUrl/${data.panelProfileUrlDataId}`, {
            statueMode: data.statueMode
        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            // console.log("başarılı : ");
            //console.log(res);
            return res;
        })
        .catch(err => {
            //console.log("hatalı :", err);
            // console.log(err);
            return err;
        });

    return res;

})


//update statusMode Contact
export const updatContactStatusModeAsync = createAsyncThunk("profile/updatContactStatusModeAsync", async(data) => {

    console.log(data);

    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/changeStatusModeOfContact/${data.contactDataId}`, {
            statueMode: data.statueMode
        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

})

// StatueMode Of Fatura Here
export const updatFaturaStatusModeAsync = createAsyncThunk("profile/updatFaturaStatusModeAsync", async(data) => {

    console.log(data);

    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/changeStatusModeOfFaturaBill/${data.faturaDataId}`, {

            statueMode: data.statueMode

        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

})


//update statueMde of Document to View

export const updateDocumentToViewStatusModeAsync = createAsyncThunk("profile/updateDocumentToViewStatusModeAsync", async(data) => {

    console.log(data);

    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/changeStatusModeOfDocument/${data.documentDataFormId}`, {
            statueMode: data.statueMode
        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")

            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

})

//update File upload statuMode

export const updateFileUploadedStatusModeAsync = createAsyncThunk("profile/updateDocumentToViewStatusModeAsync", async(data) => {

    console.log(data);

    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/changeStatusModeOfFileUpload/${data.belgeDocumentId}`, {
            statueMode: data.statueMode
        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

})

//update OrderOfBankId here
export const updateOrderOdBankIdAsync = createAsyncThunk("profile/updateOrderOdBankIdAsync", async(data) => {

    console.log(data);

    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/changeOrdreIdOfBank/${data.bankDataId}`, {
            OrderId: data.OrderId
        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

})

//update profile panel fromhere
export const updateOrderOfProfilePanelIdAsync = createAsyncThunk("profile/updateOrderOfProfilePanelIdAsync", async(data) => {


    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/changeOrdreIdOfprofileUrlPanel/${data.panelProfileUrlDataId}`, {
            OrderId: data.OrderId
        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

})


//order of Contact here update
export const updateOrderOfContactIdAsync = createAsyncThunk("profile/updateOrderOfContactIdAsync", async(data) => {

    console.log(data);

    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/changeOrdreIdOfContact/${data.contactDataId}`, {
            OrderId: data.OrderId
        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

})


// update Order of Fatura List Bill

export const updateOrderOfFaturaBillIdAsync = createAsyncThunk("profile/updateOrderOfFaturaBillIdAsync", async(data) => {

    console.log(data);

    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/changeOrdreIdOfFaturaBill/${data.faturaDataId}`, {
            OrderId: data.OrderId
        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

})



//order of Document to View  update

export const updateOrderOfDocumentToViewIdAsync = createAsyncThunk("profile/updateOrderOfDocumentToViewIdAsync", async(data) => {

    console.log(data);

    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/changeOrdreIdOfdocument/${data.documentDataFormId}`, {
            OrderId: data.OrderId
        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

})

//oderOf File Uploaded update
export const updateOrderOfFileUploadedIdAsync = createAsyncThunk("profile/updateOrderOfDocumentToViewIdAsync", async(data) => {

    console.log(data);

    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/changeOrdreIdOfFileUploaded/${data.belgeDocumentId}`, {
            OrderId: data.OrderId
        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

})

//delete Bank Panel
export const deleteBankPanelAsync = createAsyncThunk("profile/deleteBankPanelAsync", async(data) => {

    console.log(data);

    const res = await axios.delete(`https://us-central1-hibritardpro.cloudfunctions.net/api/bankPanelDelete/${data.bankDataId}`, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

})

//delte Contact panel
export const deleteContactPanelAsync = createAsyncThunk("profile/deleteContactPanelAsync", async(data) => {


    console.log(data);

    const res = await axios.delete(`https://us-central1-hibritardpro.cloudfunctions.net/api/contactPanelDelete/${data.contactDataId}`, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

})


// delete Fatura Bill from here

export const deleteFaturaBillPanelAsync = createAsyncThunk("profile/deleteFaturaBillPanelAsync", async(data) => {

    console.log(data);

    const res = await axios.delete(`https://us-central1-hibritardpro.cloudfunctions.net/api/faturaPanelDelete/${data.faturaDataId}`, {

            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }

        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

})






//delete Profile Url panel from here
export const deleteProfileUrlPanelAsync = createAsyncThunk("profile/deleteProfileUrlPanelAsync", async(data) => {

    console.log(data);

    const res = await axios.delete(`https://us-central1-hibritardpro.cloudfunctions.net/api/profileUrlPanelDelete/${data.panelProfileUrlDataId}`, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

})


//delte Document from here
export const deleteDocumentPanelAsync = createAsyncThunk("profile/deleteDocumentPanelAsync", async(data) => {

    console.log(data);

    const res = await axios.delete(`https://us-central1-hibritardpro.cloudfunctions.net/api/documentPanelDelete/${data.documentDataFormId}`, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

})

//delete File Uploaded here
export const deleteFileUploadedPanelAsync = createAsyncThunk("profile/deleteFileUploadedPanelAsync", async(data) => {

    console.log(data);

    const res = await axios.delete(`https://us-central1-hibritardpro.cloudfunctions.net/api/fileUploadPanelDelete/${data.belgeDocumentId}`, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

})


// panel Title From HERE Contact
export const updatePanelTitleContactdAsync = createAsyncThunk("profile/updatePanelTitleContactdAsync", async(data) => {

    console.log(data);

    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/changepanelTitle/${data.contactDataId}`, {
            panelTitle: data.panelTitle
        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

})


//change Panel Title of Fatura here
export const updatePanelTitleOfFaturaAsync = createAsyncThunk("profile/updatePanelTitleOfFaturaAsync", async(data) => {

    console.log(data);

    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/changepanelTitleOfFatura/${data.faturaDataId}`, {
            panelTitle: data.panelTitle
        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

})


//panel Title from heer profile URL
export const updatePanelTitleProfileUrlLinkAsync = createAsyncThunk("profile/updatePanelTitleProfileUrlLinkAsync", async(data) => {

    console.log(data);

    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/changepanelProfileUrlPanelTitle/${data.panelProfileUrlDataId}`, {
            panelTitle: data.panelTitle
        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

})


//panel Title From Here BANK
export const updatePanelTitleBankdAsync = createAsyncThunk("profile/updatePanelTitleBankdAsync", async(data) => {

    console.log(data);

    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/changepanelTitleBank/${data.bankDataId}`, {
            panelTitle: data.panelTitle
        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

})

//panel Title from Document
export const updatePanelTitleDocumentdAsync = createAsyncThunk("profile/updatePanelTitleDocumentdAsync", async(data) => {

    console.log(data);

    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/changepanelTitleDocument/${data.documentDataFormId}`, {
            panelTitle: data.panelTitle
        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

})

//panel Title from File Uploade
export const updatePanelTitleFileUploadAsync = createAsyncThunk("profile/updatePanelTitleFileUploadAsync", async(data) => {

    console.log(data);

    const res = await axios.put(`https://us-central1-hibritardpro.cloudfunctions.net/api/changepanelTitleFileUpload/${data.belgeDocumentId}`, {
            panelTitle: data.panelTitle
        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı : ");
            console.log(res);
            return res;
        })
        .catch(err => {
            console.log("hatalı :", err);
            console.log(err);
            return err;
        });

    return res;

})



//delete Phone array from here
export const deletePhoneArrayOnly = createAsyncThunk("profile/deletePhoneArrayOnly", async(data) => {

    console.log("hereDtata::", data);

    console.log("dataConsole::")

    const res = await axios.delete(`https://us-central1-hibritardpro.cloudfunctions.net/api/deleteArrayPhone/${data.conatctDataId}`, {

        existPhoneNumber: data.existPhoneNumber,
        existDefaultPhone: data.existDefaultPhone

    }, {
        headers: {

            'Authorization': localStorage.getItem("GZIToken")

        }

    }).then(res => {

        console.log("succesfully Updated")
        return res;
    }).catch(err => {

        console.log("hatalı :", err.response.data.Hata);



        return err;
    });

    return res;

})

// delete Email Array Only
export const deleteEmailArrayOnly = createAsyncThunk("profile/deleteEmailArrayOnly", async(data) => {

    console.log("dataaEmail", data);

    const res = await axios.delete(`https://us-central1-hibritardpro.cloudfunctions.net/api/deleteArrayEmail/${data.conatctDataId}`, {
            existEmail: data.existEmail,
            existDefaultEmail: data.existDefaultEmail,
        }, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        })
        .then(res => {
            console.log("başarılı Delete Email Array: ");
            return res;
        })
        .catch(err => {
            console.log("hataliEmailArray:", err);
            console.log(err);
            return err;
        });

    console.log("analog::", res)

    return res;




})




const userSlice = createSlice({
    name: "profile",
    initialState: {

        user: null,
        profiles: [],
        previewAllPanel: [],
        selectProfileId: "",
        status: "",
        errors: null,
        passwordChangeError: null,
        passwordSuccess: false,
        forgetEMailError: null,
        forgetEMailSuccess: false,
        verificationCodeError: false,
        verificationCodeSuccess: false,

        profilePanel: [],
        profilePanelBank: null,
        deletesatatus: "",
        editTitlepanelStatus: "",
        deletephoneElementStatus: "",
        deleteEmailElementStatus: "",
        postContactStatus: "",
        postFaturaStatus: "",
        postPanelProfilUrlStatus: "",
        postPanelSocialUrlStatus: "",
        getAllpanelStatus: "",
        postbanStatus: "",
        documentstatus: "",
        uploadFilestatus: "",
        uploadFilestatusFirst: "",
        updateOnlyPhoneStatus: "",
        updatesocialStatus: "",
        updateOnlyBankDataStatus: "",
        updateOnlyEmailStatus: "",

        orderBankStatus: "",
        orderContactStatus: "",
        orderDocumentStatus: "",
        orderProfileUrStatus: "",
        orderUploadUploadStatus: "",

        orderUpdateFaturaStatus: "",
        orderFaturaStatus: "",



    },
    reducers: {
        selectedProfile: (state, action) => {
            console.log(action.payload);
            localStorage.setItem("selectedProfileId", action.payload);
            state.selectProfileId = action.payload;
        },
        forgetEMailSuccessReset: (state, action) => {
            state.forgetEMailSuccess = false;
        }
    },
    extraReducers: {
        //getAllProfile
        [getUserAsync.pending]: (state, action) => {

            state.status = "loading";
        },
        [getUserAsync.fulfilled]: (state, action) => {
            if (localStorage.getItem("GZIToken")) {
                state.user = action.payload.data ? action.payload.data.credentials : "";
                state.profiles = action.payload.data ? action.payload.data.profileofGeneralUser : "";
                state.status = "success";
            }

        },
        //updateProfileAsync
        [updateProfileAsync.pending]: (state, action) => {

            state.status = "loading";
        },
        [updateProfileAsync.fulfilled]: (state, action) => {

            state.status = "success";
        },
        //updateOrderProfileAsync
        [updateOrderProfileAsync.pending]: (state, action) => {

            //  state.status = "loading";
        },
        [updateOrderProfileAsync.fulfilled]: (state, action) => {

            state.status = "success";
        },
        //updateProfileAsync
        [profileImageUploadAsync.pending]: (state, action) => {

            state.status = "loading";
        },
        [profileImageUploadAsync.fulfilled]: (state, action) => {

            state.status = "success";
        },
        //updateProfileBackgroundAsync
        [updateProfileBackgroundAsync.pending]: (state, action) => {

            state.status = "loading";
        },
        [updateProfileBackgroundAsync.fulfilled]: (state, action) => {

            state.status = "success";
        },
        //changesocialPositionAsync
        [changesocialPositionAsync.pending]: (state, action) => {

            state.status = "loading";
        },
        [changesocialPositionAsync.fulfilled]: (state, action) => {

            state.status = "success";
        },
        //themeChangeAsync
        [themeChangeAsync.pending]: (state, action) => {

            state.status = "loading";
        },
        [themeChangeAsync.fulfilled]: (state, action) => {

            state.status = "success";
        },
        //newProfileAddAsync
        [newProfileAddAsync.pending]: (state, action) => {

            state.status = "loading";
        },
        [newProfileAddAsync.fulfilled]: (state, action) => {

            state.status = "success";
        },
        //deleteProfileAsync
        [deleteProfileAsync.pending]: (state, action) => {

            state.status = "loading";
        },
        [deleteProfileAsync.fulfilled]: (state, action) => {

            state.status = "success";
        },
        //userUpdateAsync
        [userUpdateAsync.pending]: (state, action) => {

            state.status = "loading";
        },
        [userUpdateAsync.fulfilled]: (state, action) => {

            state.status = "success";
        },
        //deleteUserAsync
        [deleteUserAsync.pending]: (state, action) => {

            state.status = "loading";
        },
        [deleteUserAsync.fulfilled]: (state, action) => {

            state.status = "success";
        },
        //AddBillInfoDataAsync
        [AddBillInfoDataAsync.pending]: (state, action) => {

            state.status = "loading";
        },
        [AddBillInfoDataAsync.fulfilled]: (state, action) => {

            state.status = "success";
        },
        //changegePasswordAsync
        [changegePasswordAsync.pending]: (state, action) => {

            state.status = "loading";
        },
        [changegePasswordAsync.fulfilled]: (state, action) => {
            if (localStorage.getItem("GZIToken")) {

                console.log(action.payload.response);

                state.passwordChangeError = {
                    passwordError: action.payload.data && action.payload.data.Mesaj == "This password does'nt exist!!" ? true : false,
                    passwordNotMatch: action.payload.response && action.payload.response.data && action.payload.response.data.Mesaj == "Password are not conformed!!" ? true : false,
                    minCountCharacter: action.payload.response && action.payload.response.data && action.payload.response.data.Fail ? true : false,

                };
                state.passwordSuccess = action.payload.data && action.payload.data.Success ? true : false;


                console.log(state.passwordChangeError);

                state.status = "success";
            }
        },
        //resetPasswordForgetAsync
        [resetPasswordForgetAsync.pending]: (state, action) => {

            state.status = "loading";
        },
        [resetPasswordForgetAsync.fulfilled]: (state, action) => {
            if (localStorage.getItem("GZIToken")) {

                console.log(action.payload);
                state.forgetEMailError = {
                    eMailEmpty: action.payload.response && action.payload.response.data && action.payload.response.data.errorPersonEnter && action.payload.response.data.errorPersonEnter.eMail == "Can't be Empty!!" ? true : false,
                    invalidEmail: action.payload.response && action.payload.response.data.err && action.payload.response.data.err.code == "auth/invalid-email" ? true : false,
                    userNotFound: action.payload.response && action.payload.response.data.err && action.payload.response.data.err.code == "auth/user-not-found" ? true : false,

                };
                state.forgetEMailSuccess = action.payload.data && action.payload.data.emailSent ? true : false;

                if (state.forgetEMailSuccess) {
                    state.status = "success";
                } else {
                    state.status = "error";
                }
            }


        },
        //loginWithCardUrlAsync
        [loginWithCardUrlAsync.pending]: (state, action) => {

            state.status = "loading";


        },
        [loginWithCardUrlAsync.fulfilled]: (state, action) => {
            if (localStorage.getItem("GZIToken")) {

                console.log(action.payload);
                state.verificationCodeError = action.payload.response && action.payload.response.data && action.payload.response.data.verificationCodeError ? true : false;
                state.verificationCodeSuccess = action.payload.data && action.payload.data.Succesful ? true : false;
                if (state.verificationCodeSuccess) {
                    state.status = "success";
                } else {
                    state.status = "error";
                }
            }
        },
        //getPanelAsync
        [getPanelAsync.pending]: (state, action) => {


            state.status = "loading";
        },
        [getPanelAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.previewAllPanel = action.payload.data ? action.payload.data.bankDataInfo : "";
            state.status = "success";
        },

        //Abdul Kontrol From here

        //get getProfilePanel
        [getProfilePanelAsync.fulfilled]: (state, action) => {
            state.profilePanel = action.payload.data;
            state.profilePanelBank = action.payload.data ? action.payload.data.bankDataInfo : "";
            state.getAllpanelStatus = "success";
        },
        //get getProfilePanel
        [getProfilePanelAsync.pending]: (state, action) => {
            state.getAllpanelStatus = "loading";
        },

        // post bank
        [postBankInfoAsync.pending]: (state, action) => {
            state.postbanStatus = "loading";
        },
        [postBankInfoAsync.fulfilled]: (state, action) => {
            state.postbanStatus = "success";
        },

        // update bank data updateBankInfoAsync
        [updateBankInfoAsync.pending]: (state, action) => {
            state.status = "loading";
        },
        [updateBankInfoAsync.fulfilled]: (state, action) => {
            state.status = "success";
        },

        //update Profile URL FROM HERE   

        [updateProfileUrlInfoAsync.pending]: (state, action) => {
            state.status = "loading";
        },
        [updateProfileUrlInfoAsync.fulfilled]: (state, action) => {
            state.status = "success";
        },

        // post contact postContactInfoAsync

        [postContactInfoAsync.pending]: (state, action) => {
            state.postContactStatus = "loading";
        },
        [postContactInfoAsync.fulfilled]: (state, action) => {
            state.postContactStatus = "success";
        },

        // Post Fatura from here    

        [postFaturaInfoAsync.pending]: (state, action) => {
            state.postFaturaStatus = "loading";
        },
        [postFaturaInfoAsync.fulfilled]: (state, action) => {
            state.postFaturaStatus = "success";
        },


        //statu of update only phone Input Contact 

        [updateOnlyPhoneInputContactInfoAsync.pending]: (state, action) => {
            state.updateOnlyPhoneStatus = "loading";
        },
        [updateOnlyPhoneInputContactInfoAsync.fulfilled]: (state, action) => {
            state.updateOnlyPhoneStatus = "success";
        },

        //uapdate social media from  panel   

        [updateSocialPartAlways.pending]: (state, action) => {
            state.updatesocialStatus = "loading";
        },
        [updateSocialPartAlways.fulfilled]: (state, action) => {
            state.updatesocialStatus = "success";
        },



        [updateOnlyBankDataArrayInfoAsync.pending]: (state, action) => {
            state.status = "loading";
        },
        [updateOnlyBankDataArrayInfoAsync.fulfilled]: (state, action) => {
            state.status = "success";
        },

        //update profile Url only from here 

        [updateProfileUrlDataArrayInfoAsync.pending]: (state, action) => {
            state.status = "loading";
        },
        [updateProfileUrlDataArrayInfoAsync.fulfilled]: (state, action) => {
            state.status = "success";
        },


        //statu pdate only Email Contact from here
        [updateOnlyEmailInputContactInfoAsync.pending]: (state, action) => {
            state.updateOnlyEmailStatus = "loading";
        },
        [updateOnlyEmailInputContactInfoAsync.fulfilled]: (state, action) => {
            state.updateOnlyEmailStatus = "success";
        },

        //profile URL POST 
        [postProfileUrlInfoAsync.pending]: (state, action) => {
            state.postPanelProfilUrlStatus = "loading";
        },
        [postProfileUrlInfoAsync.fulfilled]: (state, action) => {
            state.postPanelProfilUrlStatus = "success";
        },

        // 

        [postUrlLinkSocialInfoAsync.pending]: (state, action) => {
            state.postPanelSocialUrlStatus = "loading";
        },
        [postUrlLinkSocialInfoAsync.fulfilled]: (state, action) => {
            state.postPanelSocialUrlStatus = "success";
        },

        //post document  postDocumentInfoAsync
        [postDocumentInfoAsync.pending]: (state, action) => {
            state.documentstatus = "loading";
        },
        [postDocumentInfoAsync.fulfilled]: (state, action) => {
            state.documentstatus = "success";
        },

        //UPLOAD fİLE  fileUploadAsync
        [fileUploadAsync.pending]: (state, action) => {
            state.uploadFilestatus = "loading";
        },
        [fileUploadAsync.fulfilled]: (state, action) => {
            state.uploadFilestatus = "success";
        },

        //updated fom there 

        [firstTimeUploadFileAsync.pending]: (state, action) => {
            state.uploadFilestatusFirst = "loading";
        },
        [firstTimeUploadFileAsync.fulfilled]: (state, action) => {
            state.uploadFilestatusFirst = "success";
        },

        //change fileUploadChangeAsync

        [fileUploadChangeAsync.pending]: (state, action) => {
            state.status = "loading";
        },
        [fileUploadChangeAsync.fulfilled]: (state, action) => {

            state.status = "success";
        },

        //update ststatus Mode  updatBankStatusModeAsync
        [updatBankStatusModeAsync.pending]: (state, action) => {
            //state.status = "loading";
        },
        [updatBankStatusModeAsync.fulfilled]: (state, action) => {

            state.status = "success";
        },

        //update StatueMode of profile Url   
        [updatProfileUrlStatusModeAsync.pending]: (state, action) => {
            //state.status = "loading";
        },
        [updatProfileUrlStatusModeAsync.fulfilled]: (state, action) => {
            state.status = "success";
        },

        //update ststatus Mode contact
        [updatContactStatusModeAsync.pending]: (state, action) => {
            //state.status = "loading";
        },
        [updatContactStatusModeAsync.fulfilled]: (state, action) => {

            state.status = "success";
        },

        //update StatuıeMode Of Fatura Here   

        [updatFaturaStatusModeAsync.pending]: (state, action) => {
            //state.status = "loading";
        },
        [updatFaturaStatusModeAsync.fulfilled]: (state, action) => {

            state.status = "success";
        },


        //update statuMode of document to view
        [updateDocumentToViewStatusModeAsync.pending]: (state, action) => {
            //state.status = "loading";
        },
        [updateDocumentToViewStatusModeAsync.fulfilled]: (state, action) => {

            state.status = "success";
        },

        //update statuMode of File Uploaded here
        [updateFileUploadedStatusModeAsync.pending]: (state, action) => {
            //state.status = "loading";
        },
        [updateFileUploadedStatusModeAsync.fulfilled]: (state, action) => {

            state.status = "success";
        },

        //update order of Bank  
        [updateOrderOdBankIdAsync.pending]: (state, action) => {
            state.orderBankStatus = "loading";
        },
        [updateOrderOdBankIdAsync.fulfilled]: (state, action) => {

            state.orderBankStatus = "success";
        },
        //update order of Contact status 
        [updateOrderOfContactIdAsync.pending]: (state, action) => {
            state.orderContactStatus = "loading";
        },
        [updateOrderOfContactIdAsync.fulfilled]: (state, action) => {

            state.orderContactStatus = "success";
        },

        //order of Ftaura Bill   

        //update order of Contact status 
        [updateOrderOfFaturaBillIdAsync.pending]: (state, action) => {
            state.orderFaturaStatus = "loading";
        },
        [updateOrderOfFaturaBillIdAsync.fulfilled]: (state, action) => {

            state.orderFaturaStatus = "success";
        },

        //order of document to view 
        [updateOrderOfDocumentToViewIdAsync.pending]: (state, action) => {
            state.orderDocumentStatus = "loading";
        },
        [updateOrderOfDocumentToViewIdAsync.fulfilled]: (state, action) => {
            state.orderDocumentStatus = "success";
        },

        //update order status 
        [updateOrderOfFileUploadedIdAsync.pending]: (state, action) => {
            state.orderUploadUploadStatus = "loading";
        },
        [updateOrderOfFileUploadedIdAsync.fulfilled]: (state, action) => {
            state.orderUploadUploadStatus = "success";
        },





        //update order of profile Url  
        [updateOrderOfProfilePanelIdAsync.pending]: (state, action) => {
            state.orderProfileUrStatus = "loading";
        },
        [updateOrderOfProfilePanelIdAsync.fulfilled]: (state, action) => {

            state.orderProfileUrStatus = "success";
        },

        // delete status   ******************   
        [deleteBankPanelAsync.pending]: (state, action) => {
            state.deletesatatus = "loading";
        },
        [deleteBankPanelAsync.fulfilled]: (state, action) => {
            state.deletesatatus = "success";
        },

        [deleteContactPanelAsync.pending]: (state, action) => {
            state.deletesatatus = "loading";
        },
        [deleteContactPanelAsync.fulfilled]: (state, action) => {
            state.deletesatatus = "success";
        },

        //delete Fatura From HERE  
        [deleteFaturaBillPanelAsync.pending]: (state, action) => {
            state.deletesatatus = "loading";
        },
        [deleteFaturaBillPanelAsync.fulfilled]: (state, action) => {
            state.deletesatatus = "success";
        },


        //delete panel profile Url from here   
        [deleteProfileUrlPanelAsync.pending]: (state, action) => {
            state.deletesatatus = "loading";
        },
        [deleteProfileUrlPanelAsync.fulfilled]: (state, action) => {
            state.deletesatatus = "success";
        },


        [deleteDocumentPanelAsync.pending]: (state, action) => {
            state.deletesatatus = "loading";
        },
        [deleteDocumentPanelAsync.fulfilled]: (state, action) => {
            state.deletesatatus = "success";
        },

        [deleteFileUploadedPanelAsync.pending]: (state, action) => {
            state.deletesatatus = "loading";
        },
        [deleteFileUploadedPanelAsync.fulfilled]: (state, action) => {
            state.deletesatatus = "success";
        },

        //panel Title from here   Conatact
        [updatePanelTitleContactdAsync.pending]: (state, action) => {
            state.editTitlepanelStatus = "loading";
        },
        [updatePanelTitleContactdAsync.fulfilled]: (state, action) => {
            state.editTitlepanelStatus = "success";
        },

        //panel 

        [updatePanelTitleOfFaturaAsync.pending]: (state, action) => {
            state.editTitlepanelStatus = "loading";
        },
        [updatePanelTitleOfFaturaAsync.fulfilled]: (state, action) => {
            state.editTitlepanelStatus = "success";
        },

        //profile Url panel Title  
        [updatePanelTitleProfileUrlLinkAsync.pending]: (state, action) => {
            state.editTitlepanelStatus = "loading";
        },
        [updatePanelTitleProfileUrlLinkAsync.fulfilled]: (state, action) => {
            state.editTitlepanelStatus = "success";
        },


        //panel Title from here   bank
        [updatePanelTitleBankdAsync.pending]: (state, action) => {
            state.editTitlepanelStatus = "loading";
        },
        [updatePanelTitleBankdAsync.fulfilled]: (state, action) => {
            state.editTitlepanelStatus = "success";
        },

        //panel Title from here Document  
        [updatePanelTitleDocumentdAsync.pending]: (state, action) => {
            state.editTitlepanelStatus = "loading";
        },
        [updatePanelTitleDocumentdAsync.fulfilled]: (state, action) => {
            state.editTitlepanelStatus = "success";
        },
        //file Upload Status Title
        [updatePanelTitleFileUploadAsync.pending]: (state, action) => {
            state.editTitlepanelStatus = "loading";
        },
        [updatePanelTitleFileUploadAsync.fulfilled]: (state, action) => {
            state.editTitlepanelStatus = "success";
        },

        //delete Phone Array from here 
        [deletePhoneArrayOnly.pending]: (state, action) => {
            state.deletephoneElementStatus = "loading";
        },
        [deletePhoneArrayOnly.fulfilled]: (state, action) => {
            state.deletephoneElementStatus = "success";
        },

        //deleet emmail Arays Element  

        [deleteEmailArrayOnly.pending]: (state, action) => {
            state.deleteEmailElementStatus = "loading";
        },
        [deleteEmailArrayOnly.fulfilled]: (state, action) => {
            state.deleteEmailElementStatus = "success";
        },



    }
})
export const { selectedProfile, forgetEMailSuccessReset } = userSlice.actions
export default userSlice.reducer;