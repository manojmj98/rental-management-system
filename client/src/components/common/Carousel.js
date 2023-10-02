import React, { useState } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';

function Carousal({ data }) {
    const [slide, setSlide] = useState(0);

    const nextSlide = () => {
        setSlide((slide + 1) % data.length);
    };

    const prevSlide = () => {
        setSlide((slide - 1 + data.length) % data.length);
    };

    const renderImages = () => {
        return data.map((item, idx) => (
            <div
                className={`slide ${slide === idx ? 'active' : ''}`}
                key={idx}
            >
                {idx === slide && (
                    <img
                        src={item.src}
                        alt={item.alt}
                        className="w-800 h-600 rounded-lg"
                    />
                )}
            </div>
        ));
    };

    return (
        <section className="bg-gray-900 py-8">
            <div className="container mx-auto max-w-screen-xl">
                <h2 className="text-3xl font-semibold text-white mb-4 text-center">
                    Explore our wide range of robots for rent!
                </h2>
                <div className="flex justify-center items-center">
                    <div className="relative w-full">
                        <div className="slider relative flex overflow-hidden">
                            {renderImages()}
                        </div>
                        <BsArrowLeftCircleFill
                            className="arrow arrow-left absolute top-1/2 left-4 -translate-y-1/2 w-8 h-8 text-white cursor-pointer"
                            onClick={prevSlide}
                        />
                        <BsArrowRightCircleFill
                            className="arrow arrow-right absolute top-1/2 right-4 -translate-y-1/2 w-8 h-8 text-white cursor-pointer"
                            onClick={nextSlide}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Carousal;
