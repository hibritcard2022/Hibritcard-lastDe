import React from 'react'
import { useRouter } from 'next/router'

function ViewPageButton() {
    const router = useRouter()
    return (
        <div className='profile-page-button-global'>
            <div onClick={() => router.back()}>
                <a className='profile-page-button' style={{
                    justifyContent:"center"
                }}>
                    <i className="fa-solid fa-xmark"></i>

                </a>
            </div>
        </div>
    )
}

export default ViewPageButton