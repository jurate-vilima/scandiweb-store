import React from 'react';
import { Swiper } from 'swiper/react';

const filterSwiperProps = (props) => {
    const { watchSlidesVisibility, watchSlidesProgress, ...rest } = props;
    return rest;
};

const CustomSwiper = (props) => {
    const filteredProps = filterSwiperProps(props);
    return <Swiper {...filteredProps} />;
};

export default CustomSwiper;
