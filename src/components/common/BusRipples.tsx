import type { ReactNode } from 'react';
import Ripples from 'react-ripples';

interface Props {
  children: ReactNode
}

function BusRipples({ children }: Props) {
  return (
    <Ripples
      className="w-full"
      color="rgba(256, 256, 256, 0.6)"
      during={2000}
    >
      {children}
    </Ripples>
  )
}

export default BusRipples;
