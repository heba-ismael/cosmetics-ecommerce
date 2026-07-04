
import './SlideProducts.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation ,Autoplay } from 'swiper/modules';
import Products from "./Products";


function SlideProducts({ data,title}) {

  return (
    <div className="Slide_Products slide">
        <div className="container">
          <div className="top_slide">
                <h2>{title}</h2>
           </div>

     <Swiper  
          loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            slidesPerView={4}
            spaceBetween={20}
            navigation={true}
            modules={[Navigation ,Autoplay]}
            breakpoints={{
              0: { slidesPerView: 1.3, spaceBetween: 12 },
              576: { slidesPerView: 2, spaceBetween: 15 },
              900: { slidesPerView: 3, spaceBetween: 20 },
              1200: { slidesPerView: 4, spaceBetween: 20 },
            }}
            className="mySwiper">

        {data.map((item)=>{
       return(
         <SwiperSlide key={item.id}> <Products item ={item} /></SwiperSlide>
       )
        })}

        
       
      </Swiper>
           
        </div>
      
    </div>
  )
}

export default SlideProducts
