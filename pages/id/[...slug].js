import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ImageLoader from "react-imageloader";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/loading";
import { clickProfileAsync } from "../../stores/analysisSlice";
import {
  geturlcardRandomAsync,
  getUseridAsync,
} from "../../stores/publicProfileSlice";

import PublicSelectProfile from "../../components/public-profile-select";
import PublicProfilePage from "../../components/public-profile-page";

function PublicProfile() {
  const [selectProfileActive, setSelectProfileActive] = useState(false);
  const [profilePageActive, setProfilePageActive] = useState(false);

  const publicProfile = useSelector(
    (state) => state.publicProfileSlice.publicProfile
  );
  const allProfile = useSelector(
    (state) => state.publicProfileSlice.allProfile
  );
  const status = useSelector((state) => state.publicProfileSlice.status);
  const [allProfileSort, setAllProfileSort] = useState([]);
  const allPanel = useSelector((state) => state.publicProfileSlice.allPanel);
  const allSocial = useSelector((state) => state.publicProfileSlice.allSocial);
  const [allSocialSelectProfieId, setAllSocialSelectProfieId] = useState([]);
  const [allPanelSelectProfieId, setAllPanelSelectProfieId] = useState([]);
  const [allSocialSort, setAllSocialSort] = useState([]);
  const [allPanelSort, setAllPanelSort] = useState([]);

  const [selectedProfileData, setSelectedProfileData] = useState({});

  const dispatch = useDispatch();
  const router = useRouter();
  const slug = router.query.slug || [];

  useEffect(() => {
    if (slug[0]) {
      console.log(slug[0]);
      dispatch(geturlcardRandomAsync(slug[0]));
    }
    if (slug.length == 2) {
      dispatch(clickProfileAsync(slug[1]));
    }
  }, [slug]);

  useEffect(() => {
    localStorage.removeItem("cardUrlLinksId");
    if (publicProfile) {
      if (publicProfile.startDateCount) {
        dispatch(getUseridAsync(publicProfile.generalUserId));

        if (slug.length == 1) {
          setSelectProfileActive(true);
          setProfilePageActive(false);
        } else if (slug.length == 2) {
          setSelectProfileActive(false);
          setProfilePageActive(true);
        }
      } else {
        console.log("yok");
        localStorage.setItem("cardUrlLinksId", publicProfile.urlRandomId);
        router.push("/register");
      }
    }
  }, [publicProfile]);

  useEffect(() => {
    if (allProfile && slug.length == 2) {
      setSelectedProfileData(allProfile.find((s) => s.profileId == slug[1]));
    }
    setAllProfileSort(
      allProfile != undefined
        ? [...allProfile].sort((a, b) =>
            a.orderOfProfile < b.orderOfProfile ? -1 : 1
          )
        : []
    );
  }, [allProfile]);

  useEffect(() => {
    setAllSocialSelectProfieId( allSocial != undefined ? allSocial.filter((x) => x.profileId == slug[1]) : []);
  }, [allSocial]);

  useEffect(() => {
    console.log("allpanelk::", allPanel)
    setAllPanelSelectProfieId( allPanel != undefined ? allPanel.filter((x) => x.profileId == slug[1]): []);
  }, [allPanel]);
  

  useEffect(() => {
    console.log("soso:",allSocialSelectProfieId )
    if (allSocialSelectProfieId) {
      setAllSocialSort(
        [...allSocialSelectProfieId].sort((a, b) =>
          a.socialOrder < b.socialOrder ? -1 : 1
        )
      );
    }
  }, [allSocialSelectProfieId]);

  useEffect(() => {
    console.log("porro::",allPanelSelectProfieId )
    if (allPanelSelectProfieId) {
      setAllPanelSort(
        [...allPanelSelectProfieId].sort((a, b) =>
          a.OrderId < b.OrderId ? -1 : 1
        )
      );
    }
  }, [allPanelSelectProfieId]);

  console.log("panelsortttt:",allPanelSort )

  return (
    <>
      {" "}
      {status == "loading" ? <Loading /> : ""}{" "}
      {selectProfileActive && (
        <PublicSelectProfile
          allProfileSort={allProfileSort}
          parentUrl={slug[0]}
        />
      )}
      {profilePageActive && (
        <PublicProfilePage
          selectedProfileData={selectedProfileData}
          allSocialSort={allSocialSort}
          allPanelSort={allPanelSort}
          parentUrl={slug[0]}
        />
      )}{" "}
    </>
  );
}

export default PublicProfile;
