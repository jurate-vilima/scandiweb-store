import React, { useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import CustomSwiper from '../ui/CustomSwiper/CustomSwiper';
import { Navigation, Thumbs } from 'swiper/modules';
import styles from './ImageSlider.module.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

function ImageSlider({ images }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const hasMultipleImages = images.length > 1;

    const thumbnailSwiperProps = {
        modules: [Navigation, Thumbs],
        direction: 'vertical',
        spaceBetween: 20,
        slidesPerView: Math.min(images.length, 5),
        freeMode: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        onSwiper: setThumbsSwiper,
        className: styles.imageSliderThumbnailItem,
    };

    const activeSwiperProps = {
        modules: [Navigation, Thumbs],
        navigation: hasMultipleImages,
        thumbs: {
            swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        },
        className: styles.imageSliderActiveItem,
        style: { height: '100%' },
    };

    return (
        <div className={styles.imageSlider} data-testid="product-gallery">
            {hasMultipleImages && (
                <div className={styles.imageSliderThumbnails}>
                    <CustomSwiper {...thumbnailSwiperProps}>
                        {images.map((img, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    className={styles.imageSliderThumbnailImg}
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                />
                            </SwiperSlide>
                        ))}
                    </CustomSwiper>
                </div>
            )}

            <div className={styles.imageSliderActiveItem}>
                <CustomSwiper {...activeSwiperProps}>
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <img
                                className={styles.imageSliderActiveImg}
                                src={img}
                                alt={`Product image ${index + 1}`}
                            />
                        </SwiperSlide>
                    ))}
                </CustomSwiper>
            </div>
        </div>
    );
}

export default ImageSlider;
