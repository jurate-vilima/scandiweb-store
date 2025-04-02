import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './ProductName.module.scss';

function ProductName({
    children,
    as: Tag = 'p',
    size = 'medium',
    className = '',
}) {
    const sizeClassMap = {
        small: styles.nameSmall,
        medium: styles.nameMedium,
        large: styles.nameLarge,
    };

    return (
        <Tag
            className={clsx(
                styles.name,
                sizeClassMap[size] ?? styles.nameMedium,
                className,
            )}
            data-testid="product-name"
        >
            {children}
        </Tag>
    );
}

ProductName.propTypes = {
    children: PropTypes.node.isRequired,
    as: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    className: PropTypes.string,
};

export default ProductName;
