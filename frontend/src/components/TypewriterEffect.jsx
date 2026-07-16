import React, { useState, useEffect } from 'react'

/**
 * TypewriterEffect component to animate text generation character by character.
 */
export default function TypewriterEffect({ text, speed = 4 }) {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    setDisplayedText('')
    if (!text) return

    let index = 0
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index))
      index++
      if (index >= text.length) {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return <span>{displayedText}</span>
}
