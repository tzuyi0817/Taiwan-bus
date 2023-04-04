import BusCarousel from '@/components/common/BusCarousel';
import { createImageSrc } from '@/utils/images';

const banners = ['images/banner-01.jpg', 'images/banner-02.jpg'];

function IndexCarousel() {
  return (
    <BusCarousel>
      {banners.map(banner => {
        return (
          <div className="relative drop-shadow-md" key={banner}>
            <img className="carousel_image" src={createImageSrc(banner)} alt="" />
            <div className="absolute text-white top-[15%] left-[10%] [writing-mode:vertical-lr] text-left">
              <p className="font-['Roboto'] tracking-[0.1rem] md:text-sm md:tracking-[0.2rem]">TAIWAN BUS+</p>
              <p className="text-lg tracking-[0.25rem] md:text-2xl md:tracking-[0.7rem]">台灣公車動態</p>
              <h2 className="pt-6 tracking-[0.25rem] md:pt-9 md:text-2xl md:tracking-[0.7rem]">時刻查詢系統</h2>
            </div>
          </div>
        )
      })}
    </BusCarousel>
  )
}

export default IndexCarousel;
