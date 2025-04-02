import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { usePlaceOrder } from '@/hooks/order/usePlaceOrder';

import styles from './CartOverlay.module.scss';
import Button from '@/components/ui/Button/Button';
import { CartItem, CartTotal } from '@/components/Cart';

const CartOverlay = () => {
    const {
        cartItems,
        updateQuantity,
        clearCart,
        isCartOpen,
        toggleCartOverlay,
        getTotalQuantity,
    } = useCart();

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    const {
        handlePlaceOrder,
        isPlacing,
        error: orderError,
    } = usePlaceOrder({
        cartItems,
        clearCart,
        toggleCartOverlay,
    });

    return (
        <AnimatePresence>
            {isCartOpen && (
                <motion.div
                    className={styles.overlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={toggleCartOverlay}
                    aria-label="Close cart"
                >
                    <motion.div
                        className={styles.overlayContainer}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.cartPanelContent}>
                            <h2 className={styles.title}>
                                My Bag,{' '}
                                <span>
                                    {getTotalQuantity()}{' '}
                                    {getTotalQuantity() === 1
                                        ? 'item'
                                        : 'items'}
                                </span>
                            </h2>
                            <div className={styles.items}>
                                {cartItems.map((item) => (
                                    <CartItem
                                        key={item.key}
                                        item={item}
                                        onIncrease={(key) =>
                                            updateQuantity(key, 1)
                                        }
                                        onDecrease={(key) =>
                                            updateQuantity(key, -1)
                                        }
                                    />
                                ))}
                            </div>

                            <CartTotal total={total} />

                            <div>
                                <Button
                                    full
                                    disabled={
                                        cartItems.length === 0 || isPlacing
                                    }
                                    onClick={handlePlaceOrder}
                                >
                                    Place order
                                </Button>
                            </div>
                            {orderError && (
                                <p className={styles.error}>{orderError}</p>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CartOverlay;
