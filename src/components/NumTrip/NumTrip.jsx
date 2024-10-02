import React, { useState, useEffect, useRef } from 'react';
import homeMc from '../../assets/audio/homeMc.mp3';
import pop from '../../assets/audio/pop.mp3';

import './NumTrip.css';
import Modal from './components/Modal';
import Board from './components/Board';
import MainArray from './components/MainArray';
import GameHeader from './components/GameHeader';
import Score from './components/Score';
import RegenerateButton from './components/RegenerateButton';
import Sidebar from './components/Sidebar';
import ReshuffleButton from './components/ReshuffleButton';
import ThemeButton from './components/ThemeButton';
import { GiSoundOn, GiSoundOff } from "react-icons/gi";
import { useTheme } from './components/ThemeProvider';
import ConfirmModal from './modals/ConfirmModal';
import Hearts from './components/Hearts';
import FinalGameOver from './modals/FinalGameOver';

const mainArray = [
    { 'number': 2, 'color': '#7a97ff87', 'shortName': '2' },
    { 'number': 4, 'color': '#700fff87', 'shortName': '4' },
    { 'number': 8, 'color': '#0341fc87', 'shortName': '8' },
    { 'number': 16, 'color': '#bc8fff87', 'shortName': '16' },
    { 'number': 32, 'color': '#88102087', 'shortName': '32' },
    { 'number': 64, 'color': '#99532387', 'shortName': '64' },
    { 'number': 128, 'color': '#92762587', 'shortName': '128' },
    { 'number': 256, 'color': '#991122', 'shortName': '256' },
    { 'number': 512, 'color': '#18003d', 'shortName': '512' },
    { 'number': 1024, 'color': '#a30093', 'shortName': '1K' },
    { 'number': 2048, 'color': '#171617', 'shortName': '2K' },
    { 'number': 4096, 'color': '#bcbf00', 'shortName': '4K' },
    { 'number': 8192, 'color': '#b7b888', 'shortName': '8K' },
    { 'number': 16384, 'color': '#89c400', 'shortName': '16K' },
    { 'number': 32768, 'color': '#05ad70', 'shortName': '32K' },
];

