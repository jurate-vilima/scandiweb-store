import React, { useContext, useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';

import { CategoryContext } from '@/contexts/CategoryContext';
import { useCategoryProducts } from '@/hooks/category/useCategoryProducts';
import { useDocumentTitle } from '@/hooks/meta/useDocumentTitle';
import { useCategoryDisplayName } from '@/hooks/category/useCategoryDisplayName';

import Loader from '@/components/ui/Loader/Loader';
import { CategoryHeader, ProductsGrid } from './components';

function CategoryPage() {
    const { categoryName } = useParams();
    const { categories, setActiveCategory } = useContext(CategoryContext);
    const { products, loading } = useCategoryProducts(categoryName);

    useEffect(() => {
        if (categoryName) {
            setActiveCategory(categoryName.toLowerCase());
        }
    }, [categoryName, setActiveCategory]);

    const displayName = useCategoryDisplayName(categories, categoryName);

    useDocumentTitle(displayName, !loading, []);

    if (loading) return <Loader />;

    return (
        <div>
            <CategoryHeader categoryName={categoryName} />
            <ProductsGrid products={products} categoryName={categoryName} />
            <Outlet />
        </div>
    );
}

export default CategoryPage;
