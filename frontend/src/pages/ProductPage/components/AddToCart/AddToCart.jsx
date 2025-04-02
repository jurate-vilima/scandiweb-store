import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/ui/Button/Button';
import { useCart } from '@/contexts/CartContext';

function AddToCart({
    product,
    selectedAttributes,
    allSelected,
    className = '',
}) {
    const { addToCart, toggleCartOverlay } = useCart();

    const isDisabled = !allSelected || !product.inStock;

    const handleClick = useCallback(() => {
        addToCart(product, selectedAttributes, product.attributes);
        toggleCartOverlay();
    }, [addToCart, toggleCartOverlay, product, selectedAttributes]);

    return (
        <Button
            className={className}
            variant="primary"
            size="large"
            data-testid="add-to-cart"
            disabled={isDisabled}
            onClick={handleClick}
        >
            Add to Cart
        </Button>
    );
}

AddToCart.propTypes = {
    product: PropTypes.object.isRequired,
    selectedAttributes: PropTypes.object.isRequired,
    allSelected: PropTypes.bool.isRequired,
    className: PropTypes.string,
};

export default AddToCart;
