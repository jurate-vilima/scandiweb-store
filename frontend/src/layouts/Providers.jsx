import { CartProvider } from '@/contexts/CartContext';
import { CategoryProvider } from '@/contexts/CategoryContext';

const Providers = ({ children }) => (
    <CategoryProvider>
        <CartProvider>{children}</CartProvider>
    </CategoryProvider>
);

export default Providers;
