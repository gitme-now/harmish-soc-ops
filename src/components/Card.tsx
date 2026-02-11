import React from 'react'

interface CardProps {
  text: string | null
}

export function Card({ text }: CardProps) {
  return (
    <article
      role="region"
      aria-label={text ?? 'No card'}
      className="w-full max-w-md mx-auto p-8 rounded-2xl bg-white/95 shadow-lg text-center"
    >
      {text ? (
        <p className="text-lg md:text-xl text-cloud-ink leading-relaxed">{text}</p>
      ) : (
        <p className="text-cloud-ink/70">No more cards — reshuffle to play again.</p>
      )}
    </article>
  )
}

export default Card
