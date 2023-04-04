import { createImageSrc } from '@/utils/images';

function Loading() {
  return (
    <div className="flex justify-center my-12 animate-pulse">
      <img src={createImageSrc('images/e-bus.png')} alt="" className="animate-bounce" />
    </div>
  )
}

export default Loading;