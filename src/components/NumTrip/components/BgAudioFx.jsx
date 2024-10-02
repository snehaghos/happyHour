import React, { useEffect, useRef } from 'react'
import homeMc from '../../../assets/audio/homeMc.mp3'

const BgAudioFx = () => {
  const bgAudioRef=useRef();
  useEffect(() => {
    bgAudioRef.current.play();
}, []);
  return (

    
    <>
      <audio autoPlay ref={bgAudioRef} >
                <source src={homeMc} type='audio/mp3' />
            </audio>
    </>
  )
}

export default BgAudioFx