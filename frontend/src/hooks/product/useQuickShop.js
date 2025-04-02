import { useCart } from '@/contexts/CartContext';
import { graphQLRequest } from '@/services/api';
import { GET_PRODUCT_BY_ID } from '@/graphql/productQueries';
import { getMainImage, getDefaultAttributes } from '@/utils/productUtils';

export const useQuickShop = () => {
    const { addToCart } = useCart();

    return async (product, e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const { productById } = await graphQLRequest(GET_PRODUCT_BY_ID, {
                id: product.id,
            });
            const productData =
                productById?.attributes?.length > 0 ? productById : product;
            const productWithAttrs = {
                ...productData,
                mainImage: getMainImage(productData),
            };
            const defaultAttrs = getDefaultAttributes(
                productWithAttrs.attributes,
            );
            addToCart(
                productWithAttrs,
                defaultAttrs,
                productWithAttrs.attributes,
            );
        } catch (err) {
            console.error('Quick Shop fetch error:', err);
        }
    };
};
