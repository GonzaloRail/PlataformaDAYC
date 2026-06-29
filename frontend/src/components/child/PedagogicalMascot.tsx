import { useState, useEffect, useRef } from 'react'
import talk1 from '../../assets/dinosaur/talk_1.png'
import talk2 from '../../assets/dinosaur/talk_2.png'
import talk3 from '../../assets/dinosaur/talk_3.png'
import celebrate from '../../assets/dinosaur/celebrate.jpg'
import './PedagogicalMascot.css'

export type DinoAnimation = 'idle' | 'talking' | 'thinking' | 'reading' | 'celebrate' | 'celebrating'

export interface PedagogicalMascotProps {
  className?: string
  animation?: DinoAnimation
  loop?: boolean
}

const TALK_SEQUENCE = [talk1, talk2, talk3, talk2]
const TALK_HOLD = [300, 180, 240, 180]

function jitter(): number {
  return (Math.random() - 0.5) * 50
}

function isTalking(a: DinoAnimation): boolean {
  return a === 'talking' || a === 'idle' || a === 'thinking' || a === 'reading'
}

function isCelebrating(a: DinoAnimation): boolean {
  return a === 'celebrating' || a === 'celebrate'
}

export function PedagogicalMascot({
  className,
  animation = 'idle',
  loop: _loop,
}: PedagogicalMascotProps) {
  const [frame, setFrame] = useState(talk1)
  const [stateOpacity, setStateOpacity] = useState(1)
  const prevAnim = useRef(animation)
  const seqIdx = useRef(0)

  const talking = isTalking(animation)
  const celebrating = isCelebrating(animation)
  const src = celebrating ? celebrate : frame

  useEffect(() => {
    const urls = [talk1, talk2, talk3, celebrate]
    const imgs = urls.map(u => {
      const img = new Image()
      img.src = u
      return img
    })
    return () => imgs.forEach(img => { img.src = '' })
  }, [])

  useEffect(() => {
    if (!talking) {
      seqIdx.current = 0
      setFrame(talk1)
      return
    }

    let timeoutId: ReturnType<typeof setTimeout>
    let cancelled = false
    let cycleCount = 0

    const tick = () => {
      if (cancelled) return
      const idx = seqIdx.current
      setFrame(TALK_SEQUENCE[idx])

      let hold = TALK_HOLD[idx] + jitter()

      if (idx === 0) {
        cycleCount++
        if (cycleCount >= 3 + Math.floor(Math.random() * 3)) {
          hold += 350 + Math.random() * 250
          cycleCount = 0
        }
      }

      seqIdx.current = (idx + 1) % TALK_SEQUENCE.length
      timeoutId = setTimeout(tick, hold)
    }

    tick()

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
    }
  }, [talking])

  useEffect(() => {
    if (prevAnim.current !== animation) {
      setStateOpacity(0)
      const t = setTimeout(() => setStateOpacity(1), 300)
      prevAnim.current = animation
      return () => clearTimeout(t)
    }
  }, [animation])

  const swayClass = `pedagogical-mascot-sway${talking ? ' pedagogical-mascot-sway--talking' : ''}`

  return (
    <div className={className}>
      <div className={swayClass} style={{ opacity: stateOpacity }}>
        <img
          src={src}
          alt="Mascota GreenDino"
          className="pedagogical-mascot-img"
        />
      </div>
    </div>
  )
}

export default PedagogicalMascot
