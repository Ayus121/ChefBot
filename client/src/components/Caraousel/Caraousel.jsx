import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Caraousel.css'; // Import your component-specific CSS

const Carousel = () => {
  const carouselData = [
    { id: 1, name: 'Image 1', imageUrl: 'https://via.placeholder.com/300' },
    { id: 2, name: 'Image 2', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, name: 'Image 3', imageUrl: 'https://via.placeholder.com/300' },
    { id: 4, name: 'Image 1', imageUrl: 'https://via.placeholder.com/300' },
    { id: 5, name: 'Image 2', imageUrl: 'https://via.placeholder.com/300' },
    { id: 6, name: 'Image 3', imageUrl: 'https://via.placeholder.com/300' },
    { id: 7, name: 'Image 1', imageUrl: 'https://via.placeholder.com/300' },
    { id: 8, name: 'Image 2', imageUrl: 'https://via.placeholder.com/300' },
    { id: 9, name: 'Image 3', imageUrl: 'https://via.placeholder.com/300' },
    { id: 10, name: 'Image 1', imageUrl: 'https://via.placeholder.com/300' },
    { id: 11, name: 'Image 2', imageUrl: 'https://via.placeholder.com/300' },
    { id: 12, name: 'Image 3', imageUrl: 'https://via.placeholder.com/300' },
    // Add more items as needed
  ];

 

  const PrevArrow = (props) => {
    const { onClick } = props;
    return <button className="arrow-button prev" onClick={onClick}>&lt;</button>;
  };

  const NextArrow = (props) => {
    const { onClick } = props;
    return <button className="arrow-button next" onClick={onClick}>&gt;</button>;
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {carouselData.map(item => (
          <div key={item.id} className="carousel-item">
            <img src={item.imageUrl} alt='' />
            <p className="image-name">{item.name}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
