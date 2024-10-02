import React from 'react';
import { motion } from 'framer-motion';
import '../components/NumTrip/NumTrip.css'; 

const IndexHome = () => {
  const homeStyle = {
    backgroundImage: "url('images/homeBg.jpg')",
    height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const flyInAnimation = {
    initial: { y: '-100vh', opacity: 0 }, 
    animate: { y: 0, opacity: 1 }, 
    transition: { type: 'spring', stiffness: 70, duration: 3.5 },
  };

  return (
    <div style={homeStyle}>
      <motion.div
        className="text-9xl font-extrabold font-luckiestGuy flex justify-center items-center h-[100vh] neon-border"
        initial="initial"
        animate="animate"
        variants={flyInAnimation} 
      >
        NumTrip
      </motion.div>
    </div>
  );
};

export default IndexHome;
