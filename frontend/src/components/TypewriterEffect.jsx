import { useState, useEffect, useRef } from 'react'

export default function TypewriterEffect({ text, speed = 4 }) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const indexRef = useRef(0)
  const prevTextRef = useRef(text)

  useEffect(() => {
    if (text !== prevTextRef.current) {
      prevTextRef.current = text
      indexRef.current = 0
      setDisplayedText('')
      setIsTyping(true)
    }

    if (!text) return

    setIsTyping(true)
    const interval = setInterval(() => {
      indexRef.current++
      if (indexRef.current >= text.length) {
        setDisplayedText(text)
        setIsTyping(false)
        clearInterval(interval)
      } else {
        setDisplayedText(text.slice(0, indexRef.current + 1))
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return (
    <span>
      {displayedText}
      {isTyping && (
        <span className="inline-block w-[2px] h-[14px] bg-purple-400/80 ml-[1px] align-text-bottom animate-blink" />
      )}
    </span>
  )
}
