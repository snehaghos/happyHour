import React, { useEffect, useRef, useState } from 'react'
// import homeMc from './assets/audio/homeMc.mp3'
import sh from './assets/audio/sh.mp3'
import ReactPlayer from 'react-player'

const App = () => {

  const audioPlay = useRef();
  const [togglePlayer, setTogglePlayer] = useState(true);
  const handleAudio = () => {
    setTogglePlayer(true);
   
  }


  useEffect(() => {
  
  
    console.log('hi');
    audioPlay.current.muted = false;
    audioPlay.current.play();

  }, [togglePlayer])


  return (

    <div>
      <button onClick={handleAudio}>Start Audio</button>



        <audio controls preload="auto" autoPlay muted ref={audioPlay}
        >
          <source src={sh} type='audio/mp3' />
        </audio>
    
      {/* <ReactPlayer url={'./assets/audio/homeMc.mp3'}/> */}

    </div>
  )
}

export default App