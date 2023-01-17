import { 
  type ReactChild, 
  type ReactNode,
} from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface Props {
  onClickItem?: ((index: number, item: ReactNode) => void) | undefined;
  children: ReactChild[] | undefined;
  className?: string;
}

function BusCarousel({ onClickItem, children, className}: Props) {
  return (
    <Carousel
      showArrows={false}
      showThumbs={false}
      autoPlay={true}
      showStatus={false}
      infiniteLoop={true}
      showIndicators={false}
      interval={5000}
      onClickItem={onClickItem}
      className={`carousel ${className}`}
    >
      {children}
    </Carousel>
  )
}

export default BusCarousel;