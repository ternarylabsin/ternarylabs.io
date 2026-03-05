import { useInView } from '../hooks/useInView'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const { ref, inView } = useInView()

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) blur(0px)' : 'translateY(24px)',
        filter: inView ? 'blur(0px)' : 'blur(4px)',
        transition: `opacity 0.6s var(--ease-out) ${delay}ms, transform 0.6s var(--ease-out) ${delay}ms, filter 0.6s var(--ease-out) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
