import React, { useState, useEffect, useRef } from 'react';
import { GiSoundOff, GiSoundOn } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { useAuthLogout } from '../Login/hooks/mutations';

const Home = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const audioRef = useRef(null);
    const logout = useAuthLogout();

    const onLogout = (ev) => {
      ev.preventDefault();
      logout.mutate();
    };

    const homeStyle = {
        backgroundImage: "url('images/homeBg.jpg')",
        height: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play().catch(error => {
                console.error('Error playing the audio:', error);
            });
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    const toggleAudio = () => {
        setIsPlaying(prev => !prev);
    }; 
    const navigate=useNavigate();
    const handleStartGame=()=>{
        navigate('/array');
    }

    return (
        <>
           <button 
                    onClick={toggleAudio} 
                    className='absolute p-2 bg-white rounded-full top-4 right-4'
                >
                      {isPlaying ? <GiSoundOff /> : <GiSoundOn />}
                </button>
            <audio ref={audioRef} src="audio/homeMc.mp3" autoPlay loop />

            <div className='w-full h-[100vh] font-luckiestGuy' style={homeStyle}>
                <div className='p-8 text-6xl font-extrabold text-center text-yellow-100 '>
                    Home
                </div>
                <div className='flex items-center justify-center w-full'>
                <div className=' w-[500px] p-12 border-2 border-slate-50/20 rounded-lg bg-green-900/60 flex flex-col justify-center items-center  gap-7'>
                    <div className='text-3xl text-yellow-200 cursor-pointer' onClick={handleStartGame}>
                        NumTrip 
                    </div>
                    <div className='text-3xl text-yellow-200 cursor-pointer'>
                        High Scores
                    </div>
                    <div className='text-3xl text-yellow-200 cursor-pointer'  onClick={onLogout}>
                        LogOut
                    </div>
                    <div>

                    </div>
                </div>
                </div>
            
             
            </div>
        </>
    );
};

export default Home;
