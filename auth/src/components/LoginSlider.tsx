import React, { useEffect, useState } from 'react'
import slideloginbg from "../assets/images/slideloginbg.svg"

const LoginSlider = () => {

    return (
        <div className='w-[35%] h-screen' style={{ backgroundImage: `url(${import.meta.env.VITE_IMG_URL}${slideloginbg})`, backgroundSize: 'center', backgroundRepeat: 'no-repeat', }}>
        </div>
    )
}

export default LoginSlider