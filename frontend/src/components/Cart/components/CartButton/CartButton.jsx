import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

import CartIcon from '@/assets/icons/CartIcon';
import styles from './CartButton.module.scss';
import { useCart } from '@/contexts/CartContext';

const CartButton = forwardRef(
    (
        {
            dataTestId = 'cart-btn',
            className,
            showBadge = true,
            onClick,
            enableShake = false, 
        },
        ref,
    ) => {
        const { getTotalQuantity, isShaking = false } = useCart();
        const total = getTotalQuantity();

        const handleClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick?.(e);
        };

        const icon = enableShake ? (
            <motion.div
                animate={
                    isShaking
                        ? { rotate: [0, -15, 15, -10, 10, 0] }
                        : { rotate: 0 }
                }
                transition={{ duration: 0.5 }}
                className={styles.cartIcon}
            >
                <CartIcon />
            </motion.div>
        ) : (
            <CartIcon className={styles.cartIcon} />
        );

        return (
            <button
                ref={ref}
                onClick={handleClick}
                className={clsx(styles.cartButton, className)}
                data-testid={dataTestId}
                aria-label="Cart"
            >
                {icon}

                {showBadge && total > 0 && (
                    <span className={styles.cartBadge}>
                        {total > 9 ? '9+' : total}
                    </span>
                )}
            </button>
        );
    },
);

CartButton.displayName = 'CartButton';

export default CartButton;
