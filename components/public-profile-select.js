import Link from "next/link";
import React from "react";
import ImageLoader from "react-imageloader";
import { useDispatch } from "react-redux";

function preloader() {
  return <img className="loader" src="/images/Spin-1s-200px.svg" />;
}

function PublicProfileSelect({ allProfileSort, parentUrl }) {
  const dispatch = useDispatch();

  return (
    <div className="gradient-bg select-profile">
      <div className="select-profile-header">
        <div className="select-profile-left"></div>{" "}
        <div className="select-profile-center">
          <img src="/images/hibritcard-white-logo.svg" />
        </div>{" "}
        <div className="select-profile-right"></div>
      </div>{" "}
      <div className="select-profile-content">
        <div className="select-profile-title">Profil Seç </div>
        <div className="select-profile-items select-profile-items-noedit">
          {" "}

          {allProfileSort.map((v) => (
            <div key={v.profileId}>
             
                <a className="select-profile-item" href={`/id/${parentUrl}/${v.profileId}`}>
                  <div className="select-profile-item-in">
                    <div className="select-profile-image-noedit">
                      <div className="select-profile-item-top"> </div>

                      <ImageLoader
                        src={v.profileUrl}
                        wrapper={React.createFactory("div")}
                        preloader={preloader}
                      >
                        Image load failed!
                      </ImageLoader>
                    </div>{" "}
                    <div className="select-profile-text"> {v.profileTag} </div>{" "}
                  </div>{" "}
                </a>{" "}
             
            </div>
          ))}
        </div>{" "}
        {/*
                                        <Link href="/panel">
                                            <a className='select-profile-item'>

                                                <div className='select-profile-image'>
                                                    <div className='select-profile-item-top'></div>
                                                    <img src='/images/profile-example.png' />
                                                </div>
                                                <div className='select-profile-text'>
                                                    aysylmz
                                                </div>
                                            </a>
                                        </Link>
                                        <div className='select-profile-item'>

                                            <div className='select-profile-image'>
                                                <div className='select-profile-item-top'></div>
                                                <img src='/images/profile-example.png' />
                                            </div>
                                            <div className='select-profile-text'>
                                                aysylmz
                                            </div>
                                        </div>

                                    </div>*/}{" "}
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
                        */}{" "}
      </div>
    </div>
  );
}

export default PublicProfileSelect;
