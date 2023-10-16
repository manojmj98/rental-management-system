import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './Carousal.css'
function Carousal({ data }) {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true, // Use fade for image transition effect
        arrows: true,
        centerMode: true
      };
      return (
    <div className='out-container'>
    <div className="container">
          <Slider {...settings} className='bg-black'>
            {
                data.map((item,idx)=>{
                    return <div className="imageee" key={idx}><img src={item.src} className='picture'></img></div>
                })
            }
          </Slider>
        </div>
    </div>

      );
};

export default Carousal;