const NumTrip = () => {
    const [currentSetIndex, setCurrentSetIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newNumbers, setNewNumbers] = useState([]);
    const [updatedCells, setUpdatedCells] = useState([]);
    const [isPlaying, setIsPlaying] = useState(true);
    const audioPlay = useRef(null);
    const popAudioRef = useRef(null);
    const [hearts, setHearts] = useState(5);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);

    const getCurrentSet = () => {
        return mainArray.slice(currentSetIndex, currentSetIndex + 3);
    };

    const generateIntBoard = () => {
        const currentSet = getCurrentSet();
        return Array.from({ length: 5 }, () =>
            Array.from({ length: 5 }, () => currentSet[Math.floor(Math.random() * currentSet.length)])
        );
    };

    const [board, setBoard] = useState(generateIntBoard());

    const generateNumbers = () => {
        setBoard(generateIntBoard());
    };

    const updateCell = (row, col) => {
        const newBoard = board.map(r => r.slice());
        const cell = newBoard[row][col];
        if (cell === null) return;

        const value = cell.number;
        if (hasAdj(newBoard, row, col, value)) {
            check(newBoard, row, col, value);
            newBoard[row][col] = { ...cell, number: value * 2 };
            setScore(prevScore => prevScore + 1);
            setUpdatedCells([{ row, col }]);
            if (popAudioRef.current) {
                popAudioRef.current.play();
            }
            const updatedBoard = fillEmptyCells(newBoard);
            setBoard(updatedBoard);

            if (!hasValidMoves(updatedBoard)) {
                setIsGameOverModalOpen(true);
            }
        }
    };

    const hasAdj = (board, row, col, value) => {
        const adjacentCells = [
            [row - 1, col],
            [row + 1, col],
            [row, col - 1],
            [row, col + 1],
        ];
        return adjacentCells.some(([adjRow, adjCol]) => (
            adjRow >= 0 && adjRow < 5 &&
            adjCol >= 0 && adjCol < 5 &&
            board[adjRow][adjCol] && board[adjRow][adjCol].number === value
        ));
    };

    const fillEmptyCells = (board) => {
        const currentSet = getCurrentSet();
        const newNumbers = [];
        const newBoard = board.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
                if (cell === null) {
                    const newNumber = currentSet[Math.floor(Math.random() * currentSet.length)];
                    newNumbers.push({ row: rowIndex, col: colIndex });
                    return newNumber;
                }
                return cell;
            })
        );
        setNewNumbers(newNumbers);
        return newBoard;
    };

    const hasValidMoves = (board) => {
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                const cell = board[row][col];
                if (cell) {
                    const value = cell.number;
                    if (hasAdj(board, row, col, value)) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    const check = (board, row, col, targetValue) => {
        if (row < 0 || row >= 5 || col < 0 || col >= 5 || !board[row][col] || board[row][col].number !== targetValue) {
            return;
        }
        board[row][col] = null;
        check(board, row - 1, col, targetValue);
        check(board, row + 1, col, targetValue);
        check(board, row, col - 1, targetValue);
        check(board, row, col + 1, targetValue);
    };

    const reshuffleBoardPositions = () => {
        const flattenedBoard = board.flat();
        const shuffledBoard = flattenedBoard.sort(() => Math.random() - 0.5);
        const reshuffledBoard = [];

        for (let i = 0; i < 5; i++) {
            reshuffledBoard.push(shuffledBoard.slice(i * 5, i * 5 + 5));
        }

        setBoard(reshuffledBoard);

        if (!hasValidMoves(reshuffledBoard)) {
            setIsGameOverModalOpen(true);
        }
    };

    const handleStartOver = () => {
        setIsConfirmModalOpen(true);
    };

    const confirmStartOver = () => {
        setScore(0);
        setCurrentSetIndex(0);
        generateNumbers();
        setHearts(5);
        setIsModalOpen(false);
        setIsConfirmModalOpen(false);
    };

    const cancelStartOver = () => {
        setIsConfirmModalOpen(false);
    };

    const useHeart = () => {
        if (hearts > 0) {
            setHearts(prevHearts => prevHearts - 1);
            setIsGameOverModalOpen(false);
        } else {
            
        }
    };

    const reshuffleAndUseHeart = () => {
        reshuffleBoardPositions();
        useHeart();
    };

    useEffect(() => {
        if (updatedCells.length > 0) {
            const timer = setTimeout(() => setUpdatedCells([]), 800);
            return () => clearTimeout(timer);
        }
    }, [updatedCells]);

    useEffect(() => {
        const currentSet = getCurrentSet();
        const lowestNumber = currentSet[0].number;
        const newBoard = board.flat();
        if (!newBoard.some(cell => cell.number === lowestNumber)) {
            setCurrentSetIndex(prev => prev + 1);
        }

        if (!hasValidMoves(board)) {
            setIsGameOverModalOpen(true);
        }
    }, [board]);

    useEffect(() => {
        audioPlay.current.play();
    }, []);

    const { theme } = useTheme();

    const myStyle = {
        backgroundImage: `url('/images/${theme}.jpg')`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };

    const handleThemeChange = () => {
        console.log('Theme change clicked');
    };

    const handleHome = () => {
        console.log('Home clicked');
    };

    const handleAudio = () => {
        if (isPlaying) {
            audioPlay.current.pause();
            popAudioRef.current.pause();
        } else {
            audioPlay.current.play();
            popAudioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <>
            <audio ref={audioPlay} preload="auto" autoPlay muted={false}>
                <source src={homeMc} type="audio/mp3" />
            </audio>
            <audio ref={popAudioRef} preload="auto" autoPlay muted={false}>
                <source src={pop} type="audio/mp3" />
            </audio>

            <div className="w-full" style={myStyle}>
                <ThemeButton />
                <button
                    onClick={handleAudio}
                    className="absolute p-2 bg-white rounded-full top-10 right-4"
                >
                    {isPlaying ? <GiSoundOn /> : <GiSoundOff />}
                </button>
                <Sidebar onThemeChange={handleThemeChange} onHome={handleHome} onStartOver={handleStartOver} />
                <div>
                    <GameHeader />
                    <div className="flex flex-col items-center justify-center rounded-xl">
                        <Board
                            board={board}
                            updateCell={updateCell}
                            updatedCells={updatedCells}
                            newNumbers={newNumbers}
                            mainArray={mainArray}
                        />
                    </div>
                    <div className="flex flex-wrap items-center justify-center flex-rows">
                        <MainArray mainArray={mainArray} currentSet={getCurrentSet()} />
                    </div>
                    <div className="flex items-center justify-center gap-6">
                        <RegenerateButton generateNumbers={generateNumbers} />
                        <ReshuffleButton reshuffleBoardPositions={reshuffleBoardPositions} />
                    </div>

                    <Score score={score} />
                    <Hearts count={hearts} />
                    <Modal isOpen={isGameOverModalOpen} onClose={() => setIsGameOverModalOpen(false)} reshuffleBoardPositions={reshuffleAndUseHeart} type="gameOver" />
                    <ConfirmModal 
                        isOpen={isConfirmModalOpen}
                        onConfirm={confirmStartOver}
                        onCancel={cancelStartOver}
                    />
                    <FinalGameOver/>
                </div>
            </div>
        </>
    );
};

export default NumTrip;
