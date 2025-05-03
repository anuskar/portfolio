'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import confetti from 'canvas-confetti'

type ScrabbleProps = {
    phrase?: string
}

const DEFAULT_PHRASE = 'YOU SHOULD HIRE ME!'
const SPACE_MARKER = null

export const Scrabble = ({
    phrase = DEFAULT_PHRASE
}: ScrabbleProps) => {
    const [scrambledLetters, setScrambledLetters] = useState<string[]>([])
    const [solution, setSolution] = useState<(string | null)[]>([])
    const [isCorrect, setIsCorrect] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const confettiCanvasRef = useRef<HTMLCanvasElement>(null)

    const { phraseLetters, phraseWithSpaces } = useMemo(() => {
        const fullChars = phrase.split('')
        const lettersOnly = fullChars.filter(char => char.trim() !== '')
        return { phraseLetters: lettersOnly, phraseWithSpaces: fullChars }
    }, [phrase])

    useEffect(() => {
        const initializeGame = () => {
            const shuffled = [...phraseLetters].sort(() => Math.random() - 0.5)
            setScrambledLetters(shuffled)
            setSolution(phraseWithSpaces.map(char => char === ' ' ? SPACE_MARKER : ''))
            setIsCorrect(false)
            setShowToast(false)
        }

        initializeGame()
    }, [phraseLetters, phraseWithSpaces])

    useEffect(() => {
        const currentSolutionLetters = solution.filter(s => s !== SPACE_MARKER).join('')
        const targetLetters = phraseLetters.join('')

        if (currentSolutionLetters.length === targetLetters.length && currentSolutionLetters === targetLetters) {
            setIsCorrect(true)

            // Show celebration effects when correct
            triggerCelebration()
        } else {
            setIsCorrect(false)
        }
    }, [solution, phraseLetters])

    // Trigger celebrations when user wins
    const triggerCelebration = () => {
        // Show toast
        setShowToast(true)

        // Hide toast after 5 seconds
        setTimeout(() => {
            setShowToast(false)
        }, 5000)

        // Trigger fireworks
        if (typeof window !== 'undefined') {
            const duration = 5 * 1000
            const animationEnd = Date.now() + duration

            const randomInRange = (min: number, max: number) => {
                return Math.random() * (max - min) + min
            }

            const fireworks = () => {
                const timeLeft = animationEnd - Date.now()

                if (timeLeft <= 0) return

                // Create multiple bursts of confetti
                confetti({
                    particleCount: 3,
                    angle: randomInRange(55, 125),
                    spread: randomInRange(50, 70),
                    origin: { y: 0.6 },
                    colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
                })

                // Schedule next burst
                requestAnimationFrame(fireworks)
            }

            // Start the fireworks
            fireworks()
        }
    }

    const selectLetter = (letter: string, index: number) => {
        const emptyIndex = solution.findIndex(l => l === '')
        if (emptyIndex !== -1) {
            const newSolution = [...solution]
            newSolution[emptyIndex] = letter
            setSolution(newSolution)

            const newScrambled = [...scrambledLetters]
            newScrambled[index] = ''
            setScrambledLetters(newScrambled.filter(l => l !== ''))
        }
    }

    const removeLetter = (index: number) => {
        if (solution[index] !== SPACE_MARKER) {
            const letter = solution[index]
            if (letter) {
                setScrambledLetters(prev => [...prev, letter].sort(() => Math.random() - 0.5))

                const newSolution = [...solution]
                newSolution[index] = ''
                setSolution(newSolution)
            }
        }
    }

    const resetGame = () => {
        const shuffled = [...phraseLetters].sort(() => Math.random() - 0.5)
        setScrambledLetters(shuffled)
        setSolution(phraseWithSpaces.map(char => char === ' ' ? SPACE_MARKER : ''))
        setIsCorrect(false)
        setShowToast(false)
    }

    const solveGame = () => {
        // Find the position of the exclamation mark, if it exists
        const exclamationIndex = phraseWithSpaces.findIndex(char => char === '!')

        // Create a new solution array with everything filled except the exclamation point
        const newSolution = [...phraseWithSpaces.map((char, idx) =>
            char === ' ' ? SPACE_MARKER :
                idx === exclamationIndex ? '' : char
        )]

        setSolution(newSolution)

        // Keep only the exclamation point in the letter bank
        setScrambledLetters(['!'])
    }

    return (
        <div className="my-10 relative w-full">
            {/* Toast notification */}
            {showToast && (
                <div className="fixed top-5 right-5 z-50 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg animate-bounce">
                    <div className="flex items-center">
                        <div className="py-1">
                            <p className="font-bold">🎉 YOU SHOULD DEFINITELY HIRE ME! 🎉</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-8 w-full">
                <div className="flex flex-wrap gap-1.5 justify-center p-4 rounded-lg min-h-[56px]">
                    {solution.map((letter, index) => (
                        letter === SPACE_MARKER ? (
                            <div key={`space-${index}`} className="w-5 h-10"></div>
                        ) : (
                            <div
                                key={`solution-${index}`}
                                onClick={() => removeLetter(index)}
                                className={`
                                    w-10 h-10 flex items-center justify-center
                                    border-2 uppercase font-bold text-lg cursor-pointer transition-colors duration-200
                                    rounded
                                    ${letter ? 'bg-white border-blue-500 text-blue-700' : 'bg-transparent border-dashed border-gray-400'}
                                    ${isCorrect ? '!bg-green-100 !border-green-500 !text-green-700' : ''}
                                    ${letter && letter === phraseWithSpaces[index] ? '!border-green-500' : ''}
                                    ${letter && letter !== phraseWithSpaces[index] ? '!border-red-500' : ''}
                                `}
                            >
                                {letter}
                            </div>
                        )
                    ))}
                </div>

                {!isCorrect && (
                    <div className="flex flex-wrap gap-2 justify-center min-h-[48px]">
                        {scrambledLetters.map((letter, index) => (
                            letter && (
                                <div
                                    key={`scrambled-${index}`}
                                    onClick={() => selectLetter(letter, index)}
                                    className="w-10 h-10 flex items-center justify-center bg-yellow-100 border-2 border-yellow-400 uppercase font-bold text-lg cursor-pointer hover:bg-yellow-200 transition-colors duration-200 rounded"
                                >
                                    {letter}
                                </div>
                            )
                        ))}
                    </div>
                )}

                <div className="flex flex-col items-center gap-4">
                    {isCorrect && (
                        <div className="text-green-600 font-bold text-lg animate-pulse">
                            {phrase} - Correct!
                        </div>
                    )}

                    <div className="flex gap-3">
                        <button
                            onClick={resetGame}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition text-sm font-medium"
                        >
                            Reset Game
                        </button>

                        {!isCorrect && (
                            <button
                                onClick={solveGame}
                                className="px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition text-sm font-medium"
                            >
                                Solve
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Scrabble 