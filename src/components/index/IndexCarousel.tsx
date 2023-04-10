import { useTranslation } from 'react-i18next';
import BusCarousel from '@/components/common/BusCarousel';
import { createImageSrc } from '@/utils/images';
import type { Language } from '@/types/common';

const banners = ['images/banner-01.jpg', 'images/banner-02.jpg'];
const tracking = {
  en: 'text-base md:text-2xl tracking-[0.1rem] md:tracking-[0.4rem]',
  'zh-TW': 'text-lg md:text-2xl tracking-[0.25rem] md:tracking-[0.7rem]',
} as const;
const padding = {
  en: 'pt-3 md:pt-9',
  'zh-TW': 'pt-6 md:pt-9',
} as const;

function IndexCarousel() {
  const { t, i18n } = useTranslation();
  const language = i18n.language as Language;

  return (
    <BusCarousel>
      {banners.map(banner => {
        return (
          <div className="relative drop-shadow-md" key={banner}>
            <img className="carousel_image" src={createImageSrc(banner)} alt="" />
            <div className="absolute text-white top-[15%] left-[10%] [writing-mode:vertical-lr] text-left">
              <p className="font-['Roboto'] tracking-[0.1rem] md:text-sm md:tracking-[0.2rem]">
                TAIWAN BUS+
              </p>
              <p className={`${tracking[language]}`}>{t('bus_news')}</p>
              <h2 className={`${padding[language]} ${tracking[language]}`}>
                {t('time_query_system')}
              </h2>
            </div>
          </div>
        )
      })}
    </BusCarousel>
  )
}

export default IndexCarousel;
