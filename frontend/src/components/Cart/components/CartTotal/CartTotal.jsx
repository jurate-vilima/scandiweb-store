import React from 'react';
import styles from './CartTotal.module.scss';
import { formatPrice } from '@/utils/stringUtils';

const CartTotal = ({ total }) => {
    return (
        <div className={styles.total}>
            <span className={styles.priceLabel}>Total</span>
            <span data-testid="cart-total">${formatPrice(total)}</span>
        </div>
    );
};

export default CartTotal;
