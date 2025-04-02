import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateCartItemKey } from '@/utils/cartUtils';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const saved = localStorage.getItem('cart');
            return saved ? JSON.parse(saved) : [];
        } catch (err) {
            console.error('Failed to parse cart from localStorage:', err);
            return [];
        }
    });

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isShaking, setIsShaking] = useState(false); 

    const triggerShake = () => {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500); 
    };

    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        } catch (err) {
            console.error('Failed to save cart to localStorage:', err);
        }
    }, [cartItems]);

    const toggleCartOverlay = () => setIsCartOpen((prev) => !prev);
    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const addToCart = (
        product,
        selectedAttributes,
        attributesDefinition = [],
    ) => {
        const key = generateCartItemKey(product.id, selectedAttributes);
        const existing = cartItems.find((item) => item.key === key);

        if (existing) {
            setCartItems((items) =>
                items.map((i) =>
                    i.key === key ? { ...i, quantity: i.quantity + 1 } : i,
                ),
            );
        } else {
            setCartItems((items) => [
                ...items,
                {
                    key,
                    productId: product.id,
                    name: product.name,
                    mainImage: product.mainImage || product.gallery?.[0] || '',
                    attributes: selectedAttributes,
                    attributesDefinition,
                    price: product.price,
                    currency: product.currency,
                    quantity: 1,
                },
            ]);
        }

        triggerShake(); 
    };

    const updateQuantity = (key, delta) => {
        setCartItems((items) =>
            items
                .map((item) =>
                    item.key === key
                        ? { ...item, quantity: item.quantity + delta }
                        : item,
                )
                .filter((item) => item.quantity > 0),
        );
    };

    const clearCart = () => setCartItems([]);

    const getTotalQuantity = () =>
        cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                updateQuantity,
                clearCart,
                isCartOpen,
                toggleCartOverlay,
                openCart,
                closeCart,
                getTotalQuantity,
                isShaking,
                triggerShake,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
