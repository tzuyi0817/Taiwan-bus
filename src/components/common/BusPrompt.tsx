import type { ReactNode } from 'react';
import { createImageSrc } from '@/utils/images';

interface Props {
  content: ReactNode;
}

function BusPrompt({ content }: Props) {
  return (
    <div className="mt-8 flex flex-col items-center">
      <img src={createImageSrc('images/logo-wait.svg')} width="120" alt="" />
      {content}
    </div>
  )
}

export default BusPrompt;
