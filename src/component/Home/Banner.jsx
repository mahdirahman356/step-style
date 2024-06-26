import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import slider1 from "../../assets/image/slider-1.jpg"
import slider2 from "../../assets/image/slider-2.jpg"
import slider3 from "../../assets/image/slider-3.jpg"
import slider4 from "../../assets/image/slider-4.jpg"
import slider5 from "../../assets/image/slider-5.jpg"
import BannerContent from './BannerContent';
const Banner = () => {
    return (
        <div>
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                modules={[EffectFade, Navigation, Pagination, Autoplay]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <BannerContent image={slider1}></BannerContent>
                </SwiperSlide>

                <SwiperSlide>
                    <BannerContent image={slider2}></BannerContent>
                </SwiperSlide>

                <SwiperSlide>
                    <BannerContent image={slider3}></BannerContent>
                </SwiperSlide>

                <SwiperSlide>
                    <BannerContent image={slider4}></BannerContent>
                </SwiperSlide>

                <SwiperSlide>
                    <BannerContent image={slider5}></BannerContent>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;