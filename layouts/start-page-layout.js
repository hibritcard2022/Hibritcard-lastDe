import React from 'react'
import { useRouter } from 'next/router'
function StartPageLayout({ children, imagePath, headerTitle }) {
    const router = useRouter();
    return (

        <div className='gradient-bg starting-pages'>
            <div className='logo-area'>
                <div className='logo'>
                    <img src={imagePath}></img>
                </div>
            </div>
            <div className='content-area'>
                <div className='content-card'>
                    {/**
                    <div onClick={() => router.back()} className='back-button'>
                        <i className="fa-solid fa-angle-left"></i>
                    </div> */}
                    <div className='content-header'>{headerTitle}</div>
                    <div className='content-scroll'>
                        <div className='content-in'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default StartPageLayout