import { useCallback, useState } from 'react';
import { graphQLRequest } from '@/services/api';
import { CREATE_ORDER } from '@/graphql/orderQueries';

export function usePlaceOrder({ cartItems, clearCart, toggleCartOverlay }) {
    const [isPlacing, setIsPlacing] = useState(false);
    const [error, setError] = useState(null);

    const handlePlaceOrder = useCallback(async () => {
        const items = cartItems.map(({ productId, quantity, price }) => ({
            productId,
            quantity,
            price,
            currencyId: 1,
        }));

        setIsPlacing(true);
        setError(null);

        const result = await graphQLRequest(CREATE_ORDER, { items });

        if (result) {
            clearCart();
            toggleCartOverlay();
        } else {
            setError('Failed to place order.');
        }

        setIsPlacing(false);
    }, [cartItems, clearCart, toggleCartOverlay]);

    return {
        handlePlaceOrder,
        isPlacing,
        error,
    };
}
