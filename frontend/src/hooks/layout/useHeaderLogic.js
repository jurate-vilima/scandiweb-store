import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useScrollLock } from './useScrollLock';

export function useHeaderLogic() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isCartOpen, toggleCartOverlay, closeCart } = useCart();

    useScrollLock(isMobileMenuOpen || isCartOpen);

    const toggleMenu = () => {
        if (isCartOpen) closeCart();
        setMobileMenuOpen((prev) => !prev);
    };

    const closeMenu = () => setMobileMenuOpen(false);

    const handleCartClick = () => {
        if (isMobileMenuOpen) closeMenu();
        toggleCartOverlay();
    };

    const handleHeaderClick = () => {
        if (isCartOpen) closeCart();
    };

    return {
        isMobileMenuOpen,
        toggleMenu,
        closeMenu,
        handleCartClick,
        handleHeaderClick,
    };
}
