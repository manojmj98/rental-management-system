import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from './Card';
import Slider from 'react-slick';
import './Carousal.css';
import { Link } from 'react-router-dom';
function Carousal({ data }) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true, // Use fade for image transition effect
    arrows: true,
    centerMode: true,
  };
  return (
    <div className='container'>
      <Slider {...settings} className='bg-black'>
        {data.map((item) => {
          return (
            <Link to={`../renter/product/${item._id}`} key={item._id}>
              <Card
                title={item.name}
                description={item.description}
                price={item.price}
                isApproved={item.isApproved}
                imagePath={item.image}
              />
            </Link>
          );
        })}
      </Slider>
    </div>
  );
}

export default Carousal;
