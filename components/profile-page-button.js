import React from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux';
function ProfilePageButton() {
    const selectedProfileId = useSelector(state => state.userSlice.selectProfileId);
    return (
        <div className='profile-page-button-global'>
            <Link href={`/profile/${selectedProfileId}`}>
                <a className='profile-page-button'>
                    <img src='/icons/Eye-white.svg' />
                    <span>Önizleme</span>
                </a>
            </Link>
        </div>
    )
}

export default ProfilePageButton