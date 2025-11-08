'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

interface AnimateOnScrollProps {
  children: ReactNode
  animation?: 'fade-in-up' | 'fade-in-down' | 'fade-in-left' | 'fade-in-right' | 'scale-in' | 'fade-in'
  delay?: number
  className?: string
  threshold?: number
}

export default function AnimateOnScroll({
  children,
  animation = 'fade-in-up',
  delay = 0,
  className = '',
  threshold = 0.1,
}: AnimateOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay, threshold])

  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${animation} ${isVisible ? 'visible' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

