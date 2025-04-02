import { useState, useEffect } from 'react';
import { graphQLRequest } from '@/services/api';
import { GET_PRODUCTS_BY_CATEGORY } from '@/graphql/productQueries';

export const useCategoryProducts = (categoryName) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!categoryName) return;

        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data = await graphQLRequest(GET_PRODUCTS_BY_CATEGORY, {
                    category: categoryName,
                });
                setProducts(data.productsByCategory || []);
            } catch (err) {
                console.error('Failed to load products:', err);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryName]);

    return { products, loading };
};
