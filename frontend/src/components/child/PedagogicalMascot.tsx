import Lottie from 'lottie-react'
import greenDinoAnimation from '../../assets/lottie/greendino.json'

interface PedagogicalMascotProps {
  className?: string
}

export function PedagogicalMascot({ className }: PedagogicalMascotProps) {
  return (
    <Lottie
      animationData={greenDinoAnimation}
      autoplay
      loop
      className={className}
      rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
    />
  )
}

export default PedagogicalMascot
