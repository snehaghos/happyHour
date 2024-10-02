import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Framer = () => {
  const [boxes, setBoxes] = useState([2, 4, 8,16,32,64,128,256,512]);

  const [clicked, setClicked] = useState(null);
  const [rotateState, setRotateState] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleClick = (index) => {
    setClicked(index);
    setBoxes(prevBoxes => {
      const newBoxes = [...prevBoxes];
      newBoxes[index] *= 2;
      return newBoxes;
    });
    setTimeout(() => {
      setClicked(null);
    }, 1200);
  };

  const handleChange = (event) => {
    setRotateState(parseInt(event.target.value));
  };

  const handleXState = (event) => {
    setX(parseInt(event.target.value));
  };

  const handleYState = (event) => {
    setY(parseInt(event.target.value));
  };

  return (
    <div className="flex justify-center items-center h-screen m-0 font-sans gap-[100px]">
      <div className="grid grid-cols-3 gap-5">
        {boxes.map((number, index) => (
          <Box
            key={index}
            index={index}
            number={number}
            handleClick={handleClick}
            clicked={clicked === index}
          />
        ))}
      </div>
      <div>
        <motion.div
          className="w-[200px] h-[200px] bg-yellow-200 rounded-md"
          animate={{ x, y, rotate: rotateState }}
          transition={{ type: "spring" }}
        />
        <input type="range" onChange={handleXState} value={x} max={200} min={-200} />
        <input type="range" onChange={handleYState} value={y} max={200} min={-200} />
        <input
          type='range'
          onChange={handleChange}
          value={rotateState}
          min={-180}
          max={180}
          className='mt-4'
        />
      </div>
    </div>
  );
};

const Box = ({ index, number, handleClick, clicked }) => {
  const boxVariants = {
    hidden: { scale: 1,opacity:1 },
    opacity: { opacity: 0.5 }
  };

  return (
    <motion.div
      className="flex items-center justify-center w-20 h-20 text-xl bg-gray-200 border-2 border-black select-none"
      onClick={() => handleClick(index)}
      animate={clicked ? 'hidden' : 'opacity'}
      variants={boxVariants}
      //  initial={{ opacity: 0, scale: 0.5 }}
      // animate={{ opacity: 1, scale: 1 }}
      // transition={{
      //   duration: 0.8,
      //   delay: 0.5,
      //   ease: [0, 0.71, 0.2, 1.01]
      // }}
    >
      {number}
    </motion.div>
  );
};

export default Framer;
