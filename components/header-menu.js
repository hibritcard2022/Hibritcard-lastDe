import Link from 'next/link'
import React, { useEffect } from 'react'
import { useRouter } from "next/router";
import { useSelector, useDispatch } from 'react-redux';
import { selectedProfile } from '../stores/userSlice';


function HeaderMenu({ id }) {

    const router = useRouter();

    const selectedProfileId = useSelector(state => state.userSlice.selectProfileId);

    return (
        <div className='header-menu'>

<Link href={`/view/${selectedProfileId}`}>
                <a className={'menu-item ' + (router.pathname.startsWith("/view") ? "active" : "")} >
                    <div className={'icon view-icon-' + (router.pathname.startsWith("/view") ? "active" : "deactive")}></div>
                    <div className='text'>Görünüm</div>
                </a>
            </Link>




            <Link href={`/panel/${selectedProfileId}`}>
                <a className={'menu-item ' + (router.pathname.startsWith("/panel") ? "active" : "")} >
                    <div className={'icon panel-icon-' + (router.pathname.startsWith("/panel") ? "active" : "deactive")}></div>
                    <div className='text'>Panel</div>
                </a>
            </Link>
          
            <Link href={`/analysis/${selectedProfileId}`}>
                {/**  <Link href={`/analysis`}>*/}
                <a className={'menu-item ' + (router.pathname.startsWith("/analysis") ? "active" : "")} >
                    <div className={'icon analysis-icon-' + (router.pathname.startsWith("/analysis") ? "active" : "deactive")}></div>
                    <div className='text'>Analiz</div>
                </a>
            </Link>
            {/**     <Link href={`/settings/${selectedProfileId}`}>
            <Link href={`/settings`}>
                <a className={'menu-item ' + (router.pathname.startsWith("/settings") ? "active" : "")} >
                    <div className={'icon settings-icon-' + (router.pathname.startsWith("/settings") ? "active" : "deactive")}></div>
                    <div className='text'>Ayarlar</div>
                </a>
            </Link> */}
        </div>
    )
}

export default HeaderMenu