import { useState, useEffect, useRef } from 'react'

export default function TypewriterEffect({ text, speed = 4 }) {
  const [displayedText, setDisplayedText] = useState('')
  const indexRef = useRef(0)
  const prevTextRef = useRef(text)

  useEffect(() => {
    if (text !== prevTextRef.current) {
      prevTextRef.current = text
      indexRef.current = 0
      setDisplayedText('')
    }

    if (!text) return

    const interval = setInterval(() => {
      indexRef.current++
      if (indexRef.current >= text.length) {
        setDisplayedText(text)
        clearInterval(interval)
      } else {
        setDisplayedText(text.slice(0, indexRef.current + 1))
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return <span>{displayedText}</span>
}
