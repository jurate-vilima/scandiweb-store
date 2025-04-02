import { useEffect, useState, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { graphQLRequest } from '@/services/api';
import { GET_PRODUCT_BY_ID } from '@/graphql/productQueries';
import { CategoryContext } from '@/contexts/CategoryContext';

export function useProduct() {
    const { productId } = useParams();
    const location = useLocation();
    const fromCategory = location.state?.fromCategory;

    const { setActiveCategory } = useContext(CategoryContext);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const data = await graphQLRequest(GET_PRODUCT_BY_ID, {
                    id: productId,
                });
                if (data?.productById) {
                    setProduct(data.productById);
                } else {
                    setError('Product not found');
                }
            } catch (err) {
                console.error('Error loading product:', err);
                setError('Failed to load product');
            } finally {
                setLoading(false);
            }
        }

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    useEffect(() => {
        if (fromCategory) {
            setActiveCategory(fromCategory.toLowerCase());
        } else if (product?.category?.name) {
            setActiveCategory(product.category.name.toLowerCase());
        }
    }, [fromCategory, product, setActiveCategory]);

    return { product, loading, error };
}
