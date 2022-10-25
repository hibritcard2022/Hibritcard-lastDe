import React from 'react'

function StartPage() {
    return (

        <div className='gradient-bg starting-pages'>
            <div className='starting-content-area'>
                <div className='starting-logo-area'>
                    <div className='logo'>
                        <img src="/images/yeni nesil kartvizit beyaz.svg" />
                    </div>
                    <div className='logo-bottom-text'>
                        Kullanmaya başlayabilirsin.
                    </div>
                </div>
                <div className='starting-button-area'>

                    <div className='starting-button'>
                        <div className='text'>Yolculuğa başlayalım...</div>
                        <i className="fa-solid fa-angle-right"></i>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default StartPage