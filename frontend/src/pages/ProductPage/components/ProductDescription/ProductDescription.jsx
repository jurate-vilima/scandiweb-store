import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProductDescription.module.scss';
import parse from 'html-react-parser';

function ProductDescription({ description, className = '' }) {
    if (!description) return null;

    return (
        <section
            className={`${styles.productDescription} ${className}`}
            data-testid="product-description"
            aria-label="Product description"
        >
            {parse(description)}
        </section>
    );
}

ProductDescription.propTypes = {
    description: PropTypes.string,
    className: PropTypes.string,
};

export default ProductDescription;
