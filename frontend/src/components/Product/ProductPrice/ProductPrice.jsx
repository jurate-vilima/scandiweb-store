import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './ProductPrice.module.scss';
import attrStyles from '@/components/Attribute/AttributeGroup/AttributeGroup.module.scss';
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel';

function ProductPrice({
    price,
    currency,
    className = '',
    size = 'medium',
    showLabel = true,
    as: Tag = 'div',
    variant = 'default',
}) {
    const sizeClassMap = {
        small: styles.priceSmall,
        medium: styles.priceMedium,
        large: styles.priceLarge,
    };

    const formattedPrice =
        price != null && !isNaN(price) ? parseFloat(price).toFixed(2) : '0.00';

    const labelClass =
        variant === 'attribute' ? attrStyles.attributeName : styles.label;

    return (
        <Tag
            className={clsx(styles.wrapper, className)}
            data-testid="product-price"
        >
            {showLabel && (
                <SectionLabel className={labelClass}>Price:</SectionLabel>
            )}

            <span
                className={clsx(
                    styles.price,
                    sizeClassMap[size] ?? styles.priceMedium,
                )}
            >
                {currency}
                {formattedPrice}
            </span>
        </Tag>
    );
}

ProductPrice.propTypes = {
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    currency: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    showLabel: PropTypes.bool,
    as: PropTypes.string,
    variant: PropTypes.oneOf(['default', 'attribute']),
};

export default ProductPrice;
