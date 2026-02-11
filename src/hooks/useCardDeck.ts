import { useCallback, useEffect, useMemo, useState } from 'react'
import { questions } from '../data/questions'

const STORAGE_KEY = 'card-deck-state'
const STORAGE_VERSION = 1

type Stored = {
  version: number
  order: number[]
  pointer: number
}

function fisherYates<T>(arr: T[], seed?: number) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function useCardDeck() {
  const initial = useMemo(() => {
    const order = questions.map((_, i) => i)
    return {
      order: fisherYates(order),
      pointer: 0,
    }
  }, [])

  const [order, setOrder] = useState<number[]>(initial.order)
  const [pointer, setPointer] = useState<number>(initial.pointer)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed: Stored = JSON.parse(raw)
      if (parsed.version !== STORAGE_VERSION) {
        localStorage.removeItem(STORAGE_KEY)
        return
      }
      if (Array.isArray(parsed.order) && typeof parsed.pointer === 'number') {
        setOrder(parsed.order)
        setPointer(parsed.pointer)
      }
    } catch {
      // ignore and continue with fresh deck
    }
  }, [])

  useEffect(() => {
    try {
      const s: Stored = { version: STORAGE_VERSION, order, pointer }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
    } catch {
      // ignore
    }
  }, [order, pointer])

  const remainingCount = Math.max(0, order.length - pointer)

  const currentCard = pointer < order.length ? questions[order[pointer]] : null

  const draw = useCallback(() => {
    setPointer((p) => Math.min(order.length, p + 1))
  }, [order.length])

  const shuffle = useCallback(() => {
    setOrder((prev) => fisherYates(prev))
    setPointer(0)
  }, [])

  const reset = useCallback(() => {
    const base = questions.map((_, i) => i)
    setOrder(fisherYates(base))
    setPointer(0)
  }, [])

  return {
    currentCard,
    remainingCount,
    draw,
    shuffle,
    reset,
    pointer,
    order,
  }
}

export type UseCardDeck = ReturnType<typeof useCardDeck>
